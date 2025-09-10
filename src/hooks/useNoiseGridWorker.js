import { useState, useEffect } from 'react';

export default function useNoiseGridWorker(noiseData, bbox, zoom) {
  const [gridData, setGridData] = useState(null);
  const [progress, setProgress] = useState(null);
  const [computing, setComputing] = useState(false);

  useEffect(() => {
    if (!noiseData || !bbox || zoom < 12) {
      setGridData(null);
      return;
    }

    setComputing(true);
    setProgress(0);

    const worker = new Worker(new URL('../workers/gridWorker.js', import.meta.url), { type: 'module' });

    worker.postMessage({ 
      noiseData, 
      bbox, 
      cellSizeKm: 0.50 });

    worker.onmessage = (e) => {
      if (e.data.type === 'progress') {
        setProgress(e.data.progress);
      } else if (e.data.type === 'done') {
        setGridData(e.data.grid);
        setProgress(null);
        setComputing(false);
        worker.terminate();
      }
    };

    return () => worker.terminate();
  }, [noiseData, bbox, zoom]);

  return { gridData, progress, computing };
}
