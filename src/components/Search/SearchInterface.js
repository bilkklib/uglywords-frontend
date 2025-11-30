import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import './SearchInterface.css';

const SearchInterface = () => {
    const [query, setQuery] = useState('');
    const [tags, setTags] = useState('');
    const [platform, setPlatform] = useState('all');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchPosts = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        
        try {
            const response = await apiService.searchPosts(query, tags);
            if (response.status === 'success') {
                setResults(response.data);
            }
        } catch (error) {
            console.error('Erreur recherche:', error);
        } finally {
            setLoading(false);
        }
    };

    const exportResults = () => {
        const csv = results.map(item => 
            `"${item.content.replace(/"/g, '""')}","${item.tags}","${item.platform}","${item.captured_at}"`
        ).join('\n');
        
        const blob = new Blob([`content,tags,platform,date\n${csv}`], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `uglywords-export-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    useEffect(() => {
        searchPosts();
    }, []);

    return (
        <div className="search-interface">
            <div className="search-header">
                <h2>🔍 Recherche dans la base de données</h2>
                <p>Explorez les posts capturés par la communauté</p>
            </div>

            <form onSubmit={searchPosts} className="search-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Mots-clés :</label>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Rechercher dans le contenu..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Tags :</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="insultant, irrespectueux..."
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Plateforme :</label>
                        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                            <option value="all">Toutes</option>
                            <option value="facebook">Facebook</option>
                            <option value="twitter">Twitter/X</option>
                            <option value="instagram">Instagram</option>
                            <option value="tiktok">TikTok</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Du :</label>
                        <input
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Au :</label>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={loading}>
                        {loading ? '🔍 Recherche...' : '🔍 Rechercher'}
                    </button>
                    
                    {results.length > 0 && (
                        <button type="button" onClick={exportResults}>
                            📊 Exporter CSV
                        </button>
                    )}
                </div>
            </form>

            <div className="search-results">
                <h3>📄 Résultats ({results.length})</h3>
                
                {loading ? (
                    <div className="loading">Chargement...</div>
                ) : results.length === 0 ? (
                    <div className="no-results">
                        Aucun résultat trouvé. Essayez d'autres termes de recherche.
                    </div>
                ) : (
                    <div className="results-grid">
                        {results.map((item, index) => (
                            <div key={index} className="result-card">
                                <div className="card-header">
                                    <span className="platform-badge">{item.platform}</span>
                                    <span className="date">
                                        {new Date(item.captured_at).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                                
                                <div className="card-content">
                                    {item.content.length > 200 
                                        ? `${item.content.substring(0, 200)}...` 
                                        : item.content
                                    }
                                </div>
                                
                                <div className="card-tags">
                                    {item.tags && item.tags.split(',').map((tag, tagIndex) => (
                                        <span key={tagIndex} className="tag">
                                            #{tag.trim()}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className="card-actions">
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                        🔗 Voir original
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchInterface;