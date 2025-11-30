import React, { useState } from 'react';
import './UglyBot.css';

const UglyBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 100 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        
        setPosition({
            x: e.clientX - 25,
            y: e.clientY - 25
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const capturePost = () => {
        // Logique de capture à implémenter
        alert('Fonction de capture activée! Positionnez le rectangle sur le post à capturer.');
    };

    return (
        <>
            {/* Bulle UglyBot */}
            <div 
                className="uglybot-bubble"
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                🤖
            </div>

            {/* Overlay de capture */}
            {isOpen && (
                <div className="capture-overlay">
                    <div className="capture-modal">
                        <h3>UglyBot - Capture de post</h3>
                        <button onClick={capturePost}>Capturer cette zone</button>
                        <button onClick={() => setIsOpen(false)}>Fermer</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default UglyBot;