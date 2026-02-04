'use client';

import { useState, useEffect } from 'react';

const THEME_COLORS = ['#00B8D4', '#4CAF50', '#FF9800', '#F44336', '#9C27B0', '#3F51B5', '#E91E63', '#009688'];

export default function MarketingPage() {
    const [activeTab, setActiveTab] = useState('coupons');
    const [coupons, setCoupons] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [showCouponModal, setShowCouponModal] = useState(false);
    const [showCampaignModal, setShowCampaignModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [viewAuditLog, setViewAuditLog] = useState(null);

    // Coupon form state
    const [couponForm, setCouponForm] = useState({
        campaignName: '',
        code: '',
        description: '',
        type: 'percent',
        value: 10,
        maxDiscount: '',
        minOrder: 0,
        expiryDate: '',
        applicability: 'full_bill',
        themeColor: '#00B8D4',
        usageLimit: 0
    });

    // Campaign form state
    const [campaignForm, setCampaignForm] = useState({
        name: '',
        type: 'whatsapp',
        message: '',
        targetAudience: 'all',
        scheduledDate: '',
        status: 'draft'
    });

    // Message templates
    const templates = [
        { id: 1, name: 'Service Reminder', message: 'Dear {name}, your vehicle {vehicle} is due for service. Book now at S2 Motorz! Call: 9876543210' },
        { id: 2, name: 'Festival Offer', message: '🎉 Festival Special! Get 20% off on all services at S2 Motorz. Valid till {date}. Book now!' },
        { id: 3, name: 'Thank You', message: 'Thank you {name} for servicing your {vehicle} at S2 Motorz. We appreciate your trust! ⭐' },
        { id: 4, name: 'New Offer', message: '🔥 Exclusive Offer! Free checkup + 10% off on spare parts. Visit S2 Motorz today!' },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [couponRes, custRes] = await Promise.all([
                fetch('/api/coupons?all=true'),
                fetch('/api/customers')
            ]);
            const couponData = await couponRes.json();
            const customerData = await custRes.json();
            setCoupons(Array.isArray(couponData) ? couponData : []);
            setCustomers(Array.isArray(customerData) ? customerData : []);

            // Mock campaigns data
            setCampaigns([
                { _id: '1', name: 'Diwali Service Offer', type: 'whatsapp', sentCount: 245, openRate: '78%', status: 'completed', date: '2026-01-15' },
                { _id: '2', name: 'Free Checkup Camp', type: 'sms', sentCount: 180, openRate: '65%', status: 'completed', date: '2026-01-20' },
            ]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetCouponForm = () => {
        setCouponForm({
            campaignName: '',
            code: '',
            description: '',
            type: 'percent',
            value: 10,
            maxDiscount: '',
            minOrder: 0,
            expiryDate: '',
            applicability: 'full_bill',
            themeColor: '#00B8D4',
            usageLimit: 0
        });
        setEditingCoupon(null);
    };

    const handleEditCoupon = (coupon) => {
        setEditingCoupon(coupon);
        setCouponForm({
            campaignName: coupon.campaignName || '',
            code: coupon.code,
            description: coupon.description || '',
            type: coupon.type,
            value: coupon.value,
            maxDiscount: coupon.maxDiscount || '',
            minOrder: coupon.minOrder || 0,
            expiryDate: coupon.expiryDate ? new Date(coupon.expiryDate).toISOString().split('T')[0] : '',
            applicability: coupon.applicability || 'full_bill',
            themeColor: coupon.themeColor || '#00B8D4',
            usageLimit: coupon.usageLimit || 0
        });
        setShowCouponModal(true);
    };

    const handleSaveCoupon = async () => {
        if (!couponForm.campaignName || !couponForm.code || !couponForm.expiryDate) {
            alert('Please fill all required fields');
            return;
        }

        if (couponForm.type === 'percent' && (couponForm.value < 1 || couponForm.value > 100)) {
            alert('Percentage must be between 1-100');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/api/coupons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...couponForm,
                    _id: editingCoupon?._id,
                    createdByName: 'Admin',
                    updatedByName: 'Admin'
                })
            });

            if (res.ok) {
                alert(editingCoupon ? '✅ Coupon updated!' : '✅ Coupon created!');
                setShowCouponModal(false);
                resetCouponForm();
                fetchData();
            } else {
                const err = await res.json();
                alert('Error: ' + err.error);
            }
        } catch (error) {
            alert('Connection error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleCoupon = async (coupon, action) => {
        if (!confirm(`Are you sure you want to ${action} this coupon?`)) return;

        try {
            const res = await fetch('/api/coupons', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: coupon._id, action, userName: 'Admin' })
            });

            if (res.ok) {
                alert(`✅ Coupon ${action}d successfully!`);
                fetchData();
            }
        } catch (error) {
            alert('Error updating coupon');
        }
    };

    const handleSendCampaign = () => {
        if (!campaignForm.name || !campaignForm.message) {
            alert('Please fill campaign name and message');
            return;
        }

        const targetCount = campaignForm.targetAudience === 'all' ? customers.length :
            campaignForm.targetAudience === 'inactive' ? Math.floor(customers.length * 0.3) :
                Math.floor(customers.length * 0.5);

        alert(`📤 Campaign "${campaignForm.name}" will be sent to ${targetCount} customers!`);
        setShowCampaignModal(false);
        setCampaignForm({ name: '', type: 'whatsapp', message: '', targetAudience: 'all', scheduledDate: '', status: 'draft' });
    };

    const handleUseTemplate = (template) => {
        setCampaignForm({ ...campaignForm, message: template.message });
    };

    // Stats
    const activeCoupons = coupons.filter(c => c.status === 'active').length;
    const totalUsage = coupons.reduce((sum, c) => sum + (c.usageCount || 0), 0);
    const totalDiscountGiven = coupons.reduce((sum, c) => sum + ((c.usageCount || 0) * (c.type === 'flat' ? c.value : 500)), 0);

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <div>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 'var(--spacing-xs)' }}>📢 Marketing & Coupons</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage coupons, discounts, and campaigns</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => { resetCouponForm(); setShowCouponModal(true); }} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        🎟️ Create Coupon
                    </button>
                    <button onClick={() => setShowCampaignModal(true)} style={{ padding: '10px 20px', background: '#9C27B0', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                        📣 New Campaign
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
                <div style={{ background: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Active Coupons</p>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#4CAF50' }}>{activeCoupons}</h3>
                </div>
                <div style={{ background: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Total Usage</p>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-primary)' }}>{totalUsage}</h3>
                </div>
                <div style={{ background: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Discount Given</p>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FF9800' }}>₹{totalDiscountGiven.toLocaleString()}</h3>
                </div>
                <div style={{ background: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Active Customers</p>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#2196F3' }}>{customers.length}</h3>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--spacing-lg)' }}>
                {['coupons', 'campaigns', 'templates'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 600,
                            background: activeTab === tab ? 'var(--color-primary)' : 'white',
                            color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                            boxShadow: 'var(--shadow-sm)'
                        }}
                    >
                        {tab === 'coupons' ? '🎟️ Coupons' : tab === 'campaigns' ? '📊 Campaigns' : '📝 Templates'}
                    </button>
                ))}
            </div>

            {/* Coupons Tab */}
            {activeTab === 'coupons' && (
                <div style={{ background: 'white', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ marginBottom: '16px' }}>All Coupons</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-gray-100)' }}>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>COUPON</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>CAMPAIGN</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>DISCOUNT</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>MIN ORDER</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>EXPIRY</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>USAGE</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>STATUS</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map(coupon => (
                                <tr key={coupon._id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '8px', height: '40px', borderRadius: '4px', background: coupon.themeColor || '#00B8D4' }}></div>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: '1rem', fontFamily: 'monospace' }}>{coupon.code}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{coupon.applicability?.replace('_', ' ')}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px' }}>{coupon.campaignName || '-'}</td>
                                    <td style={{ padding: '12px', fontWeight: 600 }}>
                                        {coupon.type === 'percent' ? `${coupon.value}%` : `₹${coupon.value}`}
                                        {coupon.maxDiscount && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}> (max ₹{coupon.maxDiscount})</span>}
                                    </td>
                                    <td style={{ padding: '12px' }}>₹{coupon.minOrder || 0}</td>
                                    <td style={{ padding: '12px', color: new Date(coupon.expiryDate) < new Date() ? '#F44336' : 'inherit' }}>
                                        {coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString('en-IN') : '-'}
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ fontWeight: 600 }}>{coupon.usageCount || 0}</span>
                                        {coupon.usageLimit > 0 && <span style={{ color: 'var(--text-muted)' }}> / {coupon.usageLimit}</span>}
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600,
                                            background: coupon.status === 'active' ? 'rgba(76, 175, 80, 0.1)' : coupon.status === 'expired' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(158, 158, 158, 0.1)',
                                            color: coupon.status === 'active' ? '#4CAF50' : coupon.status === 'expired' ? '#F44336' : '#9E9E9E'
                                        }}>
                                            {coupon.status?.toUpperCase()}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button onClick={() => handleEditCoupon(coupon)} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }} title="Edit">✏️</button>
                                            {coupon.status === 'active' ? (
                                                <button onClick={() => handleToggleCoupon(coupon, 'disable')} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }} title="Disable">🚫</button>
                                            ) : coupon.status === 'disabled' && (
                                                <button onClick={() => handleToggleCoupon(coupon, 'enable')} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }} title="Enable">✅</button>
                                            )}
                                            <button onClick={() => setViewAuditLog(coupon)} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }} title="Audit Log">📋</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {coupons.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No coupons found. Create your first coupon!</div>}
                </div>
            )}

            {/* Campaigns Tab */}
            {activeTab === 'campaigns' && (
                <div style={{ background: 'white', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ marginBottom: '16px' }}>Recent Campaigns</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-gray-100)' }}>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>CAMPAIGN NAME</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>TYPE</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>SENT</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>OPEN RATE</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>DATE</th>
                                <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map(campaign => (
                                <tr key={campaign._id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                                    <td style={{ padding: '12px', fontWeight: 600 }}>{campaign.name}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', background: campaign.type === 'whatsapp' ? '#25D366' : '#2196F3', color: 'white' }}>
                                            {campaign.type === 'whatsapp' ? '💬 WhatsApp' : '📱 SMS'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>{campaign.sentCount}</td>
                                    <td style={{ padding: '12px', color: '#4CAF50', fontWeight: 600 }}>{campaign.openRate}</td>
                                    <td style={{ padding: '12px' }}>{new Date(campaign.date).toLocaleDateString('en-IN')}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50' }}>
                                            {campaign.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Templates Tab */}
            {activeTab === 'templates' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {templates.map(template => (
                        <div key={template.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                            <h4 style={{ marginBottom: '12px', color: 'var(--color-primary)' }}>{template.name}</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6 }}>{template.message}</p>
                            <button onClick={() => { handleUseTemplate(template); setShowCampaignModal(true); }} style={{ padding: '8px 16px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                                Use Template
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Create/Edit Coupon Modal */}
            {showCouponModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '550px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 style={{ marginBottom: '24px' }}>{editingCoupon ? '✏️ Edit Coupon' : '🎟️ Create New Coupon'}</h2>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Campaign Name *</label>
                                <input type="text" value={couponForm.campaignName} onChange={(e) => setCouponForm({ ...couponForm, campaignName: e.target.value })} placeholder="e.g. Diwali Special 2026" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Coupon Code *</label>
                                <input type="text" value={couponForm.code} onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })} placeholder="e.g. DIWALI20" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'monospace', fontWeight: 700 }} maxLength={15} disabled={!!editingCoupon} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Expiry Date *</label>
                                <input type="date" value={couponForm.expiryDate} onChange={(e) => setCouponForm({ ...couponForm, expiryDate: e.target.value })} min={new Date().toISOString().split('T')[0]} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Discount Type *</label>
                                <select value={couponForm.type} onChange={(e) => setCouponForm({ ...couponForm, type: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                    <option value="percent">Percentage (%)</option>
                                    <option value="flat">Flat Amount (₹)</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Discount Value *</label>
                                <input type="number" value={couponForm.value} onChange={(e) => setCouponForm({ ...couponForm, value: Number(e.target.value) })} min={1} max={couponForm.type === 'percent' ? 100 : 99999} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                            </div>

                            {couponForm.type === 'percent' && (
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Max Discount (₹)</label>
                                    <input type="number" value={couponForm.maxDiscount} onChange={(e) => setCouponForm({ ...couponForm, maxDiscount: e.target.value })} placeholder="Optional cap" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                </div>
                            )}

                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Min Order Amount (₹)</label>
                                <input type="number" value={couponForm.minOrder} onChange={(e) => setCouponForm({ ...couponForm, minOrder: Number(e.target.value) })} min={0} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Applicability</label>
                                <select value={couponForm.applicability} onChange={(e) => setCouponForm({ ...couponForm, applicability: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                    <option value="full_bill">Full Bill</option>
                                    <option value="labour_only">Labour Only</option>
                                    <option value="spare_only">Spare Parts Only</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Usage Limit</label>
                                <input type="number" value={couponForm.usageLimit} onChange={(e) => setCouponForm({ ...couponForm, usageLimit: Number(e.target.value) })} min={0} placeholder="0 = Unlimited" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                            </div>

                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Description / Terms</label>
                                <textarea value={couponForm.description} onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })} placeholder="e.g. Valid only on labour charges" rows={2} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', resize: 'vertical' }} />
                            </div>

                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Theme Color</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {THEME_COLORS.map(color => (
                                        <button key={color} onClick={() => setCouponForm({ ...couponForm, themeColor: color })} style={{ width: '36px', height: '36px', borderRadius: '50%', background: color, border: couponForm.themeColor === color ? '3px solid #333' : '2px solid #ddd', cursor: 'pointer' }} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                            <button onClick={() => { setShowCouponModal(false); resetCouponForm(); }} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={handleSaveCoupon} disabled={isLoading} className="btn btn-primary" style={{ flex: 1 }}>
                                {isLoading ? 'Saving...' : editingCoupon ? 'Update Coupon' : '✅ Create Coupon'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Campaign Modal */}
            {showCampaignModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 style={{ marginBottom: '24px' }}>📣 Create Campaign</h2>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Campaign Name</label>
                            <input type="text" value={campaignForm.name} onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })} placeholder="e.g. Diwali Special Offer" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Channel</label>
                            <select value={campaignForm.type} onChange={(e) => setCampaignForm({ ...campaignForm, type: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                <option value="whatsapp">💬 WhatsApp</option>
                                <option value="sms">📱 SMS</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Target Audience</label>
                            <select value={campaignForm.targetAudience} onChange={(e) => setCampaignForm({ ...campaignForm, targetAudience: e.target.value })} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                <option value="all">All Customers ({customers.length})</option>
                                <option value="inactive">Inactive (&gt;30 days)</option>
                                <option value="serviceDue">Service Due</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Message</label>
                            <textarea value={campaignForm.message} onChange={(e) => setCampaignForm({ ...campaignForm, message: e.target.value })} placeholder="Enter your promotional message..." rows={4} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', resize: 'vertical' }} />
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                            <button onClick={() => setShowCampaignModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={handleSendCampaign} className="btn btn-primary" style={{ flex: 1 }}>🚀 Send</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Audit Log Modal */}
            {viewAuditLog && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
                        <h2 style={{ marginBottom: '24px' }}>📋 Audit Log - {viewAuditLog.code}</h2>

                        {viewAuditLog.auditLog?.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {viewAuditLog.auditLog.map((log, idx) => (
                                    <div key={idx} style={{ padding: '12px', background: 'var(--color-gray-100)', borderRadius: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{log.action}</span>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(log.timestamp).toLocaleString('en-IN')}</span>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>By: {log.userName}</div>
                                        {log.details && <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{log.details}</div>}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: 'var(--text-muted)' }}>No audit logs available</p>
                        )}

                        <button onClick={() => setViewAuditLog(null)} style={{ width: '100%', marginTop: '24px', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
