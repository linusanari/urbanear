// src/components/Footer.js
import React from 'react';

function Footer() {
    return (
        <footer className="app-footer">
            <p>&copy; {new Date().getFullYear()} Noise Crowdsourcing Project</p>
        </footer>
    );
}

export default Footer;
