'use client';

import { useState, useEffect } from 'react';

// Sample categories and brands
const categories = ['Engine Parts', 'Body Parts', 'Electrical', 'Lubricants', 'Filters', 'Brake System', 'Chain & Sprocket', 'Tyre & Tubes'];
const brands = ['Honda', 'TVS', 'Bajaj', 'Hero', 'Royal Enfield', 'Generic'];


// Sample Data (Moved to Backend)
const sampleParts = [];
const sampleRequests = [];
const samplePurchases = [];
const sampleHistory = [];

export default function InventoryPage() {
    const [activeTab, setActiveTab] = useState('requests');
    const [parts, setParts] = useState(sampleParts);
    const [requests, setRequests] = useState(sampleRequests);
    const [purchases, setPurchases] = useState(samplePurchases);
    const [history, setHistory] = useState(sampleHistory);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterBrand, setFilterBrand] = useState('all');
    const [suppliers, setSuppliers] = useState([]);


    const [showPartModal, setShowPartModal] = useState(false);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
    const [editingPart, setEditingPart] = useState(null);

    const [partForm, setPartForm] = useState({
        partNumber: '', name: '', barcode: '', brand: '', category: '',
        purchasePrice: '', salePrice: '', mrp: '', stock: 0, minStock: 5,
        rackLocation: '', compatibleModels: ''
    });

    const [purchaseForm, setPurchaseForm] = useState({
        supplier: '', invoiceNo: '', invoiceDate: '', items: [{ partId: '', qty: 1, price: '' }]
    });

    // Fetch data from API
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [partsRes, reqsRes, poRes, histRes] = await Promise.all([
                fetch('/api/parts'),
                fetch('/api/inventory/requests'),
                fetch('/api/inventory/purchases'),
                fetch('/api/inventory/history')
            ]);

            if (partsRes.ok) setParts(await partsRes.json());
            if (reqsRes.ok) setRequests(await reqsRes.json());
            if (poRes.ok) setPurchases(await poRes.json());
            if (histRes.ok) setHistory(await histRes.json());

            // Fetch Suppliers
            const suppliersRes = await fetch('/api/suppliers');
            if (suppliersRes.ok) {
                const suppliersData = await suppliersRes.json();
                setSuppliers(suppliersData.map(s => s.name));
            }
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const tabs = [
        { id: 'requests', name: 'Requests', icon: '📋', count: requests.filter(r => r.status === 'pending').length },
        { id: 'stocklist', name: 'Stock List', icon: '📦', count: parts.length },
        { id: 'newpurchase', name: 'New Purchase', icon: '🛒', count: purchases.filter(p => p.status === 'pending').length },
        { id: 'purchasereturn', name: 'Purchase Return', icon: '🔁', count: 0 },
        { id: 'history', name: 'History', icon: '📜', count: history.length },
    ];

    const getStockColor = (stock, minStock) => {
        if (stock <= 0) return { bg: 'rgba(244, 67, 54, 0.15)', color: '#D32F2F', label: 'Out of Stock' };
        if (stock < minStock) return { bg: 'rgba(244, 67, 54, 0.1)', color: '#F44336', label: 'Below Min' };
        if (stock <= minStock * 1.5) return { bg: 'rgba(255, 152, 0, 0.1)', color: '#FF9800', label: 'Near Min' };
        return { bg: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50', label: 'Safe' };
    };

    const lowStockParts = parts.filter(p => p.stock < p.minStock);

    const filteredParts = parts
        .filter(p => !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) || p.barcode.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(p => filterCategory === 'all' || p.category === filterCategory)
        .filter(p => filterBrand === 'all' || p.brand === filterBrand);

    const handleAddPart = () => {
        const nextNum = parts.length + 1;
        setEditingPart(null);
        setPartForm({
            partNumber: `SP-${String(nextNum).padStart(3, '0')}`,
            barcode: `BC-SP-${String(nextNum).padStart(3, '0')}`,
            name: '', brand: '', category: '', purchasePrice: '', salePrice: '', mrp: '',
            stock: 0, minStock: 5, rackLocation: '', compatibleModels: ''
        });
        setShowPartModal(true);
    };

    const handleEditPart = (part) => {
        setEditingPart(part);
        setPartForm(part);
        setShowPartModal(true);
    };

    const handleSavePart = async (e) => {
        e.preventDefault();
        try {
            const body = editingPart ? { ...partForm, _id: editingPart._id } : partForm;
            const response = await fetch('/api/parts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                await fetchData();
                setShowPartModal(false);
                alert(`✅ Part ${editingPart ? 'updated' : 'added'} successfully!`);
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('❌ Failed to save part');
        }
    };

    const handleApproveRequest = async (reqId) => {
        try {
            const response = await fetch('/api/inventory/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: reqId, status: 'approved' }),
            });

            if (response.ok) {
                await fetchData();
                alert('✅ Request approved and stock updated!');
            }
        } catch (error) {
            console.error('Approve error:', error);
        }
    };

    const handleRejectRequest = async (reqId) => {
        try {
            const response = await fetch('/api/inventory/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: reqId, status: 'rejected' }),
            });

            if (response.ok) {
                await fetchData();
                alert('❌ Request rejected.');
            }
        } catch (error) {
            console.error('Reject error:', error);
        }
    };

    const handleNewPurchase = () => {
        setPurchaseForm({ supplier: '', invoiceNo: '', invoiceDate: new Date().toISOString().split('T')[0], items: [{ partId: '', qty: 1, price: '' }] });
        setShowPurchaseModal(true);
    };

    const handleSavePurchase = async (e) => {
        e.preventDefault();
        const items = purchaseForm.items.filter(i => i.partId);
        const totalAmount = items.reduce((sum, i) => sum + (parseFloat(i.price) * parseInt(i.qty)), 0);
        const gst = totalAmount * 0.18;

        try {
            const body = {
                invoiceNo: purchaseForm.invoiceNo,
                supplier: purchaseForm.supplier,
                invoiceDate: new Date(purchaseForm.invoiceDate),
                items: items.map(i => ({
                    partNumber: parts.find(p => p._id === i.partId)?.partNumber,
                    qty: parseInt(i.qty),
                    price: parseFloat(i.price)
                })),
                totalAmount, gst, grandTotal: totalAmount + gst,
                status: 'pending',
                createdBy: 'Purchase Team',
            };

            const response = await fetch('/api/inventory/purchases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                await fetchData();
                setShowPurchaseModal(false);
                alert('✅ Purchase order submitted for approval!');
            }
        } catch (error) {
            console.error('Save purchase error:', error);
        }
    };

    const handleApprovePurchase = async (purchaseId) => {
        try {
            const response = await fetch('/api/inventory/purchases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: purchaseId, status: 'approved', approvedBy: 'Finance' }),
            });

            if (response.ok) {
                await fetchData();
                alert('✅ PO Approved and stock updated!');
            }
        } catch (error) {
            console.error('Approve PO error:', error);
        }
    };

    const handlePrintBarcode = (part) => {
        alert(`Printing barcode for:\n${part.name}\nBarcode: ${part.barcode}`);
    };

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <div>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 'var(--spacing-xs)' }}>📦 Inventory Management</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Manage spare parts, stock levels, purchases and returns</p>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <button onClick={async () => {
                        if (!confirm('This will reset inventory to sample data. Continue?')) return;
                        const res = await fetch('/api/parts/seed');
                        if (res.ok) {
                            await fetchData();
                            alert('✅ Inventory seeded successfully!');
                        }
                    }} className="btn" style={{ background: 'var(--color-gray-100)', border: '1px solid var(--color-gray-300)' }}>🌱 Seed Data</button>
                    {activeTab === 'stocklist' && <button onClick={handleAddPart} className="btn btn-primary">+ Add New Part</button>}
                    {activeTab === 'newpurchase' && <button onClick={handleNewPurchase} className="btn btn-primary">+ New Purchase</button>}
                </div>
            </div>

            {/* Low Stock Alert Banner */}
            {lowStockParts.length > 0 && (
                <div style={{ background: 'rgba(244, 67, 54, 0.1)', border: '1px solid rgba(244, 67, 54, 0.3)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                    <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: '#D32F2F' }}>Low Stock Alert!</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{lowStockParts.length} item(s) below minimum stock level</div>
                    </div>
                    <button onClick={() => setActiveTab('stocklist')} style={{ background: '#F44336', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}>View Items</button>
                </div>
            )}

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px', background: 'white', padding: '6px', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--spacing-lg)', boxShadow: 'var(--shadow-sm)', flexWrap: 'wrap' }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '12px 16px', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                            fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px',
                            background: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
                            color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <span>{tab.icon}</span>
                        {tab.name}
                        {tab.count > 0 && (
                            <span style={{
                                background: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : tab.id === 'requests' ? '#FF9800' : 'var(--color-gray-200)',
                                color: activeTab === tab.id ? 'white' : tab.id === 'requests' ? 'white' : 'inherit',
                                padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem',
                            }}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* REQUESTS TAB */}
            {activeTab === 'requests' && (
                <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                    <div style={{ padding: 'var(--spacing-md)', borderBottom: '1px solid var(--color-gray-200)', background: 'var(--color-gray-100)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Spare Part Requests from Job Cards</h3>
                    </div>
                    {requests.filter(r => r.status === 'pending').length === 0 ? (
                        <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--text-muted)' }}>✅ No pending requests</div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--color-gray-50)' }}>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem' }}>Job Card</th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem' }}>Technician</th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem' }}>Part</th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'center', fontSize: '0.85rem' }}>Qty</th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem' }}>Requested At</th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'right', fontSize: '0.85rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.filter(r => r.status === 'pending').map((req) => {
                                    const part = parts.find(p => p.partNumber === req.partNumber);
                                    const hasStock = part && part.stock >= req.qty;
                                    return (
                                        <tr key={req._id} style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                                            <td style={{ padding: 'var(--spacing-md)', fontWeight: 600, color: 'var(--color-primary)' }}>{req.jobCardNo}</td>
                                            <td style={{ padding: 'var(--spacing-md)' }}>{req.technicianName}</td>
                                            <td style={{ padding: 'var(--spacing-md)' }}>
                                                <div style={{ fontWeight: 500 }}>{req.partName}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{req.partNumber}</div>
                                            </td>
                                            <td style={{ padding: 'var(--spacing-md)', textAlign: 'center', fontWeight: 600 }}>{req.qty}</td>
                                            <td style={{ padding: 'var(--spacing-md)', fontSize: '0.9rem' }}>{new Date(req.requestedAt).toLocaleString('en-IN')}</td>
                                            <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                                    <button onClick={() => handleApproveRequest(req._id)} disabled={!hasStock} style={{ background: hasStock ? '#4CAF50' : 'var(--color-gray-200)', color: hasStock ? 'white' : 'var(--text-muted)', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: hasStock ? 'pointer' : 'not-allowed', fontSize: '0.8rem', fontWeight: 500 }}>
                                                        {hasStock ? '✓ Approve' : 'No Stock'}
                                                    </button>
                                                    <button onClick={() => handleRejectRequest(req._id)} style={{ background: 'rgba(244, 67, 54, 0.1)', color: '#F44336', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500 }}>Reject</button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* STOCK LIST TAB */}
            {activeTab === 'stocklist' && (
                <>
                    {/* Filters */}
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', background: 'white', padding: 'var(--spacing-sm) var(--spacing-md)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)', flex: 1, maxWidth: '300px' }}>
                            <span>🔍</span>
                            <input type="text" placeholder="Search by name, part no, barcode..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem' }} />
                        </div>
                        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-gray-200)', fontSize: '0.9rem' }}>
                            <option value="all">All Categories</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)} style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-gray-200)', fontSize: '0.9rem' }}>
                            <option value="all">All Brands</option>
                            {brands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>

                    {/* Parts Table */}
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--color-gray-100)' }}>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.8rem', fontWeight: 600 }}>Part No / Barcode</th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.8rem', fontWeight: 600 }}>Part Details</th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.8rem', fontWeight: 600 }}>Category / Brand</th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'center', fontSize: '0.8rem', fontWeight: 600 }}>Current Stock</th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.8rem', fontWeight: 600 }}>Rack</th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'right', fontSize: '0.8rem', fontWeight: 600 }}>Sale Price</th>
                                    <th style={{ padding: 'var(--spacing-md)', textAlign: 'right', fontSize: '0.8rem', fontWeight: 600 }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredParts.map((part) => {
                                    const stockStatus = getStockColor(part.stock, part.minStock);
                                    return (
                                        <tr key={part._id} style={{ borderBottom: '1px solid var(--color-gray-200)', background: part.stock < part.minStock ? 'rgba(244, 67, 54, 0.03)' : 'transparent' }}>
                                            <td style={{ padding: 'var(--spacing-md)' }}>
                                                <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{part.partNumber}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{part.barcode}</div>
                                            </td>
                                            <td style={{ padding: 'var(--spacing-md)' }}>
                                                <div style={{ fontWeight: 500 }}>{part.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{part.compatibleModels}</div>
                                            </td>
                                            <td style={{ padding: 'var(--spacing-md)' }}>
                                                <span style={{ padding: '3px 8px', borderRadius: '10px', fontSize: '0.75rem', background: 'var(--color-gray-100)' }}>{part.category}</span>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{part.brand}</div>
                                            </td>
                                            <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
                                                <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                                                    <span style={{
                                                        padding: '4px 12px', borderRadius: '12px', fontWeight: 600,
                                                        background: stockStatus.bg, color: stockStatus.color, fontSize: '0.9rem',
                                                    }}>
                                                        {part.stock}
                                                    </span>
                                                    <span style={{ fontSize: '0.65rem', color: stockStatus.color, marginTop: '2px' }}>{stockStatus.label}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: 'var(--spacing-md)' }}>
                                                <span style={{ background: 'var(--color-gray-100)', padding: '3px 8px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.85rem' }}>{part.rackLocation}</span>
                                            </td>
                                            <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                                <div style={{ fontWeight: 600 }}>₹{part.salePrice}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{part.mrp}</div>
                                            </td>
                                            <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                                                    <button onClick={() => handlePrintBarcode(part)} title="Print Barcode" style={{ background: 'var(--color-gray-100)', border: 'none', padding: '6px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>🏷️</button>
                                                    <button onClick={() => handleEditPart(part)} title="Edit" style={{ background: 'var(--color-gray-100)', border: 'none', padding: '6px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>✏️</button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* NEW PURCHASE TAB */}
            {activeTab === 'newpurchase' && (
                <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                    <div style={{ padding: 'var(--spacing-md)', borderBottom: '1px solid var(--color-gray-200)', background: 'var(--color-gray-100)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Purchase Orders</h3>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--color-gray-50)' }}>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem' }}>Invoice No</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem' }}>Supplier</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem' }}>Date</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'center', fontSize: '0.85rem' }}>Items</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'right', fontSize: '0.85rem' }}>Amount</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'center', fontSize: '0.85rem' }}>Status</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'right', fontSize: '0.85rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map((po) => (
                                <tr key={po._id} style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                                    <td style={{ padding: 'var(--spacing-md)', fontWeight: 600, color: 'var(--color-primary)' }}>{po.invoiceNo}</td>
                                    <td style={{ padding: 'var(--spacing-md)' }}>{po.supplier}</td>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: '0.9rem' }}>{new Date(po.invoiceDate).toLocaleDateString('en-IN')}</td>
                                    <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>{po.items.length}</td>
                                    <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                        <div style={{ fontWeight: 600 }}>₹{po.grandTotal.toLocaleString()}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>incl. GST ₹{po.gst.toFixed(0)}</div>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
                                        <span style={{
                                            padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 500,
                                            background: po.status === 'approved' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                                            color: po.status === 'approved' ? '#4CAF50' : '#FF9800',
                                        }}>
                                            {po.status === 'approved' ? '✓ Approved' : '⏳ Pending'}
                                        </span>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                        {po.status === 'pending' && (
                                            <button onClick={() => handleApprovePurchase(po._id)} style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500 }}>Approve & Add Stock</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* PURCHASE RETURN TAB */}
            {activeTab === 'purchasereturn' && (
                <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', padding: 'var(--spacing-xl)' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 'var(--spacing-lg)' }}>🔁 Purchase Return</h3>
                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Select Original Invoice</label>
                        <select style={{ width: '100%', maxWidth: '400px', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }}>
                            <option value="">Select Purchase Invoice</option>
                            {purchases.filter(p => p.status === 'approved').map(p => (
                                <option key={p._id} value={p._id}>{p.invoiceNo} - {p.supplier} ({new Date(p.invoiceDate).toLocaleDateString('en-IN')})</option>
                            ))}
                        </select>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Select an approved purchase invoice to initiate a return. Return reason is mandatory and stock will be auto-adjusted.</p>
                </div>
            )}

            {/* HISTORY TAB */}
            {activeTab === 'history' && (
                <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                    <div style={{ padding: 'var(--spacing-md)', borderBottom: '1px solid var(--color-gray-200)', background: 'var(--color-gray-100)', display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginRight: 'auto' }}>📜 Inventory History (Audit Log)</h3>
                        <select style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--color-gray-200)', fontSize: '0.85rem' }}>
                            <option value="all">All Types</option>
                            <option value="purchase">Purchase</option>
                            <option value="return">Return</option>
                            <option value="adjustment">Adjustment</option>
                        </select>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--color-gray-50)' }}>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem' }}>Date</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem' }}>Vendor</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem' }}>Type</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem' }}>Invoice No</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'center', fontSize: '0.85rem' }}>Items</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'right', fontSize: '0.85rem' }}>Amount</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem' }}>User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((entry) => (
                                <tr key={entry._id} style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: '0.9rem' }}>{new Date(entry.date).toLocaleString('en-IN')}</td>
                                    <td style={{ padding: 'var(--spacing-md)' }}>{entry.vendor}</td>
                                    <td style={{ padding: 'var(--spacing-md)' }}>
                                        <span style={{
                                            padding: '3px 10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 500,
                                            background: entry.type === 'purchase' ? 'rgba(76, 175, 80, 0.1)' : entry.type === 'return' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                                            color: entry.type === 'purchase' ? '#4CAF50' : entry.type === 'return' ? '#F44336' : '#FF9800',
                                        }}>
                                            {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                                        </span>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', fontWeight: 500 }}>{entry.invoiceNo}</td>
                                    <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>{entry.items}</td>
                                    <td style={{ padding: 'var(--spacing-md)', textAlign: 'right', fontWeight: 600 }}>₹{entry.amount.toLocaleString()}</td>
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{entry.user}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Part Modal */}
            {showPartModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-xl)', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflow: 'auto', boxShadow: 'var(--shadow-lg)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{editingPart ? '✏️ Edit Part' : '➕ Add New Spare Part'}</h3>
                            <button onClick={() => setShowPartModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
                        </div>
                        <form onSubmit={handleSavePart}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Part Number * <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(unique)</span></label>
                                    <input type="text" value={partForm.partNumber} onChange={(e) => setPartForm({ ...partForm, partNumber: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Barcode <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(auto-generated)</span></label>
                                    <input type="text" value={partForm.barcode} onChange={(e) => setPartForm({ ...partForm, barcode: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)', background: 'var(--color-gray-100)' }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Part Name *</label>
                                <input type="text" value={partForm.name} onChange={(e) => setPartForm({ ...partForm, name: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Brand</label>
                                    <select value={partForm.brand} onChange={(e) => setPartForm({ ...partForm, brand: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }}>
                                        <option value="">Select Brand</option>
                                        {brands.map(b => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Category</label>
                                    <select value={partForm.category} onChange={(e) => setPartForm({ ...partForm, category: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }}>
                                        <option value="">Select Category</option>
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Purchase Price (₹)</label>
                                    <input type="number" value={partForm.purchasePrice} onChange={(e) => setPartForm({ ...partForm, purchasePrice: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Sale Price (₹) *</label>
                                    <input type="number" value={partForm.salePrice} onChange={(e) => setPartForm({ ...partForm, salePrice: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>MRP (₹)</label>
                                    <input type="number" value={partForm.mrp} onChange={(e) => setPartForm({ ...partForm, mrp: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Current Stock</label>
                                    <input type="number" value={partForm.stock} onChange={(e) => setPartForm({ ...partForm, stock: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Min Stock Level</label>
                                    <input type="number" value={partForm.minStock} onChange={(e) => setPartForm({ ...partForm, minStock: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Rack Location</label>
                                    <input type="text" value={partForm.rackLocation} onChange={(e) => setPartForm({ ...partForm, rackLocation: e.target.value })} placeholder="e.g. A1, OIL-1" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Compatible Models <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(comma separated)</span></label>
                                <input type="text" value={partForm.compatibleModels} onChange={(e) => setPartForm({ ...partForm, compatibleModels: e.target.value })} placeholder="Honda Activa, TVS Jupiter" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                                <button type="button" onClick={() => setShowPartModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', background: 'white', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{editingPart ? 'Update' : 'Save'} Part</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Purchase Modal */}
            {showPurchaseModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-xl)', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflow: 'auto', boxShadow: 'var(--shadow-lg)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>🛒 New Purchase Entry</h3>
                            <button onClick={() => setShowPurchaseModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
                        </div>
                        <form onSubmit={handleSavePurchase}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Supplier *</label>
                                    <select value={purchaseForm.supplier} onChange={(e) => setPurchaseForm({ ...purchaseForm, supplier: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }}>
                                        <option value="">Select Supplier</option>
                                        {suppliers.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Invoice Date *</label>
                                    <input type="date" value={purchaseForm.invoiceDate} onChange={(e) => setPurchaseForm({ ...purchaseForm, invoiceDate: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Invoice Number *</label>
                                <input type="text" value={purchaseForm.invoiceNo} onChange={(e) => setPurchaseForm({ ...purchaseForm, invoiceNo: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                            </div>
                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 500 }}>Items</label>
                                {purchaseForm.items.map((item, idx) => (
                                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                                        <select value={item.partId} onChange={(e) => {
                                            const newItems = [...purchaseForm.items];
                                            newItems[idx].partId = e.target.value;
                                            const part = parts.find(p => p._id === e.target.value);
                                            if (part) newItems[idx].price = part.purchasePrice;
                                            setPurchaseForm({ ...purchaseForm, items: newItems });
                                        }} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }}>
                                            <option value="">Select Part</option>
                                            {parts.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                                        </select>
                                        <input type="number" placeholder="Qty" value={item.qty} min={1} onChange={(e) => {
                                            const newItems = [...purchaseForm.items];
                                            newItems[idx].qty = parseInt(e.target.value) || 1;
                                            setPurchaseForm({ ...purchaseForm, items: newItems });
                                        }} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                        <input type="number" placeholder="Price" value={item.price} onChange={(e) => {
                                            const newItems = [...purchaseForm.items];
                                            newItems[idx].price = e.target.value;
                                            setPurchaseForm({ ...purchaseForm, items: newItems });
                                        }} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                    </div>
                                ))}
                                <button type="button" onClick={() => setPurchaseForm({ ...purchaseForm, items: [...purchaseForm.items, { partId: '', qty: 1, price: '' }] })} style={{ border: '1px dashed var(--color-gray-300)', background: 'transparent', padding: '8px', borderRadius: '6px', cursor: 'pointer', width: '100%', color: 'var(--text-muted)' }}>+ Add Item</button>
                            </div>
                            <div style={{ background: 'var(--color-gray-100)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-lg)' }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    ⚠️ Purchase entry requires Finance approval. Stock will be updated only after approval.
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                                <button type="button" onClick={() => setShowPurchaseModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', background: 'white', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Submit for Approval</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
