'use client';

import { useState, useEffect } from 'react';

// Expense categories
const expenseCategories = ['Rent', 'Utilities', 'Salaries', 'Miscellaneous', 'Marketing', 'Maintenance', 'Insurance', 'Professional Fees'];
const paymentModes = ['Cash', 'Bank', 'UPI', 'Card'];

export default function FinancePage() {
    const [activeTab, setActiveTab] = useState('daybook');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const [showExpenseModal, setShowExpenseModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState({ revenue: 0, expenses: 0, purchases: 0, netProfit: 0, revenueCount: 0, expenseCount: 0 });
    const [expenses, setExpenses] = useState([]);
    const [pendingPurchases, setPendingPurchases] = useState([]);

    // Expense form state
    const [expenseForm, setExpenseForm] = useState({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: 'Miscellaneous',
        amount: '',
        mode: 'Cash',
        vendor: '',
        gstApplicable: false,
        gstPercent: 18,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [sumRes, expRes, poRes] = await Promise.all([
                fetch('/api/finance/summary'),
                fetch('/api/expenses'),
                fetch('/api/inventory/requests') // Assuming PO/Purchases are here if not in its own route
            ]);
            setSummary(await sumRes.json());
            setExpenses(await expRes.json());
            const pos = await poRes.json();
            setPendingPurchases(pos.filter(p => p.status === 'pending'));
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddExpense = async (e) => {
        if (e) e.preventDefault();
        if (!expenseForm.description || !expenseForm.amount) {
            alert('Please fill in required fields');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/api/expenses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    category: expenseForm.category,
                    description: expenseForm.description,
                    amount: parseFloat(expenseForm.amount),
                    date: expenseForm.date,
                    paymentMethod: expenseForm.mode.toLowerCase(),
                    branch: 'Main Branch',
                    status: 'approved'
                })
            });

            if (res.ok) {
                alert('✅ Expense added successfully!');
                setShowExpenseModal(false);
                fetchData();
                setExpenseForm({
                    date: new Date().toISOString().split('T')[0],
                    description: '',
                    category: 'Miscellaneous',
                    amount: '',
                    mode: 'Cash',
                    vendor: '',
                    gstApplicable: false,
                    gstPercent: 18,
                });
            }
        } catch (error) {
            alert('Error saving expense');
        } finally {
            setIsLoading(false);
        }
    };

    const tabs = [
        { id: 'daybook', label: '📅 Day Book', icon: '📅' },
        { id: 'approvals', label: '✅ Approvals', icon: '✅' },
        { id: 'pnl', label: '📊 Profit & Loss', icon: '📊' },
        { id: 'gst', label: '🧾 GST Reports', icon: '🧾' },
    ];

    const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', fontSize: '0.9rem', outline: 'none' };
    const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' };

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <div>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 'var(--spacing-xs)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'var(--color-primary)' }}>💰</span> Finance Department
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Cash flow, P&L, and expense management</p>
                </div>
                <button onClick={() => setShowExpenseModal(true)} className="btn btn-primary" style={{ padding: '12px 24px' }}>
                    + Add Expense
                </button>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                <div style={{ background: 'white', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid #4CAF50' }}>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Revenue</p>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '8px 0' }}>₹{summary.revenue?.toLocaleString()}</h2>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#4CAF50' }}>{summary.revenueCount} Invoices</p>
                </div>
                <div style={{ background: 'white', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid #F44336' }}>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Expenses</p>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '8px 0' }}>₹{summary.expenses?.toLocaleString()}</h2>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#F44336' }}>{summary.expenseCount} Recorded</p>
                </div>
                <div style={{ background: 'var(--color-primary)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', color: 'white' }}>
                    <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem', color: 'white' }}>Net Profit</p>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '8px 0', color: 'white' }}>₹{summary.netProfit?.toLocaleString()}</h2>
                    <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9, color: 'white' }}>P&L Summary</p>
                </div>
            </div>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--spacing-xl)', background: 'white', padding: '6px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                        flex: 1, padding: '12px', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600,
                        background: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
                        color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                    }}>{tab.label}</button>
                ))}
            </div>

            {/* Content Area */}
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)', boxShadow: 'var(--shadow-sm)' }}>
                {activeTab === 'daybook' && (
                    <div>
                        <div style={{ marginBottom: '16px' }}>
                            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{ ...inputStyle, width: 'auto' }} />
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--color-gray-100)', textAlign: 'left' }}>
                                    <th style={{ padding: '12px' }}>Description</th>
                                    <th style={{ padding: '12px' }}>Category</th>
                                    <th style={{ padding: '12px' }}>Mode</th>
                                    <th style={{ padding: '12px', textAlign: 'right' }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.filter(e => e.date?.split('T')[0] === selectedDate).map(exp => (
                                    <tr key={exp._id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                                        <td style={{ padding: '12px' }}>{exp.description}</td>
                                        <td style={{ padding: '12px' }}>{exp.category}</td>
                                        <td style={{ padding: '12px' }}>{exp.paymentMethod}</td>
                                        <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: '#F44336' }}>-₹{exp.amount.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'approvals' && (
                    <div>
                        <h3>Pending Purchase Approvals ({pendingPurchases.length})</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--color-gray-100)', textAlign: 'left' }}>
                                    <th style={{ padding: '12px' }}>ID</th>
                                    <th style={{ padding: '12px' }}>Source</th>
                                    <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingPurchases.map(p => (
                                    <tr key={p._id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                                        <td style={{ padding: '12px' }}>{p._id.slice(-8)}</td>
                                        <td style={{ padding: '12px' }}>Inventory Request</td>
                                        <td style={{ padding: '12px', textAlign: 'right' }}>
                                            <button style={{ padding: '4px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>Approve</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modals */}
            {showExpenseModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', width: '95%', maxWidth: '600px', padding: '24px' }}>
                        <h2 style={{ marginBottom: '16px' }}>Add Expense</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <input type="date" value={expenseForm.date} onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })} style={inputStyle} />
                            <select value={expenseForm.category} onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })} style={inputStyle}>
                                {expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <input type="text" placeholder="Description" value={expenseForm.description} onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })} style={{ ...inputStyle, marginBottom: '12px' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <input type="number" placeholder="Amount" value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} style={inputStyle} />
                            <select value={expenseForm.mode} onChange={(e) => setExpenseForm({ ...expenseForm, mode: e.target.value })} style={inputStyle}>
                                {paymentModes.map(mode => <option key={mode} value={mode}>{mode}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                            <button onClick={() => setShowExpenseModal(false)} style={{ padding: '10px 20px', border: '1px solid #ddd', borderRadius: '8px' }}>Cancel</button>
                            <button onClick={handleAddExpense} className="btn btn-primary" style={{ padding: '10px 20px' }}>Save Expense</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
