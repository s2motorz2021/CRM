'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsLoaded(true);
        // Check if already logged in
        const user = localStorage.getItem('s2_user');
        if (user) {
            router.push('/');
        }
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: username, password }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('s2_user', JSON.stringify(data.user));
                // Token is also saved in cookie by backend
                router.push('/');
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
        }
    };

    const loginContainerStyle = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.8s ease-in-out',
        fontFamily: "'Inter', sans-serif",
    };

    const loginCardStyle = {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '50px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
    };

    const inputGroupStyle = {
        marginBottom: '20px',
        textAlign: 'left',
    };

    const labelStyle = {
        display: 'block',
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '0.85rem',
        marginBottom: '8px',
        fontWeight: 500,
        marginLeft: '4px',
    };

    const inputStyle = {
        width: '100%',
        padding: '14px 20px',
        background: 'rgba(255, 255, 255, 0.07)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: 'white',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.3s ease',
    };

    const buttonStyle = {
        width: '100%',
        padding: '16px',
        background: 'linear-gradient(135deg, #00B8D4 0%, #0097A7 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1.1rem',
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 10px 20px rgba(0, 184, 212, 0.3)',
        transition: 'all 0.3s ease',
        marginTop: '10px',
    };

    return (
        <div style={loginContainerStyle}>
            <div style={loginCardStyle}>
                <div style={{ marginBottom: '40px' }}>
                    <img
                        src="/logo.png"
                        alt="S2 Motorz"
                        style={{ width: '180px', height: 'auto', marginBottom: '20px' }}
                    />
                    <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, margin: 0, letterSpacing: '0.5px' }}>
                        Welcome to S2 Motorz
                    </h1>
                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', fontSize: '0.9rem' }}>
                        Enter your phone number and password to access the CRM
                    </p>
                </div>

                <form onSubmit={handleLogin}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Phone Number</label>
                        <input
                            type="text"
                            placeholder="Enter registered phone number"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onFocus={(e) => e.target.style.borderColor = '#00B8D4'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={(e) => e.target.style.borderColor = '#00B8D4'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            style={inputStyle}
                            required
                        />
                    </div>

                    {error && (
                        <p style={{ color: '#FF5252', fontSize: '0.85rem', marginBottom: '20px', fontWeight: 500 }}>
                            ⚠️ {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 184, 212, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 184, 212, 0.3)';
                        }}
                    >
                        Sign In
                    </button>
                </form>

                <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.8rem' }}>
                        © 2026 S2 Motorz • Smart Service Solutions
                    </p>
                </div>
            </div>
        </div>
    );
}
