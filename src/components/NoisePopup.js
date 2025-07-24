// components/NoisePopup.js
import { useState, useEffect } from 'react';
import { Popup, useMap } from 'react-map-gl';

export default function NoisePopup({ data }) {
  const { current: map } = useMap();
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    if (!map || !data) return;

    const handleMouseEnter = (e) => {
      map.getCanvas().style.cursor = 'pointer';
      const feature = e.features[0];
      const { instantaneous } = feature.properties;
      const coordinates = feature.geometry.coordinates;

      setPopupInfo({
        coordinates,
        noise: Number(instantaneous).toFixed(2)
      });
    };

    const handleMouseLeave = () => {
      map.getCanvas().style.cursor = '';
      setPopupInfo(null);
    };

    map.on('mouseenter', 'noise-points', handleMouseEnter);
    map.on('mouseleave', 'noise-points', handleMouseLeave);

    return () => {
      map.off('mouseenter', 'noise-points', handleMouseEnter);
      map.off('mouseleave', 'noise-points', handleMouseLeave);
    };
  }, [map, data]);

  return popupInfo ? (
    <Popup
      longitude={popupInfo.coordinates[0]}
      latitude={popupInfo.coordinates[1]}
      closeButton={false}
      closeOnClick={false}
      anchor="top"
    >
      <div>
        <strong>Noise:</strong> {popupInfo.noise} dB
      </div>
    </Popup>
  ) : null;
}
