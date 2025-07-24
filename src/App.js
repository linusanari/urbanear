// src/App.js
import React from 'react';
import './styles.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MapContainer from './components/MapContainer';

function App() {
    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                <MapContainer />
            </main>
            <Footer />
        </div>
    );
}

export default App;
