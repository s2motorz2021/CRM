'use client';

import { useState, useRef, useEffect } from 'react';
import SignaturePad from '@/components/SignaturePad';

// Sample data
const vehicleBrands = ['Honda', 'TVS', 'Bajaj', 'Hero', 'Royal Enfield', 'Suzuki', 'Yamaha', 'KTM'];
const labourItems = [
    { id: 1, name: 'Quick Service Labour', rate: 350 },
    { id: 2, name: 'Oil Change', rate: 150 },
    { id: 3, name: 'Air Filter Cleaning', rate: 100 },
    { id: 4, name: 'Spark Plug Check', rate: 80 },
    { id: 5, name: 'Chain Lubrication', rate: 50 },
];
// Spare items will be fetched from API
const initialSpareItems = [];

// Customer Voice - Predefined common complaints
const customerVoiceOptions = [
    { id: 1, name: 'Engine making noise', category: 'Engine' },
    { id: 2, name: 'Engine not starting', category: 'Engine' },
    { id: 3, name: 'Low mileage', category: 'Engine' },
    { id: 4, name: 'Brake noise', category: 'Brakes' },
    { id: 5, name: 'Brake not working properly', category: 'Brakes' },
    { id: 6, name: 'Headlight not working', category: 'Electrical' },
    { id: 7, name: 'Horn not working', category: 'Electrical' },
    { id: 8, name: 'Battery not charging', category: 'Electrical' },
    { id: 9, name: 'General service required', category: 'General' },
];

const GST_PERCENT = 18;

