'use client';

import { useState, useRef, useEffect } from 'react';
import SignaturePad from '@/components/SignaturePad';

// Status pipeline with colors
const statuses = [
    { id: 'new', name: 'New', color: '#2196F3', bg: 'rgba(33, 150, 243, 0.1)' },
    { id: 'inspection', name: 'Inspection', color: '#9C27B0', bg: 'rgba(156, 39, 176, 0.1)' },
    { id: 'water_wash', name: 'Water Wash', color: '#03A9F4', bg: 'rgba(3, 169, 244, 0.1)' },
    { id: 'technician_allocation', name: 'Tech Allocation', color: '#00BCD4', bg: 'rgba(0, 188, 212, 0.1)' },
    { id: 'parts_ordered', name: 'Parts Ordered', color: '#FF5722', bg: 'rgba(255, 87, 34, 0.1)' },
    { id: 'work_in_progress', name: 'Work In Progress', color: '#FF9800', bg: 'rgba(255, 152, 0, 0.1)' },
    { id: 'final_inspection', name: 'Final Inspection', color: '#795548', bg: 'rgba(121, 85, 72, 0.1)' },
    { id: 'completed', name: 'Completed', color: '#4CAF50', bg: 'rgba(76, 175, 80, 0.1)' },
    { id: 'delivered', name: 'Delivered', color: '#607D8B', bg: 'rgba(96, 125, 139, 0.1)' },
];

// Sample customers and technicians
const sampleCustomers = [
    { id: 1, name: 'Rahul Sharma', phone: '9876543210', vehicles: [{ id: 1, registrationNo: 'MH 01 AB 1234', brand: 'Honda', model: 'Activa 6G' }, { id: 2, registrationNo: 'MH 01 CD 5678', brand: 'TVS', model: 'Jupiter' }] },
    { id: 2, name: 'Priya Patel', phone: '9876543211', vehicles: [{ id: 3, registrationNo: 'MH 02 EF 9012', brand: 'Bajaj', model: 'Pulsar 150' }] },
    { id: 3, name: 'Amit Kumar', phone: '9876543212', vehicles: [{ id: 4, registrationNo: 'MH 03 GH 3456', brand: 'Royal Enfield', model: 'Classic 350' }] },
];

const technicians = [
    { id: 1, name: 'Ravi Kumar', specialty: 'Engine Specialist' },
    { id: 2, name: 'Suresh M', specialty: 'Electrical Work' },
    { id: 3, name: 'Deepak P', specialty: 'General Service' },
    { id: 4, name: 'Manoj K', specialty: 'Body Work' },
];

const serviceTypes = ['General Service', 'Oil Change', 'Brake Service', 'Engine Repair', 'Electrical Work', 'Water Wash', 'Quick Service'];

const labourItems = [
    { id: 1, name: 'General Service Labour', rate: 500 },
    { id: 2, name: 'Oil Change Labour', rate: 150 },
    { id: 3, name: 'Brake Adjustment', rate: 200 },
    { id: 4, name: 'Chain Cleaning', rate: 100 },
    { id: 5, name: 'Air Filter Service', rate: 80 },
    { id: 6, name: 'Electrical Check', rate: 250 },
];

const initialSpareItems = [];

// Master Data - Customer Voice (from Settings/Master Data)
const masterCustomerVoice = [
    { id: 1, name: 'Engine making noise', category: 'Engine', description: 'Unusual sounds from engine', isActive: true },
    { id: 2, name: 'Engine not starting', category: 'Engine', description: 'Vehicle fails to start', isActive: true },
    { id: 3, name: 'Engine overheating', category: 'Engine', description: 'Engine temperature too high', isActive: true },
    { id: 4, name: 'Low mileage', category: 'Engine', description: 'Fuel efficiency reduced', isActive: true },
    { id: 5, name: 'Brake noise', category: 'Brakes', description: 'Squealing or grinding brakes', isActive: true },
    { id: 6, name: 'Brake not working properly', category: 'Brakes', description: 'Reduced braking performance', isActive: true },
    { id: 7, name: 'Headlight not working', category: 'Electrical', description: 'Front light issue', isActive: true },
    { id: 8, name: 'Indicator not working', category: 'Electrical', description: 'Turn signal issue', isActive: true },
    { id: 9, name: 'Horn not working', category: 'Electrical', description: 'Horn malfunction', isActive: true },
    { id: 10, name: 'Battery not charging', category: 'Electrical', description: 'Charging system issue', isActive: true },
    { id: 11, name: 'Scratches on body', category: 'Body', description: 'Body damage or scratches', isActive: true },
    { id: 12, name: 'Vibration at high speed', category: 'Suspension', description: 'Unusual vibrations', isActive: true },
    { id: 13, name: 'Gear shifting problem', category: 'Transmission', description: 'Difficulty changing gears', isActive: true },
    { id: 14, name: 'Clutch slipping', category: 'Transmission', description: 'Clutch not engaging properly', isActive: true },
    { id: 15, name: 'General service required', category: 'General', description: 'Routine maintenance', isActive: true },
];

// Master Data - Advisor Voice (from Settings/Master Data)
const masterAdvisorVoice = [
    { id: 1, name: 'Oil change recommended', category: 'Maintenance', description: 'Engine oil needs replacement', isActive: true },
    { id: 2, name: 'Air filter dirty', category: 'Inspection', description: 'Air filter needs cleaning/replacement', isActive: true },
    { id: 3, name: 'Brake pads worn', category: 'Safety', description: 'Brake pads need replacement', isActive: true },
    { id: 4, name: 'Chain needs adjustment', category: 'Maintenance', description: 'Chain tension incorrect', isActive: true },
    { id: 5, name: 'Tyre worn out', category: 'Safety', description: 'Tyre replacement recommended', isActive: true },
    { id: 6, name: 'Battery weak', category: 'Inspection', description: 'Battery showing low voltage', isActive: true },
    { id: 7, name: 'Spark plug fouled', category: 'Inspection', description: 'Spark plug needs cleaning/replacement', isActive: true },
    { id: 8, name: 'Coolant level low', category: 'Inspection', description: 'Coolant top-up required', isActive: true },
    { id: 9, name: 'Suspension check needed', category: 'Recommendation', description: 'Suspension components need inspection', isActive: true },
    { id: 10, name: 'Wheel alignment required', category: 'Recommendation', description: 'Wheels need alignment', isActive: true },
    { id: 11, name: 'Cable replacement needed', category: 'Repair', description: 'Control cables worn out', isActive: true },
    { id: 12, name: 'Full service done', category: 'General', description: 'Complete service performed', isActive: true },
];

// Master Data - Service Intervals
const NEXT_SERVICE_KM_INTERVAL = 3000; // Oil change km
const NEXT_SERVICE_DAYS_INTERVAL = 90; // Service due in days

// Get unique categories
const customerVoiceCategories = ['All', ...new Set(masterCustomerVoice.map(item => item.category))];
const advisorVoiceCategories = ['All', ...new Set(masterAdvisorVoice.map(item => item.category))];

// Default states for 7-step process
const defaultInspection = {
    engineOil: 'Normal',
    brakeFluid: 'Normal',
    coolant: 'Normal',
    brakePads: 'Good',
    tires: 'Good',
    battery: 'Good',
    lights: 'Functional',
    filters: 'Clean'
};

const defaultNextService = {
    advice: '',
    dueDate: '',
    dueOdometer: ''
};

const defaultDelivery = {
    status: 'not_ready', readyAt: null, gatePassNo: ''
};

const defaultSignatures = {
    customer: null,
    advisor: null
};

// Sample job cards
const generateSampleJobCards = () => {
    const today = new Date();
    return [
        {
            id: 'JC-001', type: 'service', customerId: 1, customerName: 'Rahul Sharma', phone: '9876543210', vehicleId: 1, vehicleInfo: 'Honda Activa 6G (MH 01 AB 1234)', batteryNo: 'BAT-2023-001', serviceType: 'General Service', status: 'technician', odometer: 12500, fuelLevel: 50, oilLevel: 'Low', customerVoice: 'Engine making noise', advisorVoice: null, advisorVoiceUrl: null, estimatedAmount: 2500, advanceAmount: 500, advanceMethod: 'CASH', technicianId: 1, technicianName: 'Ravi Kumar', labourItems: [{ id: 1, name: 'General Service Labour', rate: 500, qty: 1 }], spareRequests: [{ id: 1, name: 'Engine Oil 1L', rate: 450, qty: 2, status: 'approved' }], estimateSent: { print: true, whatsapp: true, email: false }, isLocked: false, createdAt: new Date(today - 2 * 24 * 60 * 60 * 1000),
            inspection: { ...defaultInspection },
            outsideWork: [],
            nextService: { ...defaultNextService },
            delivery: { ...defaultDelivery },
            signatures: { ...defaultSignatures }
        },
        {
            id: 'JC-002', type: 'quick', customerId: 2, customerName: 'Priya Patel', phone: '9876543211', vehicleId: 3, vehicleInfo: 'Bajaj Pulsar 150 (MH 02 EF 9012)', batteryNo: '', serviceType: 'Oil Change', status: 'new', estimatedAmount: 800, advanceAmount: 0, advanceMethod: '', technicianId: null, technicianName: '', labourItems: [], spareRequests: [], estimateSent: { print: false, whatsapp: false, email: false }, isLocked: false, createdAt: new Date(today - 1 * 60 * 60 * 1000),
            inspection: { ...defaultInspection },
            outsideWork: [],
            nextService: { ...defaultNextService },
            delivery: { ...defaultDelivery },
            signatures: { ...defaultSignatures }
        },
        {
            id: 'JC-003', type: 'service', customerId: 3, customerName: 'Amit Kumar', phone: '9876543212', vehicleId: 4, vehicleInfo: 'Royal Enfield Classic 350 (MH 03 GH 3456)', batteryNo: 'BAT-2022-045', serviceType: 'Brake Service', status: 'completed', odometer: 8900, fuelLevel: 75, oilLevel: 'Normal', customerVoice: 'Front brake squeaking', advisorVoice: null, advisorVoiceUrl: null, estimatedAmount: 3500, advanceAmount: 1000, advanceMethod: 'UPI', technicianId: 2, technicianName: 'Suresh M', labourItems: [{ id: 3, name: 'Brake Adjustment', rate: 200, qty: 1 }], spareRequests: [{ id: 4, name: 'Brake Pads (Set)', rate: 650, qty: 1, status: 'approved' }], estimateSent: { print: true, whatsapp: true, email: true }, isLocked: true, createdAt: new Date(today - 1 * 24 * 60 * 60 * 1000),
            inspection: { ...defaultInspection },
            outsideWork: [],
            nextService: { ...defaultNextService },
            delivery: { ...defaultDelivery },
            signatures: { ...defaultSignatures }
        },
    ];
};

