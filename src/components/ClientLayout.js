'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar, Header } from '@/components/Navigation';
import { PersistentTaskProvider } from '@/context/PersistentTaskContext';
import GlobalMinimizedBar from '@/components/GlobalMinimizedBar';

export default function ClientLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Initial hydration check
    useEffect(() => {
        setMounted(true);
    }, []);

    // Auth check - only runs on client after mounting and when pathname changes
    useEffect(() => {
        if (!mounted) return;

        const checkAuth = () => {
            console.log('ClientLayout: Checking auth for', pathname);
            try {
                const userJSON = localStorage.getItem('s2_user');
                const isLoginPage = pathname === '/login';

                if (!userJSON && !isLoginPage) {
                    setIsAuthenticated(false);
                    router.push('/login');
                    setIsLoading(false); // Move here to show login immediately
                } else if (userJSON && isLoginPage) {
                    setIsAuthenticated(true);
                    router.push('/');
                    setIsLoading(false);
                } else {
                    setIsAuthenticated(!!userJSON);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Auth check error:', error);
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [mounted, pathname, router]);

    // Show loading screen ONLY during initial hydration or actual auth check
    if (!mounted || isLoading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#1A1A2E',
                color: 'white',
                fontSize: '1.2rem',
                fontFamily: "'Inter', sans-serif"
            }}>
                <div style={{ textAlign: 'center' }}>
                    <img src="/logo.png" alt="Logo" style={{ width: '150px', marginBottom: '20px', animation: 'pulse 2s infinite' }} />
                    <p>Loading S2 Motorz...</p>
                    <style>{`
                        @keyframes pulse {
                            0% { transform: scale(1); opacity: 0.8; }
                            50% { transform: scale(1.05); opacity: 1; }
                            100% { transform: scale(1); opacity: 0.8; }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    const isLoginPage = pathname === '/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <PersistentTaskProvider>
            <div className="app-container">
                <Sidebar />
                <main className="main-content">
                    <Header />
                    {children}
                </main>
                <GlobalMinimizedBar />
            </div>
        </PersistentTaskProvider>
    );
}
