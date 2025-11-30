import React, { useState } from 'react';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const downloadExtension = () => {
        // Lien vers le fichier ZIP de l'extension
        const link = document.createElement('a');
        link.href = '/uglybot-extension.zip';
        link.download = 'uglybot-extension.zip';
        link.click();
        
        // Analytics event (optionnel)
        console.log('Extension download initiated');
    };

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo et Nom */}
                <div className="logo-section">
                    <div className="logo">
                        🤖
                    </div>
                    <div className="site-info">
                        <h1 className="site-title">UglyWords</h1>
                        <p className="site-tagline">Surveillons les discours problématiques</p>
                    </div>
                </div>

                {/* Navigation Desktop */}
                <nav className="nav-desktop">
                    <ul className="nav-list">
                        <li>
                            <button 
                                onClick={() => scrollToSection('dashboard')}
                                className="nav-link"
                            >
                                📊 Tableau de Bord
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('search')}
                                className="nav-link"
                            >
                                🔍 Recherche
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => scrollToSection('how-it-works')}
                                className="nav-link"
                            >
                                ❓ Comment ça marche
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={downloadExtension}
                                className="nav-link download-btn"
                            >
                                📥 Installer UglyBot
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* Menu Mobile Hamburger */}
                <div className="mobile-menu">
                    <button 
                        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {/* Navigation Mobile */}
            <nav className={`nav-mobile ${isMenuOpen ? 'active' : ''}`}>
                <ul className="nav-list-mobile">
                    <li>
                        <button 
                            onClick={() => scrollToSection('dashboard')}
                            className="nav-link-mobile"
                        >
                            📊 Tableau de Bord
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => scrollToSection('search')}
                            className="nav-link-mobile"
                        >
                            🔍 Recherche
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => scrollToSection('how-it-works')}
                            className="nav-link-mobile"
                        >
                            ❓ Comment ça marche
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={downloadExtension}
                            className="nav-link-mobile download-mobile"
                        >
                            📥 Installer l'extension
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => window.open('https://uglywords.com/api', '_blank')}
                            className="nav-link-mobile"
                        >
                            📚 API Docs
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Bandeau d'information */}
            <div className="info-banner">
                <div className="banner-content">
                    <span className="banner-icon">⚠️</span>
                    <span className="banner-text">
                        UglyBot capture les posts problématiques sur Facebook, Twitter, Instagram et TikTok
                    </span>
                    <button 
                        className="banner-close"
                        onClick={() => document.querySelector('.info-banner').style.display = 'none'}
                    >
                        ×
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;