export default function JobCardsPage() {
    const [jobCards, setJobCards] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [vehiclesList, setVehiclesList] = useState([]);
    const [techniciansList, setTechniciansList] = useState([]);
    const [partsList, setPartsList] = useState([]);
    const [serviceTypesList, setServiceTypesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [spareItems, setSpareItems] = useState(initialSpareItems);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [jcRes, custRes, vehRes, staffRes, partsRes, rolesRes, serviceTypesRes] = await Promise.all([
                fetch('/api/job-cards'),
                fetch('/api/customers'),
                fetch('/api/vehicles'),
                fetch('/api/staff'),
                fetch('/api/parts'),
                fetch('/api/roles'),
                fetch('/api/service-types')
            ]);
            if (jcRes.ok) setJobCards(await jcRes.json());
            if (custRes.ok) setCustomers(await custRes.json());
            if (vehRes.ok) setVehiclesList(await vehRes.json());

            // Filter staff based on roles with canAssignJobs: true
            if (staffRes.ok && rolesRes.ok) {
                const allStaff = await staffRes.json();
                const allRoles = await rolesRes.json();
                const assignableRoles = allRoles.filter(r => r.canAssignJobs).map(r => r.name);
                setTechniciansList(allStaff.filter(s => assignableRoles.includes(s.role)));
            }

            if (partsRes.ok) {
                const parts = await partsRes.json();
                setSpareItems(parts.map(p => ({
                    id: p._id,
                    name: p.name,
                    rate: p.salePrice,
                    stock: p.stock,
                    partNumber: p.partNumber
                })));
            }

            if (serviceTypesRes.ok) {
                setServiceTypesList(await serviceTypesRes.json());
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [viewMode, setViewMode] = useState('kanban');
    const [showFullModal, setShowFullModal] = useState(false);
    const [editingJobCard, setEditingJobCard] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('details');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [draggedCard, setDraggedCard] = useState(null);
    const [dragOverStatus, setDragOverStatus] = useState(null);
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [printJobCard, setPrintJobCard] = useState(null);
    const [printCopyType, setPrintCopyType] = useState('customer');
    const [vehiclePhotos, setVehiclePhotos] = useState([]);
    const [showPhotoViewer, setShowPhotoViewer] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    // Inline Customer/Vehicle Creation
    const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
    const [newCustomerData, setNewCustomerData] = useState({ name: '', phone: '', email: '', address: '' });
    const [newVehicleData, setNewVehicleData] = useState({ registrationNo: '', brand: '', model: '', color: '' });
    const [isSavingCustomer, setIsSavingCustomer] = useState(false);

    // Inline Service Type Creation
    const [showAddServiceTypeModal, setShowAddServiceTypeModal] = useState(false);
    const [newServiceTypeData, setNewServiceTypeData] = useState({ name: '', ratePerHour: '', description: '' });
    const [isSavingServiceType, setIsSavingServiceType] = useState(false);
    // Voice search and dropdown states
    const [customerVoiceSearch, setCustomerVoiceSearch] = useState('');
    const [customerVoiceCategory, setCustomerVoiceCategory] = useState('All');
    const [showCustomerVoiceDropdown, setShowCustomerVoiceDropdown] = useState(false);
    const [advisorVoiceSearch, setAdvisorVoiceSearch] = useState('');
    const [advisorVoiceCategory, setAdvisorVoiceCategory] = useState('All');
    const [showAdvisorVoiceDropdown, setShowAdvisorVoiceDropdown] = useState(false);
    const voiceInputRef = useRef(null);
    const vehiclePhotoInputRef = useRef(null);
    const customerVoiceRef = useRef(null);
    const advisorVoiceRef = useRef(null);
    const [activeSignaturePad, setActiveSignaturePad] = useState(null); // 'customer' or 'advisor' or null
    const [spareSearchTerm, setSpareSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        customerId: '', vehicleId: '', serviceType: '', estimatedAmount: '', batteryNo: '',
        odometer: '', fuelLevel: 50, oilLevel: 'Normal', customerVoice: '', advisorVoice: null, advisorVoiceUrl: '',
        advanceAmount: '', advanceMethod: '', technicianId: '', labourItems: [], spareRequests: [],
        estimateSent: { print: false, whatsapp: false, email: false }, isLocked: false,

        // New sections for 7-step process
        inspection: { ...defaultInspection },
        outsideWork: [],
        nextService: { ...defaultNextService },
        delivery: { ...defaultDelivery },
        signatures: { ...defaultSignatures }
    });

    const handleFullJobCard = () => {
        setEditingJobCard(null);
        setSelectedCustomer(null);
        setActiveTab('details');
        setFormData({
            customerId: '', vehicleId: '', serviceType: '', estimatedAmount: '', batteryNo: '',
            odometer: '', fuelLevel: 50, oilLevel: 'Normal', customerVoice: '', advisorVoice: null, advisorVoiceUrl: '',
            advanceAmount: '', advanceMethod: '', technicianId: '', labourItems: [], spareRequests: [],
            estimateSent: { print: false, whatsapp: false, email: false }, isLocked: false,
            inspection: { ...defaultInspection },
            outsideWork: [],
            nextService: { ...defaultNextService },
            delivery: { ...defaultDelivery },
            signatures: { ...defaultSignatures }
        });
        setShowFullModal(true);
    };

    const handleEdit = (jobCard) => {
        if (jobCard.isLocked) {
            alert('🔒 This job card is locked. No edits allowed after completion.');
            return;
        }
        setEditingJobCard(jobCard);

        // Extract IDs and force them to strings for reliable matching
        const customerId = String(jobCard.customerId?._id || jobCard.customerId || '');
        const vehicleId = String(jobCard.vehicleId?._id || jobCard.vehicleId || '');
        const technicianId = String(jobCard.technicianId?._id || jobCard.technicianId || '');

        // Use lenient matching for customer finding
        const customer = customers.find(c => String(c._id || c.id) === customerId);
        setSelectedCustomer(customer);
        setActiveTab('details');

        setFormData({
            customerId: customerId,
            vehicleId: vehicleId,
            serviceType: jobCard.serviceType || '',
            estimatedAmount: jobCard.estimatedAmount || '',
            batteryNo: jobCard.batteryNo || '',
            odometer: jobCard.odometer || '',
            fuelLevel: jobCard.fuelLevel || 50,
            oilLevel: jobCard.oilLevel || 'Normal',
            customerVoice: jobCard.customerVoice || '',
            advisorVoice: jobCard.advisorVoice || null,
            advisorVoiceUrl: jobCard.advisorVoiceUrl || '',
            advanceAmount: jobCard.advanceAmount || '',
            advanceMethod: jobCard.advanceMethod || '',
            technicianId: technicianId,
            labourItems: (jobCard.labourItems || []).map(item => ({ ...item, id: item.id || item._id })),
            spareRequests: (jobCard.spareRequests || []).map(item => ({ ...item, id: item.id || item._id })),
            estimateSent: jobCard.estimateSent || { print: false, whatsapp: false, email: false },
            isLocked: jobCard.isLocked || false,
            inspection: jobCard.inspection || { ...defaultInspection },
            outsideWork: (jobCard.outsideWork || []).map(item => ({ ...item, id: item.id || item._id })),
            nextService: jobCard.nextService || { ...defaultNextService },
            delivery: jobCard.delivery || { ...defaultDelivery },
            signatures: jobCard.signatures || { ...defaultSignatures }
        });
        setShowFullModal(true);
    };

    const handleOdometerChange = (value) => {
        const odo = parseInt(value) || 0;
        const nextOdo = odo + NEXT_SERVICE_KM_INTERVAL;

        // Calculate next due date (90 days from now)
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + NEXT_SERVICE_DAYS_INTERVAL);
        const dateString = nextDate.toISOString().split('T')[0];

        setFormData({
            ...formData,
            odometer: value,
            nextService: {
                ...formData.nextService,
                dueOdometer: nextOdo,
                dueDate: dateString
            }
        });
    };

    const generateJobCardId = () => `JC-${String(jobCards.length + 1).padStart(3, '0')}`;

    // Vehicle Photo handling functions
    const handleVehiclePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file && vehiclePhotos.length < 6) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newPhoto = {
                    id: Date.now(),
                    url: e.target.result,
                    name: file.name,
                    timestamp: new Date().toLocaleString(),
                };
                setVehiclePhotos([...vehiclePhotos, newPhoto]);
            };
            reader.readAsDataURL(file);
        }
        e.target.value = ''; // Reset input
    };

    const handleRemoveVehiclePhoto = (photoId) => {
        setVehiclePhotos(vehiclePhotos.filter(p => p.id !== photoId));
    };

    const openPhotoViewer = (index) => {
        setCurrentPhotoIndex(index);
        setShowPhotoViewer(true);
    };

    const nextPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev + 1) % vehiclePhotos.length);
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev - 1 + vehiclePhotos.length) % vehiclePhotos.length);
    };

    // Print job card using a new window to avoid CSS conflicts
    const handlePrintJobCard = () => {
        const printContent = document.getElementById('printable-jobcard');
        if (!printContent) return;

        const printWindow = window.open('', '_blank', 'width=900,height=700');
        if (!printWindow) {
            alert('Please allow popups to print the job card');
            return;
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Print Job Card - ${printJobCard?.id || 'Job Card'}</title>
                <style>
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body { 
                        font-family: 'Segoe UI', Arial, sans-serif; 
                        padding: 10mm; 
                        background: white;
                        color: #333;
                        line-height: 1.5;
                    }
                    h3 { color: #00B8D4; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; }
                    th { background: #f5f5f5; }
                    .print-page { page-break-after: always; }
                    .print-page:last-child { page-break-after: auto; }
                    @media print {
                        body { padding: 0; }
                        @page { size: A4; margin: 8mm; }
                    }
                </style>
            </head>
            <body>
                ${printContent.innerHTML}
            </body>
            </html>
        `);

        printWindow.document.close();

        // Wait for content to load then print
        setTimeout(() => {
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }, 250);
    };

    const handleFullSubmit = async (e) => {
        e.preventDefault();
        const customer = customers.find(c => c._id === formData.customerId);
        const tech = techniciansList.find(t => t._id === formData.technicianId);
        const vehicle = vehiclesList.find(v => v._id === formData.vehicleId);

        const newJobCard = {
            jobCardNo: editingJobCard?.jobCardNo || generateJobCardId(),
            type: 'service',
            customerId: formData.customerId,
            customerName: customer?.name || '',
            phone: customer?.phone || '',
            vehicleId: formData.vehicleId,
            vehicleInfo: vehicle ? `${vehicle.brand} ${vehicle.model} (${vehicle.registrationNo})` : '',
            batteryNo: formData.batteryNo,
            serviceType: formData.serviceType,
            status: editingJobCard?.status || 'new',
            estimatedAmount: calculateEstimate(), // Use live calculation for saving
            odometer: parseInt(formData.odometer) || 0,
            fuelLevel: formData.fuelLevel,
            oilLevel: formData.oilLevel,
            customerVoice: formData.customerVoice,
            advisorVoice: formData.advisorVoice,
            advisorVoiceUrl: formData.advisorVoiceUrl,
            advanceAmount: parseFloat(formData.advanceAmount) || 0,
            advanceMethod: formData.advanceMethod,
            technicianId: formData.technicianId || null,
            technicianName: tech?.name || '',
            labourItems: formData.labourItems,
            spareRequests: formData.spareRequests,
            estimateSent: formData.estimateSent,
            isLocked: formData.isLocked,
            inspection: formData.inspection,
            outsideWork: formData.outsideWork,
            nextService: formData.nextService,
            delivery: formData.delivery,
            signatures: formData.signatures,
            createdAt: editingJobCard?.createdAt || new Date(),
        };

        try {
            const body = editingJobCard ? { ...newJobCard, _id: editingJobCard._id } : newJobCard;
            const response = await fetch('/api/job-cards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                await fetchData();
                setShowFullModal(false);
                alert(`✅ Job Card ${editingJobCard ? 'updated' : 'created'} successfully!`);
            }
        } catch (error) {
            console.error('Save error:', error);
        }
    };

    const handleStatusChange = async (jobCardId, newStatus) => {
        try {
            const isLocked = ['completed', 'delivered'].includes(newStatus);
            const response = await fetch('/api/job-cards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id: jobCardId, status: newStatus, isLocked }),
            });
            if (response.ok) await fetchData();
        } catch (error) {
            console.error('Status change error:', error);
        }
    };


    const handleCustomerChange = (customerId) => {
        const customer = customers.find(c => c._id === customerId);
        setSelectedCustomer(customer);
        setFormData({ ...formData, customerId, vehicleId: '' });
    };

    const handleServiceTypeChange = (serviceName) => {
        const selectedType = serviceTypesList.find(s => s.name === serviceName);
        let updatedLabour = [...formData.labourItems];

        // If a rate exists and no labour item matches the service name, add it
        if (selectedType && selectedType.ratePerHour > 0) {
            const existingLabour = updatedLabour.find(l => l.name === serviceName);
            if (!existingLabour) {
                updatedLabour.push({
                    id: Date.now(),
                    name: serviceName,
                    rate: selectedType.ratePerHour,
                    qty: 1
                });
            }
        }

        setFormData({
            ...formData,
            serviceType: serviceName,
            labourItems: updatedLabour,
            estimatedAmount: calculateEstimate(updatedLabour) // Trigger recalculation with updated data
        });
    };

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

            setFormData({ ...formData, serviceType: savedType.name });
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

    // Save new customer and vehicle from inline modal
    const handleSaveNewCustomer = async () => {
        if (!newCustomerData.name || !newCustomerData.phone) {
            alert('Customer name and phone are required');
            return;
        }
        if (!newVehicleData.registrationNo || !newVehicleData.brand) {
            alert('Vehicle registration number and brand are required');
            return;
        }

        setIsSavingCustomer(true);
        try {
            // Save customer
            const custRes = await fetch('/api/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCustomerData)
            });

            if (!custRes.ok) {
                const err = await custRes.json();
                throw new Error(err.error || 'Failed to save customer');
            }

            const savedCustomer = await custRes.json();

            // Save vehicle with customer ID
            const vehRes = await fetch('/api/vehicles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newVehicleData,
                    customerId: savedCustomer._id
                })
            });

            if (!vehRes.ok) {
                const err = await vehRes.json();
                throw new Error(err.error || 'Failed to save vehicle');
            }

            const savedVehicle = await vehRes.json();

            // Refresh data and auto-select the new customer/vehicle
            await fetchData();

            setFormData({
                ...formData,
                customerId: savedCustomer._id,
                vehicleId: savedVehicle._id
            });
            setSelectedCustomer(savedCustomer);

            // Reset and close modal
            setNewCustomerData({ name: '', phone: '', email: '', address: '' });
            setNewVehicleData({ registrationNo: '', brand: '', model: '', color: '' });
            setShowAddCustomerModal(false);

            alert('✅ Customer and vehicle saved successfully!');
        } catch (error) {
            console.error('Save error:', error);
            alert('Error: ' + error.message);
        } finally {
            setIsSavingCustomer(false);
        }
    };

    // Voice recording
    const handleVoiceRecord = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    const mediaRecorder = new MediaRecorder(stream);
                    const audioChunks = [];
                    mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
                    mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                        const url = URL.createObjectURL(audioBlob);
                        setFormData({ ...formData, advisorVoice: audioBlob, advisorVoiceUrl: url });
                    };
                    mediaRecorder.start();
                    setTimeout(() => { mediaRecorder.stop(); stream.getTracks().forEach(t => t.stop()); }, 10000);
                    alert('🎙️ Recording started... (Max 10 seconds)');
                })
                .catch(() => alert('❌ Microphone access denied'));
        }
    };

    // Labour & Spare handlers
    const handleAddLabour = (item) => {
        if (!formData.labourItems.find(l => l.id === item.id)) {
            setFormData({ ...formData, labourItems: [...formData.labourItems, { ...item, qty: 1 }] });
        }
    };
    const handleRemoveLabour = (id) => setFormData({ ...formData, labourItems: formData.labourItems.filter(l => l.id !== id) });

    const handleAddSpare = (item) => {
        if (!formData.spareRequests.find(s => s.id === item.id)) {
            setFormData({ ...formData, spareRequests: [...formData.spareRequests, { ...item, qty: 1, partNumber: item.partNumber, status: 'pending' }] });
        }
    };
    const handleRemoveSpare = (id) => setFormData({ ...formData, spareRequests: formData.spareRequests.filter(s => s.id !== id) });
    const handleApproveSpare = (id) => setFormData({ ...formData, spareRequests: formData.spareRequests.map(s => s.id === id ? { ...s, status: 'approved' } : s) });

    // Estimate sending
    const handleSendEstimate = (method) => {
        if (method === 'whatsapp') {
            const customer = customers.find(c => String(c._id || c.id) === String(formData.customerId));
            const vehicle = vehiclesList.find(v => String(v._id || v.id) === String(formData.vehicleId));

            if (!customer || !customer.phone) {
                alert('❌ Customer phone number not found!');
                return;
            }

            const estimate = calculateEstimate();
            const advance = parseFloat(formData.advanceAmount) || 0;
            const balance = estimate - advance;

            const message = `*Estimate from S2 MOTORZ* 🔧\n\nHello *${customer.name}*,\nWe have generated an estimate for your vehicle *${vehicle ? vehicle.brand + ' ' + vehicle.model : 'your vehicle'}* (${vehicle ? vehicle.registrationNo : ''}):\n\n*Total Estimated Amount: ₹${estimate}*\n💰 Advance Paid: ₹${advance}\n🧾 *Balance Due: ₹${balance}*\n\nPlease let us know if you approve this estimate. Thank you!`;

            const encodedMsg = encodeURIComponent(message);
            const phone = customer.phone.startsWith('91') ? customer.phone : `91${customer.phone}`;
            const waUrl = `https://wa.me/${phone}?text=${encodedMsg}`;
            window.open(waUrl, '_blank');
        }

        setFormData({ ...formData, estimateSent: { ...formData.estimateSent, [method]: true } });
        alert(`📤 Estimate sent via ${method.charAt(0).toUpperCase() + method.slice(1)}!`);
    };

    // Calculate totals
    const calculateEstimate = (customLabour = null, customSpares = null, customOutside = null) => {
        const labourList = customLabour || formData.labourItems || [];
        const sparesList = customSpares || formData.spareRequests || [];
        const outsideList = customOutside || formData.outsideWork || [];

        const labourTotal = labourList.reduce((sum, l) => sum + (l.rate * l.qty), 0);
        // Estimate phase counts all requested spares regardless of 'approved' status (since it's an estimate)
        const partsTotal = sparesList.reduce((sum, s) => sum + (s.rate * s.qty), 0);
        const outsideTotal = outsideList.reduce((sum, w) => sum + (w.rate || 0), 0);
        return labourTotal + partsTotal + outsideTotal;
    };

    // Lock job card
    const handleLockJobCard = () => {
        setFormData({ ...formData, isLocked: true });
        alert('🔒 Job Card locked! No further edits allowed.');
    };

    // Drag and Drop handlers
    const handleDragStart = (e, jobCard) => {
        if (jobCard.isLocked) {
            e.preventDefault();
            return;
        }
        setDraggedCard(jobCard);
        e.dataTransfer.effectAllowed = 'move';
        // e.target.style.opacity = '0.5'; // Remove this as it's handled by state or CSS
    };

    const handleDragEnd = (e) => {
        e.target.style.opacity = '1';
        setDraggedCard(null);
        setDragOverStatus(null);
    };

    const handleDragOver = (e, statusId) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverStatus(statusId);
    };

    const handleDragLeave = (e) => {
        setDragOverStatus(null);
    };

    const handleDrop = (e, newStatus) => {
        e.preventDefault();
        if (draggedCard && !draggedCard.isLocked && draggedCard.status !== newStatus) {
            handleStatusChange(draggedCard._id, newStatus);
        }
        setDraggedCard(null);
        setDragOverStatus(null);
    };

    const getTimeAgo = (date) => {
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        return 'Just now';
    };

    const filteredJobCards = jobCards
        .filter(jc => filterType === 'all' || jc.type === filterType)
        .filter(jc => !searchTerm || jc.id.toLowerCase().includes(searchTerm.toLowerCase()) || jc.customerName.toLowerCase().includes(searchTerm.toLowerCase()));

    const getJobCardsByStatus = (status) => filteredJobCards.filter(jc => jc.status === status);
    const getStatusInfo = (statusId) => statuses.find(s => s.id === statusId) || statuses[0];

    const inputStyle = { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-gray-200)', fontSize: '0.9rem' };
    const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 500 };

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button onClick={handleFullJobCard} className="btn btn-primary" style={{ padding: '10px 16px', fontSize: '0.9rem' }}>+ New Job Card</button>
                    <a href="/quick-service" style={{ padding: '10px 16px', background: 'rgba(76, 175, 80, 0.1)', border: '2px solid #4CAF50', borderRadius: 'var(--radius-md)', color: '#4CAF50', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>⚡ Quick Service</a>
                    <button onClick={async () => {
                        if (!confirm('This will reset all Job Cards, Vehicles, and Customers. Continue?')) return;
                        const res = await fetch('/api/job-cards/seed');
                        if (res.ok) {
                            await fetchData();
                            alert('✅ Job Card system seeded!');
                        }
                    }} className="btn" style={{ background: 'var(--color-gray-100)', border: '1px solid var(--color-gray-300)', fontSize: '0.9rem' }}>🌱 Seed</button>
                </div>
                <div className="hide-on-mobile" style={{ textAlign: 'right' }}>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 'var(--spacing-xs)' }}>🔧 Job Cards</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Manage service jobs</p>
                </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', background: 'white', borderRadius: 'var(--radius-md)', padding: '4px', boxShadow: 'var(--shadow-sm)' }}>
                    {['kanban', 'list'].map((mode) => (
                        <button key={mode} onClick={() => setViewMode(mode)} style={{ padding: '8px 16px', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, background: viewMode === mode ? 'var(--color-primary)' : 'transparent', color: viewMode === mode ? 'white' : 'var(--text-secondary)' }}>{mode === 'kanban' ? '📋 Board' : '📄 List'}</button>
                    ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', background: 'white', padding: 'var(--spacing-sm) var(--spacing-md)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)', flex: 1, maxWidth: '280px' }}>
                    <span>🔍</span>
                    <input type="text" placeholder="Search job cards..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem' }} />
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
                    <div style={{ background: 'rgba(33, 150, 243, 0.1)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, color: '#2196F3' }}>Active: {jobCards.filter(jc => !['completed', 'delivered'].includes(jc.status)).length}</div>
                    <div style={{ background: 'rgba(76, 175, 80, 0.1)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, color: '#4CAF50' }}>Completed: {jobCards.filter(jc => jc.status === 'completed').length}</div>
                </div>
            </div>

            {/* Kanban View */}
            {viewMode === 'kanban' && (
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', overflowX: 'auto', paddingBottom: 'var(--spacing-md)' }}>
                    {statuses.map((status) => (
                        <div
                            key={status.id}
                            onDragOver={(e) => handleDragOver(e, status.id)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, status.id)}
                            style={{
                                minWidth: '220px',
                                maxWidth: '220px',
                                background: dragOverStatus === status.id ? 'rgba(33, 150, 243, 0.15)' : 'var(--color-gray-100)',
                                borderRadius: 'var(--radius-lg)',
                                padding: 'var(--spacing-sm)',
                                border: dragOverStatus === status.id ? '2px dashed #2196F3' : '2px solid transparent',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)', padding: '8px', background: status.bg, borderRadius: 'var(--radius-sm)' }}>
                                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: status.color }}>{status.name}</span>
                                <span style={{ background: status.color, color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 600 }}>{getJobCardsByStatus(status.id).length}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '100px' }}>
                                {getJobCardsByStatus(status.id).map((jc) => (
                                    <div
                                        key={jc._id}
                                        draggable={!jc.isLocked}
                                        onDragStart={(e) => handleDragStart(e, jc)}
                                        onDragEnd={handleDragEnd}
                                        onClick={() => handleEdit(jc)}
                                        style={{
                                            background: 'white',
                                            borderRadius: 'var(--radius-md)',
                                            padding: '12px',
                                            boxShadow: 'var(--shadow-sm)',
                                            cursor: jc.isLocked ? 'not-allowed' : 'grab',
                                            borderTop: `3px solid ${jc.type === 'quick' ? '#4CAF50' : '#2196F3'}`,
                                            opacity: jc.isLocked ? 0.7 : 1,
                                            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                                        }}
                                        onMouseOver={(e) => { if (!jc.isLocked) { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; } }}
                                        onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-primary)' }}>{jc.jobCardNo}</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                {!jc.isLocked && <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>⋮⋮</span>}
                                                {jc.isLocked && <span style={{ fontSize: '0.7rem' }}>🔒</span>}
                                            </div>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 500, marginBottom: '4px' }}>{jc.customerId?.name || 'Walk-in'}</p>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>🏍️ {jc.vehicleId?.model || 'General'}</p>
                                        {jc.technicianId?.name && <p style={{ margin: 0, fontSize: '0.7rem', color: '#00BCD4' }}>👨‍🔧 {jc.technicianId.name}</p>}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--color-gray-100)' }}>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{getTimeAgo(new Date(jc.createdAt))}</span>
                                            <span style={{ fontWeight: 600, fontSize: '0.8rem', color: '#4CAF50' }}>₹{jc.estimatedAmount}</span>
                                        </div>
                                    </div>
                                ))}
                                {getJobCardsByStatus(status.id).length === 0 && <div style={{ padding: 'var(--spacing-lg)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>Drop here</div>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
                <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--color-gray-100)' }}>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem' }}>Job Card</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem' }}>Customer</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem' }}>Technician</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem' }}>Status</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'right', fontSize: '0.85rem' }}>Advance</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'right', fontSize: '0.85rem' }}>Estimate</th>
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'center', fontSize: '0.85rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredJobCards.map((jc) => {
                                const status = getStatusInfo(jc.status);
                                return (
                                    <tr key={jc._id} onClick={() => handleEdit(jc)} style={{ borderBottom: '1px solid var(--color-gray-200)', cursor: 'pointer' }}>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{jc.jobCardNo}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{getTimeAgo(new Date(jc.createdAt))}</div>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <div style={{ fontWeight: 600 }}>{jc.customerId?.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{jc.vehicleId?.registrationNo}</div>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <div style={{ fontSize: '0.9rem' }}>{jc.technicianId?.name || 'Not assigned'}</div>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <select value={jc.status} onChange={(e) => handleStatusChange(jc._id, e.target.value)} disabled={jc.isLocked} style={{ padding: '6px 10px', borderRadius: '20px', border: 'none', fontSize: '0.8rem', fontWeight: 500, background: status.bg, color: status.color, cursor: jc.isLocked ? 'not-allowed' : 'pointer' }}>
                                                {statuses.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                                            </select>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>{jc.advanceAmount > 0 ? <span style={{ color: '#FF9800' }}>₹{jc.advanceAmount} ({jc.advanceMethod})</span> : '-'}</td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'right', fontWeight: 600, color: '#4CAF50' }}>₹{jc.estimatedAmount}</td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
                                            <button onClick={() => handleEdit(jc)} disabled={jc.isLocked} style={{ background: jc.isLocked ? 'var(--color-gray-100)' : 'var(--color-gray-100)', border: 'none', padding: '6px 12px', borderRadius: 'var(--radius-sm)', cursor: jc.isLocked ? 'not-allowed' : 'pointer', fontSize: '0.8rem' }}>{jc.isLocked ? '🔒 View' : '✏️ Edit'}</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Full Job Card Modal */}
            {showFullModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', width: '95%', maxWidth: '900px', maxHeight: '95vh', overflow: 'auto', boxShadow: 'var(--shadow-lg)' }}>
                        {/* Modal Header */}
                        <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'white', zIndex: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>🔧 {editingJobCard ? `Edit ${editingJobCard.jobCardNo || editingJobCard.id || 'Job Card'}` : 'New Job Card'}</h3>
                                {formData.isLocked && <span style={{ background: '#F44336', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>🔒 LOCKED</span>}
                            </div>
                            <button onClick={() => setShowFullModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
                        </div>

                        {/* Tabs */}
                        <div style={{ display: 'flex', borderBottom: '1px solid var(--color-gray-200)', padding: '0 var(--spacing-lg)', overflowX: 'auto', gap: '8px' }}>
                            {[
                                { id: 'details', label: '1. Details' },
                                { id: 'inspection', label: '2. Inspection' },
                                { id: 'labour', label: '3. Labour' },
                                { id: 'spares', label: '4. Spare & Outside' },
                                { id: 'estimate_sign', label: '5. Estimate & Sign' },
                                { id: 'next_service', label: '6. Next Service Advice' },
                                { id: 'delivery', label: '7. Delivery' }
                            ].map(tab => (
                                <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} style={{ padding: '12px 20px', border: 'none', borderBottom: activeTab === tab.id ? '3px solid var(--color-primary)' : '3px solid transparent', background: 'transparent', cursor: 'pointer', fontWeight: activeTab === tab.id ? 600 : 400, color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{tab.label}</button>
                            ))}
                        </div>

                        <form onSubmit={handleFullSubmit}>
                            <div style={{ padding: 'var(--spacing-lg)' }}>

                                {/* Details Tab */}
                                {activeTab === 'details' && (
                                    <div>
                                        {/* Customer & Vehicle */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                            <div>
                                                <label style={labelStyle}>Select Customer *</label>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <select value={String(formData.customerId)} onChange={(e) => handleCustomerChange(e.target.value)} required style={{ ...inputStyle, flex: 1 }}>
                                                        <option value="">Select Customer</option>
                                                        {customers.map(c => <option key={String(c._id || c.id)} value={String(c._id || c.id)}>{c.name} ({c.phone})</option>)}
                                                    </select>
                                                    <button type="button" onClick={() => setShowAddCustomerModal(true)} style={{ padding: '10px 16px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}>+ New</button>
                                                </div>
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Select Vehicle *</label>
                                                <select value={String(formData.vehicleId)} onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })} required style={inputStyle}>
                                                    <option value="">Select Vehicle</option>
                                                    {selectedCustomer?.vehicles?.map(v => <option key={String(v._id || v.id)} value={String(v._id || v.id)}>{v.brand} {v.model} ({v.registrationNo})</option>)}
                                                    {/* Fallback for when vehicles are in a separate collection */}
                                                    {vehiclesList?.filter(v => String(v.customerId?._id || v.customerId) === String(formData.customerId)).map(v => (
                                                        <option key={String(v._id || v.id)} value={String(v._id || v.id)}>{v.brand} {v.model} ({v.registrationNo})</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Service Type & Technician */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                            <div>
                                                <label style={labelStyle}>Service Type *</label>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <select value={formData.serviceType} onChange={(e) => handleServiceTypeChange(e.target.value)} required disabled={formData.isLocked} style={{ ...inputStyle, flex: 1 }}>
                                                        <option value="">Select Service</option>
                                                        {serviceTypesList.length > 0 ? (
                                                            serviceTypesList.map((s) => <option key={String(s._id || s.id)} value={s.name}>{s.name}</option>)
                                                        ) : (
                                                            serviceTypes.map((s) => <option key={s} value={s}>{s}</option>)
                                                        )}
                                                    </select>
                                                    <button type="button" onClick={() => setShowAddServiceTypeModal(true)} disabled={formData.isLocked} style={{ padding: '10px 16px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: formData.isLocked ? 'not-allowed' : 'pointer', fontWeight: 600, whiteSpace: 'nowrap', opacity: formData.isLocked ? 0.7 : 1 }}>+ New</button>
                                                </div>
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Allocate Technician</label>
                                                <select value={String(formData.technicianId)} onChange={(e) => setFormData({ ...formData, technicianId: e.target.value })} style={inputStyle}>
                                                    <option value="">Select Technician</option>
                                                    {techniciansList.map(t => <option key={String(t._id || t.id)} value={String(t._id || t.id)}>{t.name} ({t.role})</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Battery Number & Odometer */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                            <div><label style={labelStyle}>🔋 Battery Number</label><input type="text" value={formData.batteryNo} onChange={(e) => setFormData({ ...formData, batteryNo: e.target.value })} placeholder="e.g. BAT-2023-001" disabled={formData.isLocked} style={inputStyle} /></div>
                                            <div><label style={labelStyle}>Odometer (km) *</label><input type="number" value={formData.odometer} onChange={(e) => handleOdometerChange(e.target.value)} placeholder="e.g. 12500" disabled={formData.isLocked} style={inputStyle} /></div>
                                            <div><label style={labelStyle}>Oil Level</label><select value={formData.oilLevel} onChange={(e) => setFormData({ ...formData, oilLevel: e.target.value })} disabled={formData.isLocked} style={inputStyle}><option>Full</option><option>Normal</option><option>Low</option><option>Empty</option></select></div>
                                        </div>

                                        {/* Fuel Level Indicator */}
                                        <div style={{ marginBottom: 'var(--spacing-md)', padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)' }}>
                                            <label style={{ ...labelStyle, marginBottom: '12px' }}>⛽ Fuel Level</label>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                                {/* Fuel Gauge Visual */}
                                                <div style={{
                                                    flex: 1,
                                                    height: '24px',
                                                    background: 'var(--color-gray-200)',
                                                    borderRadius: '12px',
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                    border: '2px solid var(--color-gray-300)',
                                                }}>
                                                    <div style={{
                                                        width: `${formData.fuelLevel}%`,
                                                        height: '100%',
                                                        background: `linear-gradient(90deg, 
                                                            ${formData.fuelLevel <= 25 ? '#F44336' : formData.fuelLevel <= 50 ? '#FF9800' : formData.fuelLevel <= 75 ? '#FFC107' : '#4CAF50'} 0%,
                                                            ${formData.fuelLevel <= 25 ? '#EF5350' : formData.fuelLevel <= 50 ? '#FFB74D' : formData.fuelLevel <= 75 ? '#FFD54F' : '#66BB6A'} 100%)`,
                                                        borderRadius: '10px',
                                                        transition: 'width 0.3s ease, background 0.3s ease',
                                                        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)',
                                                    }} />
                                                    {/* Gauge markers */}
                                                    <div style={{ position: 'absolute', top: 0, left: '25%', width: '1px', height: '100%', background: 'rgba(0,0,0,0.15)' }} />
                                                    <div style={{ position: 'absolute', top: 0, left: '50%', width: '1px', height: '100%', background: 'rgba(0,0,0,0.15)' }} />
                                                    <div style={{ position: 'absolute', top: 0, left: '75%', width: '1px', height: '100%', background: 'rgba(0,0,0,0.15)' }} />
                                                </div>
                                                {/* Fuel Level Value */}
                                                <div style={{
                                                    minWidth: '60px',
                                                    padding: '6px 12px',
                                                    background: formData.fuelLevel <= 25 ? 'rgba(244, 67, 54, 0.1)' : formData.fuelLevel <= 50 ? 'rgba(255, 152, 0, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                                                    color: formData.fuelLevel <= 25 ? '#F44336' : formData.fuelLevel <= 50 ? '#FF9800' : '#4CAF50',
                                                    borderRadius: '8px',
                                                    fontWeight: 700,
                                                    fontSize: '0.9rem',
                                                    textAlign: 'center',
                                                }}>
                                                    {formData.fuelLevel}%
                                                </div>
                                            </div>
                                            {/* Slider Input */}
                                            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{ fontSize: '0.8rem', color: '#F44336' }}>E</span>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={formData.fuelLevel}
                                                    onChange={(e) => setFormData({ ...formData, fuelLevel: parseInt(e.target.value) })}
                                                    disabled={formData.isLocked}
                                                    style={{
                                                        flex: 1,
                                                        height: '8px',
                                                        cursor: formData.isLocked ? 'not-allowed' : 'pointer',
                                                        accentColor: formData.fuelLevel <= 25 ? '#F44336' : formData.fuelLevel <= 50 ? '#FF9800' : '#4CAF50',
                                                    }}
                                                />
                                                <span style={{ fontSize: '0.8rem', color: '#4CAF50' }}>F</span>
                                            </div>
                                            {/* Quick Select Buttons */}
                                            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                                {[0, 25, 50, 75, 100].map(level => (
                                                    <button
                                                        key={level}
                                                        type="button"
                                                        onClick={() => !formData.isLocked && setFormData({ ...formData, fuelLevel: level })}
                                                        disabled={formData.isLocked}
                                                        style={{
                                                            flex: 1,
                                                            padding: '6px',
                                                            border: formData.fuelLevel === level ? 'none' : '1px solid var(--color-gray-200)',
                                                            borderRadius: '6px',
                                                            fontSize: '0.75rem',
                                                            fontWeight: 500,
                                                            cursor: formData.isLocked ? 'not-allowed' : 'pointer',
                                                            background: formData.fuelLevel === level
                                                                ? (level <= 25 ? '#F44336' : level <= 50 ? '#FF9800' : '#4CAF50')
                                                                : 'white',
                                                            color: formData.fuelLevel === level ? 'white' : 'var(--text-secondary)',
                                                            transition: 'all 0.2s',
                                                        }}
                                                    >
                                                        {level === 0 ? 'Empty' : level === 100 ? 'Full' : `${level}%`}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 2. Inspection Tab */}
                                {activeTab === 'inspection' && (
                                    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--spacing-lg)' }}>
                                            <span style={{ fontSize: '1.5rem' }}>🔍</span>
                                            <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Technical Inspection Checklist</h4>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                                            {Object.keys(formData.inspection || {}).map((item) => (
                                                <div key={item} style={{ padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    <label style={{ ...labelStyle, textTransform: 'capitalize', color: 'var(--color-primary)' }}>
                                                        {item.replace(/([A-Z])/g, ' $1').trim()}
                                                    </label>
                                                    <div style={{ display: 'flex', gap: '4px' }}>
                                                        {['Low', 'Normal', 'High', 'Good', 'Bad', 'Functional', 'Broken', 'Clean', 'Dirty'].filter(v =>
                                                            (item.includes('Oil') || item.includes('Fluid') || item.includes('Coolant')) ? ['Low', 'Normal', 'High'].includes(v) :
                                                                (item.includes('Pads') || item.includes('Tires') || item.includes('Battery')) ? ['Good', 'Bad'].includes(v) :
                                                                    item.includes('Lights') ? ['Functional', 'Broken'].includes(v) :
                                                                        ['Clean', 'Dirty'].includes(v)
                                                        ).map(val => (
                                                            <button
                                                                key={val}
                                                                type="button"
                                                                onClick={() => setFormData({ ...formData, inspection: { ...formData.inspection, [item]: val } })}
                                                                style={{
                                                                    flex: 1, padding: '6px 4px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-gray-300)', cursor: 'pointer',
                                                                    background: formData.inspection[item] === val ? 'var(--color-primary)' : 'white',
                                                                    color: formData.inspection[item] === val ? 'white' : 'var(--text-secondary)',
                                                                    fontWeight: formData.inspection[item] === val ? 600 : 400
                                                                }}
                                                            >
                                                                {val}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ borderTop: '2px dashed var(--color-gray-200)', marginTop: 'var(--spacing-lg)', paddingTop: 'var(--spacing-lg)' }}>
                                            <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)' }}>📝 Intake Observations & Photos</h4>

                                            {/* Customer Voice with Searchable Dropdown */}
                                            <div style={{ marginBottom: 'var(--spacing-lg)' }} ref={customerVoiceRef}>
                                                <label style={{ ...labelStyle, marginBottom: '12px' }}>🗣️ Customer Voice (Complaint/Request)</label>

                                                {/* Selected items display */}
                                                {formData.customerVoice && (
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                                                        {formData.customerVoice.split(', ').filter(v => v).map((item, idx) => (
                                                            <span key={idx} style={{
                                                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                                padding: '4px 10px', background: 'rgba(156, 39, 176, 0.15)',
                                                                border: '1px solid #9C27B0', borderRadius: '16px',
                                                                fontSize: '0.8rem', color: '#9C27B0',
                                                            }}>
                                                                {item}
                                                                {!formData.isLocked && (
                                                                    <button type="button" onClick={() => {
                                                                        const items = formData.customerVoice.split(', ').filter(v => v !== item);
                                                                        setFormData({ ...formData, customerVoice: items.join(', ') });
                                                                    }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: '#9C27B0', padding: 0 }}>×</button>
                                                                )}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Search and Category Filter */}
                                                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                                    <div style={{ flex: 1, position: 'relative' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1px solid var(--color-gray-200)', borderRadius: '8px', overflow: 'hidden' }}>
                                                            <span style={{ padding: '10px', color: 'var(--text-muted)' }}>🔍</span>
                                                            <input
                                                                type="text"
                                                                placeholder="Search complaints..."
                                                                value={customerVoiceSearch}
                                                                onChange={(e) => { setCustomerVoiceSearch(e.target.value); setShowCustomerVoiceDropdown(true); }}
                                                                onFocus={() => setShowCustomerVoiceDropdown(true)}
                                                                disabled={formData.isLocked}
                                                                style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 10px 10px 0', fontSize: '0.9rem' }}
                                                            />
                                                        </div>

                                                        {/* Dropdown */}
                                                        {showCustomerVoiceDropdown && !formData.isLocked && (
                                                            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid var(--color-gray-200)', borderRadius: '8px', boxShadow: 'var(--shadow-lg)', zIndex: 100, maxHeight: '250px', overflow: 'auto', marginTop: '4px' }}>
                                                                {masterCustomerVoice
                                                                    .filter(opt => opt.isActive)
                                                                    .filter(opt => customerVoiceCategory === 'All' || opt.category === customerVoiceCategory)
                                                                    .filter(opt => opt.name.toLowerCase().includes(customerVoiceSearch.toLowerCase()) || opt.description?.toLowerCase().includes(customerVoiceSearch.toLowerCase()))
                                                                    .map(opt => (
                                                                        <div
                                                                            key={opt.id}
                                                                            onClick={() => {
                                                                                const current = formData.customerVoice || '';
                                                                                if (!current.includes(opt.name)) {
                                                                                    const newValue = current ? `${current}, ${opt.name}` : opt.name;
                                                                                    setFormData({ ...formData, customerVoice: newValue });
                                                                                }
                                                                                setCustomerVoiceSearch('');
                                                                                setShowCustomerVoiceDropdown(false);
                                                                            }}
                                                                            style={{
                                                                                padding: '10px 14px', cursor: 'pointer',
                                                                                borderBottom: '1px solid var(--color-gray-100)',
                                                                                background: formData.customerVoice?.includes(opt.name) ? 'rgba(156, 39, 176, 0.08)' : 'white',
                                                                            }}
                                                                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(156, 39, 176, 0.1)'}
                                                                            onMouseOut={(e) => e.currentTarget.style.background = formData.customerVoice?.includes(opt.name) ? 'rgba(156, 39, 176, 0.08)' : 'white'}
                                                                        >
                                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                                <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{opt.name}</span>
                                                                                <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'var(--color-gray-100)', borderRadius: '10px', color: 'var(--text-muted)' }}>{opt.category}</span>
                                                                            </div>
                                                                            {opt.description && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{opt.description}</div>}
                                                                        </div>
                                                                    ))}
                                                                {masterCustomerVoice.filter(opt => opt.isActive && (customerVoiceCategory === 'All' || opt.category === customerVoiceCategory) && opt.name.toLowerCase().includes(customerVoiceSearch.toLowerCase())).length === 0 && (
                                                                    <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No complaints found</div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Category Filter */}
                                                    <select
                                                        value={customerVoiceCategory}
                                                        onChange={(e) => setCustomerVoiceCategory(e.target.value)}
                                                        disabled={formData.isLocked}
                                                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', fontSize: '0.85rem', minWidth: '120px', background: 'white' }}
                                                    >
                                                        {customerVoiceCategories.map(cat => (
                                                            <option key={cat} value={cat}>{cat === 'All' ? '📋 All Categories' : cat}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Quick buttons for common options */}
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                                                    {masterCustomerVoice.filter(opt => opt.isActive).slice(0, 8).map(opt => (
                                                        <button
                                                            key={opt.id}
                                                            type="button"
                                                            onClick={() => {
                                                                if (!formData.isLocked) {
                                                                    const current = formData.customerVoice || '';
                                                                    if (!current.includes(opt.name)) {
                                                                        const newValue = current ? `${current}, ${opt.name}` : opt.name;
                                                                        setFormData({ ...formData, customerVoice: newValue });
                                                                    }
                                                                }
                                                            }}
                                                            disabled={formData.isLocked}
                                                            style={{
                                                                padding: '4px 10px', fontSize: '0.75rem',
                                                                background: formData.customerVoice?.includes(opt.name) ? 'rgba(156, 39, 176, 0.15)' : 'var(--color-gray-100)',
                                                                border: formData.customerVoice?.includes(opt.name) ? '1px solid #9C27B0' : '1px solid var(--color-gray-300)',
                                                                borderRadius: '12px', cursor: formData.isLocked ? 'not-allowed' : 'pointer',
                                                                color: formData.customerVoice?.includes(opt.name) ? '#9C27B0' : 'var(--text-primary)',
                                                                transition: 'all 0.2s',
                                                            }}
                                                        >{opt.name}</button>
                                                    ))}
                                                </div>

                                                {/* Custom text input */}
                                                <textarea value={formData.customerVoice} onChange={(e) => setFormData({ ...formData, customerVoice: e.target.value })} rows={2} placeholder="Selected complaints appear here. You can also type custom complaints..." disabled={formData.isLocked} style={{ ...inputStyle, resize: 'vertical' }} />
                                            </div>

                                            {/* Advisor Voice with Searchable Dropdown */}
                                            <div style={{ marginBottom: 'var(--spacing-md)' }} ref={advisorVoiceRef}>
                                                <label style={{ ...labelStyle, marginBottom: '12px' }}>👨‍💼 Advisor Voice (Observations/Notes)</label>

                                                {/* Selected items display */}
                                                {formData.advisorVoice && (
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                                                        {(formData.advisorVoice || '').split(', ').filter(v => v).map((item, idx) => (
                                                            <span key={idx} style={{
                                                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                                padding: '4px 10px', background: 'rgba(0, 188, 212, 0.15)',
                                                                border: '1px solid #00BCD4', borderRadius: '16px',
                                                                fontSize: '0.8rem', color: '#00BCD4',
                                                            }}>
                                                                {item}
                                                                {!formData.isLocked && (
                                                                    <button type="button" onClick={() => {
                                                                        const items = (formData.advisorVoice || '').split(', ').filter(v => v !== item);
                                                                        setFormData({ ...formData, advisorVoice: items.join(', ') });
                                                                    }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: '#00BCD4', padding: 0 }}>×</button>
                                                                )}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Search and Category Filter */}
                                                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                                    <div style={{ flex: 1, position: 'relative' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1px solid var(--color-gray-200)', borderRadius: '8px', overflow: 'hidden' }}>
                                                            <span style={{ padding: '10px', color: 'var(--text-muted)' }}>🔍</span>
                                                            <input
                                                                type="text"
                                                                placeholder="Search observations..."
                                                                value={advisorVoiceSearch}
                                                                onChange={(e) => { setAdvisorVoiceSearch(e.target.value); setShowAdvisorVoiceDropdown(true); }}
                                                                onFocus={() => setShowAdvisorVoiceDropdown(true)}
                                                                disabled={formData.isLocked}
                                                                style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 10px 10px 0', fontSize: '0.9rem' }}
                                                            />
                                                        </div>

                                                        {/* Dropdown */}
                                                        {showAdvisorVoiceDropdown && !formData.isLocked && (
                                                            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid var(--color-gray-200)', borderRadius: '8px', boxShadow: 'var(--shadow-lg)', zIndex: 100, maxHeight: '250px', overflow: 'auto', marginTop: '4px' }}>
                                                                {masterAdvisorVoice
                                                                    .filter(opt => opt.isActive)
                                                                    .filter(opt => advisorVoiceCategory === 'All' || opt.category === advisorVoiceCategory)
                                                                    .filter(opt => opt.name.toLowerCase().includes(advisorVoiceSearch.toLowerCase()) || opt.description?.toLowerCase().includes(advisorVoiceSearch.toLowerCase()))
                                                                    .map(opt => (
                                                                        <div
                                                                            key={opt.id}
                                                                            onClick={() => {
                                                                                const current = formData.advisorVoice || '';
                                                                                if (!current.includes(opt.name)) {
                                                                                    const newValue = current ? `${current}, ${opt.name}` : opt.name;
                                                                                    setFormData({ ...formData, advisorVoice: newValue });
                                                                                }
                                                                                setAdvisorVoiceSearch('');
                                                                                setShowAdvisorVoiceDropdown(false);
                                                                            }}
                                                                            style={{
                                                                                padding: '10px 14px', cursor: 'pointer',
                                                                                borderBottom: '1px solid var(--color-gray-100)',
                                                                                background: formData.advisorVoice?.includes(opt.name) ? 'rgba(0, 188, 212, 0.08)' : 'white',
                                                                            }}
                                                                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0, 188, 212, 0.1)'}
                                                                            onMouseOut={(e) => e.currentTarget.style.background = formData.advisorVoice?.includes(opt.name) ? 'rgba(0, 188, 212, 0.08)' : 'white'}
                                                                        >
                                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                                <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{opt.name}</span>
                                                                                <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'var(--color-gray-100)', borderRadius: '10px', color: 'var(--text-muted)' }}>{opt.category}</span>
                                                                            </div>
                                                                            {opt.description && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{opt.description}</div>}
                                                                        </div>
                                                                    ))}
                                                                {masterAdvisorVoice.filter(opt => opt.isActive && (advisorVoiceCategory === 'All' || opt.category === advisorVoiceCategory) && opt.name.toLowerCase().includes(advisorVoiceSearch.toLowerCase())).length === 0 && (
                                                                    <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No observations found</div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Category Filter */}
                                                    <select
                                                        value={advisorVoiceCategory}
                                                        onChange={(e) => setAdvisorVoiceCategory(e.target.value)}
                                                        disabled={formData.isLocked}
                                                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', fontSize: '0.85rem', minWidth: '120px', background: 'white' }}
                                                    >
                                                        {advisorVoiceCategories.map(cat => (
                                                            <option key={cat} value={cat}>{cat === 'All' ? '📋 All Categories' : cat}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Quick buttons for common options */}
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                                                    {masterAdvisorVoice.filter(opt => opt.isActive).slice(0, 8).map(opt => (
                                                        <button
                                                            key={opt.id}
                                                            type="button"
                                                            onClick={() => {
                                                                if (!formData.isLocked) {
                                                                    const current = formData.advisorVoice || '';
                                                                    if (!current.includes(opt.name)) {
                                                                        const newValue = current ? `${current}, ${opt.name}` : opt.name;
                                                                        setFormData({ ...formData, advisorVoice: newValue });
                                                                    }
                                                                }
                                                            }}
                                                            disabled={formData.isLocked}
                                                            style={{
                                                                padding: '4px 10px', fontSize: '0.75rem',
                                                                background: formData.advisorVoice?.includes(opt.name) ? 'rgba(0, 188, 212, 0.15)' : 'var(--color-gray-100)',
                                                                border: formData.advisorVoice?.includes(opt.name) ? '1px solid #00BCD4' : '1px solid var(--color-gray-300)',
                                                                borderRadius: '12px', cursor: formData.isLocked ? 'not-allowed' : 'pointer',
                                                                color: formData.advisorVoice?.includes(opt.name) ? '#00BCD4' : 'var(--text-primary)',
                                                                transition: 'all 0.2s',
                                                            }}
                                                        >{opt.name}</button>
                                                    ))}
                                                </div>

                                                {/* Custom text input */}
                                                <textarea value={formData.advisorVoice || ''} onChange={(e) => setFormData({ ...formData, advisorVoice: e.target.value })} rows={2} placeholder="Selected observations appear here. You can also type custom notes..." disabled={formData.isLocked} style={{ ...inputStyle, resize: 'vertical' }} />
                                            </div>

                                            {/* Vehicle Photos */}
                                            <div style={{ marginTop: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'rgba(33, 150, 243, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(33, 150, 243, 0.2)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                                                    <label style={{ ...labelStyle, margin: 0, fontSize: '1rem' }}>📸 Vehicle Photos <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>({vehiclePhotos.length}/6)</span></label>
                                                    {vehiclePhotos.length > 0 && (
                                                        <button type="button" onClick={() => openPhotoViewer(0)} style={{ padding: '6px 12px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>👀 View All</button>
                                                    )}
                                                </div>
                                                {/* Photo Upload/Capture Options */}
                                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--spacing-md)' }}>
                                                    <button type="button" onClick={() => vehiclePhotoInputRef.current?.click()} disabled={formData.isLocked || vehiclePhotos.length >= 6} style={{ padding: '10px 16px', background: formData.isLocked || vehiclePhotos.length >= 6 ? 'var(--color-gray-300)' : '#2196F3', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: formData.isLocked || vehiclePhotos.length >= 6 ? 'not-allowed' : 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>📁 Upload</button>
                                                    <button type="button" onClick={() => startCameraCapture()} disabled={formData.isLocked || vehiclePhotos.length >= 6} style={{ padding: '10px 16px', background: formData.isLocked || vehiclePhotos.length >= 6 ? 'var(--color-gray-300)' : '#4CAF50', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: formData.isLocked || vehiclePhotos.length >= 6 ? 'not-allowed' : 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>📷 Camera</button>
                                                    <input ref={vehiclePhotoInputRef} type="file" accept="image/*" onChange={handleVehiclePhotoUpload} style={{ display: 'none' }} />
                                                </div>

                                                {/* Photo Grid */}
                                                {vehiclePhotos.length > 0 && (
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                                        {vehiclePhotos.map((photo, index) => (
                                                            <div key={index} onClick={() => openPhotoViewer(index)} style={{ position: 'relative', aspectRatio: '1', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', border: '2px solid var(--color-gray-200)' }}>
                                                                <img src={photo.url} alt={photo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                {!formData.isLocked && (
                                                                    <button type="button" onClick={(e) => { e.stopPropagation(); removeVehiclePhoto(index); }} style={{ position: 'absolute', top: '4px', right: '4px', width: '24px', height: '24px', background: 'rgba(244, 67, 54, 0.9)', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 5. Estimate & Sign Tab */}
                                {activeTab === 'estimate_sign' && (
                                    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
                                            {/* Estimate Summary */}
                                            <div>
                                                <div style={{ padding: 'var(--spacing-md)', background: 'var(--color-gray-100)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-md)' }}>
                                                    <label style={labelStyle}>💰 Estimated Amount (₹) *</label>
                                                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)' }}>₹{calculateEstimate()}</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Auto-calculated from Labour + Spares</div>
                                                </div>

                                                <div style={{ padding: 'var(--spacing-md)', background: 'rgba(76, 175, 80, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid #4CAF50' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Subtotal</span><span style={{ fontWeight: 600 }}>₹{calculateEstimate()}</span></div>

                                                    <div style={{ marginTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid rgba(76, 175, 80, 0.2)' }}>
                                                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
                                                            <div>
                                                                <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '4px', textAlign: 'left' }}>💰 Advance Amount (₹)</label>
                                                                <input
                                                                    type="number"
                                                                    value={formData.advanceAmount}
                                                                    onChange={(e) => setFormData({ ...formData, advanceAmount: parseFloat(e.target.value) || 0 })}
                                                                    placeholder="0.00"
                                                                    disabled={formData.isLocked}
                                                                    style={{ ...inputStyle, padding: '8px' }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '4px', textAlign: 'left' }}>💳 Payment Mode</label>
                                                                <select
                                                                    value={formData.advanceMethod}
                                                                    onChange={(e) => setFormData({ ...formData, advanceMethod: e.target.value })}
                                                                    disabled={formData.isLocked}
                                                                    style={{ ...inputStyle, padding: '8px' }}
                                                                >
                                                                    <option value="">Select Mode</option>
                                                                    <option value="Cash">Cash</option>
                                                                    <option value="Card">Card</option>
                                                                    <option value="UPI">UPI</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #4CAF50', paddingTop: '12px', marginTop: '4px', fontSize: '1.2rem', fontWeight: 700, color: '#2E7D32' }}>
                                                        <span>Balance Due</span>
                                                        <span>₹{Math.max(0, calculateEstimate() - (formData.advanceAmount || 0))}</span>
                                                    </div>
                                                </div>

                                                <div style={{ marginTop: 'var(--spacing-lg)', display: 'flex', gap: '8px' }}>
                                                    <button type="button" onClick={() => handleSendEstimate('whatsapp')} style={{ flex: 1, padding: '12px', background: '#25D366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                                        <span>📱 Send WhatsApp</span>
                                                    </button>
                                                    <button type="button" onClick={() => window.print()} style={{ flex: 1, padding: '12px', background: 'var(--color-gray-800)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                                        <span>🖨️ Print Estimate</span>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Signatures */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                                <div style={{ background: 'white', border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-md)' }}>
                                                    <label style={labelStyle}>✍️ Customer Digital Signature</label>
                                                    <div style={{ height: '120px', background: 'var(--color-gray-50)', border: '2px dashed var(--color-gray-300)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }} onClick={() => !formData.isLocked && setActiveSignaturePad('customer')}>
                                                        {formData.signatures.customer ? <img src={formData.signatures.customer} alt="Customer" style={{ maxHeight: '100%' }} /> : <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Click to sign (Customer)</span>}
                                                    </div>
                                                </div>
                                                <div style={{ background: 'white', border: '1px solid var(--color-gray-200)', borderRadius: 'var(--radius-md)', padding: 'var(--spacing-md)' }}>
                                                    <label style={labelStyle}>✍️ Advisor/Technician Signature</label>
                                                    <div style={{ height: '120px', background: 'var(--color-gray-50)', border: '2px dashed var(--color-gray-300)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }} onClick={() => !formData.isLocked && setActiveSignaturePad('advisor')}>
                                                        {formData.signatures.advisor ? <img src={formData.signatures.advisor} alt="Advisor" style={{ maxHeight: '100%' }} /> : <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Click to sign (Advisor)</span>}
                                                    </div>
                                                </div>

                                                {/* Signature Pad Modal */}
                                                {activeSignaturePad && (
                                                    <SignaturePad
                                                        title={activeSignaturePad === 'customer' ? 'Customer Signature' : 'Advisor Signature'}
                                                        onSave={(data) => {
                                                            setFormData({
                                                                ...formData,
                                                                signatures: {
                                                                    ...formData.signatures,
                                                                    [activeSignaturePad]: data
                                                                }
                                                            });
                                                            setActiveSignaturePad(null);
                                                        }}
                                                        onCancel={() => setActiveSignaturePad(null)}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 3. Labour Tab */}
                                {activeTab === 'labour' && (
                                    <div>
                                        <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1rem', fontWeight: 600 }}>👷 Labour Request</h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: 'var(--spacing-lg)' }}>
                                            {labourItems.map(item => (
                                                <button key={item.id} type="button" onClick={() => handleAddLabour(item)} disabled={formData.isLocked} style={{ padding: '8px 14px', border: '1px solid var(--color-gray-200)', borderRadius: '6px', background: formData.labourItems.find(l => l.id === item.id) ? 'var(--color-primary)' : 'white', color: formData.labourItems.find(l => l.id === item.id) ? 'white' : 'var(--text-primary)', cursor: 'pointer', fontSize: '0.85rem' }}>{item.name} (₹{item.rate})</button>
                                            ))}
                                        </div>
                                        {formData.labourItems.length > 0 && (
                                            <div style={{ background: 'var(--color-gray-100)', borderRadius: '8px', padding: 'var(--spacing-md)' }}>
                                                <h5 style={{ margin: '0 0 12px 0' }}>Selected Labour Items</h5>
                                                {formData.labourItems.map(item => (
                                                    <div key={item.id || item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'white', borderRadius: '6px', marginBottom: '8px' }}>
                                                        <span>{item.name}</span>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                            <input type="number" value={item.qty} min={1} onChange={(e) => setFormData({ ...formData, labourItems: formData.labourItems.map(l => l.id === item.id ? { ...l, qty: parseInt(e.target.value) || 1 } : l) })} disabled={formData.isLocked} style={{ width: '60px', padding: '6px', borderRadius: '4px', border: '1px solid var(--color-gray-200)', textAlign: 'center' }} />
                                                            <span style={{ fontWeight: 600 }}>₹{item.rate * item.qty}</span>
                                                            <button type="button" onClick={() => handleRemoveLabour(item.id)} disabled={formData.isLocked} style={{ background: '#F44336', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer' }}>×</button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div style={{ textAlign: 'right', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)', marginTop: '12px' }}>Labour Total: ₹{formData.labourItems.reduce((sum, l) => sum + (l.rate * l.qty), 0)}</div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* 4. Spare & Outside Tab */}
                                {activeTab === 'spares' && (
                                    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'var(--spacing-lg)' }}>
                                            {/* Spares Section */}
                                            <div>
                                                <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1rem', fontWeight: 600 }}>🔧 Spare Parts</h4>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                                    <div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                                            <h5 style={{ margin: 0, fontSize: '0.9rem' }}>Available Inventory</h5>
                                                            <div style={{ position: 'relative', width: '150px' }}>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search spares..."
                                                                    value={spareSearchTerm}
                                                                    onChange={(e) => setSpareSearchTerm(e.target.value)}
                                                                    style={{
                                                                        width: '100%',
                                                                        padding: '4px 8px 4px 24px',
                                                                        fontSize: '0.75rem',
                                                                        borderRadius: '4px',
                                                                        border: '1px solid var(--color-gray-300)',
                                                                        outline: 'none'
                                                                    }}
                                                                />
                                                                <span style={{ position: 'absolute', left: '6px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>🔍</span>
                                                            </div>
                                                        </div>
                                                        <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid var(--color-gray-200)', borderRadius: '8px' }}>
                                                            {spareItems
                                                                .filter(item =>
                                                                    item.name.toLowerCase().includes(spareSearchTerm.toLowerCase()) ||
                                                                    (item.partNumber && item.partNumber.toLowerCase().includes(spareSearchTerm.toLowerCase()))
                                                                )
                                                                .map(item => (
                                                                    <div key={item.id || item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid var(--color-gray-100)', background: 'white' }}>
                                                                        <div style={{ fontSize: '0.85rem' }}>
                                                                            <div style={{ fontWeight: 500 }}>{item.name}</div>
                                                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>₹{item.rate} • Stock: {item.stock}</div>
                                                                        </div>
                                                                        <button type="button" onClick={() => handleAddSpare(item)} disabled={formData.isLocked} style={{ padding: '4px 10px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Add</button>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h5 style={{ marginBottom: '10px', fontSize: '0.9rem' }}>Selected Parts ({formData.spareRequests.length})</h5>
                                                        <div style={{ background: 'var(--color-gray-50)', border: '1px solid var(--color-gray-200)', borderRadius: '8px', padding: '10px', minHeight: '100px' }}>
                                                            {formData.spareRequests.length === 0 ? (
                                                                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', padding: '20px' }}>No parts selected</div>
                                                            ) : (
                                                                formData.spareRequests.map(item => (
                                                                    <div key={item.id || item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', background: 'white', padding: '6px', borderRadius: '4px', border: '1px solid var(--color-gray-100)' }}>
                                                                        <div style={{ fontSize: '0.8rem', flex: 1 }}>
                                                                            <div style={{ fontWeight: 500 }}>{item.name}</div>
                                                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>₹{item.rate * item.qty}</div>
                                                                        </div>
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                            <input type="number" value={item.qty} min={1} onChange={(e) => setFormData({ ...formData, spareRequests: formData.spareRequests.map(s => s.id === item.id ? { ...s, qty: parseInt(e.target.value) || 1 } : s) })} style={{ width: '40px', padding: '2px', textAlign: 'center', fontSize: '0.8rem' }} />
                                                                            <button type="button" onClick={() => handleRemoveSpare(item.id)} style={{ color: '#F44336', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1rem' }}>×</button>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            )}
                                                            {formData.spareRequests.length > 0 && (
                                                                <div style={{ borderTop: '1px solid var(--color-gray-200)', paddingTop: '8px', marginTop: '8px', textAlign: 'right', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                                                                    Total: ₹{formData.spareRequests.reduce((sum, s) => sum + (s.rate * s.qty), 0)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Outside Work Section */}
                                            <div>
                                                <h4 style={{ marginBottom: 'var(--spacing-md)', fontSize: '1rem', fontWeight: 600 }}>🛠️ Outside Work</h4>
                                                <div style={{ background: 'var(--color-gray-50)', border: '1px solid var(--color-gray-200)', borderRadius: '8px', padding: '16px' }}>
                                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                                        <input type="text" id="outside-work-name" placeholder="Work Name" style={{ ...inputStyle, padding: '8px' }} />
                                                        <input type="number" id="outside-work-rate" placeholder="Cost" style={{ ...inputStyle, width: '80px', padding: '8px' }} />
                                                        <button type="button" onClick={() => {
                                                            const name = document.getElementById('outside-work-name').value;
                                                            const rate = parseInt(document.getElementById('outside-work-rate').value);
                                                            if (name && rate) {
                                                                setFormData({ ...formData, outsideWork: [...formData.outsideWork, { id: Date.now(), name, rate }] });
                                                                document.getElementById('outside-work-name').value = '';
                                                                document.getElementById('outside-work-rate').value = '';
                                                            }
                                                        }} style={{ padding: '8px 16px', background: '#FF9800', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Add</button>
                                                    </div>

                                                    {formData.outsideWork.map(work => (
                                                        <div key={work.id || work._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid var(--color-gray-200)', fontSize: '0.85rem', background: 'white', marginBottom: '4px', borderRadius: '4px' }}>
                                                            <span>{work.name}</span>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <span style={{ fontWeight: 600, marginRight: '10px' }}>₹{work.rate}</span>
                                                                <button type="button" onClick={() => setFormData({ ...formData, outsideWork: formData.outsideWork.filter(w => w.id !== work.id) })} style={{ color: '#F44336', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 6. Next Service Advice Tab */}
                                {activeTab === 'next_service' && (
                                    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                                        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--spacing-lg)' }}>
                                                <span style={{ fontSize: '1.5rem' }}>🗓️</span>
                                                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Next Service Recommendations</h4>
                                            </div>

                                            <div style={{ background: 'var(--color-gray-50)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-200)' }}>
                                                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                                    <label style={labelStyle}>📢 Advisor's Advice</label>
                                                    <textarea value={formData.nextService.advice} onChange={(e) => setFormData({ ...formData, nextService: { ...formData.nextService, advice: e.target.value } })} placeholder="e.g. Engine oil replacement needed in next 3000km, Chain slack adjustment recommended..." rows={4} style={inputStyle}></textarea>
                                                </div>

                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                                    <div>
                                                        <label style={labelStyle}>📅 Next Service Due Date</label>
                                                        <input type="date" value={formData.nextService.dueDate} onChange={(e) => setFormData({ ...formData, nextService: { ...formData.nextService, dueDate: e.target.value } })} style={inputStyle} />
                                                    </div>
                                                    <div>
                                                        <label style={labelStyle}>🏍️ Next Service Odometer (km)</label>
                                                        <input type="number" value={formData.nextService.dueOdometer} onChange={(e) => setFormData({ ...formData, nextService: { ...formData.nextService, dueOdometer: e.target.value } })} placeholder="e.g. 15500" style={inputStyle} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 7. Delivery Tab */}
                                {activeTab === 'delivery' && (
                                    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                                        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--spacing-lg)' }}>
                                                <span style={{ fontSize: '1.5rem' }}>🏁</span>
                                                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Vehicle Handover & Delivery</h4>
                                            </div>

                                            <div style={{ background: 'var(--color-gray-50)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-gray-200)' }}>
                                                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                                    <label style={labelStyle}>🚚 Delivery Type</label>
                                                    <div style={{ display: 'flex', gap: '12px' }}>
                                                        {['Pickup (Self)', 'Home Delivery'].map(type => (
                                                            <button
                                                                key={type}
                                                                type="button"
                                                                onClick={() => setFormData({ ...formData, delivery: { ...formData.delivery, type: type.includes('Pickup') ? 'pickup' : 'delivery' } })}
                                                                style={{
                                                                    flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-300)', cursor: 'pointer',
                                                                    background: (type.includes('Pickup') ? formData.delivery.type === 'pickup' : formData.delivery.type === 'delivery') ? 'var(--color-primary)' : 'white',
                                                                    color: (type.includes('Pickup') ? formData.delivery.type === 'pickup' : formData.delivery.type === 'delivery') ? 'white' : 'var(--text-secondary)',
                                                                    fontWeight: 600
                                                                }}
                                                            >
                                                                {type}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {formData.delivery.type === 'delivery' && (
                                                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                                        <label style={labelStyle}>🏠 Delivery Address</label>
                                                        <textarea value={formData.delivery.address} onChange={(e) => setFormData({ ...formData, delivery: { ...formData.delivery, address: e.target.value } })} placeholder="Enter delivery address..." rows={2} style={inputStyle}></textarea>
                                                    </div>
                                                )}

                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                                    <div>
                                                        <label style={labelStyle}>📄 Delivery Challan No.</label>
                                                        <input type="text" value={formData.delivery.challanNo} onChange={(e) => setFormData({ ...formData, delivery: { ...formData.delivery, challanNo: e.target.value } })} placeholder="e.g. DC-789" style={inputStyle} />
                                                    </div>
                                                    <div>
                                                        <label style={labelStyle}>👤 Handed Over To</label>
                                                        <input type="text" value={formData.delivery.personName} onChange={(e) => setFormData({ ...formData, delivery: { ...formData.delivery, personName: e.target.value } })} placeholder="Person Name" style={inputStyle} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* Actions */}
                            <div style={{ padding: 'var(--spacing-lg)', borderTop: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', bottom: 0, background: 'white' }}>
                                {editingJobCard && (
                                    <button type="button" onClick={() => { setPrintJobCard(editingJobCard); setShowPrintModal(true); }} style={{ padding: '12px 24px', borderRadius: 'var(--radius-md)', border: '2px solid #607D8B', background: 'rgba(96, 125, 139, 0.1)', cursor: 'pointer', fontWeight: 600, color: '#607D8B' }}>🖨️ Print Job Card</button>
                                )}
                                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                                    <button type="button" onClick={() => setShowFullModal(false)} style={{ padding: '12px 24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)', background: 'white', cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
                                    {!formData.isLocked && <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px' }}>{editingJobCard ? 'Update' : 'Create'} Job Card</button>}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Print Job Card Modal */}
            {
                showPrintModal && printJobCard && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
                        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', width: '95%', maxWidth: '900px', maxHeight: '95vh', overflow: 'auto', boxShadow: 'var(--shadow-lg)' }}>
                            {/* Modal Header */}
                            <div className="no-print" style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'white', zIndex: 10 }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>🖨️ Print Job Card - {printJobCard.id}</h3>
                                <button onClick={() => setShowPrintModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
                            </div>

                            {/* Copy Type Selector */}
                            <div className="no-print" style={{ padding: 'var(--spacing-md) var(--spacing-lg)', background: 'var(--color-gray-100)', display: 'flex', gap: 'var(--spacing-md)' }}>
                                <button onClick={() => setPrintCopyType('customer')} style={{ flex: 1, padding: '14px 20px', border: '2px solid', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600, borderColor: printCopyType === 'customer' ? '#2196F3' : 'transparent', background: printCopyType === 'customer' ? 'rgba(33, 150, 243, 0.1)' : 'white', color: printCopyType === 'customer' ? '#2196F3' : 'var(--text-secondary)' }}>
                                    📋 Customer Copy<br /><span style={{ fontWeight: 400, fontSize: '0.8rem' }}>Summary, Estimate, Signatures</span>
                                </button>
                                <button onClick={() => setPrintCopyType('technician')} style={{ flex: 1, padding: '14px 20px', border: '2px solid', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600, borderColor: printCopyType === 'technician' ? '#FF9800' : 'transparent', background: printCopyType === 'technician' ? 'rgba(255, 152, 0, 0.1)' : 'white', color: printCopyType === 'technician' ? '#FF9800' : 'var(--text-secondary)' }}>
                                    👨‍🔧 Technician Copy<br /><span style={{ fontWeight: 400, fontSize: '0.8rem' }}>Job, Checklist, Blank Entry (2 pages)</span>
                                </button>
                            </div>

                            {/* Printable Content */}
                            <div id="printable-jobcard" style={{ padding: 'var(--spacing-lg)' }}>

                                {/* Customer Copy */}
                                {printCopyType === 'customer' && (
                                    <div id="printable-customer-copy">
                                        {/* Company Header */}
                                        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)', paddingBottom: 'var(--spacing-md)', borderBottom: '3px double var(--color-primary)' }}>
                                            <img src="/logo.png" alt="S2 Motorz" style={{ height: '50px', marginBottom: '6px' }} />
                                            <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--color-primary)', fontWeight: 700 }}>S2 MOTORZ</h3>
                                            <p style={{ margin: '2px 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Two-Wheeler Service & Spare Parts</p>
                                            <p style={{ margin: '2px 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Shop No. 5, Near Bus Stand, Pune | Ph: 022-12345678</p>
                                        </div>

                                        {/* Job Card Header */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)', padding: '10px 14px', background: 'var(--color-gray-100)', borderRadius: '6px' }}>
                                            <div><strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>{printJobCard.id}</strong><span style={{ marginLeft: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>CUSTOMER COPY</span></div>
                                            <div style={{ fontSize: '0.9rem' }}><strong>Date:</strong> {new Date(printJobCard.createdAt).toLocaleDateString('en-IN')}</div>
                                        </div>

                                        {/* Customer & Vehicle Info */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                            <div style={{ padding: '12px', border: '1px solid var(--color-gray-200)', borderRadius: '8px' }}>
                                                <p style={{ margin: '0 0 4px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Customer</p>
                                                <p style={{ margin: 0, fontWeight: 600, fontSize: '1rem' }}>{printJobCard.customerName || printJobCard.customerId?.name}</p>
                                                <p style={{ margin: '2px 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>📞 {printJobCard.phone || printJobCard.customerId?.phone}</p>
                                            </div>
                                            <div style={{ padding: '12px', border: '1px solid var(--color-gray-200)', borderRadius: '8px' }}>
                                                <p style={{ margin: '0 0 4px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Vehicle</p>
                                                <p style={{ margin: 0, fontWeight: 600, fontSize: '1rem' }}>🏍️ {printJobCard.vehicleInfo || (printJobCard.vehicleId ? `${printJobCard.vehicleId.brand} ${printJobCard.vehicleId.model} (${printJobCard.vehicleId.registrationNo})` : '')}</p>
                                                {printJobCard.batteryNo && <p style={{ margin: '2px 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>🔋 Battery: {printJobCard.batteryNo}</p>}
                                            </div>
                                        </div>

                                        {/* Service Details */}
                                        <div style={{ marginBottom: 'var(--spacing-md)', padding: '12px', background: 'rgba(33, 150, 243, 0.05)', border: '1px solid rgba(33, 150, 243, 0.2)', borderRadius: '8px' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                                                <div><p style={{ margin: '0 0 2px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>SERVICE TYPE</p><p style={{ margin: 0, fontWeight: 600 }}>{printJobCard.serviceType}</p></div>
                                                <div><p style={{ margin: '0 0 2px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>TECHNICIAN</p><p style={{ margin: 0, fontWeight: 500 }}>{printJobCard.technicianName || 'Not assigned'}</p></div>
                                                <div><p style={{ margin: '0 0 2px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>STATUS</p><p style={{ margin: 0, fontWeight: 500 }}>{getStatusInfo(printJobCard.status).name}</p></div>
                                            </div>
                                            {printJobCard.customerVoice && <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed var(--color-gray-200)' }}><p style={{ margin: '0 0 2px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>CUSTOMER COMPLAINT</p><p style={{ margin: 0, fontSize: '0.9rem' }}>{printJobCard.customerVoice}</p></div>}
                                        </div>

                                        {/* Labour Items */}
                                        {printJobCard.labourItems && printJobCard.labourItems.length > 0 && (
                                            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                                <p style={{ margin: '0 0 8px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Labour Charges</p>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                                    <thead><tr style={{ background: 'rgba(255, 152, 0, 0.1)' }}><th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid var(--color-gray-200)' }}>Description</th><th style={{ padding: '8px', textAlign: 'center', width: '60px', borderBottom: '1px solid var(--color-gray-200)' }}>Qty</th><th style={{ padding: '8px', textAlign: 'right', width: '80px', borderBottom: '1px solid var(--color-gray-200)' }}>Rate</th><th style={{ padding: '8px', textAlign: 'right', width: '90px', borderBottom: '1px solid var(--color-gray-200)' }}>Amount</th></tr></thead>
                                                    <tbody>{printJobCard.labourItems.map((item, idx) => (<tr key={idx} style={{ borderBottom: '1px solid var(--color-gray-100)' }}><td style={{ padding: '8px' }}>{item.name}</td><td style={{ padding: '8px', textAlign: 'center' }}>{item.qty}</td><td style={{ padding: '8px', textAlign: 'right' }}>₹{item.rate}</td><td style={{ padding: '8px', textAlign: 'right', fontWeight: 500 }}>₹{item.rate * item.qty}</td></tr>))}</tbody>
                                                </table>
                                            </div>
                                        )}

                                        {/* Spare Parts */}
                                        {printJobCard.spareRequests && printJobCard.spareRequests.length > 0 && (
                                            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                                <p style={{ margin: '0 0 8px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Spare Parts</p>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                                    <thead><tr style={{ background: 'rgba(0, 184, 212, 0.1)' }}><th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid var(--color-gray-200)' }}>Part Name</th><th style={{ padding: '8px', textAlign: 'center', width: '60px', borderBottom: '1px solid var(--color-gray-200)' }}>Qty</th><th style={{ padding: '8px', textAlign: 'right', width: '80px', borderBottom: '1px solid var(--color-gray-200)' }}>Rate</th><th style={{ padding: '8px', textAlign: 'right', width: '90px', borderBottom: '1px solid var(--color-gray-200)' }}>Amount</th></tr></thead>
                                                    <tbody>{printJobCard.spareRequests.map((item, idx) => (<tr key={idx} style={{ borderBottom: '1px solid var(--color-gray-100)' }}><td style={{ padding: '8px' }}>{item.name}</td><td style={{ padding: '8px', textAlign: 'center' }}>{item.qty}</td><td style={{ padding: '8px', textAlign: 'right' }}>₹{item.rate}</td><td style={{ padding: '8px', textAlign: 'right', fontWeight: 500 }}>₹{item.rate * item.qty}</td></tr>))}</tbody>
                                                </table>
                                            </div>
                                        )}

                                        {/* Estimate Summary */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
                                            <div></div>
                                            <div style={{ background: 'linear-gradient(135deg, var(--color-primary), #0097A7)', padding: '14px', borderRadius: '8px', color: 'white' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem', opacity: 0.9 }}><span>Estimated Amount</span><span>₹{printJobCard.estimatedAmount || calculateEstimate(printJobCard.labourItems, printJobCard.spareRequests, printJobCard.outsideWork)}</span></div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem', opacity: 0.9 }}><span>Advance Paid {printJobCard.advanceMethod && `(${printJobCard.advanceMethod})`}</span><span>₹{printJobCard.advanceAmount || 0}</span></div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.3)' }}><span>Balance Due</span><span>₹{(printJobCard.estimatedAmount || calculateEstimate(printJobCard.labourItems, printJobCard.spareRequests, printJobCard.outsideWork)) - (printJobCard.advanceAmount || 0)}</span></div>
                                            </div>
                                        </div>

                                        {/* Signatures */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)', paddingTop: 'var(--spacing-lg)', borderTop: '1px dashed var(--color-gray-200)' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ height: '80px', borderBottom: '1px solid var(--color-gray-400)', marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {printJobCard.signatures?.customer && <img src={printJobCard.signatures.customer} alt="Customer Sig" style={{ maxHeight: '100%' }} />}
                                                </div>
                                                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Customer Signature</p>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ height: '80px', borderBottom: '1px solid var(--color-gray-400)', marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {printJobCard.signatures?.advisor && <img src={printJobCard.signatures.advisor} alt="Advisor Sig" style={{ maxHeight: '100%' }} />}
                                                </div>
                                                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>For S2 MOTORZ</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Technician Copy */}
                                {printCopyType === 'technician' && (
                                    <div id="printable-technician-copy">
                                        {/* PAGE 1: Job & Checklist */}
                                        <div className="print-page">
                                            {/* Company Header */}
                                            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)', paddingBottom: '8px', borderBottom: '2px solid var(--color-primary)' }}>
                                                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--color-primary)', fontWeight: 700 }}>S2 MOTORZ - TECHNICIAN COPY</h3>
                                            </div>

                                            {/* Job Card Header */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)', padding: '10px 14px', background: 'rgba(255, 152, 0, 0.1)', border: '2px solid #FF9800', borderRadius: '6px' }}>
                                                <div><strong style={{ fontSize: '1.2rem', color: '#FF9800' }}>{printJobCard.id}</strong></div>
                                                <div style={{ fontSize: '0.9rem' }}><strong>Date:</strong> {new Date(printJobCard.createdAt).toLocaleDateString('en-IN')}</div>
                                            </div>

                                            {/* Customer & Vehicle Info */}
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)', fontSize: '0.9rem' }}>
                                                <div><strong>Customer:</strong> {printJobCard.customerName || printJobCard.customerId?.name}</div>
                                                <div><strong>Phone:</strong> {printJobCard.phone || printJobCard.customerId?.phone}</div>
                                                <div><strong>Vehicle:</strong> {printJobCard.vehicleInfo || (printJobCard.vehicleId ? `${printJobCard.vehicleId.brand} ${printJobCard.vehicleId.model} (${printJobCard.vehicleId.registrationNo})` : '')}</div>
                                                <div><strong>Service:</strong> {printJobCard.serviceType}</div>
                                                {printJobCard.odometer && <div><strong>Odometer:</strong> {printJobCard.odometer} km</div>}
                                                {printJobCard.batteryNo && <div><strong>Battery No:</strong> {printJobCard.batteryNo}</div>}
                                            </div>

                                            {/* Customer Complaint */}
                                            {printJobCard.customerVoice && (
                                                <div style={{ marginBottom: 'var(--spacing-md)', padding: '10px', background: 'rgba(244, 67, 54, 0.05)', border: '1px solid rgba(244, 67, 54, 0.3)', borderRadius: '6px' }}>
                                                    <p style={{ margin: '0 0 4px', fontSize: '0.75rem', fontWeight: 600, color: '#F44336' }}>CUSTOMER COMPLAINT</p>
                                                    <p style={{ margin: 0, fontSize: '0.95rem' }}>{printJobCard.customerVoice}</p>
                                                </div>
                                            )}

                                            {/* Pre-Delivery Checklist */}
                                            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                                <p style={{ margin: '0 0 10px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>📋 PRE-DELIVERY CHECKLIST</p>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.9rem' }}>
                                                    {['🔋 Battery checked', '🛢️ Engine oil checked', '🛑 Brakes checked', '💡 Lights checked', '⚙️ Tire pressure checked', '⛓️ Chain cleaned/lubed', '🌬️ Air filter checked', '💧 Coolant level checked', '🔌 Electrical connections', '🪞 Mirrors adjusted', '🔔 Horn tested', '📱 Speedometer working'].map((item, idx) => (
                                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', background: 'var(--color-gray-100)', borderRadius: '4px' }}>
                                                            <span style={{ width: '18px', height: '18px', border: '2px solid var(--color-gray-400)', borderRadius: '3px', display: 'inline-block' }}></span>
                                                            <span>{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Technician Assignment */}
                                            <div style={{ padding: '12px', background: 'rgba(0, 188, 212, 0.1)', border: '1px solid #00BCD4', borderRadius: '8px', marginBottom: 'var(--spacing-md)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div><p style={{ margin: '0 0 2px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>ASSIGNED TECHNICIAN</p><p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>👨‍🔧 {printJobCard.technicianName || '_________________________'}</p></div>
                                                    <div style={{ textAlign: 'right' }}><p style={{ margin: '0 0 2px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>START TIME</p><p style={{ margin: 0, fontSize: '1rem' }}>____________</p></div>
                                                </div>
                                            </div>

                                            {/* Notes */}
                                            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                                <p style={{ margin: '0 0 6px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>TECHNICIAN NOTES</p>
                                                <div style={{ height: '80px', border: '1px solid var(--color-gray-200)', borderRadius: '6px', background: 'var(--color-gray-100)' }}></div>
                                            </div>

                                            <div style={{ pageBreakAfter: 'always' }}></div>
                                        </div>

                                        {/* PAGE 2: Blank Spare & Labour Entry */}
                                        <div className="print-page" style={{ marginTop: '20px' }}>
                                            {/* Header */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)', paddingBottom: '8px', borderBottom: '2px solid #FF9800' }}>
                                                <h4 style={{ margin: 0, fontSize: '1rem', color: '#FF9800' }}>{printJobCard.id} - SPARE & LABOUR ENTRY</h4>
                                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Page 2 of 2</span>
                                            </div>

                                            {/* Spare Parts Entry */}
                                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                                <p style={{ margin: '0 0 8px', fontSize: '0.9rem', fontWeight: 700 }}>🔧 SPARE PARTS USED</p>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                                    <thead><tr style={{ background: 'var(--color-gray-100)' }}><th style={{ padding: '8px', textAlign: 'center', width: '40px', border: '1px solid var(--color-gray-300)' }}>#</th><th style={{ padding: '8px', textAlign: 'left', border: '1px solid var(--color-gray-300)' }}>Part Name / Description</th><th style={{ padding: '8px', textAlign: 'center', width: '60px', border: '1px solid var(--color-gray-300)' }}>Qty</th><th style={{ padding: '8px', textAlign: 'right', width: '80px', border: '1px solid var(--color-gray-300)' }}>Rate</th><th style={{ padding: '8px', textAlign: 'right', width: '90px', border: '1px solid var(--color-gray-300)' }}>Amount</th></tr></thead>
                                                    <tbody>
                                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (<tr key={num}><td style={{ padding: '10px 8px', textAlign: 'center', border: '1px solid var(--color-gray-300)' }}>{num}</td><td style={{ padding: '10px 8px', border: '1px solid var(--color-gray-300)' }}></td><td style={{ padding: '10px 8px', border: '1px solid var(--color-gray-300)' }}></td><td style={{ padding: '10px 8px', border: '1px solid var(--color-gray-300)' }}></td><td style={{ padding: '10px 8px', border: '1px solid var(--color-gray-300)' }}></td></tr>))}
                                                        <tr style={{ background: 'rgba(0, 184, 212, 0.1)' }}><td colSpan={4} style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 600, border: '1px solid var(--color-gray-300)' }}>Spare Parts Total</td><td style={{ padding: '10px 8px', border: '1px solid var(--color-gray-300)', fontWeight: 700 }}>₹</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Labour Entry */}
                                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                                <p style={{ margin: '0 0 8px', fontSize: '0.9rem', fontWeight: 700 }}>👷 LABOUR CHARGES</p>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                                    <thead><tr style={{ background: 'rgba(255, 152, 0, 0.1)' }}><th style={{ padding: '8px', textAlign: 'center', width: '40px', border: '1px solid var(--color-gray-300)' }}>#</th><th style={{ padding: '8px', textAlign: 'left', border: '1px solid var(--color-gray-300)' }}>Labour Description</th><th style={{ padding: '8px', textAlign: 'center', width: '60px', border: '1px solid var(--color-gray-300)' }}>Qty</th><th style={{ padding: '8px', textAlign: 'right', width: '80px', border: '1px solid var(--color-gray-300)' }}>Rate</th><th style={{ padding: '8px', textAlign: 'right', width: '90px', border: '1px solid var(--color-gray-300)' }}>Amount</th></tr></thead>
                                                    <tbody>
                                                        {[1, 2, 3, 4, 5].map(num => (<tr key={num}><td style={{ padding: '10px 8px', textAlign: 'center', border: '1px solid var(--color-gray-300)' }}>{num}</td><td style={{ padding: '10px 8px', border: '1px solid var(--color-gray-300)' }}></td><td style={{ padding: '10px 8px', border: '1px solid var(--color-gray-300)' }}></td><td style={{ padding: '10px 8px', border: '1px solid var(--color-gray-300)' }}></td><td style={{ padding: '10px 8px', border: '1px solid var(--color-gray-300)' }}></td></tr>))}
                                                        <tr style={{ background: 'rgba(255, 152, 0, 0.1)' }}><td colSpan={4} style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 600, border: '1px solid var(--color-gray-300)' }}>Labour Total</td><td style={{ padding: '10px 8px', border: '1px solid var(--color-gray-300)', fontWeight: 700 }}>₹</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Grand Total */}
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--spacing-lg)' }}>
                                                <div style={{ width: '280px', background: 'var(--color-gray-100)', padding: '12px', borderRadius: '8px', border: '2px solid var(--color-gray-300)' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}><span>Spare Parts:</span><span>₹ ____________</span></div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}><span>Labour:</span><span>₹ ____________</span></div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--color-gray-300)', fontSize: '1.1rem', fontWeight: 700 }}><span>GRAND TOTAL:</span><span>₹ ____________</span></div>
                                                </div>
                                            </div>

                                            {/* Completion & Signature */}
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)', paddingTop: 'var(--spacing-md)', borderTop: '1px dashed var(--color-gray-200)' }}>
                                                <div>
                                                    <p style={{ margin: '0 0 8px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>COMPLETION TIME</p>
                                                    <div style={{ height: '30px', borderBottom: '1px solid var(--color-gray-400)' }}></div>
                                                </div>
                                                <div style={{ textAlign: 'center' }}>
                                                    <div style={{ height: '40px', borderBottom: '1px solid var(--color-gray-400)', marginBottom: '6px' }}></div>
                                                    <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Technician Signature</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="no-print" style={{ padding: 'var(--spacing-lg)', borderTop: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'flex-end', gap: '12px', position: 'sticky', bottom: 0, background: 'white' }}>
                                <button onClick={() => setShowPrintModal(false)} style={{ padding: '12px 24px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Close</button>
                                <button onClick={handlePrintJobCard} className="btn btn-primary" style={{ padding: '12px 28px' }}>🖨️ Print {printCopyType === 'customer' ? 'Customer' : 'Technician'} Copy</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Add Customer Modal */}
            {showAddCustomerModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                    <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>➕ Add New Customer & Vehicle</h3>
                            <button onClick={() => setShowAddCustomerModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
                        </div>
                        <div style={{ padding: '24px' }}>
                            <h4 style={{ marginBottom: '16px', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)' }}>👤 Customer Details</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                                <input type="text" placeholder="Name *" value={newCustomerData.name} onChange={(e) => setNewCustomerData({ ...newCustomerData, name: e.target.value })} style={inputStyle} />
                                <input type="tel" placeholder="Phone *" value={newCustomerData.phone} onChange={(e) => setNewCustomerData({ ...newCustomerData, phone: e.target.value })} style={inputStyle} />
                                <input type="email" placeholder="Email" value={newCustomerData.email} onChange={(e) => setNewCustomerData({ ...newCustomerData, email: e.target.value })} style={inputStyle} />
                                <input type="text" placeholder="Address" value={newCustomerData.address} onChange={(e) => setNewCustomerData({ ...newCustomerData, address: e.target.value })} style={inputStyle} />
                            </div>

                            <h4 style={{ marginBottom: '16px', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)' }}>🏍️ Vehicle Details</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                                <input type="text" placeholder="Registration No *" value={newVehicleData.registrationNo} onChange={(e) => setNewVehicleData({ ...newVehicleData, registrationNo: e.target.value.toUpperCase() })} style={inputStyle} />
                                <select value={newVehicleData.brand} onChange={(e) => setNewVehicleData({ ...newVehicleData, brand: e.target.value })} style={inputStyle}>
                                    <option value="">Select Brand *</option>
                                    <option value="Honda">Honda</option>
                                    <option value="TVS">TVS</option>
                                    <option value="Bajaj">Bajaj</option>
                                    <option value="Hero">Hero</option>
                                    <option value="Royal Enfield">Royal Enfield</option>
                                    <option value="Suzuki">Suzuki</option>
                                    <option value="Yamaha">Yamaha</option>
                                    <option value="KTM">KTM</option>
                                </select>
                                <input type="text" placeholder="Model" value={newVehicleData.model} onChange={(e) => setNewVehicleData({ ...newVehicleData, model: e.target.value })} style={inputStyle} />
                                <input type="text" placeholder="Color" value={newVehicleData.color} onChange={(e) => setNewVehicleData({ ...newVehicleData, color: e.target.value })} style={inputStyle} />
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button type="button" onClick={() => setShowAddCustomerModal(false)} style={{ flex: 1, padding: '12px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Cancel</button>
                                <button type="button" onClick={handleSaveNewCustomer} disabled={isSavingCustomer} style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '8px', background: 'var(--color-primary)', color: 'white', cursor: isSavingCustomer ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: isSavingCustomer ? 0.7 : 1 }}>{isSavingCustomer ? 'Saving...' : '✅ Save & Select'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Service Type Modal */}
            {showAddServiceTypeModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                    <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '450px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>🛠️ Add Service Type</h3>
                            <button onClick={() => setShowAddServiceTypeModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
                        </div>
                        <div style={{ padding: '24px' }}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={labelStyle}>Service Name *</label>
                                <input type="text" placeholder="e.g. Full Body Wash" value={newServiceTypeData.name} onChange={(e) => setNewServiceTypeData({ ...newServiceTypeData, name: e.target.value })} style={inputStyle} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={labelStyle}>Labour Rate (₹) *</label>
                                <input type="number" placeholder="0.00" value={newServiceTypeData.ratePerHour} onChange={(e) => setNewServiceTypeData({ ...newServiceTypeData, ratePerHour: e.target.value })} style={inputStyle} />
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={labelStyle}>Description</label>
                                <textarea placeholder="Optional description..." value={newServiceTypeData.description} onChange={(e) => setNewServiceTypeData({ ...newServiceTypeData, description: e.target.value })} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button type="button" onClick={() => setShowAddServiceTypeModal(false)} style={{ flex: 1, padding: '12px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Cancel</button>
                                <button type="button" onClick={handleSaveNewServiceType} disabled={isSavingServiceType} style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '8px', background: 'var(--color-primary)', color: 'white', cursor: isSavingServiceType ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: isSavingServiceType ? 0.7 : 1 }}>{isSavingServiceType ? 'Saving...' : '✅ Save & Select'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