export default function QuickServicePage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [jobCardId, setJobCardId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [staff, setStaff] = useState([]);
    const [spareItems, setSpareItems] = useState(initialSpareItems);
    const [serviceTypesList, setServiceTypesList] = useState([]);
    const [selectedServiceType, setSelectedServiceType] = useState('Quick Service');
    const [showAddServiceTypeModal, setShowAddServiceTypeModal] = useState(false);
    const [newServiceTypeData, setNewServiceTypeData] = useState({ name: '', ratePerHour: '', description: '' });
    const [isSavingServiceType, setIsSavingServiceType] = useState(false);

    useEffect(() => {
        fetchData();
        setJobCardId(`QS-${Date.now().toString().slice(-6)}`);
    }, []);

    const handleSaveNewServiceType = async () => {
        if (!newServiceTypeData.name || !newServiceTypeData.ratePerHour) {
            alert('Service name and rate are required');
            return;
        }

        setIsSavingServiceType(true);
        try {
            const res = await fetch('/api/service-types', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newServiceTypeData)
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to save service type');
            }

            const savedType = await res.json();
            await fetchData();

            setSelectedServiceType(savedType.name);
            setShowAddServiceTypeModal(false);
            setNewServiceTypeData({ name: '', ratePerHour: '', description: '' });
            alert('✅ Service type saved successfully!');
        } catch (error) {
            console.error('Save error:', error);
            alert('Error: ' + error.message);
        } finally {
            setIsSavingServiceType(false);
        }
    };

    const fetchData = async () => {
        try {
            const [custRes, vehRes, staffRes, partsRes, serviceTypesRes] = await Promise.all([
                fetch('/api/customers'),
                fetch('/api/vehicles'),
                fetch('/api/staff'),
                fetch('/api/parts'),
                fetch('/api/service-types')
            ]);

            const customersData = await custRes.json();
            const vehiclesData = await vehRes.json();
            const staffData = await staffRes.json();
            const partsData = await partsRes.json();
            const serviceTypesData = await serviceTypesRes.json();

            if (Array.isArray(customersData)) setCustomers(customersData);
            if (Array.isArray(vehiclesData)) setVehicles(vehiclesData);
            if (Array.isArray(staffData)) setStaff(staffData);
            if (Array.isArray(serviceTypesData)) setServiceTypesList(serviceTypesData);

            if (Array.isArray(partsData)) {
                setSpareItems(partsData.map(p => ({
                    id: p._id,
                    name: p.name,
                    rate: p.salePrice,
                    stock: p.stock,
                    partNumber: p.partNumber
                })));
            } else {
                console.warn('Parts data is not an array:', partsData);
                setSpareItems([]);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    // Step 1 data
    const [customerData, setCustomerData] = useState({
        searchTerm: '',
        isNewCustomer: false,
        name: '',
        phone: '',
        address: '',
    });
    const [vehicleData, setVehicleData] = useState({
        registrationNo: '',
        brand: '',
        model: '',
        color: '',
        batteryNo: '',
        odometer: '',
    });
    const [vehiclePhotos, setVehiclePhotos] = useState([]);
    const [fuelLevel, setFuelLevel] = useState(60);
    const [oilLevel, setOilLevel] = useState(60);
    const [customerVoice, setCustomerVoice] = useState('');

    // Step 2 data
    const [estimateLabour, setEstimateLabour] = useState([]);
    const [estimateParts, setEstimateParts] = useState([]);

    // Step 3 data
    const [spareRequests, setSpareRequests] = useState([]);

    // Step 4 data
    const [photos, setPhotos] = useState([]);
    const [customerSignature, setCustomerSignature] = useState(null);
    const [advisorSignature, setAdvisorSignature] = useState(null);
    const [activeSignaturePad, setActiveSignaturePad] = useState(null); // 'customer' or 'advisor' or null
    const [discount, setDiscount] = useState(0);
    const [paymentStatus, setPaymentStatus] = useState('pending');
    const [isDelivered, setIsDelivered] = useState(false);
    const [notificationSent, setNotificationSent] = useState({ whatsapp: false, email: false });
    const [billingFinalized, setBillingFinalized] = useState(false);
    const [advanceAmount, setAdvanceAmount] = useState(0);
    const [advanceMethod, setAdvanceMethod] = useState('');
    const [auditLog, setAuditLog] = useState([]);

    const fileInputRef = useRef(null);
    const vehiclePhotoInputRef = useRef(null);

    const steps = [
        { id: 1, name: 'Vehicle & Client', icon: '🏍️' },
        { id: 2, name: 'Estimate', icon: '📝' },
        { id: 3, name: 'Spare Requests', icon: '🔧' },
        { id: 4, name: 'Summary & Delivery', icon: '✅' },
    ];

    const handleCustomerSearch = (term) => {
        setCustomerData({ ...customerData, searchTerm: term });

        // If user is intentionally adding a new customer, don't auto-populate existing ones
        // unless the search term is empty (reset)
        if (customerData.isNewCustomer && term.length > 0) return;

        const found = customers.find(c => c.phone.includes(term) || c.name.toLowerCase().includes(term.toLowerCase()));
        if (found && term.length > 2) { // Only auto-populate if term is significant
            setCustomerData({
                ...customerData,
                _id: found._id,
                searchTerm: term,
                isNewCustomer: false,
                name: found.name,
                phone: found.phone,
                address: found.address
            });
            // Auto find vehicle
            const activeVehicles = vehicles.filter(v => v.customerId === found._id || v.customerId?._id === found._id);
            if (activeVehicles.length > 0) {
                setVehicleData({
                    ...vehicleData,
                    _id: activeVehicles[0]._id,
                    registrationNo: activeVehicles[0].registrationNo,
                    brand: activeVehicles[0].brand,
                    model: activeVehicles[0].model,
                    color: activeVehicles[0].color,
                    batteryNo: activeVehicles[0].batteryNo || '',
                    odometer: activeVehicles[0].odometer || ''
                });
            }
        } else if (!customerData.isNewCustomer) {
            // Clear fields if no match found and not in "New Customer" mode
            setCustomerData(prev => ({ ...prev, _id: undefined, name: '', phone: term, address: '' }));
            setVehicleData({ registrationNo: '', brand: '', model: '', color: '', batteryNo: '', odometer: '' });
        }
    };

    const handleAddLabour = (item) => {
        if (!estimateLabour.find(l => l.id === item.id)) {
            setEstimateLabour([...estimateLabour, { ...item, qty: 1 }]);
        }
    };

    const handleAddPart = (item) => {
        if (!estimateParts.find(p => p.id === item.id)) {
            setEstimateParts([...estimateParts, { ...item, qty: 1 }]);
        }
    };

    const handleRemoveLabour = (id) => setEstimateLabour(estimateLabour.filter(l => l.id !== id));
    const handleRemovePart = (id) => setEstimateParts(estimateParts.filter(p => p.id !== id));

    const handleRequestSpare = (item) => {
        if (!spareRequests.find(r => r.id === item.id)) {
            setSpareRequests([...spareRequests, { ...item, qty: 1, status: 'pending' }]);
        }
    };

    const handleApproveSpare = (id) => {
        setSpareRequests(spareRequests.map(r => r.id === id ? { ...r, status: 'approved' } : r));
        const spare = spareRequests.find(r => r.id === id);
        if (spare && !estimateParts.find(p => p.id === spare.id)) {
            setEstimateParts([...estimateParts, { ...spare, qty: spare.qty }]);
        }
    };

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        const newPhotos = files.slice(0, 4 - photos.length).map((file, i) => ({
            id: Date.now() + i,
            name: file.name,
            url: URL.createObjectURL(file),
        }));
        setPhotos([...photos, ...newPhotos].slice(0, 4));
    };

    const handleVehiclePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file && vehiclePhotos.length < 4) {
            const newPhoto = {
                id: Date.now(),
                name: file.name,
                url: URL.createObjectURL(file),
            };
            setVehiclePhotos([...vehiclePhotos, newPhoto]);
        }
        e.target.value = '';
    };

    const handleRemoveVehiclePhoto = (id) => setVehiclePhotos(vehiclePhotos.filter(p => p.id !== id));
    const handleRemovePhoto = (id) => setPhotos(photos.filter(p => p.id !== id));

    const calculateTotals = () => {
        const labourTotal = estimateLabour.reduce((sum, l) => sum + (l.rate * l.qty), 0);
        const partsTotal = estimateParts.reduce((sum, p) => sum + (p.rate * p.qty), 0);
        const subtotal = labourTotal + partsTotal;
        const gst = subtotal * (GST_PERCENT / 100);
        const grandTotal = subtotal + gst - discount;
        const balanceDue = grandTotal - advanceAmount;
        return { labourTotal, partsTotal, subtotal, gst, grandTotal, balanceDue };
    };

    const canDeliver = photos.length >= 1 && customerSignature && advisorSignature && (paymentStatus === 'paid' || paymentStatus === 'approved') && billingFinalized;

    const handleMarkDelivered = async () => {
        if (canDeliver) {
            setIsLoading(true);
            try {
                const res = await fetch('/api/job-cards', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jobCardNo: jobCardId,
                        type: 'quick',
                        status: 'delivered',
                        customerId: customerData._id,
                        vehicleId: vehicleData._id,
                        serviceType: selectedServiceType,
                        odometer: vehicleData.odometer,
                        fuelLevel,
                        oilLevel: String(oilLevel),
                        customerVoice,
                        labourItems: estimateLabour.map(l => ({ name: l.name, rate: l.rate, qty: l.qty })),
                        spareRequests: estimateParts.map(p => ({
                            name: p.name,
                            partNumber: p.partNumber,
                            rate: p.rate,
                            qty: p.qty,
                            status: 'approved'
                        })),
                        signatures: {
                            customer: customerSignature || '',
                            advisor: advisorSignature || ''
                        },
                        advanceAmount,
                        advanceMethod,
                        isLocked: true
                    })
                });

                if (res.ok) {
                    setIsDelivered(true);
                    setAuditLog([...auditLog, { action: 'delivered', user: 'Advisor', timestamp: new Date() }]);
                    alert('✅ Quick Service completed and logged to backend!');
                } else {
                    const err = await res.json();
                    alert('Error: ' + err.error);
                }
            } catch (error) {
                alert('Connection error saving to backend');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSendNotification = (channel) => {
        setNotificationSent({ ...notificationSent, [channel]: true });
        setAuditLog([...auditLog, { action: `notification_${channel}`, user: 'System', timestamp: new Date() }]);
        alert(`📢 ${channel === 'whatsapp' ? 'WhatsApp' : 'Email'} notification sent to ${customerData.name}`);
    };

    const handleFinalizeBilling = () => {
        setBillingFinalized(true);
        setAuditLog([...auditLog, { action: 'billing_finalized', user: 'Advisor', timestamp: new Date() }]);
    };

    const isStep1Valid = customerData.name && customerData.phone && vehicleData.registrationNo && vehicleData.brand;

    // Save new customer and vehicle to backend
    const saveCustomerAndVehicle = async () => {
        try {
            let customerId = customerData._id;
            let vehicleId = vehicleData._id;

            // Save new customer if no _id exists
            if (!customerId && customerData.name && customerData.phone) {
                const custRes = await fetch('/api/customers', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: customerData.name,
                        phone: customerData.phone,
                        address: customerData.address || ''
                    })
                });
                if (custRes.ok) {
                    const savedCustomer = await custRes.json();
                    customerId = savedCustomer._id;
                    setCustomerData(prev => ({ ...prev, _id: customerId }));
                } else {
                    const err = await custRes.json();
                    console.error('Customer save error:', err);
                    alert('Error saving customer: ' + (err.error || 'Unknown error'));
                    return false;
                }
            }

            // Save new vehicle if no _id exists
            if (!vehicleId && vehicleData.registrationNo && customerId) {
                const vehRes = await fetch('/api/vehicles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        registrationNo: vehicleData.registrationNo,
                        brand: vehicleData.brand,
                        model: vehicleData.model || '',
                        color: vehicleData.color || '',
                        customerId: customerId
                    })
                });
                if (vehRes.ok) {
                    const savedVehicle = await vehRes.json();
                    vehicleId = savedVehicle._id;
                    setVehicleData(prev => ({ ...prev, _id: vehicleId }));
                } else {
                    const err = await vehRes.json();
                    console.error('Vehicle save error:', err);
                    alert('Error saving vehicle: ' + (err.error || 'Unknown error'));
                    return false;
                }
            }

            return true;
        } catch (error) {
            console.error('Save error:', error);
            alert('Connection error while saving customer/vehicle');
            return false;
        }
    };

    // Handle step navigation with data save on Step 1 to Step 2 transition
    const handleNextStep = async () => {
        if (currentStep === 1) {
            setIsLoading(true);
            const success = await saveCustomerAndVehicle();
            setIsLoading(false);
            if (success) {
                setCurrentStep(2);
            }
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    return (
        <>{/* wrapper */}
            <div>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                    <div>
                        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 'var(--spacing-xs)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: '#4CAF50' }}>⚡</span> Quick Service
                            <span style={{ background: 'var(--color-primary)', color: 'white', padding: '4px 12px', borderRadius: '6px', fontSize: '0.9rem' }}>{jobCardId}</span>
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Fast service flow for quick repairs</p>
                    </div>
                    {isDelivered && (
                        <span style={{ background: '#4CAF50', color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: 600 }}>🔒 DELIVERED</span>
                    )}
                </div>

                {/* Progress Steps */}
                <div style={{ display: 'flex', marginBottom: 'var(--spacing-xl)', background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-md)', boxShadow: 'var(--shadow-sm)' }}>
                    {steps.map((step, idx) => (
                        <div key={step.id} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <div
                                onClick={() => !isDelivered && setCurrentStep(step.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '10px', cursor: isDelivered ? 'not-allowed' : 'pointer',
                                    padding: '10px 16px', borderRadius: 'var(--radius-md)', flex: 1,
                                    background: currentStep === step.id ? 'var(--color-primary)' : currentStep > step.id ? 'rgba(76, 175, 80, 0.1)' : 'var(--color-gray-100)',
                                    color: currentStep === step.id ? 'white' : currentStep > step.id ? '#4CAF50' : 'var(--text-secondary)',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <span style={{ fontSize: '1.2rem' }}>{currentStep > step.id ? '✓' : step.icon}</span>
                                <div>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Step {step.id}</div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{step.name}</div>
                                </div>
                            </div>
                            {idx < steps.length - 1 && <div style={{ width: '30px', height: '2px', background: currentStep > step.id ? '#4CAF50' : 'var(--color-gray-200)', margin: '0 8px' }} />}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-xl)', boxShadow: 'var(--shadow-sm)', minHeight: '400px' }}>

                    {/* STEP 1: Vehicle & Client */}
                    {currentStep === 1 && (
                        <div>
                            <h3 style={{ marginBottom: 'var(--spacing-lg)', fontSize: '1.1rem', fontWeight: 600 }}>🏍️ Vehicle & Client Details</h3>

                            {/* Customer Search */}
                            <div style={{ marginBottom: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'var(--color-gray-100)', borderRadius: 'var(--radius-md)' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Search Customer (Mobile / Name)</label>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                    <input
                                        type="text"
                                        value={customerData.searchTerm}
                                        onChange={(e) => handleCustomerSearch(e.target.value)}
                                        placeholder="Enter mobile number or name..."
                                        style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCustomerData({
                                                ...customerData,
                                                _id: undefined,
                                                isNewCustomer: true,
                                                name: '',
                                                phone: customerData.searchTerm,
                                                address: ''
                                            });
                                            setVehicleData({
                                                registrationNo: '',
                                                brand: '',
                                                model: '',
                                                color: '',
                                                batteryNo: '',
                                                odometer: ''
                                            });
                                        }}
                                        style={{ padding: '10px 16px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
                                    >
                                        + New Customer
                                    </button>
                                </div>
                            </div>

                            {/* Customer Fields */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Customer Name *</label>
                                    <input type="text" value={customerData.name} onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })} placeholder="Full name" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Mobile Number *</label>
                                    <input type="tel" value={customerData.phone} onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })} placeholder="10-digit mobile" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Address</label>
                                    <input type="text" value={customerData.address} onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })} placeholder="Optional" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                </div>
                            </div>

                            {/* Vehicle Fields */}
                            <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1rem', fontWeight: 600 }}>Vehicle Details</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Registration No *</label>
                                    <input type="text" value={vehicleData.registrationNo} onChange={(e) => setVehicleData({ ...vehicleData, registrationNo: e.target.value.toUpperCase() })} placeholder="MH 01 AB 1234" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Brand *</label>
                                    <select value={vehicleData.brand} onChange={(e) => setVehicleData({ ...vehicleData, brand: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }}>
                                        <option value="">Select Brand</option>
                                        {vehicleBrands.map(b => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Model</label>
                                    <input type="text" value={vehicleData.model} onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })} placeholder="e.g. Activa 6G" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Color</label>
                                    <input type="text" value={vehicleData.color} onChange={(e) => setVehicleData({ ...vehicleData, color: e.target.value })} placeholder="e.g. Red" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Battery No</label>
                                    <input type="text" value={vehicleData.batteryNo} onChange={(e) => setVehicleData({ ...vehicleData, batteryNo: e.target.value })} placeholder="Optional" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Odometer (km)</label>
                                    <input type="number" value={vehicleData.odometer} onChange={(e) => setVehicleData({ ...vehicleData, odometer: e.target.value })} placeholder="e.g. 12500" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }} />
                                </div>
                            </div>

                            {/* Fuel & Oil Levels */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'var(--color-gray-100)', borderRadius: 'var(--radius-md)' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>⛽ Fuel Level</label>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {[20, 40, 60, 80, 100].map(level => (
                                            <button key={level} onClick={() => setFuelLevel(level)} style={{
                                                flex: 1, padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600,
                                                background: fuelLevel === level ? '#FF9800' : 'white',
                                                color: fuelLevel === level ? 'white' : 'var(--text-secondary)',
                                            }}>{level}%</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>🛢️ Engine Oil Level</label>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {[20, 40, 60, 80, 100].map(level => (
                                            <button key={level} onClick={() => setOilLevel(level)} style={{
                                                flex: 1, padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600,
                                                background: oilLevel === level ? '#4CAF50' : 'white',
                                                color: oilLevel === level ? 'white' : 'var(--text-secondary)',
                                            }}>{level}%</button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Customer Voice */}
                            <div style={{ marginTop: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'rgba(156, 39, 176, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(156, 39, 176, 0.2)' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '1rem' }}>🗣️ Customer Voice (Complaint/Request)</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                                    {customerVoiceOptions.map((opt) => (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={() => {
                                                const current = customerVoice || '';
                                                const newValue = current ? `${current}, ${opt.name}` : opt.name;
                                                setCustomerVoice(newValue);
                                            }}
                                            style={{
                                                padding: '6px 12px',
                                                fontSize: '0.8rem',
                                                background: customerVoice?.includes(opt.name) ? 'rgba(156, 39, 176, 0.2)' : 'white',
                                                border: customerVoice?.includes(opt.name) ? '1px solid #9C27B0' : '1px solid var(--color-gray-300)',
                                                borderRadius: '16px',
                                                cursor: 'pointer',
                                                color: customerVoice?.includes(opt.name) ? '#9C27B0' : 'var(--text-primary)',
                                                transition: 'all 0.2s',
                                                fontWeight: customerVoice?.includes(opt.name) ? 600 : 400,
                                            }}
                                        >
                                            {opt.name}
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    value={customerVoice}
                                    onChange={(e) => setCustomerVoice(e.target.value)}
                                    rows={2}
                                    placeholder="Describe customer's complaint or click options above..."
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)', resize: 'vertical' }}
                                />
                            </div>

                            {/* Vehicle Intake Photos */}
                            <div style={{ marginTop: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'var(--color-gray-100)', borderRadius: 'var(--radius-md)' }}>
                                <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    📸 Vehicle Photos
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>(Capture vehicle condition - max 4)</span>
                                </h4>
                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    {vehiclePhotos.map((photo, idx) => (
                                        <div key={photo.id} style={{ position: 'relative' }}>
                                            <div style={{ width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '2px solid var(--color-gray-200)' }}>
                                                <img src={photo.url} alt={photo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <button onClick={() => handleRemoveVehiclePhoto(photo.id)} style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#F44336', color: 'white', border: 'none', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>×</button>
                                            <div style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>Photo {idx + 1}</div>
                                        </div>
                                    ))}
                                    {vehiclePhotos.length < 4 && (
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button onClick={() => vehiclePhotoInputRef.current?.click()} style={{
                                                width: '100px', height: '100px', border: '2px dashed var(--color-primary)', borderRadius: '8px',
                                                background: 'rgba(0, 184, 212, 0.05)', cursor: 'pointer', display: 'flex', flexDirection: 'column',
                                                alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--color-primary)',
                                            }}>
                                                <span style={{ fontSize: '1.8rem' }}>📷</span>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>Take / Add</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <input ref={vehiclePhotoInputRef} type="file" accept="image/*" capture="environment" onChange={handleVehiclePhotoUpload} style={{ display: 'none' }} />
                                {vehiclePhotos.length > 0 && (
                                    <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#4CAF50' }}>✓ {vehiclePhotos.length} photo(s) added</div>
                                )}
                            </div>

                            {/* Service Type */}
                            <div style={{ marginTop: 'var(--spacing-lg)' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>Service Type *</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <select
                                        value={selectedServiceType}
                                        onChange={(e) => setSelectedServiceType(e.target.value)}
                                        style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-gray-200)', flex: 1, minWidth: '200px' }}
                                    >
                                        {serviceTypesList.length > 0 ? (
                                            serviceTypesList.map(s => <option key={s._id} value={s.name}>{s.name}</option>)
                                        ) : (
                                            <option value="Quick Service">Quick Service</option>
                                        )}
                                    </select>
                                    <button type="button" onClick={() => setShowAddServiceTypeModal(true)} style={{ padding: '8px 16px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}>+ New</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Estimate */}
                    {currentStep === 2 && (
                        <div>
                            <h3 style={{ marginBottom: 'var(--spacing-lg)', fontSize: '1.1rem', fontWeight: 600 }}>📝 Estimate</h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
                                {/* Labour Items */}
                                <div>
                                    <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.95rem', fontWeight: 600 }}>Labour Items</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
                                        {labourItems.map(item => (
                                            <button key={item.id} onClick={() => handleAddLabour(item)} style={{
                                                padding: '8px 12px', border: '1px solid var(--color-gray-200)', borderRadius: '6px',
                                                background: estimateLabour.find(l => l.id === item.id) ? 'var(--color-primary)' : 'white',
                                                color: estimateLabour.find(l => l.id === item.id) ? 'white' : 'var(--text-primary)',
                                                cursor: 'pointer', fontSize: '0.85rem',
                                            }}>
                                                {item.name} (₹{item.rate})
                                            </button>
                                        ))}
                                    </div>
                                    {estimateLabour.length > 0 && (
                                        <div style={{ background: 'var(--color-gray-100)', borderRadius: '8px', padding: 'var(--spacing-sm)' }}>
                                            {estimateLabour.map(item => (
                                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid white' }}>
                                                    <span>{item.name}</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ fontWeight: 600 }}>₹{item.rate * item.qty}</span>
                                                        <button onClick={() => handleRemoveLabour(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F44336' }}>×</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Spare Parts */}
                                <div>
                                    <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.95rem', fontWeight: 600 }}>Spare Parts</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
                                        {spareItems.map(item => (
                                            <button key={item.id} onClick={() => handleAddPart(item)} style={{
                                                padding: '8px 12px', border: '1px solid var(--color-gray-200)', borderRadius: '6px',
                                                background: estimateParts.find(p => p.id === item.id) ? '#FF9800' : 'white',
                                                color: estimateParts.find(p => p.id === item.id) ? 'white' : 'var(--text-primary)',
                                                cursor: 'pointer', fontSize: '0.85rem',
                                            }}>
                                                {item.name} (₹{item.rate})
                                            </button>
                                        ))}
                                    </div>
                                    {estimateParts.length > 0 && (
                                        <div style={{ background: 'var(--color-gray-100)', borderRadius: '8px', padding: 'var(--spacing-sm)' }}>
                                            {estimateParts.map(item => (
                                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid white' }}>
                                                    <span>{item.name}</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <input type="number" value={item.qty} min={1} onChange={(e) => setEstimateParts(estimateParts.map(p => p.id === item.id ? { ...p, qty: parseInt(e.target.value) || 1 } : p))} style={{ width: '50px', padding: '4px', borderRadius: '4px', border: '1px solid var(--color-gray-200)', textAlign: 'center' }} />
                                                        <span style={{ fontWeight: 600 }}>₹{item.rate * item.qty}</span>
                                                        <button onClick={() => handleRemovePart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F44336' }}>×</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Totals */}
                            <div style={{ marginTop: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'var(--color-gray-100)', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Labour Total</span><span style={{ fontWeight: 600 }}>₹{calculateTotals().labourTotal}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Parts Total</span><span style={{ fontWeight: 600 }}>₹{calculateTotals().partsTotal}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderTop: '1px solid var(--color-gray-200)', paddingTop: '8px' }}>
                                    <span>Subtotal</span><span style={{ fontWeight: 600 }}>₹{calculateTotals().subtotal}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                                    <span>Estimate Total</span><span>₹{calculateTotals().subtotal}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Spare Requests */}
                    {currentStep === 3 && (
                        <div>
                            <h3 style={{ marginBottom: 'var(--spacing-lg)', fontSize: '1.1rem', fontWeight: 600 }}>🔧 Spare Requests</h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
                                {/* Available Spares */}
                                <div>
                                    <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.95rem', fontWeight: 600 }}>Available Inventory</h4>
                                    <div style={{ background: 'var(--color-gray-100)', borderRadius: '8px' }}>
                                        {spareItems.map(item => (
                                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid white' }}>
                                                <div>
                                                    <div style={{ fontWeight: 500 }}>{item.name}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Stock: {item.stock} | ₹{item.rate}</div>
                                                </div>
                                                <button onClick={() => handleRequestSpare(item)} disabled={spareRequests.find(r => r.id === item.id)} style={{
                                                    padding: '6px 12px', border: 'none', borderRadius: '6px', cursor: 'pointer',
                                                    background: spareRequests.find(r => r.id === item.id) ? 'var(--color-gray-200)' : 'var(--color-primary)',
                                                    color: spareRequests.find(r => r.id === item.id) ? 'var(--text-muted)' : 'white',
                                                }}>
                                                    {spareRequests.find(r => r.id === item.id) ? 'Requested' : 'Request'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Requested Spares */}
                                <div>
                                    <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.95rem', fontWeight: 600 }}>Requested Spares ({spareRequests.length})</h4>
                                    {spareRequests.length === 0 ? (
                                        <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--color-gray-100)', borderRadius: '8px' }}>
                                            No spare requests yet
                                        </div>
                                    ) : (
                                        <div style={{ background: 'var(--color-gray-100)', borderRadius: '8px' }}>
                                            {spareRequests.map(item => (
                                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid white' }}>
                                                    <div>
                                                        <div style={{ fontWeight: 500 }}>{item.name}</div>
                                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Qty: {item.qty} | ₹{item.rate * item.qty}</div>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{
                                                            padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600,
                                                            background: item.status === 'approved' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                                                            color: item.status === 'approved' ? '#4CAF50' : '#FF9800',
                                                        }}>
                                                            {item.status === 'approved' ? '✓ Approved' : '⏳ Pending'}
                                                        </span>
                                                        {item.status !== 'approved' && (
                                                            <button onClick={() => handleApproveSpare(item.id)} style={{ padding: '4px 10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Approve</button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Advance Payment Section */}
                                <div style={{ gridColumn: 'span 2', marginTop: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'rgba(76, 175, 80, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(76, 175, 80, 0.2)' }}>
                                    <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1rem', fontWeight: 600, color: '#4CAF50' }}>💰 Advance Payment</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--spacing-md)' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Advance Amount (₹)</label>
                                            <input
                                                type="number"
                                                value={advanceAmount}
                                                onChange={(e) => setAdvanceAmount(parseFloat(e.target.value) || 0)}
                                                placeholder="0.00"
                                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 500 }}>Payment Mode</label>
                                            <select
                                                value={advanceMethod}
                                                onChange={(e) => setAdvanceMethod(e.target.value)}
                                                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)' }}
                                            >
                                                <option value="">Select Mode</option>
                                                <option value="Cash">Cash</option>
                                                <option value="Card">Card</option>
                                                <option value="UPI">UPI</option>
                                            </select>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Balance Due</span>
                                            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#4CAF50' }}>₹{calculateTotals().balanceDue.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Summary & Delivery */}
                    {currentStep === 4 && (
                        <div>
                            <h3 style={{ marginBottom: 'var(--spacing-lg)', fontSize: '1.1rem', fontWeight: 600 }}>✅ Summary & Delivery</h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
                                {/* Left Column */}
                                <div>
                                    {/* Photos */}
                                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                        <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            📸 Service Photos <span style={{ color: '#F44336', fontSize: '0.8rem' }}>*Mandatory (1-4)</span>
                                        </h4>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                                            {photos.map(photo => (
                                                <div key={photo.id} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '2px solid var(--color-gray-200)' }}>
                                                    <img src={photo.url} alt={photo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    <button onClick={() => handleRemovePhoto(photo.id)} style={{ position: 'absolute', top: '2px', right: '2px', background: '#F44336', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '0.7rem' }}>×</button>
                                                </div>
                                            ))}
                                            {photos.length < 4 && (
                                                <button onClick={() => fileInputRef.current?.click()} style={{
                                                    width: '80px', height: '80px', border: '2px dashed var(--color-gray-300)', borderRadius: '8px',
                                                    background: 'var(--color-gray-100)', cursor: 'pointer', display: 'flex', flexDirection: 'column',
                                                    alignItems: 'center', justifyContent: 'center', gap: '4px', color: 'var(--text-muted)',
                                                }}>
                                                    <span style={{ fontSize: '1.5rem' }}>📷</span>
                                                    <span style={{ fontSize: '0.7rem' }}>Add</span>
                                                </button>
                                            )}
                                        </div>
                                        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotoUpload} style={{ display: 'none' }} />
                                        {photos.length === 0 && <p style={{ color: '#F44336', fontSize: '0.8rem' }}>⚠️ At least 1 photo required for delivery</p>}
                                    </div>

                                    {/* Signatures */}
                                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                        <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.95rem', fontWeight: 600 }}>✍️ Digital Signatures</h4>
                                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                                            <div
                                                onClick={() => !isDelivered && setActiveSignaturePad('customer')}
                                                style={{
                                                    flex: 1, height: '100px', border: '2px dashed', borderRadius: '8px', cursor: isDelivered ? 'not-allowed' : 'pointer',
                                                    borderColor: customerSignature ? '#4CAF50' : 'var(--color-gray-300)',
                                                    background: customerSignature ? 'rgba(76, 175, 80, 0.05)' : 'white',
                                                    color: customerSignature ? '#4CAF50' : 'var(--text-muted)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                                                }}
                                            >
                                                {customerSignature ? (
                                                    <img src={customerSignature} alt="Customer" style={{ maxHeight: '90%', maxWidth: '90%' }} />
                                                ) : (
                                                    <span style={{ fontSize: '0.85rem' }}>👤 Customer Signature</span>
                                                )}
                                            </div>
                                            <div
                                                onClick={() => !isDelivered && setActiveSignaturePad('advisor')}
                                                style={{
                                                    flex: 1, height: '100px', border: '2px dashed', borderRadius: '8px', cursor: isDelivered ? 'not-allowed' : 'pointer',
                                                    borderColor: advisorSignature ? '#4CAF50' : 'var(--color-gray-300)',
                                                    background: advisorSignature ? 'rgba(76, 175, 80, 0.05)' : 'white',
                                                    color: advisorSignature ? '#4CAF50' : 'var(--text-muted)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                                                }}
                                            >
                                                {advisorSignature ? (
                                                    <img src={advisorSignature} alt="Advisor" style={{ maxHeight: '90%', maxWidth: '90%' }} />
                                                ) : (
                                                    <span style={{ fontSize: '0.85rem' }}>👨‍💼 Advisor Signature</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Signature Pad Modal */}
                                        {activeSignaturePad && (
                                            <SignaturePad
                                                title={activeSignaturePad === 'customer' ? 'Customer Signature' : 'Advisor Signature'}
                                                onSave={(data) => {
                                                    if (activeSignaturePad === 'customer') setCustomerSignature(data);
                                                    else setAdvisorSignature(data);
                                                    setActiveSignaturePad(null);
                                                }}
                                                onCancel={() => setActiveSignaturePad(null)}
                                            />
                                        )}
                                    </div>

                                    {/* Payment Status */}
                                    <div>
                                        <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.95rem', fontWeight: 600 }}>💳 Payment Status</h4>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {[{ id: 'pending', label: 'Pending', color: '#FF9800' }, { id: 'paid', label: 'Paid', color: '#4CAF50' }, { id: 'approved', label: 'Approved Later', color: '#2196F3' }].map(status => (
                                                <button key={status.id} onClick={() => setPaymentStatus(status.id)} style={{
                                                    flex: 1, padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500,
                                                    background: paymentStatus === status.id ? status.color : 'var(--color-gray-100)',
                                                    color: paymentStatus === status.id ? 'white' : 'var(--text-secondary)',
                                                }}>{status.label}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Billing */}
                                <div style={{ background: 'var(--color-gray-100)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-md)' }}>
                                    <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.95rem', fontWeight: 600 }}>🧾 Billing Summary</h4>
                                    <div style={{ fontSize: '0.9rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Labour</span><span>₹{calculateTotals().labourTotal}</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Parts</span><span>₹{calculateTotals().partsTotal}</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderTop: '1px solid var(--color-gray-200)', paddingTop: '8px' }}><span>Subtotal</span><span style={{ fontWeight: 600 }}>₹{calculateTotals().subtotal}</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>GST ({GST_PERCENT}%)</span><span>₹{calculateTotals().gst.toFixed(2)}</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                            <span>Discount</span>
                                            <input type="number" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} style={{ width: '80px', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--color-gray-200)', textAlign: 'right' }} />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, color: '#4CAF50', borderTop: '2px solid var(--color-gray-200)', paddingTop: '12px', marginTop: '8px' }}>
                                            <span>Grand Total</span><span>₹{calculateTotals().grandTotal.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Print Buttons */}
                                    <div style={{ display: 'flex', gap: '8px', marginTop: 'var(--spacing-md)' }}>
                                        <button style={{ flex: 1, padding: '10px', border: '1px solid var(--color-gray-200)', borderRadius: '6px', background: 'white', cursor: 'pointer' }}>🖨️ Estimate</button>
                                        <button style={{ flex: 1, padding: '10px', border: '1px solid var(--color-gray-200)', borderRadius: '6px', background: 'white', cursor: 'pointer' }}>🖨️ Job Sheet</button>
                                    </div>

                                    {/* Finalize Billing */}
                                    <button onClick={handleFinalizeBilling} disabled={billingFinalized} style={{
                                        width: '100%', padding: '12px', marginTop: 'var(--spacing-md)', border: 'none', borderRadius: '6px', cursor: billingFinalized ? 'not-allowed' : 'pointer', fontWeight: 600,
                                        background: billingFinalized ? 'rgba(76, 175, 80, 0.1)' : 'var(--color-primary)', color: billingFinalized ? '#4CAF50' : 'white',
                                    }}>
                                        {billingFinalized ? '✓ Billing Finalized' : '🔒 Finalize Billing'}
                                    </button>

                                    {/* Customer Notification */}
                                    <div style={{ marginTop: 'var(--spacing-md)', padding: 'var(--spacing-sm)', background: 'white', borderRadius: '8px' }}>
                                        <h5 style={{ margin: '0 0 8px 0', fontSize: '0.85rem', fontWeight: 600 }}>📢 Notify Customer</h5>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button onClick={() => handleSendNotification('whatsapp')} disabled={notificationSent.whatsapp} style={{
                                                flex: 1, padding: '10px', border: 'none', borderRadius: '6px', cursor: notificationSent.whatsapp ? 'not-allowed' : 'pointer', fontWeight: 500,
                                                background: notificationSent.whatsapp ? 'rgba(37, 211, 102, 0.1)' : '#25D366', color: notificationSent.whatsapp ? '#25D366' : 'white',
                                            }}>
                                                {notificationSent.whatsapp ? '✓ WhatsApp Sent' : '📱 WhatsApp'}
                                            </button>
                                            <button onClick={() => handleSendNotification('email')} disabled={notificationSent.email} style={{
                                                flex: 1, padding: '10px', border: 'none', borderRadius: '6px', cursor: notificationSent.email ? 'not-allowed' : 'pointer', fontWeight: 500,
                                                background: notificationSent.email ? 'rgba(33, 150, 243, 0.1)' : '#2196F3', color: notificationSent.email ? '#2196F3' : 'white',
                                            }}>
                                                {notificationSent.email ? '✓ Email Sent' : '✉️ Email'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Delivery Checklist */}
                                    <div style={{ marginTop: 'var(--spacing-md)', padding: 'var(--spacing-sm)', background: 'white', borderRadius: '8px' }}>
                                        <h5 style={{ margin: '0 0 8px 0', fontSize: '0.85rem', fontWeight: 600 }}>🚚 Delivery Checklist</h5>
                                        <div style={{ fontSize: '0.8rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: photos.length >= 1 ? '#4CAF50' : '#F44336' }}>{photos.length >= 1 ? '✓' : '×'} Photos uploaded ({photos.length}/1)</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: billingFinalized ? '#4CAF50' : '#F44336' }}>{billingFinalized ? '✓' : '×'} Billing finalized</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: customerSignature ? '#4CAF50' : '#F44336' }}>{customerSignature ? '✓' : '×'} Customer signature</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: advisorSignature ? '#4CAF50' : '#F44336' }}>{advisorSignature ? '✓' : '×'} Advisor signature</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: paymentStatus !== 'pending' ? '#4CAF50' : '#F44336' }}>{paymentStatus !== 'pending' ? '✓' : '×'} Payment verified</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-lg)' }}>
                    <button
                        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                        disabled={currentStep === 1 || isDelivered}
                        style={{
                            padding: '12px 24px', borderRadius: '8px', border: '1px solid var(--color-gray-200)',
                            background: 'white', cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                            opacity: currentStep === 1 ? 0.5 : 1,
                        }}
                    >
                        ← Back
                    </button>

                    {currentStep < 4 ? (
                        <button
                            onClick={handleNextStep}
                            disabled={(currentStep === 1 && !isStep1Valid) || isLoading}
                            className="btn btn-primary"
                            style={{ padding: '12px 32px', opacity: (currentStep === 1 && !isStep1Valid) || isLoading ? 0.5 : 1 }}
                        >
                            {isLoading ? 'Saving...' : 'Next →'}
                        </button>
                    ) : (
                        <button
                            onClick={handleMarkDelivered}
                            disabled={!canDeliver || isDelivered || isLoading}
                            style={{
                                padding: '12px 32px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: canDeliver && !isDelivered ? 'pointer' : 'not-allowed',
                                background: canDeliver && !isDelivered ? '#4CAF50' : 'var(--color-gray-200)',
                                color: canDeliver && !isDelivered ? 'white' : 'var(--text-muted)',
                            }}
                        >
                            {isLoading ? 'Saving...' : isDelivered ? '🔒 Delivered' : '🚚 Mark Delivered'}
                        </button>
                    )}
                </div>
            </div>

            {/* Add Service Type Modal */}
            {
                showAddServiceTypeModal && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                        <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '450px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
                            <div style={{ padding: '24px', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>🛠️ Add Service Type</h3>
                                <button onClick={() => setShowAddServiceTypeModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
                            </div>
                            <div style={{ padding: '24px' }}>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 500 }}>Service Name *</label>
                                    <input type="text" placeholder="e.g. Full Body Wash" value={newServiceTypeData.name} onChange={(e) => setNewServiceTypeData({ ...newServiceTypeData, name: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)', fontSize: '0.9rem' }} />
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 500 }}>Labour Rate (₹) *</label>
                                    <input type="number" placeholder="0.00" value={newServiceTypeData.ratePerHour} onChange={(e) => setNewServiceTypeData({ ...newServiceTypeData, ratePerHour: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)', fontSize: '0.9rem' }} />
                                </div>
                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 500 }}>Description</label>
                                    <textarea placeholder="Optional description..." value={newServiceTypeData.description} onChange={(e) => setNewServiceTypeData({ ...newServiceTypeData, description: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)', fontSize: '0.9rem', minHeight: '80px', resize: 'vertical' }} />
                                </div>

                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button type="button" onClick={() => setShowAddServiceTypeModal(false)} style={{ flex: 1, padding: '12px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Cancel</button>
                                    <button type="button" onClick={handleSaveNewServiceType} disabled={isSavingServiceType} style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '8px', background: 'var(--color-primary)', color: 'white', cursor: isSavingServiceType ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: isSavingServiceType ? 0.7 : 1 }}>{isSavingServiceType ? 'Saving...' : '✅ Save & Select'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}
