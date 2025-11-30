import React from 'react';
import './styles/App.css';
import Header from './components/Header/Header';
import UglyBot from './components/UglyBot/UglyBot';
import Dashboard from './components/Dashboard/Dashboard';
import SearchInterface from './components/Search/SearchInterface';

function App() {
    return (
        <div className="App">
            {/* Nouveau Header avec navigation */}
            <Header />
            
            {/* UglyBot disponible sur toutes les pages */}
            <UglyBot />
            
            <main>
                {/* Section Tableau de Bord */}
                <section id="dashboard">
                    <Dashboard />
                </section>

                {/* Section Comment ça marche */}
                <section id="how-it-works">
                    <div className="container">
                        <h2>🤔 Comment utiliser UglyBot ?</h2>
                        <div className="steps-grid">
                            <div className="step-card">
                                <div className="step-number">1</div>
                                <h3>Installez l'extension</h3>
                                <p>Téléchargez et installez l'extension UglyBot sur votre navigateur</p>
                            </div>
                            <div className="step-card">
                                <div className="step-number">2</div>
                                <h3>Naviguez sur les réseaux</h3>
                                <p>Allez sur Facebook, Twitter, Instagram ou TikTok comme d'habitude</p>
                            </div>
                            <div className="step-card">
                                <div className="step-number">3</div>
                                <h3>Activez UglyBot</h3>
                                <p>Cliquez sur l'icône 🤖 quand vous voyez un post problématique</p>
                            </div>
                            <div className="step-card">
                                <div className="step-number">4</div>
                                <h3>Capturez et tagguez</h3>
                                <p>Sélectionnez le post, ajoutez des tags et archivez-le</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section Recherche */}
                <section id="search">
                    <SearchInterface />
                </section>

                {/* Section À Propos */}
                <section id="about">
                    <div className="container">
                        <h2>🎯 Mission UglyWords</h2>
                        <div className="mission-content">
                            <p>
                                UglyWords est une plateforme citoyenne qui permet de documenter 
                                les discours problématiques tenus par les personnalités publiques 
                                sur les réseaux sociaux.
                            </p>
                            <div className="features-list">
                                <h3>Nos objectifs :</h3>
                                <ul>
                                    <li>📝 Archiver les contenus insultants et irrespectueux</li>
                                    <li>🔍 Permettre la recherche et l'analyse de ces discours</li>
                                    <li>📊 Fournir des données pour la recherche et le journalisme</li>
                                    <li>⚖️ Contribuer à la responsabilisation des personnalités publiques</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;