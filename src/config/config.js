const config = {
    mapboxToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    mapSettings: {
        initialViewState: {
            longitude: 34.5, // Center over Africa
            latitude: 0,
            zoom: 3.5
        },
        mapStyle: 'mapbox://styles/mapbox/dark-v11'
    },
    api: {
        supabaseUrl: 'https://vzvufmnaeqqurbdwjyzf.supabase.co',
        supabaseAnonKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6dnVmbW5hZXFxdXJiZHdqeXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMTY3NzEsImV4cCI6MjA2NjU5Mjc3MX0.mQBOKsR5w3mvmNfsEmq485j_RDB71M2E7Cy565JK-UE',
    },
};

export default config;