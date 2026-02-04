'use client';

import { useState, useEffect } from 'react';

// Lead sources with icons
const leadSources = [
    { id: 'whatsapp', name: 'WhatsApp', icon: '💬', color: '#25D366' },
    { id: 'walkin', name: 'Walk-in', icon: '🚶', color: '#2196F3' },
    { id: 'referral', name: 'Referral', icon: '👥', color: '#9C27B0' },
    { id: 'oldcustomer', name: 'Old Customer', icon: '⭐', color: '#FF9800' },
    { id: 'campaign', name: 'Campaign', icon: '📢', color: '#FF5722' },
    { id: 'servicedue', name: 'Service Due', icon: '🔧', color: '#607D8B' },
];

const leadStatuses = [
    { id: 'new', name: 'New', color: '#2196F3', bg: 'rgba(33, 150, 243, 0.1)' },
    { id: 'followup', name: 'Follow-up', color: '#FF9800', bg: 'rgba(255, 152, 0, 0.1)' },
    { id: 'converted', name: 'Converted', color: '#4CAF50', bg: 'rgba(76, 175, 80, 0.1)' },
];

const reviewStatuses = [
    { id: 'pending', name: 'Pending', color: '#FF9800', bg: 'rgba(255, 152, 0, 0.1)' },
    { id: 'satisfied', name: 'Satisfied', color: '#4CAF50', bg: 'rgba(76, 175, 80, 0.1)' },
    { id: 'notsatisfied', name: 'Not Satisfied', color: '#F44336', bg: 'rgba(244, 67, 54, 0.1)' },
];

