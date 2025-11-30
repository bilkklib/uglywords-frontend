import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentCaptures, setRecentCaptures] = useState([]);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            // Charger les statistiques
            const statsResponse = await fetch('/api/captures/stats');
            const statsData = await statsResponse.json();
            
            if (statsData.status === 'success') {
                setStats(statsData.data);
            }

            // Charger les captures récentes
            const capturesResponse = await apiService.searchPosts('', '');
            if (capturesResponse.status === 'success') {
                setRecentCaptures(capturesResponse.data.slice(0, 5));
            }
        } catch (error) {
            console.error('Erreur dashboard:', error);
        }
    };

    if (!stats) {
        return <div className="loading">Chargement du tableau de bord...</div>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>📊 Tableau de Bord UglyWords</h1>
                <p>Surveillance des contenus problématiques sur les réseaux sociaux</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">📈</div>
                    <div className="stat-info">
                        <h3>{stats.total_captures}</h3>
                        <p>Posts capturés</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🌐</div>
                    <div className="stat-info">
                        <h3>{stats.platforms_count}</h3>
                        <p>Plateformes surveillées</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🔍</div>
                    <div className="stat-info">
                        <h3>{stats.by_platform[0]?.count || 0}</h3>
                        <p>Sur {stats.by_platform[0]?.platform || 'N/A'}</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="recent-captures">
                    <h3>🆕 Captures Récentes</h3>
                    {recentCaptures.map((capture, index) => (
                        <div key={index} className="recent-item">
                            <div className="platform-badge small">{capture.platform}</div>
                            <div className="content-preview">
                                {capture.content.substring(0, 100)}...
                            </div>
                            <div className="capture-date">
                                {new Date(capture.captured_at).toLocaleDateString('fr-FR')}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="quick-actions">
                    <h3>⚡ Actions Rapides</h3>
                    <button onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
                        🔍 Lancer la recherche
                    </button>
                    <button onClick={() => alert('Extension installée!')}>
                        📥 Installer l'extension
                    </button>
                    <button onClick={() => window.open('/api-docs', '_blank')}>
                        📚 Voir la documentation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;