import React from 'react';
import { createRoot } from 'react-dom/client';  // Updated import for React 18+
import './styles.css';  // Optional global styling
import App from './App';

// Get the root DOM element
const container = document.getElementById('root');
const root = createRoot(container);  // Use createRoot (React 18+)

// Render the app
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
