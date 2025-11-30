const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : 'https://uglywords.com/api';

// Version compatible FlokiNet
export const apiService = {
    async capturePost(postData) {
        // Pour FlokiNet : /api?action=capture
        const url = window.location.hostname === 'localhost' 
            ? `${API_BASE}/capture`
            : `${API_BASE}?action=capture`;
            
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...postData, action: 'capture'})
        });
        return await response.json();
    },

    async searchPosts(query, tags = '') {
        // Pour FlokiNet : /api?action=search&q=query&tags=tags
        const baseUrl = window.location.hostname === 'localhost' 
            ? `${API_BASE}/search`
            : `${API_BASE}`;
            
        const params = window.location.hostname === 'localhost'
            ? new URLSearchParams({ q: query, tags })
            : new URLSearchParams({ action: 'search', q: query, tags });
            
        const response = await fetch(`${baseUrl}?${params}`);
        return await response.json();
    },

    async getStats() {
        // Pour FlokiNet : /api?action=stats
        const url = window.location.hostname === 'localhost' 
            ? `${API_BASE}/stats`
            : `${API_BASE}?action=stats`;
            
        const response = await fetch(url);
        return await response.json();
    }
};