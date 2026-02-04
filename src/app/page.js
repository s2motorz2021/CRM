'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [dashboardData, setDashboardData] = useState({
        stats: [
            { label: 'Active Jobs', value: '-', icon: '🔧', color: 'var(--color-primary)', change: '0%', path: '/job-cards' },
            { label: 'Total Revenue', value: '₹0', icon: '💰', color: 'var(--color-accent)', change: '0%', path: '/finance' },
            { label: 'Pending Delivery', value: '-', icon: '📄', color: '#FF9800', change: '0', path: '/job-cards' },
            { label: 'Stock Value', value: '₹0', icon: '📦', color: '#4CAF50', change: 'Live', path: '/inventory' },
        ],
        recentJobs: [],
        isLoading: true
    });

    useEffect(() => {
        setIsLoaded(true);
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

        try {
            const [jcRes, finRes, invRes] = await Promise.all([
                fetch('/api/job-cards', { signal: controller.signal }),
                fetch('/api/finance/summary', { signal: controller.signal }),
                fetch('/api/inventory/summary', { signal: controller.signal })
            ]);
            clearTimeout(timeoutId);

            const jobCards = await jcRes.json();
            const finance = await finRes.json();
            const inventory = await invRes.json();

            const todayRevenue = finance.totalRevenue || 0;
            const activeJobs = Array.isArray(jobCards) ? jobCards.filter(jc => !['completed', 'delivered'].includes(jc.status)).length : 0;
            const pendingInvoices = Array.isArray(jobCards) ? jobCards.filter(jc => jc.status === 'completed').length : 0;

            const recent = Array.isArray(jobCards) ? jobCards.slice(0, 4).map(jc => ({
                id: jc.jobCardNo,
                customer: jc.customerId?.name || 'Walk-in',
                vehicle: `${jc.vehicleId?.brand || ''} ${jc.vehicleId?.model || ''}`,
                status: jc.status,
                time: new Date(jc.createdAt).toLocaleDateString()
            })) : [];

            setDashboardData({
                stats: [
                    { label: 'Active Jobs', value: activeJobs.toString(), icon: '🔧', color: 'var(--color-primary)', change: 'Live', path: '/job-cards' },
                    { label: 'Total Revenue', value: `₹${todayRevenue.toLocaleString()}`, icon: '💰', color: 'var(--color-accent)', change: 'Live', path: '/finance' },
                    { label: 'Pending Delivery', value: pendingInvoices.toString(), icon: '📄', color: '#FF9800', change: 'Live', path: '/job-cards' },
                    { label: 'Stock Value', value: `₹${(inventory.totalStockValue || 0).toLocaleString()}`, icon: '📦', color: '#4CAF50', change: 'Live', path: '/inventory' },
                ],
                recentJobs: recent,
                isLoading: false
            });
        } catch (error) {
            console.error('Dashboard fetch error:', error);
            setDashboardData(prev => ({ ...prev, isLoading: false }));
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'pending': { bg: 'rgba(255, 152, 0, 0.15)', text: '#FF9800' },
            'in-progress': { bg: 'rgba(0, 184, 212, 0.15)', text: '#00B8D4' },
            'completed': { bg: 'rgba(76, 175, 80, 0.2)', text: '#2E7D32' },
            'delivered': { bg: 'rgba(76, 175, 80, 0.1)', text: '#4CAF50' },
        };
        return colors[status?.toLowerCase()] || { bg: '#eee', text: '#666' };
    };

    return (
        <div>
            {/* Welcome Section */}
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h1 style={{
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: 'var(--spacing-xs)',
                }}>
                    Welcome back, Admin! 👋
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    {dashboardData.isLoading ? 'Syncing workshop data...' : "Here's the latest update from S2 Motorz"}
                </p>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-xl)',
            }}>
                {dashboardData.stats.map((stat, index) => (
                    <div
                        key={index}
                        style={{
                            background: 'white',
                            borderRadius: 'var(--radius-lg)',
                            padding: 'var(--spacing-lg)',
                            boxShadow: 'var(--shadow-sm)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            border: '1px solid transparent',
                        }}
                        onClick={() => router.push(stat.path)}
                    >
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 'var(--spacing-xs)', textTransform: 'uppercase' }}>
                                {stat.label}
                            </p>
                            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--spacing-xs)' }}>
                                {stat.value}
                            </p>
                            <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 500 }}>
                                {stat.change}
                            </span>
                        </div>
                        <div style={{
                            width: '50px', height: '50px', borderRadius: 'var(--radius-md)',
                            background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}40)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                        }}>{stat.icon}</div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-lg)' }}>
                {/* Recent Job Cards */}
                <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Recent Job Cards</h2>
                        <button onClick={() => router.push('/job-cards')} className="btn btn-outline" style={{ padding: '6px 16px', fontSize: '0.85rem' }}>View All →</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        {dashboardData.recentJobs.length > 0 ? dashboardData.recentJobs.map((job, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: 'var(--spacing-md)', background: 'var(--color-gray-100)',
                                    borderRadius: 'var(--radius-md)', transition: 'all 0.2s ease', cursor: 'pointer',
                                }}
                                onClick={() => router.push('/job-cards')}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                    <div style={{
                                        width: '40px', height: '40px', borderRadius: '50%',
                                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '0.9rem',
                                    }}>{job.customer.charAt(0)}</div>
                                    <div>
                                        <p style={{ fontWeight: 500, fontSize: '0.95rem', marginBottom: '2px' }}>{job.customer}</p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{job.vehicle} • {job.id}</p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{
                                        padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 500,
                                        background: getStatusColor(job.status).bg, color: getStatusColor(job.status).text,
                                        textTransform: 'capitalize'
                                    }}>{job.status}</span>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>{job.time}</p>
                                </div>
                            </div>
                        )) : (
                            <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--text-muted)' }}>No recent jobs found.</div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 'var(--spacing-lg)' }}>Quick Actions</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                        {[
                            { icon: '➕', label: 'New Job Card', color: 'var(--color-primary)', path: '/job-cards' },
                            { icon: '📅', label: 'Schedule Appointment', color: '#9C27B0', path: '/appointments' },
                            { icon: '👤', label: 'Add Customer', color: '#FF9800', path: '/crm' },
                            { icon: '📦', label: 'Add Stock', color: '#4CAF50', path: '/inventory' },
                            { icon: '💳', label: 'Create Invoice', color: 'var(--color-accent)', path: '/billing' },
                        ].map((action, index) => (
                            <button
                                key={index}
                                onClick={() => router.push(action.path)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', padding: 'var(--spacing-md)',
                                    background: 'var(--color-gray-100)', border: 'none', borderRadius: 'var(--radius-md)',
                                    cursor: 'pointer', fontSize: '0.9rem', width: '100%', textAlign: 'left',
                                }}
                            >
                                <span style={{
                                    width: '36px', height: '36px', borderRadius: 'var(--radius-sm)',
                                    background: `${action.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>{action.icon}</span>
                                <span style={{ fontWeight: 500 }}>{action.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* JESSI AI Widget Snippet */}
                    <div style={{
                        marginTop: 'var(--spacing-lg)', padding: 'var(--spacing-md)',
                        background: 'linear-gradient(135deg, rgba(0, 184, 212, 0.1), rgba(227, 6, 19, 0.05))',
                        borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 184, 212, 0.2)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
                            <span style={{ fontSize: '1.3rem' }}>🤖</span>
                            <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>JESSI Suggests</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            "{dashboardData.stats[0]?.value > 10 ? 'Workshop is busy today. Monitor technician throughput.' : 'Good time to follow up on overdue service reminders.'}"
                        </p>
                        <button className="btn btn-primary" onClick={() => router.push('/jessi-ai')} style={{ marginTop: 'var(--spacing-sm)', padding: '6px 14px', fontSize: '0.8rem', width: '100%' }}>Ask JESSI AI</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
