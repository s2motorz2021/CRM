'use client';

import { useRef, useEffect, useState } from 'react';

export default function SignaturePad({ onSave, onCancel, title = "Advisor Signature" }) {
    const canvasRef = useRef(null);
    const drawingRef = useRef(false);
    const [hasSigned, setHasSigned] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Quality improvement for High DPI screens
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const getCoordinates = (e) => {
            const rect = canvas.getBoundingClientRect();
            if (e.touches && e.touches[0]) {
                return {
                    offsetX: e.touches[0].clientX - rect.left,
                    offsetY: e.touches[0].clientY - rect.top
                };
            }
            return {
                offsetX: e.offsetX || (e.clientX - rect.left),
                offsetY: e.offsetY || (e.clientY - rect.top)
            };
        };

        const startDrawing = (e) => {
            const { offsetX, offsetY } = getCoordinates(e);
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY);
            drawingRef.current = true;
        };

        const draw = (e) => {
            if (!drawingRef.current) return;
            const { offsetX, offsetY } = getCoordinates(e);
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
            setHasSigned(true);
        };

        const stopDrawing = () => {
            drawingRef.current = false;
        };

        // Event listeners
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        const handleTouchStart = (e) => {
            e.preventDefault();
            startDrawing(e);
        };
        const handleTouchMove = (e) => {
            e.preventDefault();
            draw(e);
        };

        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', stopDrawing);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseout', stopDrawing);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', stopDrawing);
        };
    }, []); // Run only once to avoid resetting canvas width/height

    const clear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasSigned(false);
    };

    const save = () => {
        if (!hasSigned) {
            alert('Please sign first');
            return;
        }
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL('image/png');
        onSave(dataUrl);
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', width: '90%', maxWidth: '500px' }}>
                <h3 style={{ marginBottom: '15px' }}>{title}</h3>
                <div style={{ border: '2px dashed #ccc', borderRadius: '8px', marginBottom: '20px', background: '#f9f9f9' }}>
                    <canvas
                        ref={canvasRef}
                        style={{ width: '100%', height: '250px', display: 'block', cursor: 'crosshair', touchAction: 'none' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={clear} style={{ flex: 1, padding: '12px', border: '1px solid #ddd', background: 'white', borderRadius: '8px', cursor: 'pointer' }}>Clear</button>
                    <button onClick={onCancel} style={{ flex: 1, padding: '12px', border: '1px solid #ddd', background: 'white', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={save} style={{ flex: 1, padding: '12px', border: 'none', background: '#4CAF50', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Save Signature</button>
                </div>
            </div>
        </div>
    );
}
