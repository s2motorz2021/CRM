'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePersistentTasks } from '@/context/PersistentTaskContext';

const GST_RATES = [0, 5, 12, 18, 28];

export default function BillingPage() {
    const searchParams = useSearchParams();
    const { addTask, removeTask, getTask } = usePersistentTasks();
    const [activeTab, setActiveTab] = useState('all');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isInvoiceMinimized, setIsInvoiceMinimized] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewInvoice, setViewInvoice] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [pendingJobs, setPendingJobs] = useState([]);
    const [allCoupons, setAllCoupons] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [spareParts, setSpareParts] = useState([]);

    // Create invoice state
    const [selectedJobCard, setSelectedJobCard] = useState('');
    const [customer, setCustomer] = useState({ name: '', phone: '', address: '', gstin: '' });
    const [vehicle, setVehicle] = useState({ registrationNo: '', brand: '', model: '' });
    const [parts, setParts] = useState([]);
    const [labour, setLabour] = useState([]);
    const [outsideWork, setOutsideWork] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [manualDiscount, setManualDiscount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [mixedPayments, setMixedPayments] = useState({ cash: 0, card: 0, upi: 0 });
    const [paymentStatus, setPaymentStatus] = useState('pending');
    const [amountPaid, setAmountPaid] = useState(0);
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
    const [nextServiceDate, setNextServiceDate] = useState('');
    const [nextServiceKm, setNextServiceKm] = useState('');

    // Payment modal state
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [paymentNote, setPaymentNote] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [invRes, jcRes, couponRes, custRes, partsRes] = await Promise.all([
                fetch('/api/invoices'),
                fetch('/api/job-cards?status=ready_for_inspection,completed'),
                fetch('/api/coupons'),
                fetch('/api/customers'),
                fetch('/api/parts')
            ]);
            setInvoices(await invRes.json());
            setPendingJobs(await jcRes.json());
            setAllCoupons(await couponRes.json());
            setCustomers(await custRes.json());
            setSpareParts(await partsRes.json());
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setSelectedJobCard('');
        setCustomer({ name: '', phone: '', address: '', gstin: '' });
        setVehicle({ registrationNo: '', brand: '', model: '' });
        setParts([]);
        setLabour([]);
        setOutsideWork([]);
        setCouponCode('');
        setAppliedCoupon(null);
        setManualDiscount(0);
        setPaymentMethod('cash');
        setMixedPayments({ cash: 0, card: 0, upi: 0 });
        setPaymentStatus('pending');
        setAmountPaid(0);
        setInvoiceDate(new Date().toISOString().split('T')[0]);
        setNextServiceDate('');
        setNextServiceKm('');
    };

    // Restoration logic
    useEffect(() => {
        const restoreId = searchParams.get('restore');
        if (restoreId) {
            const task = getTask(restoreId);
            if (task && task.type === 'invoice') {
                handleRestoreTask(task);
            }
        }

        const handleRestoreEvent = (e) => {
            const task = getTask(e.detail);
            if (task && task.type === 'invoice') {
                handleRestoreTask(task);
            }
        };

        window.addEventListener('restore-task', handleRestoreEvent);
        return () => window.removeEventListener('restore-task', handleRestoreEvent);
    }, [searchParams, getTask]);

    const handleRestoreTask = (task) => {
        setSelectedJobCard(task.data.selectedJobCard);
        setCustomer(task.data.customer);
        setVehicle(task.data.vehicle);
        setParts(task.data.parts);
        setLabour(task.data.labour);
        setOutsideWork(task.data.outsideWork);
        setAppliedCoupon(task.data.appliedCoupon);
        setManualDiscount(task.data.manualDiscount);
        setPaymentMethod(task.data.paymentMethod);
        setPaymentStatus(task.data.paymentStatus);
        setAmountPaid(task.data.amountPaid);
        setInvoiceDate(task.data.invoiceDate);
        setNextServiceDate(task.data.nextServiceDate);
        setNextServiceKm(task.data.nextServiceKm);

        setIsInvoiceMinimized(false);
        setShowCreateModal(true);
    };

    const handleImportJobCard = (id) => {
        setSelectedJobCard(id);
        const job = pendingJobs.find(j => j._id === id);
        if (job) {
            setCustomer({
                _id: job.customerId?._id,
                name: job.customerId?.name || '',
                phone: job.customerId?.phone || '',
                address: job.customerId?.address || '',
                gstin: ''
            });
            setVehicle({
                _id: job.vehicleId?._id,
                registrationNo: job.vehicleId?.registrationNo || '',
                brand: job.vehicleId?.brand || '',
                model: job.vehicleId?.model || ''
            });
            setParts(job.spareRequests?.filter(r => r.status === 'approved').map((p, i) => ({
                id: Date.now() + i, code: p.partNo || '', name: p.name, hsn: p.hsn || '',
                qty: p.qty, rate: p.rate, gst: 18
            })) || []);
            setLabour(job.labourItems?.map((l, i) => ({
                id: Date.now() + 100 + i, code: '', name: l.name, sac: '998714',
                qty: l.qty || 1, rate: l.rate, gst: 18
            })) || []);
        }
    };

    const addItem = (type) => {
        const newItem = { id: Date.now(), code: '', name: '', qty: 1, rate: 0, gst: 18 };
        if (type === 'parts') setParts([...parts, { ...newItem, hsn: '' }]);
        else if (type === 'labour') setLabour([...labour, { ...newItem, sac: '998714' }]);
        else setOutsideWork([...outsideWork, { ...newItem, sac: '998719' }]);
    };

    const updateItem = (type, id, field, value) => {
        const setter = type === 'parts' ? setParts : type === 'labour' ? setLabour : setOutsideWork;
        const list = type === 'parts' ? parts : type === 'labour' ? labour : outsideWork;
        setter(list.map(item => item.id === id ? { ...item, [field]: field === 'qty' || field === 'rate' || field === 'gst' ? Number(value) : value } : item));
    };

    const removeItem = (type, id) => {
        const setter = type === 'parts' ? setParts : type === 'labour' ? setLabour : setOutsideWork;
        const list = type === 'parts' ? parts : type === 'labour' ? labour : outsideWork;
        setter(list.filter(item => item.id !== id));
    };

    const applyCoupon = () => {
        const coupon = allCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase() && c.isActive);
        if (coupon) {
            const subtotal = calculateSubtotal();
            if (subtotal >= (coupon.minOrder || 0)) {
                setAppliedCoupon(coupon);
                alert(`✅ Coupon "${coupon.code}" applied!`);
            } else {
                alert(`❌ Minimum order ₹${coupon.minOrder} required`);
            }
        } else {
            alert('❌ Invalid or expired coupon code');
        }
    };

    const calculateSubtotal = () => {
        return [...parts, ...labour, ...outsideWork].reduce((sum, item) => sum + (item.qty * item.rate), 0);
    };

    const calculateTotals = () => {
        const allItems = [...parts, ...labour, ...outsideWork];
        let subtotal = 0, totalGst = 0;
        allItems.forEach(item => {
            const taxable = item.qty * item.rate;
            subtotal += taxable;
            totalGst += taxable * (item.gst / 100);
        });

        let couponDiscount = 0;
        if (appliedCoupon) {
            couponDiscount = appliedCoupon.type === 'percent'
                ? Math.min(subtotal * (appliedCoupon.value / 100), appliedCoupon.maxDiscount || Infinity)
                : appliedCoupon.value;
        }

        const totalDiscount = manualDiscount + couponDiscount;
        const cgst = totalGst / 2;
        const sgst = totalGst / 2;
        const beforeRound = subtotal + totalGst - totalDiscount;
        const roundOff = Math.round(beforeRound) - beforeRound;
        const grandTotal = Math.round(beforeRound);

        return { subtotal, cgst, sgst, couponDiscount, manualDiscount, totalDiscount, roundOff, grandTotal };
    };

    const handleCreateInvoice = async () => {
        if (!customer._id) {
            alert('Please select a customer');
            return;
        }
        if (parts.length === 0 && labour.length === 0 && outsideWork.length === 0) {
            alert('Please add at least one item');
            return;
        }

        const totals = calculateTotals();
        setIsLoading(true);
        try {
            const res = await fetch('/api/invoices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobCardId: selectedJobCard || null,
                    customerId: customer._id,
                    vehicleId: vehicle._id,
                    customerGstin: customer.gstin,
                    date: new Date(invoiceDate),
                    parts, labour, outsideWork,
                    subtotal: totals.subtotal,
                    cgst: totals.cgst,
                    sgst: totals.sgst,
                    manualDiscount: totals.manualDiscount,
                    couponCode: appliedCoupon?.code,
                    couponDiscount: totals.couponDiscount,
                    discount: totals.totalDiscount,
                    roundOff: totals.roundOff,
                    grandTotal: totals.grandTotal,
                    paymentStatus,
                    paymentMethod,
                    paymentDetails: mixedPayments,
                    amountPaid: Number(paymentStatus === 'paid' ? totals.grandTotal : paymentStatus === 'partial' ? amountPaid || 0 : 0),
                    nextServiceDate: nextServiceDate || null,
                    nextServiceKm: nextServiceKm ? parseInt(nextServiceKm) : null,
                    branch: 'Main Branch'

                })
            });

            if (res.ok) {
                alert('✅ Invoice created successfully!');
                setShowCreateModal(false);
                resetForm();
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

    const handleRecordPayment = async () => {
        if (!showPaymentModal || paymentAmount <= 0) {
            alert('Please enter a valid payment amount');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/api/invoices', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    _id: showPaymentModal._id,
                    recordPayment: true,
                    paymentAmount: Number(paymentAmount),
                    paymentMethod,
                    updatedByName: 'Admin'
                })
            });

            const data = await res.json();

            if (res.ok) {
                alert(`✅ Payment of ₹${paymentAmount} recorded successfully!\n\nNew Balance: ₹${data.balanceAmount || 0}`);
                setShowPaymentModal(null);
                setPaymentAmount(0);
                fetchData();
            } else {
                alert('Error: ' + (data.error || 'Failed to record payment'));
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('Connection error: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredInvoices = invoices.filter(inv => {
        const matchesTab = activeTab === 'all' || inv.paymentStatus === activeTab;
        const matchesSearch = inv.invoiceNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inv.customerId?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const totals = calculateTotals();

    // Stats calculations
    const totalBilled = invoices.reduce((sum, inv) => sum + (inv.grandTotal || 0), 0);
    const pendingAmount = invoices.filter(i => i.paymentStatus !== 'paid').reduce((sum, inv) => sum + (inv.balanceAmount || inv.grandTotal || 0), 0);
    const paidToday = invoices.filter(i => i.paidAt && new Date(i.paidAt).toDateString() === new Date().toDateString()).reduce((sum, inv) => sum + (inv.amountPaid || 0), 0);

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <div>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 'var(--spacing-xs)' }}>🧾 Billing & Invoices</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>GST-compliant invoicing with payment tracking</p>
                </div>
                <button onClick={() => { resetForm(); setShowCreateModal(true); }} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>+</span> Create Invoice
                </button>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
                <div style={{ background: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Total Billed</p>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>₹{totalBilled.toLocaleString()}</h3>
                </div>
                <div style={{ background: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Pending Payments</p>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F44336' }}>₹{pendingAmount.toLocaleString()}</h3>
                </div>
                <div style={{ background: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Collected Today</p>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#4CAF50' }}>₹{paidToday.toLocaleString()}</h3>
                </div>
                <div style={{ background: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Total Invoices</p>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-primary)' }}>{invoices.length}</h3>
                </div>
            </div>

            {/* Filters & Table */}
            <div style={{ background: 'white', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                    <div style={{ display: 'flex', gap: '8px', background: 'var(--color-gray-100)', padding: '4px', borderRadius: '8px' }}>
                        {['all', 'paid', 'partial', 'pending'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500,
                                    background: activeTab === tab ? 'white' : 'transparent',
                                    color: activeTab === tab ? 'var(--color-primary)' : 'var(--text-secondary)',
                                    boxShadow: activeTab === tab ? 'var(--shadow-sm)' : 'none'
                                }}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Search by Invoice ID or Customer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', width: '300px' }}
                    />
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-gray-100)' }}>
                            <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>INVOICE</th>
                            <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>DATE</th>
                            <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>CUSTOMER</th>
                            <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>VEHICLE</th>
                            <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>AMOUNT</th>
                            <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>PAID</th>
                            <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>STATUS</th>
                            <th style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.map(inv => (
                            <tr key={inv._id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                                <td style={{ padding: '12px', fontWeight: 600 }}>{inv.invoiceNo}</td>
                                <td style={{ padding: '12px', fontSize: '0.9rem' }}>{new Date(inv.date).toLocaleDateString('en-IN')}</td>
                                <td style={{ padding: '12px' }}>
                                    <div style={{ fontWeight: 500 }}>{inv.customerId?.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{inv.customerId?.phone}</div>
                                </td>
                                <td style={{ padding: '12px' }}>{inv.vehicleId?.registrationNo}</td>
                                <td style={{ padding: '12px', fontWeight: 600 }}>₹{inv.grandTotal?.toLocaleString()}</td>
                                <td style={{ padding: '12px', color: inv.amountPaid >= inv.grandTotal ? '#4CAF50' : '#FF9800' }}>
                                    ₹{(inv.amountPaid || 0).toLocaleString()}
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{
                                        padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600,
                                        background: inv.paymentStatus === 'paid' ? 'rgba(76, 175, 80, 0.1)' : inv.paymentStatus === 'partial' ? 'rgba(33, 150, 243, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                                        color: inv.paymentStatus === 'paid' ? '#4CAF50' : inv.paymentStatus === 'partial' ? '#2196F3' : '#FF9800'
                                    }}>
                                        {inv.paymentStatus?.toUpperCase()}
                                    </span>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button onClick={() => setViewInvoice(inv)} style={{ padding: '6px', cursor: 'pointer', background: 'none', border: 'none', fontSize: '1rem' }} title="View">👁️</button>
                                        {inv.paymentStatus !== 'paid' && (
                                            <button onClick={() => { setShowPaymentModal(inv); setPaymentAmount(inv.grandTotal - (inv.amountPaid || 0)); }} style={{ padding: '6px', cursor: 'pointer', background: 'none', border: 'none', fontSize: '1rem' }} title="Record Payment">💳</button>
                                        )}
                                        <button onClick={() => window.open(`https://wa.me/${inv.customerId?.phone}?text=Invoice: ${inv.invoiceNo}%0AAmount: ₹${inv.grandTotal}`)} style={{ padding: '6px', cursor: 'pointer', background: 'none', border: 'none', fontSize: '1rem' }} title="WhatsApp">📱</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredInvoices.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No invoices found</div>}
            </div>

            {/* Create Invoice Modal */}
            {showCreateModal && (
                <div style={isInvoiceMinimized ? {
                    position: 'fixed', bottom: '20px', right: '20px', width: '350px', zIndex: 1000,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)', borderRadius: '12px', overflow: 'hidden',
                    background: 'white', border: '1px solid var(--color-primary)'
                } : {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={isInvoiceMinimized ? { width: '100%', display: 'flex', flexDirection: 'column' } : {
                        background: 'white', borderRadius: '12px', width: '95%', maxWidth: '1100px',
                        maxHeight: '95vh', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                    }}>
                        {/* Modal Header */}
                        <div style={{ padding: '16px 24px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: isInvoiceMinimized ? 'pointer' : 'default', background: isInvoiceMinimized ? 'var(--color-primary)' : 'white' }} onClick={() => isInvoiceMinimized && setIsInvoiceMinimized(false)}>
                            <h2 style={{ margin: 0, fontSize: isInvoiceMinimized ? '1rem' : '1.5rem', color: isInvoiceMinimized ? 'white' : 'inherit' }}>
                                {isInvoiceMinimized ? '📄 Invoice: ' + (customer.name || 'New') : '📝 Create New Invoice'}
                            </h2>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    const nextMinimized = !isInvoiceMinimized;
                                    setIsInvoiceMinimized(nextMinimized);
                                    if (nextMinimized) {
                                        addTask({
                                            id: 'new-invoice', // Use a constant for new invoice as there is only one creation modal
                                            type: 'invoice',
                                            title: customer.name ? `Invoice: ${customer.name}` : 'New Invoice',
                                            data: {
                                                selectedJobCard, customer, vehicle, parts, labour, outsideWork,
                                                appliedCoupon, manualDiscount, paymentMethod, paymentStatus,
                                                amountPaid, invoiceDate, nextServiceDate, nextServiceKm
                                            },
                                            activePage: '/billing'
                                        });
                                    } else {
                                        removeTask('new-invoice');
                                    }
                                }} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: isInvoiceMinimized ? 'white' : 'inherit', padding: '4px' }} title={isInvoiceMinimized ? "Expand" : "Minimize"}>
                                    {isInvoiceMinimized ? '🗖' : '—'}
                                </button>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    removeTask('new-invoice');
                                    setShowCreateModal(false);
                                    setIsInvoiceMinimized(false);
                                }} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: isInvoiceMinimized ? 'white' : 'inherit', padding: '4px' }} title="Close">×</button>
                            </div>
                        </div>

                        {!isInvoiceMinimized && (
                            <>
                                {/* Modal Body */}
                                <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                                    {/* Import Section */}
                                    <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--color-gray-100)', borderRadius: '8px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>📋 Import from Job Card</label>
                                        <select value={selectedJobCard} onChange={(e) => handleImportJobCard(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}>
                                            <option value="">Select Pending Job Card...</option>
                                            {pendingJobs.map(job => (
                                                <option key={job._id} value={job._id}>
                                                    {job.jobCardNo} - {job.customerId?.name} ({job.vehicleId?.registrationNo})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Customer & Vehicle */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.85rem' }}>Customer Name</label>
                                            <input type="text" value={customer.name} readOnly style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', background: '#f9f9f9' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.85rem' }}>Phone</label>
                                            <input type="text" value={customer.phone} readOnly style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', background: '#f9f9f9' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.85rem' }}>Vehicle Number</label>
                                            <input type="text" value={vehicle.registrationNo} readOnly style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', background: '#f9f9f9' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.85rem' }}>GSTIN (Optional)</label>
                                            <input type="text" placeholder="22AAAAA0000A1Z5" value={customer.gstin} onChange={(e) => setCustomer({ ...customer, gstin: e.target.value.toUpperCase() })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} maxLength={15} />
                                        </div>
                                    </div>

                                    {/* Invoice Items Grid */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                            <h4 style={{ margin: 0 }}>📦 Parts & Spares</h4>
                                            <button onClick={() => addItem('parts')} style={{ padding: '6px 12px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>+ Add Part</button>
                                        </div>
                                        {parts.length > 0 && (
                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                                <thead>
                                                    <tr style={{ background: '#f5f5f5' }}>
                                                        <th style={{ padding: '8px', textAlign: 'left', width: '30%' }}>Description</th>
                                                        <th style={{ padding: '8px', textAlign: 'left', width: '15%' }}>HSN</th>
                                                        <th style={{ padding: '8px', textAlign: 'center', width: '10%' }}>Qty</th>
                                                        <th style={{ padding: '8px', textAlign: 'right', width: '15%' }}>Rate</th>
                                                        <th style={{ padding: '8px', textAlign: 'center', width: '12%' }}>GST %</th>
                                                        <th style={{ padding: '8px', textAlign: 'right', width: '13%' }}>Total</th>
                                                        <th style={{ padding: '8px', width: '5%' }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {parts.map(item => (
                                                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                                            <td style={{ padding: '6px' }}><input type="text" value={item.name} onChange={(e) => updateItem('parts', item.id, 'name', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px' }} /></td>
                                                            <td style={{ padding: '6px' }}><input type="text" value={item.hsn} onChange={(e) => updateItem('parts', item.id, 'hsn', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px' }} /></td>
                                                            <td style={{ padding: '6px' }}><input type="number" min="1" value={item.qty} onChange={(e) => updateItem('parts', item.id, 'qty', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'center' }} /></td>
                                                            <td style={{ padding: '6px' }}><input type="number" min="0" value={item.rate} onChange={(e) => updateItem('parts', item.id, 'rate', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'right' }} /></td>
                                                            <td style={{ padding: '6px' }}><select value={item.gst} onChange={(e) => updateItem('parts', item.id, 'gst', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px' }}>{GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}</select></td>
                                                            <td style={{ padding: '6px', textAlign: 'right', fontWeight: 600 }}>₹{(item.qty * item.rate * (1 + item.gst / 100)).toFixed(0)}</td>
                                                            <td style={{ padding: '6px' }}><button onClick={() => removeItem('parts', item.id)} style={{ background: 'none', border: 'none', color: '#F44336', cursor: 'pointer', fontSize: '1.1rem' }}>×</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>

                                    {/* Labour Items */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                            <h4 style={{ margin: 0 }}>🔧 Labour Charges</h4>
                                            <button onClick={() => addItem('labour')} style={{ padding: '6px 12px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>+ Add Labour</button>
                                        </div>
                                        {labour.length > 0 && (
                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                                <thead>
                                                    <tr style={{ background: '#f5f5f5' }}>
                                                        <th style={{ padding: '8px', textAlign: 'left', width: '35%' }}>Description</th>
                                                        <th style={{ padding: '8px', textAlign: 'left', width: '15%' }}>SAC</th>
                                                        <th style={{ padding: '8px', textAlign: 'center', width: '10%' }}>Qty</th>
                                                        <th style={{ padding: '8px', textAlign: 'right', width: '15%' }}>Rate</th>
                                                        <th style={{ padding: '8px', textAlign: 'center', width: '10%' }}>GST %</th>
                                                        <th style={{ padding: '8px', textAlign: 'right', width: '10%' }}>Total</th>
                                                        <th style={{ padding: '8px', width: '5%' }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {labour.map(item => (
                                                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                                            <td style={{ padding: '6px' }}><input type="text" value={item.name} onChange={(e) => updateItem('labour', item.id, 'name', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px' }} /></td>
                                                            <td style={{ padding: '6px' }}><input type="text" value={item.sac} onChange={(e) => updateItem('labour', item.id, 'sac', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px' }} /></td>
                                                            <td style={{ padding: '6px' }}><input type="number" min="1" value={item.qty} onChange={(e) => updateItem('labour', item.id, 'qty', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'center' }} /></td>
                                                            <td style={{ padding: '6px' }}><input type="number" min="0" value={item.rate} onChange={(e) => updateItem('labour', item.id, 'rate', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'right' }} /></td>
                                                            <td style={{ padding: '6px' }}><select value={item.gst} onChange={(e) => updateItem('labour', item.id, 'gst', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px' }}>{GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}</select></td>
                                                            <td style={{ padding: '6px', textAlign: 'right', fontWeight: 600 }}>₹{(item.qty * item.rate * (1 + item.gst / 100)).toFixed(0)}</td>
                                                            <td style={{ padding: '6px' }}><button onClick={() => removeItem('labour', item.id)} style={{ background: 'none', border: 'none', color: '#F44336', cursor: 'pointer', fontSize: '1.1rem' }}>×</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>

                                    {/* Outside Work Items */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                            <h4 style={{ margin: 0 }}>🏭 Outside Work / External Labour</h4>
                                            <button onClick={() => addItem('outsideWork')} style={{ padding: '6px 12px', background: '#9C27B0', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>+ Add Outside Work</button>
                                        </div>
                                        {outsideWork.length > 0 && (
                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                                <thead>
                                                    <tr style={{ background: '#f5f5f5' }}>
                                                        <th style={{ padding: '8px', textAlign: 'left', width: '35%' }}>Description</th>
                                                        <th style={{ padding: '8px', textAlign: 'left', width: '15%' }}>SAC</th>
                                                        <th style={{ padding: '8px', textAlign: 'center', width: '10%' }}>Qty</th>
                                                        <th style={{ padding: '8px', textAlign: 'right', width: '15%' }}>Rate</th>
                                                        <th style={{ padding: '8px', textAlign: 'center', width: '10%' }}>GST %</th>
                                                        <th style={{ padding: '8px', textAlign: 'right', width: '10%' }}>Total</th>
                                                        <th style={{ padding: '8px', width: '5%' }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {outsideWork.map(item => (
                                                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                                            <td style={{ padding: '6px' }}><input type="text" placeholder="e.g. Painting, Denting" value={item.name} onChange={(e) => updateItem('outsideWork', item.id, 'name', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px' }} /></td>
                                                            <td style={{ padding: '6px' }}><input type="text" value={item.sac} onChange={(e) => updateItem('outsideWork', item.id, 'sac', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px' }} /></td>
                                                            <td style={{ padding: '6px' }}><input type="number" min="1" value={item.qty} onChange={(e) => updateItem('outsideWork', item.id, 'qty', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'center' }} /></td>
                                                            <td style={{ padding: '6px' }}><input type="number" min="0" value={item.rate} onChange={(e) => updateItem('outsideWork', item.id, 'rate', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'right' }} /></td>
                                                            <td style={{ padding: '6px' }}><select value={item.gst} onChange={(e) => updateItem('outsideWork', item.id, 'gst', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px' }}>{GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}</select></td>
                                                            <td style={{ padding: '6px', textAlign: 'right', fontWeight: 600 }}>₹{(item.qty * item.rate * (1 + item.gst / 100)).toFixed(0)}</td>
                                                            <td style={{ padding: '6px' }}><button onClick={() => removeItem('outsideWork', item.id)} style={{ background: 'none', border: 'none', color: '#F44336', cursor: 'pointer', fontSize: '1.1rem' }}>×</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>

                                    {/* Payment Summary */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        {/* Left: Discounts & Payment */}
                                        <div>
                                            <h4 style={{ marginBottom: '12px' }}>💰 Discounts & Payment</h4>
                                            <div style={{ marginBottom: '12px' }}>
                                                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>Manual Discount (₹)</label>
                                                <input type="number" min="0" value={manualDiscount} onChange={(e) => setManualDiscount(Number(e.target.value))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                                            </div>
                                            <div style={{ marginBottom: '12px' }}>
                                                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>Coupon Code</label>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <input type="text" placeholder="Enter coupon" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                                                    <button onClick={applyCoupon} style={{ padding: '10px 16px', background: '#FF9800', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Apply</button>
                                                </div>
                                                {appliedCoupon && <p style={{ color: '#4CAF50', fontSize: '0.85rem', marginTop: '4px' }}>✅ {appliedCoupon.code} applied (-₹{totals.couponDiscount.toFixed(0)})</p>}
                                            </div>
                                            <div style={{ marginBottom: '12px' }}>
                                                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>Payment Method</label>
                                                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}>
                                                    <option value="cash">Cash</option>
                                                    <option value="card">Card</option>
                                                    <option value="upi">UPI</option>
                                                    <option value="mixed">Mixed</option>
                                                </select>
                                            </div>
                                            <div style={{ marginBottom: '12px' }}>
                                                <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>Payment Status</label>
                                                <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}>
                                                    <option value="pending">Pending</option>
                                                    <option value="partial">Partial</option>
                                                    <option value="paid">Paid</option>
                                                </select>
                                            </div>
                                            {paymentStatus === 'partial' && (
                                                <div style={{ marginBottom: '12px' }}>
                                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>Amount Paid (₹)</label>
                                                    <input type="number" min="0" value={amountPaid} onChange={(e) => setAmountPaid(Number(e.target.value))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }} />
                                                </div>
                                            )}
                                        </div>

                                        {/* Right: Invoice Summary */}
                                        <div style={{ background: 'linear-gradient(135deg, #00B8D4, #0097A7)', padding: '20px', borderRadius: '12px', color: 'white' }}>
                                            <h4 style={{ marginBottom: '16px' }}>📊 Invoice Summary</h4>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                <span>Subtotal:</span><span>₹{totals.subtotal.toFixed(2)}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                <span>CGST:</span><span>₹{totals.cgst.toFixed(2)}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                <span>SGST:</span><span>₹{totals.sgst.toFixed(2)}</span>
                                            </div>
                                            {totals.totalDiscount > 0 && (
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#FFD54F' }}>
                                                    <span>Discount:</span><span>-₹{totals.totalDiscount.toFixed(2)}</span>
                                                </div>
                                            )}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', opacity: 0.8 }}>
                                                <span>Round Off:</span><span>₹{totals.roundOff.toFixed(2)}</span>
                                            </div>
                                            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.3)', margin: '12px 0' }} />
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: 700 }}>
                                                <span>Grand Total:</span><span>₹{totals.grandTotal}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div style={{ padding: '16px 24px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                    <button onClick={() => setShowCreateModal(false)} style={{ padding: '10px 24px', borderRadius: '6px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}>Cancel</button>
                                    <button onClick={handleCreateInvoice} disabled={isLoading} className="btn btn-primary" style={{ padding: '10px 32px' }}>
                                        {isLoading ? 'Creating...' : '✅ Create Invoice'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* View Invoice Modal */}
            {viewInvoice && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                    <div id="printable-invoice" style={{ background: 'white', width: '100%', maxWidth: '800px', maxHeight: '90vh', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                            {/* Invoice Header */}
                            <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '2px solid var(--color-primary)', paddingBottom: '16px' }}>
                                <h1 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '4px' }}>S2 MOTORZ</h1>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Two Wheeler Service & Repair</p>
                                <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>GST Invoice</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                                <div>
                                    <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Invoice No:</strong> {viewInvoice.invoiceNo}</p>
                                    <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Date:</strong> {new Date(viewInvoice.date).toLocaleDateString('en-IN')}</p>
                                    {viewInvoice.customerGstin && <p style={{ fontSize: '0.9rem', margin: '4px 0' }}><strong>GSTIN:</strong> {viewInvoice.customerGstin}</p>}
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Customer:</strong> {viewInvoice.customerId?.name}</p>
                                    <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Phone:</strong> {viewInvoice.customerId?.phone}</p>
                                    <p style={{ margin: '4px 0', fontSize: '0.9rem' }}><strong>Vehicle:</strong> {viewInvoice.vehicleId?.registrationNo}</p>
                                </div>
                            </div>

                            {/* Items Table */}
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '0.85rem' }}>
                                <thead>
                                    <tr style={{ background: 'var(--color-gray-100)' }}>
                                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Description</th>
                                        <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>HSN/SAC</th>
                                        <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>Qty</th>
                                        <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>Rate</th>
                                        <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>GST</th>
                                        <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewInvoice.parts?.map((item, i) => (
                                        <tr key={`p-${i}`}>
                                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.name}</td>
                                            <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{item.hsn}</td>
                                            <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{item.qty}</td>
                                            <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>₹{item.rate}</td>
                                            <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{item.gst}%</td>
                                            <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>₹{(item.qty * item.rate * (1 + item.gst / 100)).toFixed(0)}</td>
                                        </tr>
                                    ))}
                                    {viewInvoice.labour?.map((item, i) => (
                                        <tr key={`l-${i}`}>
                                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.name}</td>
                                            <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{item.sac}</td>
                                            <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{item.qty}</td>
                                            <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>₹{item.rate}</td>
                                            <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{item.gst}%</td>
                                            <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>₹{(item.qty * item.rate * (1 + item.gst / 100)).toFixed(0)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Totals */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <div style={{ width: '250px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.9rem' }}><span>Subtotal:</span><span>₹{viewInvoice.subtotal?.toFixed(2)}</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.9rem' }}><span>CGST:</span><span>₹{viewInvoice.cgst?.toFixed(2)}</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.9rem' }}><span>SGST:</span><span>₹{viewInvoice.sgst?.toFixed(2)}</span></div>
                                    {viewInvoice.discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.9rem', color: '#4CAF50' }}><span>Discount:</span><span>-₹{viewInvoice.discount?.toFixed(2)}</span></div>}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontWeight: 700, fontSize: '1.1rem', borderTop: '2px solid #333' }}><span>Grand Total:</span><span>₹{viewInvoice.grandTotal}</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.9rem', color: viewInvoice.paymentStatus === 'paid' ? '#4CAF50' : '#FF9800' }}><span>Amount Paid:</span><span>₹{viewInvoice.amountPaid || 0}</span></div>
                                    {viewInvoice.balanceAmount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.9rem', color: '#F44336' }}><span>Balance:</span><span>₹{viewInvoice.balanceAmount}</span></div>}
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '16px 24px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button onClick={() => setViewInvoice(null)} style={{ padding: '10px 20px', borderRadius: '6px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}>Close</button>
                            <button onClick={() => window.print()} className="btn btn-primary" style={{ padding: '10px 20px' }}>🖨️ Print</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Recording Modal */}
            {showPaymentModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '400px' }}>
                        <h3 style={{ marginBottom: '20px' }}>💳 Record Payment</h3>
                        <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>Invoice: <strong>{showPaymentModal.invoiceNo}</strong></p>
                        <p style={{ marginBottom: '8px' }}>Total: <strong>₹{showPaymentModal.grandTotal}</strong></p>
                        <p style={{ marginBottom: '16px' }}>Already Paid: <strong>₹{showPaymentModal.amountPaid || 0}</strong></p>
                        <p style={{ marginBottom: '16px', color: '#F44336' }}>Balance: <strong>₹{showPaymentModal.grandTotal - (showPaymentModal.amountPaid || 0)}</strong></p>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Payment Amount</label>
                            <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1.1rem' }} />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Payment Method</label>
                            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                                <option value="upi">UPI</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button onClick={() => setShowPaymentModal(null)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={handleRecordPayment} disabled={isLoading || paymentAmount <= 0} className="btn btn-primary" style={{ flex: 1 }}>
                                {isLoading ? 'Recording...' : 'Record Payment'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