export default function CRMPage() {
    const [activeTab, setActiveTab] = useState('leads');
    const [leads, setLeads] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [showLeadModal, setShowLeadModal] = useState(false);
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [editingLead, setEditingLead] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', address: '', vehicle: '', source: 'whatsapp', status: 'new', followUpDate: '', followUpTime: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [leadsRes, custRes, jobsRes] = await Promise.all([
                fetch('/api/leads'),
                fetch('/api/customers'),
                fetch('/api/job-cards')
            ]);

            const leadsData = await leadsRes.json();
            const custData = await custRes.json();
            const jobsData = await jobsRes.json();

            setLeads(Array.isArray(leadsData) ? leadsData : []);
            setCustomers(Array.isArray(custData) ? custData : []);

            // Derive reviews from job cards with next service dates
            const reviewList = Array.isArray(jobsData)
                ? jobsData
                    .filter(j => j.nextServiceDate)
                    .map(j => ({
                        id: j._id,
                        customerName: j.customerId?.name || 'Unknown',
                        phone: j.customerId?.phone || '-',
                        vehicle: `${j.vehicleId?.brand || ''} ${j.vehicleId?.model || ''}`,
                        jobCard: j.jobCardNo,
                        scheduledDate: new Date(j.nextServiceDate),
                        status: 'pending'
                    }))
                : [];
            setReviews(reviewList);

        } catch (error) {
            console.error('CRM Fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getTimeAgo = (date) => {
        const diff = Date.now() - new Date(date).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        return 'Just now';
    };

    const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    const handleAddLead = () => {
        setEditingLead(null);
        setFormData({ name: '', phone: '', email: '', address: '', vehicle: '', source: 'whatsapp', status: 'new', followUpDate: '', followUpTime: '' });
        setShowLeadModal(true);
    };

    const handleEditLead = (lead) => {
        setEditingLead(lead);
        setFormData({
            name: lead.name || '',
            phone: lead.phone || '',
            email: lead.email || '',
            address: lead.address || '',
            vehicle: lead.vehicle || '',
            source: lead.source || 'whatsapp',
            status: lead.status || 'new',
            followUpDate: lead.followUpDate || '',
            followUpTime: lead.followUpTime || ''
        });
        setShowLeadModal(true);
    };

    const handleSubmitLead = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingLead ? { ...formData, _id: editingLead._id } : formData)
            });
            if (res.ok) {
                setShowLeadModal(false);
                fetchData();
            }
        } catch (error) {
            alert('Error saving lead');
        }
    };

    const handleStatusChange = async (leadId, newStatus) => {
        try {
            await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: leadId, status: newStatus })
            });
            fetchData();
        } catch (error) {
            console.error('Status check failed');
        }
    };

    const getSourceInfo = (id) => leadSources.find(s => s.id === id) || leadSources[0];
    const getStatusInfo = (id) => leadStatuses.find(s => s.id === id) || leadStatuses[0];

    const filteredLeads = leads
        .filter(l => filterStatus === 'all' || l.status === filterStatus)
        .filter(l => !searchTerm || l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.phone.includes(searchTerm));

    const filteredCustomers = customers
        .filter(c => !searchTerm || c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm));

    const tabs = [
        { id: 'leads', name: 'Leads & Inquiries', icon: '📋', count: leads.length },
        { id: 'customers', name: 'Customer Database', icon: '👥', count: customers.length },
        { id: 'reviews', name: 'Service Reviews', icon: '📞', count: reviews.length },
    ];

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <div>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 'var(--spacing-xs)' }}>👥 Leads & CRM</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{isLoading ? 'Syncing...' : 'Manage your business relationships'}</p>
                </div>
                {activeTab === 'leads' && (
                    <button onClick={handleAddLead} className="btn btn-primary">+ New Lead</button>
                )}
            </div>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '4px', background: 'white', padding: '6px', borderRadius: '16px', marginBottom: 'var(--spacing-lg)', boxShadow: 'var(--shadow-sm)' }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            flex: 1, padding: '12px', border: 'none', borderRadius: '12px', cursor: 'pointer',
                            fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            background: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
                            color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <span>{tab.icon}</span> {tab.name}
                        <span style={{ background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'var(--color-gray-200)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem' }}>{tab.count}</span>
                    </button>
                ))}
            </div>

            {/* LEADS TAB */}
            {activeTab === 'leads' && (
                <div style={{ background: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                    {/* Reminder Alert for Today's Follow-ups */}
                    {filteredLeads.filter(l => {
                        if (!l.followUpDate) return false;
                        const today = new Date().toISOString().split('T')[0];
                        return l.followUpDate <= today && l.status !== 'converted';
                    }).length > 0 && (
                            <div style={{ padding: '12px 16px', background: 'rgba(255, 152, 0, 0.1)', borderBottom: '1px solid rgba(255, 152, 0, 0.3)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '1.3rem' }}>🔔</span>
                                <span style={{ fontWeight: 600, color: '#FF9800' }}>
                                    {filteredLeads.filter(l => l.followUpDate && l.followUpDate <= new Date().toISOString().split('T')[0] && l.status !== 'converted').length} follow-up(s) due today or overdue!
                                </span>
                            </div>
                        )}
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--color-gray-100)' }}>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Name & Contact</th>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Vehicle</th>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Source</th>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Follow-up</th>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Status</th>
                                <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeads.map((lead) => {
                                const source = getSourceInfo(lead.source);
                                const status = getStatusInfo(lead.status);
                                const today = new Date().toISOString().split('T')[0];
                                const isOverdue = lead.followUpDate && lead.followUpDate < today && lead.status !== 'converted';
                                const isDueToday = lead.followUpDate === today && lead.status !== 'converted';
                                return (
                                    <tr key={lead._id} style={{ borderBottom: '1px solid var(--color-gray-200)', background: isOverdue ? 'rgba(244, 67, 54, 0.05)' : isDueToday ? 'rgba(255, 152, 0, 0.05)' : 'transparent' }}>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ fontWeight: 600 }}>{lead.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lead.phone}</div>
                                        </td>
                                        <td style={{ padding: '16px' }}>{lead.vehicle || '-'}</td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{ background: `${source.color}15`, color: source.color, padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem' }}>
                                                {source.icon} {source.name}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            {lead.followUpDate ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    {isOverdue && <span style={{ fontSize: '1rem' }}>⚠️</span>}
                                                    {isDueToday && <span style={{ fontSize: '1rem' }}>🔔</span>}
                                                    <div>
                                                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: isOverdue ? '#F44336' : isDueToday ? '#FF9800' : 'var(--text-primary)' }}>
                                                            {new Date(lead.followUpDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                        </div>
                                                        {lead.followUpTime && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lead.followUpTime}</div>}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>-</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <select
                                                value={lead.status}
                                                onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                                                style={{ padding: '6px 12px', borderRadius: '20px', border: 'none', background: status.bg, color: status.color, fontWeight: 600, fontSize: '0.8rem' }}
                                            >
                                                {leadStatuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                            </select>
                                        </td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <button onClick={() => handleEditLead(lead)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', marginRight: '8px' }} title="Edit">✏️</button>
                                            <button onClick={() => window.open(`tel:${lead.phone}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', marginRight: '8px' }} title="Call">📞</button>
                                            <button onClick={() => window.open(`https://wa.me/91${lead.phone}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }} title="WhatsApp">💬</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {filteredLeads.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No leads found. Click "+ New Lead" to add one.</div>}
                </div>
            )}

            {/* CUSTOMERS TAB */}
            {activeTab === 'customers' && (
                <div style={{ background: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--color-gray-100)' }}>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Customer Name</th>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Contact</th>
                                <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((customer) => (
                                <tr key={customer._id} style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontWeight: 600 }}>{customer.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Customer since {formatDate(customer.createdAt)}</div>
                                    </td>
                                    <td style={{ padding: '16px' }}>{customer.phone}</td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>
                                        <button onClick={() => { setSelectedCustomer(customer); setShowCustomerModal(true); }} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>View Profile</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
                <div style={{ background: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--color-gray-100)' }}>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Customer</th>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Vehicle</th>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Last Service</th>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Due Date</th>
                                <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review) => (
                                <tr key={review.id} style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ fontWeight: 600 }}>{review.customerName}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{review.phone}</div>
                                    </td>
                                    <td style={{ padding: '16px' }}>{review.vehicle}</td>
                                    <td style={{ padding: '16px' }}>{review.jobCard}</td>
                                    <td style={{ padding: '16px', color: '#f44336', fontWeight: 600 }}>{formatDate(review.scheduledDate)}</td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>
                                        <button className="btn btn-primary" style={{ fontSize: '0.8rem' }}>Call Now</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {reviews.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No pending service reviews found.</div>}
                </div>
            )}

            {/* Lead Modal */}
            {showLeadModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '400px', maxHeight: '90vh', overflow: 'auto' }}>
                        <h3 style={{ marginBottom: '24px' }}>{editingLead ? '✏️ Edit Lead' : '➕ Add New Lead'}</h3>
                        <form onSubmit={handleSubmitLead}>
                            <input type="text" placeholder="Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ display: 'block', width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                            <input type="tel" placeholder="Phone *" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required style={{ display: 'block', width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                            <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ display: 'block', width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                            <textarea placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} rows={2} style={{ display: 'block', width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd', resize: 'vertical', fontFamily: 'inherit' }} />
                            <input type="text" placeholder="Vehicle (Brand Model)" value={formData.vehicle} onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })} style={{ display: 'block', width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                            <select value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} style={{ display: 'block', width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                {leadSources.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>📅 Next Follow-up</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input type="date" value={formData.followUpDate} onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                    <input type="time" value={formData.followUpTime} onChange={(e) => setFormData({ ...formData, followUpTime: e.target.value })} style={{ width: '120px', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button type="button" onClick={() => setShowLeadModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Lead</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Customer Profile Modal */}
            {showCustomerModal && selectedCustomer && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '80vh', overflow: 'auto' }}>
                        {/* Header */}
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, var(--color-primary), #0097A7)', borderRadius: '16px 16px 0 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', color: 'white' }}>
                                    {selectedCustomer.name?.charAt(0)?.toUpperCase() || '?'}
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, color: 'white', fontSize: '1.3rem' }}>{selectedCustomer.name}</h3>
                                    <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>📞 {selectedCustomer.phone}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowCustomerModal(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '24px' }}>
                            {/* Customer Info */}
                            <div style={{ marginBottom: '24px' }}>
                                <h4 style={{ margin: '0 0 12px', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Contact Information</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div style={{ padding: '12px', background: 'var(--color-gray-100)', borderRadius: '8px' }}>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone</p>
                                        <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{selectedCustomer.phone}</p>
                                    </div>
                                    <div style={{ padding: '12px', background: 'var(--color-gray-100)', borderRadius: '8px' }}>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email</p>
                                        <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{selectedCustomer.email || 'Not provided'}</p>
                                    </div>
                                    <div style={{ padding: '12px', background: 'var(--color-gray-100)', borderRadius: '8px' }}>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Customer Since</p>
                                        <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{formatDate(selectedCustomer.createdAt)}</p>
                                    </div>
                                    <div style={{ padding: '12px', background: 'var(--color-gray-100)', borderRadius: '8px' }}>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Address</p>
                                        <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{selectedCustomer.address || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Vehicles */}
                            <div style={{ marginBottom: '24px' }}>
                                <h4 style={{ margin: '0 0 12px', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Registered Vehicles</h4>
                                {selectedCustomer.vehicles && selectedCustomer.vehicles.length > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {selectedCustomer.vehicles.map((v, idx) => (
                                            <div key={idx} style={{ padding: '12px', background: 'rgba(0, 184, 212, 0.05)', border: '1px solid rgba(0, 184, 212, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{ fontSize: '1.5rem' }}>🏍️</span>
                                                <div>
                                                    <p style={{ margin: 0, fontWeight: 600 }}>{v.brand} {v.model}</p>
                                                    <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{v.registrationNo}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No vehicles registered</p>
                                )}
                            </div>

                            {/* Quick Actions */}
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button onClick={() => window.open(`tel:${selectedCustomer.phone}`)} className="btn btn-primary" style={{ flex: 1 }}>📞 Call Now</button>
                                <button onClick={() => window.open(`https://wa.me/91${selectedCustomer.phone}`)} style={{ flex: 1, padding: '12px', background: '#25D366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>💬 WhatsApp</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
