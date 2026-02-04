'use client';

import { useState, useEffect } from 'react';

export default function ReportsPage() {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    });
    const [activeTab, setActiveTab] = useState('summary');

    useEffect(() => {
        fetchReport();
    }, [dateRange]);

    const fetchReport = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/reports/billing?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`);
            const data = await res.json();
            setReportData(data);
        } catch (error) {
            console.error('Failed to fetch report:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (val) => `₹${(val || 0).toLocaleString('en-IN')}`;

    const StatCard = ({ title, value, icon, color }) => (
        <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flex: 1,
            minWidth: '240px',
            transition: 'transform 0.3s ease',
            border: `1px solid rgba(0,0,0,0.03)`
        }}>
            <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '14px',
                background: `${color}15`,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem'
            }}>
                {icon}
            </div>
            <div>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>{title}</p>
                <h3 style={{ margin: '4px 0 0 0', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</h3>
            </div>
        </div>
    );

    if (loading && !reportData) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Loading reports...</div>;
    }

    const { summary, dailySummary, gstBreakdown, paymentModeBreakdown } = reportData || {};

    return (
        <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700, background: 'linear-gradient(135deg, #1A1A2E, #00B8D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>📊 Billing Reports</h1>
                    <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>Financial performance and tax summaries</p>
                </div>

                <div style={{ display: 'flex', gap: '12px', background: 'white', padding: '12px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>FROM</span>
                        <input
                            type="date"
                            value={dateRange.startDate}
                            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                            style={{ border: '1px solid #eee', padding: '8px', borderRadius: '6px', outline: 'none' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>TO</span>
                        <input
                            type="date"
                            value={dateRange.endDate}
                            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                            style={{ border: '1px solid #eee', padding: '8px', borderRadius: '6px', outline: 'none' }}
                        />
                    </div>
                </div>
            </div>

            {/* Top Stats */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
                <StatCard title="Total Billing" value={formatCurrency(summary.totalBilling)} icon="🧾" color="#2196F3" />
                <StatCard title="Collected" value={formatCurrency(summary.totalCollected)} icon="💰" color="#4CAF50" />
                <StatCard title="Pending" value={formatCurrency(summary.totalPending)} icon="⌛" color="#FF9800" />
                <StatCard title="GST Collected" value={formatCurrency(summary.totalCgst + summary.totalSgst)} icon="🏛️" color="#9C27B0" />
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #eee' }}>
                {['summary', 'gst', 'payments'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '12px 24px',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: activeTab === tab ? '#00B8D4' : 'var(--text-muted)',
                            borderBottom: activeTab === tab ? '3px solid #00B8D4' : '3px solid transparent',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab.toUpperCase()} BREAKDOWN
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', minHeight: '400px' }}>
                {activeTab === 'summary' && (
                    <div>
                        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>📅 Daily Sales Performance</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #f5f5f5' }}>
                                        <th style={{ padding: '16px', color: 'var(--text-muted)' }}>DATE</th>
                                        <th style={{ padding: '16px', color: 'var(--text-muted)' }}>INVOICES</th>
                                        <th style={{ padding: '16px', color: 'var(--text-muted)' }}>DISCOUNT</th>
                                        <th style={{ padding: '16px', color: 'var(--text-muted)' }}>GST</th>
                                        <th style={{ padding: '16px', color: 'var(--text-muted)' }}>TOTAL AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dailySummary.map(day => (
                                        <tr key={day._id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                            <td style={{ padding: '16px', fontWeight: 600 }}>{new Date(day._id).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                            <td style={{ padding: '16px' }}>{day.count}</td>
                                            <td style={{ padding: '16px', color: '#e91e63' }}>-{formatCurrency(day.totalDiscount)}</td>
                                            <td style={{ padding: '16px' }}>{formatCurrency(day.totalGst)}</td>
                                            <td style={{ padding: '16px', fontWeight: 700, color: '#2c3e50' }}>{formatCurrency(day.totalAmount)}</td>
                                        </tr>
                                    ))}
                                    {dailySummary.length === 0 && (
                                        <tr>
                                            <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No data for this period</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'gst' && (
                    <div>
                        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>⚖️ GST Rate Breakdown</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                            {gstBreakdown.map(gst => (
                                <div key={gst.rate} style={{ padding: '20px', borderRadius: '12px', border: '1px solid #eee', background: '#fcfcfc' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#00B8D4' }}>{gst.rate}% GST</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Taxable Value:</span>
                                            <span style={{ fontWeight: 600 }}>{formatCurrency(gst.taxableValue)}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>CGST ({gst.rate / 2}%):</span>
                                            <span style={{ fontWeight: 600 }}>{formatCurrency(gst.gstAmount / 2)}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>SGST ({gst.rate / 2}%):</span>
                                            <span style={{ fontWeight: 600 }}>{formatCurrency(gst.gstAmount / 2)}</span>
                                        </div>
                                        <div style={{ height: '1px', background: '#eee', margin: '4px 0' }}></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}>
                                            <span style={{ fontWeight: 700 }}>Total Tax:</span>
                                            <span style={{ fontWeight: 700, color: '#9C27B0' }}>{formatCurrency(gst.gstAmount)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {gstBreakdown.length === 0 && (
                                <div style={{ gridColumn: '1/-1', padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No GST data recorded for this period</div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'payments' && (
                    <div>
                        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>💳 Payment Mode Analysis</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {paymentModeBreakdown.map((mode, idx) => {
                                        const percentage = (mode.total / summary.totalCollected) * 100;
                                        const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#607D8B'];
                                        return (
                                            <div key={mode._id || 'unknown'}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 600 }}>
                                                    <span>{mode._id?.toUpperCase() || 'OTHER'} ({mode.count} Invoices)</span>
                                                    <span>{formatCurrency(mode.total)} ({percentage.toFixed(1)}%)</span>
                                                </div>
                                                <div style={{ height: '12px', background: '#f0f0f0', borderRadius: '10px', overflow: 'hidden' }}>
                                                    <div style={{
                                                        height: '100%',
                                                        width: `${percentage}%`,
                                                        background: colors[idx % colors.length],
                                                        boxShadow: `0 0 10px ${colors[idx % colors.length]}40`
                                                    }}></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {paymentModeBreakdown.length === 0 && (
                                        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>No payment data recorded</div>
                                    )}
                                </div>
                            </div>

                            <div style={{ width: '300px', padding: '24px', background: 'var(--color-gray-100)', borderRadius: '12px' }}>
                                <h4 style={{ marginTop: 0 }}>💡 Insights</h4>
                                <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                    <li>Total invoices in this period: <strong>{summary.count}</strong></li>
                                    <li>Average invoice value: <strong>{formatCurrency(summary.totalBilling / summary.count)}</strong></li>
                                    <li>Collection Efficiency: <strong>{((summary.totalCollected / summary.totalBilling) * 100 || 0).toFixed(1)}%</strong></li>
                                    <li>Pending from this period: <strong>{formatCurrency(summary.totalPending)}</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
