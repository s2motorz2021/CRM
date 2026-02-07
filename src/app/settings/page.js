'use client';

import { useState, useEffect } from 'react';
import MasterDataTable from '@/components/MasterDataTable';

// Master data definitions
const masterCategories = [
    {
        id: 'customers',
        name: 'Customers',
        icon: '👤',
        description: 'Customer database',
        color: '#00B8D4',
        apiEndpoint: '/api/customers',
        fields: [
            { key: 'name', label: 'Name', type: 'text', required: true },
            { key: 'phone', label: 'Phone', type: 'tel', required: true },
            { key: 'vehicleNo', label: 'Vehicle Registration No.', type: 'text' },
            { key: 'address', label: 'Address', type: 'textarea' },
            { key: 'gstin', label: 'GSTIN', type: 'text' },
        ],
    },
    {
        id: 'vehicleBrands',
        name: 'Vehicle Brands',
        icon: '🏭',
        description: 'Manufacturers',
        color: '#673AB7',
        apiEndpoint: '/api/vehicle-brands',
        fields: [
            { key: 'name', label: 'Brand Name', type: 'text', required: true },
            { key: 'country', label: 'Country', type: 'text' },
        ],
    },
    {
        id: 'vehicleModels',
        name: 'Vehicle Models',
        icon: '🏍️',
        description: 'Model variants',
        color: '#E91E63',
        apiEndpoint: '/api/vehicle-models',
        fields: [
            { key: 'name', label: 'Model Name', type: 'text', required: true },
            { key: 'brand', label: 'Brand', type: 'select', options: [], required: true },
            { key: 'year', label: 'Launch Year', type: 'number' },
        ],
    },
    {
        id: 'vehicleColors',
        name: 'Vehicle Colors',
        icon: '🎨',
        description: 'Color variants',
        color: '#FF9800',
        apiEndpoint: '/api/vehicle-colors',
        fields: [
            { key: 'name', label: 'Color Name', type: 'text', required: true },
            { key: 'code', label: 'Color Code', type: 'text' },
        ],
    },
    {
        id: 'gstRates',
        name: 'GST Rates',
        icon: '📊',
        description: 'Tax rates',
        color: '#2196F3',
        apiEndpoint: '/api/gst-rates',
        fields: [
            { key: 'rate', label: 'GST Rate (%)', type: 'number', required: true },
            { key: 'description', label: 'Description', type: 'text' },
        ],
    },
    {
        id: 'inventoryCategories',
        name: 'Inventory Categories',
        icon: '📦',
        description: 'Spare parts categories',
        color: '#795548',
        apiEndpoint: '/api/inventory-categories',
        fields: [
            { key: 'name', label: 'Category Name', type: 'text', required: true },
            { key: 'description', label: 'Description', type: 'text' },
        ],
    },
    {
        id: 'serviceTypes',
        name: 'Service Types',
        icon: '🔧',
        description: 'Service categories',
        color: '#4CAF50',
        apiEndpoint: '/api/service-types',
        fields: [
            { key: 'name', label: 'Service Name', type: 'text', required: true },
            { key: 'ratePerHour', label: 'Amount (₹)', type: 'number', required: true },
            { key: 'description', label: 'Description', type: 'textarea' },
        ],
    },
    {
        id: 'suppliers',
        name: 'Suppliers',
        icon: '🏭',
        description: 'Parts suppliers',
        color: '#3F51B5',
        apiEndpoint: '/api/suppliers',
        fields: [
            { key: 'name', label: 'Supplier Name', type: 'text', required: true },
            { key: 'contact', label: 'Contact Person', type: 'text' },
            { key: 'phone', label: 'Phone', type: 'tel', required: true },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'gstin', label: 'GSTIN', type: 'text' },
            { key: 'address', label: 'Address', type: 'textarea' },
        ],
    },
    {
        id: 'ramps',
        name: 'Ramps / Service Bays',
        icon: '🅿️',
        description: 'Workshop service bays',
        color: '#FF5722',
        apiEndpoint: '/api/ramps',
        fields: [
            { key: 'name', label: 'Bay Name/Number', type: 'text', required: true },
            { key: 'bayType', label: 'Bay Type', type: 'select', options: ['Service', 'Water Wash', 'Quick Service'], required: true },
            { key: 'branch', label: 'Branch', type: 'select', options: [], required: true },
            { key: 'technicianName', label: 'Technician Name', type: 'select', options: [], isSearchable: true },
        ],
    },
    {
        id: 'staffRoles',
        name: 'Staff Roles',
        icon: '👷',
        description: 'Staff roles for HR and Job Cards',
        color: '#9C27B0',
        apiEndpoint: '/api/roles',
        fields: [
            { key: 'name', label: 'Role Name', type: 'text', required: true },
            { key: 'description', label: 'Description', type: 'text' },
            { key: 'department', label: 'Department', type: 'select', options: ['Workshop', 'Admin', 'Finance', 'Sales', 'Other'], required: true },
            { key: 'canAssignJobs', label: 'Can be assigned to Job Cards', type: 'checkbox' },
        ],
    },
    {
        id: 'inventorySettings',
        name: 'Inventory Settings',
        icon: '⚙️',
        description: 'Stock alert settings',
        color: '#607D8B',
        apiEndpoint: '/api/inventory-settings',
        fields: [
            { key: 'name', label: 'Setting Name', type: 'text', required: true },
            { key: 'value', label: 'Value (Days)', type: 'number', required: true },
            { key: 'description', label: 'Description', type: 'textarea' },
        ],
    },
    {
        id: 'customerVoice',
        name: 'Customer Voice',
        icon: '🗣️',
        description: 'Common customer complaints',
        color: '#9C27B0',
        apiEndpoint: '/api/customer-voice',
        fields: [
            { key: 'name', label: 'Complaint/Issue', type: 'text', required: true },
            { key: 'category', label: 'Category', type: 'select', options: ['Engine', 'Brakes', 'Electrical', 'Body', 'Suspension', 'Transmission', 'General'], required: true },
            { key: 'description', label: 'Description', type: 'textarea' },
        ],
    },
    {
        id: 'advisorVoice',
        name: 'Advisor Voice',
        icon: '👨‍💼',
        description: 'Advisor observations/notes',
        color: '#00BCD4',
        apiEndpoint: '/api/advisor-voice',
        fields: [
            { key: 'name', label: 'Observation/Note', type: 'text', required: true },
            { key: 'category', label: 'Category', type: 'select', options: ['Inspection', 'Recommendation', 'Safety', 'Maintenance', 'Repair', 'General'], required: true },
            { key: 'description', label: 'Description', type: 'textarea' },
        ],
    },
];

// Sample data
const sampleData = {
    customers: [
        { id: 1, name: 'Rahul Sharma', phone: '9876543210', vehicleNo: 'MH02AB1234', address: 'Mumbai', gstin: '', isActive: true },
    ],
    vehicleBrands: [
        { id: 1, name: 'Honda', country: 'Japan', isActive: true },
        { id: 2, name: 'Yamaha', country: 'Japan', isActive: true },
        { id: 3, name: 'Bajaj', country: 'India', isActive: true },
        { id: 4, name: 'TVS', country: 'India', isActive: true },
        { id: 5, name: 'Royal Enfield', country: 'India', isActive: true },
    ],
    vehicleModels: [
        { id: 1, name: 'Activa 6G', brand: 'Honda', year: 2023, isActive: true },
        { id: 2, name: 'FZ-S', brand: 'Yamaha', year: 2023, isActive: true },
    ],
    gstRates: [
        { id: 1, rate: 5, description: 'Essential services', isActive: true },
        { id: 2, rate: 12, description: 'Standard rate', isActive: true },
        { id: 3, rate: 18, description: 'Services & parts', isActive: true },
        { id: 4, rate: 28, description: 'Luxury items', isActive: true },
    ],
    suppliers: [
        { id: 1, name: 'AutoParts India', contact: 'Rajesh Kumar', phone: '9876543220', email: 'sales@autoparts.in', gstin: '27AABCU9603R1ZM', address: 'Delhi', isActive: true },
    ],
    inventorySettings: [
        { id: 1, name: 'Dead Stock Days', value: 90, description: 'Number of days after which unsold stock is considered dead stock', isActive: true },
        { id: 2, name: 'Low Stock Alert Days', value: 7, description: 'Alert when stock level drops below this days of average sales', isActive: true },
    ],
    inventoryCategories: [
        { id: 1, name: 'Engine Parts', description: 'Engine components and accessories', isActive: true },
        { id: 2, name: 'Body Parts', description: 'Body panels and covers', isActive: true },
        { id: 3, name: 'Electrical', description: 'Electrical components and wiring', isActive: true },
        { id: 4, name: 'Lubricants', description: 'Oils and lubricants', isActive: true },
        { id: 5, name: 'Filters', description: 'Air, oil and fuel filters', isActive: true },
        { id: 6, name: 'Brake System', description: 'Brake pads, shoes and parts', isActive: true },
        { id: 7, name: 'Chain & Sprocket', description: 'Chain sets and sprockets', isActive: true },
        { id: 8, name: 'Tyre & Tubes', description: 'Tyres and tubes', isActive: true },
    ],
    customerVoice: [
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
    ],
    advisorVoice: [
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
    ],
    ramps: [
        { id: 1, name: 'Service Bay 1', bayType: 'Service', branch: 'Main Branch', isActive: true },
        { id: 2, name: 'Service Bay 2', bayType: 'Service', branch: 'Main Branch', isActive: true },
        { id: 3, name: 'Service Bay 3', bayType: 'Service', branch: 'Main Branch', isActive: true },
        { id: 4, name: 'Water Wash Bay', bayType: 'Water Wash', branch: 'Main Branch', isActive: true },
        { id: 5, name: 'Quick Service Bay', bayType: 'Quick Service', branch: 'Main Branch', isActive: true },
    ],
    serviceTypes: [],
};

// Sample Branches
const sampleBranches = [
    { id: 1, name: 'Main Branch', code: 'HQ', address: '123 Main Road, City', phone: '9876543210', email: 'main@s2motorz.com', manager: 'Suresh Yadav', isActive: true },
    { id: 2, name: 'City Center', code: 'CC', address: '456 Market Street, City', phone: '9876543211', email: 'cc@s2motorz.com', manager: 'Amit Sharma', isActive: true },
];

// Sample Users
const sampleUsers = [
    { id: 1, name: 'Admin User', username: 'admin', email: 'admin@s2motorz.com', role: 'Admin', branch: 'All Branches', phone: '9876543200', isActive: true, lastLogin: '2026-01-31 10:30' },
    { id: 2, name: 'Suresh Yadav', username: 'suresh', email: 'suresh@s2motorz.com', role: 'Workshop Manager', branch: 'Main Branch', phone: '9876543213', isActive: true, lastLogin: '2026-01-31 09:15' },
    { id: 3, name: 'Priya Patel', username: 'priya', email: 'priya@s2motorz.com', role: 'Service Advisor', branch: 'Main Branch', phone: '9876543212', isActive: true, lastLogin: '2026-01-30 18:45' },
];

// Role Permissions
const rolePermissions = {
    'Admin': { dashboard: true, crm: true, billing: true, inventory: true, hr: true, finance: true, settings: true, reports: true },
    'Workshop Manager': { dashboard: true, crm: true, billing: true, inventory: true, hr: false, finance: false, settings: false, reports: true },
    'Service Advisor': { dashboard: true, crm: true, billing: true, inventory: false, hr: false, finance: false, settings: false, reports: false },
    'Mechanic': { dashboard: true, crm: false, billing: false, inventory: false, hr: false, finance: false, settings: false, reports: false },
    'Accountant': { dashboard: true, crm: false, billing: true, inventory: false, hr: false, finance: true, settings: false, reports: true },
};

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('master');
    const [selectedMaster, setSelectedMaster] = useState(null);
    const [masterData, setMasterData] = useState(sampleData);

    // Fetch staff roles and suppliers from API on mount
    useEffect(() => {
        const fetchMasterData = async () => {
            try {
                // Fetch Roles
                const rolesRes = await fetch('/api/roles');
                if (rolesRes.ok) {
                    const data = await rolesRes.json();
                    setMasterData(prev => ({ ...prev, staffRoles: data.map(r => ({ ...r, id: r._id, isActive: r.isActive ?? true })) }));
                }

                // Fetch Customers
                const customersRes = await fetch('/api/customers');
                if (customersRes.ok) {
                    const data = await customersRes.json();
                    setMasterData(prev => ({ ...prev, customers: data.map(c => ({ ...c, id: c._id, isActive: c.isActive ?? true })) }));
                }

                // Fetch Suppliers
                const suppliersRes = await fetch('/api/suppliers');
                if (suppliersRes.ok) {
                    const data = await suppliersRes.json();
                    setMasterData(prev => ({ ...prev, suppliers: data.map(s => ({ ...s, id: s._id, isActive: s.isActive ?? true })) }));
                }

                // Fetch Service Types
                const serviceTypesRes = await fetch('/api/service-types');
                if (serviceTypesRes.ok) {
                    const data = await serviceTypesRes.json();
                    setMasterData(prev => ({ ...prev, serviceTypes: data.map(s => ({ ...s, id: s._id, isActive: s.isActive ?? true })) }));
                }

                // Fetch Inventory Categories
                const categoriesRes = await fetch('/api/inventory-categories');
                if (categoriesRes.ok) {
                    const data = await categoriesRes.json();
                    setMasterData(prev => ({ ...prev, inventoryCategories: data.map(c => ({ ...c, id: c._id, isActive: c.isActive ?? true })) }));
                }

                // Fetch Vehicle Brands
                const brandsRes = await fetch('/api/vehicle-brands');
                if (brandsRes.ok) {
                    const data = await brandsRes.json();
                    setMasterData(prev => ({
                        ...prev,
                        vehicleBrands: data.map(b => ({ ...b, id: b._id, isActive: b.isActive ?? true }))
                    }));
                }

                // Fetch Vehicle Models
                const modelsRes = await fetch('/api/vehicle-models');
                if (modelsRes.ok) {
                    const data = await modelsRes.json();
                    setMasterData(prev => ({
                        ...prev,
                        vehicleModels: data.map(m => ({ ...m, id: m._id, isActive: m.isActive ?? true }))
                    }));
                }

                // Fetch Vehicle Colors
                const colorsRes = await fetch('/api/vehicle-colors');
                if (colorsRes.ok) {
                    const data = await colorsRes.json();
                    setMasterData(prev => ({
                        ...prev,
                        vehicleColors: data.map(c => ({ ...c, id: c._id, isActive: c.isActive ?? true }))
                    }));
                }

                // Fetch GST Rates
                const gstRes = await fetch('/api/gst-rates');
                if (gstRes.ok) {
                    const data = await gstRes.json();
                    setMasterData(prev => ({ ...prev, gstRates: data.map(g => ({ ...g, id: g._id, isActive: g.isActive ?? true })) }));
                }

                // Fetch Ramps
                const rampsRes = await fetch('/api/ramps');
                if (rampsRes.ok) {
                    const data = await rampsRes.json();
                    setMasterData(prev => ({ ...prev, ramps: data.map(r => ({ ...r, id: r._id, isActive: r.isActive ?? true })) }));
                }

                // Fetch Customer Voice
                const cvRes = await fetch('/api/customer-voice');
                if (cvRes.ok) {
                    const data = await cvRes.json();
                    setMasterData(prev => ({ ...prev, customerVoice: data.map(c => ({ ...c, id: c._id, isActive: c.isActive ?? true })) }));
                }

                // Fetch Advisor Voice
                const avRes = await fetch('/api/advisor-voice');
                if (avRes.ok) {
                    const data = await avRes.json();
                    setMasterData(prev => ({ ...prev, advisorVoice: data.map(a => ({ ...a, id: a._id, isActive: a.isActive ?? true })) }));
                }

                // Fetch Inventory Settings
                const invSetRes = await fetch('/api/inventory-settings');
                if (invSetRes.ok) {
                    const data = await invSetRes.json();
                    setMasterData(prev => ({ ...prev, inventorySettings: data.map(i => ({ ...i, id: i._id, isActive: i.isActive ?? true })) }));
                }

                // Fetch Staff
                const staffRes = await fetch('/api/staff');
                if (staffRes.ok) {
                    const data = await staffRes.json();
                    setMasterData(prev => ({ ...prev, staff: data.map(s => ({ ...s, id: s._id, isActive: s.isActive ?? true })) }));
                }
            } catch (error) {
                console.error('Error fetching master data:', error);
            }
        };
        fetchMasterData();
    }, []);

    // Branch state
    const [branches, setBranches] = useState(sampleBranches);
    const [showBranchModal, setShowBranchModal] = useState(false);
    const [editingBranch, setEditingBranch] = useState(null);
    const [branchForm, setBranchForm] = useState({ name: '', code: '', address: '', phone: '', email: '', manager: '' });

    // User state
    const [users, setUsers] = useState(sampleUsers);
    const [showUserModal, setShowUserModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userForm, setUserForm] = useState({ name: '', username: '', email: '', password: '', role: 'Service Advisor', branch: 'Main Branch', phone: '' });
    const [showPasswordModal, setShowPasswordModal] = useState(null);
    const [newPassword, setNewPassword] = useState('');

    // Role Access state
    const [roles, setRoles] = useState(rolePermissions);
    const [selectedRole, setSelectedRole] = useState('Admin');

    // Theme state
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [dashboardSettings, setDashboardSettings] = useState({
        showRevenue: true, showPending: true, showVehicles: true, showJobs: true,
        refreshInterval: 30, defaultPeriod: 'today'
    });

    // Backup state
    const [backupHistory, setBackupHistory] = useState([
        { id: 1, date: '2026-01-31 10:00', size: '2.4 MB', type: 'Full Backup', status: 'success' },
        { id: 2, date: '2026-01-30 10:00', size: '2.3 MB', type: 'Full Backup', status: 'success' },
    ]);

    const tabs = [
        { id: 'master', label: '📋 Master Data', icon: '📋' },
        { id: 'branches', label: '🏢 Branches', icon: '🏢' },
        { id: 'users', label: '👥 Users & Login', icon: '👥' },
        { id: 'roles', label: '🔐 Role Access', icon: '🔐' },
        { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
        { id: 'theme', label: '🎨 Appearance', icon: '🎨' },
        { id: 'backup', label: '💾 Backup', icon: '💾' },
    ];

    const allModules = ['dashboard', 'crm', 'billing', 'inventory', 'hr', 'finance', 'settings', 'reports'];

    // Master Data handlers
    const handleSaveItem = async (masterId, item) => {
        const category = masterCategories.find(c => c.id === masterId);

        // Use API if apiEndpoint is defined
        if (category?.apiEndpoint) {
            try {
                const endpoint = category.apiEndpoint;
                const body = item.id ? { ...item, _id: item.id } : item;
                const res = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });

                if (res.ok) {
                    const savedItem = await res.json();
                    if (!savedItem || savedItem.error) throw new Error(savedItem?.error || 'Failed to parse saved item');

                    setMasterData(prev => {
                        const existing = prev[masterId] || [];
                        const newItem = { ...savedItem, id: savedItem._id, isActive: true };

                        if (item.id && typeof item.id === 'string' && item.id.length === 24) {
                            return { ...prev, [masterId]: existing.map(i => i.id === item.id ? newItem : i) };
                        } else {
                            const filtered = item.id ? existing.filter(i => i.id !== item.id) : existing;
                            return { ...prev, [masterId]: [...filtered, newItem] };
                        }
                    });
                    alert(`✅ ${category.name} saved successfully!`);
                } else {
                    const errData = await res.json().catch(() => ({}));
                    alert(`❌ Failed to save ${category.name}: ${errData.error || res.statusText}`);
                }
            } catch (error) {
                console.error(`Error saving ${masterId}:`, error);
                alert(`❌ Error saving ${masterId}`);
            }
        } else {
            // For other master data, use local state
            setMasterData(prev => {
                const existing = prev[masterId] || [];
                if (item.id) {
                    return { ...prev, [masterId]: existing.map(i => i.id === item.id ? { ...item, updatedAt: new Date().toISOString() } : i) };
                } else {
                    const newId = Math.max(0, ...existing.map(i => i.id)) + 1;
                    return { ...prev, [masterId]: [...existing, { ...item, id: newId, isActive: true, createdAt: new Date().toISOString() }] };
                }
            });
        }
    };

    const handleDeleteItem = async (masterId, itemId) => {
        const category = masterCategories.find(c => c.id === masterId);

        if (category?.apiEndpoint) {
            try {
                const endpoint = category.apiEndpoint;
                const isValidObjectId = typeof itemId === 'string' && itemId.length === 24;

                if (isValidObjectId) {
                    const res = await fetch(`${endpoint}?id=${itemId}`, {
                        method: 'DELETE',
                    });
                    if (!res.ok) throw new Error('Delete request failed');
                }

                setMasterData(prev => ({
                    ...prev,
                    [masterId]: (prev[masterId] || []).map(i => i.id === itemId ? { ...i, isActive: false } : i),
                }));
            } catch (error) {
                console.error(`Error deleting ${masterId}:`, error);
            }
        } else {
            setMasterData(prev => ({
                ...prev,
                [masterId]: (prev[masterId] || []).map(i => i.id === itemId ? { ...i, isActive: false, deletedAt: new Date().toISOString() } : i),
            }));
        }
    };

    const handleRestoreItem = async (masterId, itemId) => {
        const category = masterCategories.find(c => c.id === masterId);

        if (category?.apiEndpoint) {
            try {
                const item = (masterData[masterId] || []).find(i => i.id === itemId);
                if (item) {
                    const endpoint = category.apiEndpoint;
                    const isValidObjectId = typeof itemId === 'string' && itemId.length === 24;

                    if (isValidObjectId) {
                        const res = await fetch(endpoint, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ...item, _id: item.id, isActive: true }),
                        });
                        if (!res.ok) throw new Error('Restore request failed');
                    }

                    setMasterData(prev => ({
                        ...prev,
                        [masterId]: (prev[masterId] || []).map(i => i.id === itemId ? { ...i, isActive: true } : i),
                    }));
                }
            } catch (error) {
                console.error(`Error restoring ${masterId}:`, error);
            }
        } else {
            setMasterData(prev => ({
                ...prev,
                [masterId]: (prev[masterId] || []).map(i => i.id === itemId ? { ...i, isActive: true, deletedAt: null } : i),
            }));
        }
    };

    // Branch handlers
    const handleSaveBranch = () => {
        if (!branchForm.name || !branchForm.code) { alert('Name and Code are required'); return; }
        if (editingBranch) {
            setBranches(prev => prev.map(b => b.id === editingBranch.id ? { ...editingBranch, ...branchForm } : b));
        } else {
            setBranches(prev => [...prev, { ...branchForm, id: Date.now(), isActive: true }]);
        }
        resetBranchForm();
    };

    const resetBranchForm = () => {
        setBranchForm({ name: '', code: '', address: '', phone: '', email: '', manager: '' });
        setEditingBranch(null);
        setShowBranchModal(false);
    };

    // User handlers
    const handleSaveUser = () => {
        if (!userForm.name || !userForm.username) { alert('Name and Username are required'); return; }
        if (!editingUser && !userForm.password) { alert('Password is required for new users'); return; }
        if (editingUser) {
            setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...editingUser, ...userForm } : u));
        } else {
            setUsers(prev => [...prev, { ...userForm, id: Date.now(), isActive: true, lastLogin: 'Never' }]);
        }
        resetUserForm();
    };

    const resetUserForm = () => {
        setUserForm({ name: '', username: '', email: '', password: '', role: 'Service Advisor', branch: 'Main Branch', phone: '' });
        setEditingUser(null);
        setShowUserModal(false);
    };

    const handleResetPassword = () => {
        if (!newPassword || newPassword.length < 6) { alert('Password must be at least 6 characters'); return; }
        alert(`✅ Password reset for ${showPasswordModal.name}`);
        setShowPasswordModal(null);
        setNewPassword('');
    };

    // Role Access handlers
    const togglePermission = (module) => {
        setRoles(prev => ({
            ...prev,
            [selectedRole]: { ...prev[selectedRole], [module]: !prev[selectedRole][module] }
        }));
    };

    // Backup handlers
    const handleExportBackup = () => {
        const allData = { masterData, branches, users, roles, dashboardSettings, exportDate: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `s2motorz_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        setBackupHistory(prev => [{ id: Date.now(), date: new Date().toLocaleString(), size: `${(JSON.stringify(allData).length / 1024).toFixed(1)} KB`, type: 'Export', status: 'success' }, ...prev]);
    };

    const handleImportBackup = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (data.masterData) setMasterData(data.masterData);
                if (data.branches) setBranches(data.branches);
                if (data.users) setUsers(data.users);
                if (data.roles) setRoles(data.roles);
                if (data.dashboardSettings) setDashboardSettings(data.dashboardSettings);
                setBackupHistory(prev => [{ id: Date.now(), date: new Date().toLocaleString(), size: `${(file.size / 1024).toFixed(1)} KB`, type: 'Import', status: 'success' }, ...prev]);
                alert('✅ Backup restored successfully!');
            } catch (err) {
                alert('❌ Invalid backup file');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    // Styles
    const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', fontSize: '0.9rem' };
    const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' };
    const cardStyle = { background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)', boxShadow: 'var(--shadow-sm)' };

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 'var(--spacing-xs)' }}>⚙️ Settings</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Configure system settings, manage branches, users, and access control</p>
            </div>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: 'var(--spacing-xl)', background: 'white', padding: '6px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', flexWrap: 'wrap' }}>
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSelectedMaster(null); }} style={{
                        padding: '10px 16px', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                        background: activeTab === tab.id ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' : 'transparent',
                        color: activeTab === tab.id ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s ease',
                    }}>{tab.label}</button>
                ))}
            </div>

            {/* Master Data Tab */}
            {activeTab === 'master' && (
                selectedMaster ? (
                    <div>
                        <button onClick={() => setSelectedMaster(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500, marginBottom: 'var(--spacing-lg)', padding: 0 }}>← Back to Master Data</button>
                        <MasterDataTable
                            master={(() => {
                                if (selectedMaster.id === 'vehicleModels') {
                                    return {
                                        ...selectedMaster,
                                        fields: selectedMaster.fields.map(f =>
                                            f.key === 'brand'
                                                ? { ...f, options: (masterData.vehicleBrands || []).filter(b => b.isActive).map(b => b.name) }
                                                : f
                                        )
                                    };
                                }
                                if (selectedMaster.id === 'ramps') {
                                    return {
                                        ...selectedMaster,
                                        fields: selectedMaster.fields.map(f =>
                                            f.key === 'branch'
                                                ? { ...f, options: branches.filter(b => b.isActive).map(b => b.name) }
                                                : f.key === 'technicianName'
                                                    ? { ...f, options: (masterData.staff || []).filter(s => s.status === 'active' || s.isActive).map(s => s.name) }
                                                    : f
                                        )
                                    };
                                }
                                return selectedMaster;
                            })()}
                            data={masterData[selectedMaster.id] || []}
                            onSave={(item) => handleSaveItem(selectedMaster.id, item)}
                            onDelete={(itemId) => handleDeleteItem(selectedMaster.id, itemId)}
                            onRestore={(itemId) => handleRestoreItem(selectedMaster.id, itemId)}
                            vehicleBrands={masterData.vehicleBrands || []}
                        />
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--spacing-lg)' }}>
                        {masterCategories.map((master) => {
                            const count = (masterData[master.id] || []).filter(i => i.isActive).length;
                            return (
                                <div key={master.id} onClick={() => setSelectedMaster(master)} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)', boxShadow: 'var(--shadow-sm)', cursor: 'pointer', transition: 'all 0.2s', borderLeft: `4px solid ${master.color}` }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '1.5rem' }}>{master.icon}</span>
                                        <span style={{ background: 'var(--color-gray-100)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{count}</span>
                                    </div>
                                    <h3 style={{ marginTop: '12px', fontSize: '1rem', fontWeight: 600 }}>{master.name}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>{master.description}</p>
                                </div>
                            );
                        })}
                    </div>
                )
            )}

            {/* Branches Tab */}
            {activeTab === 'branches' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--spacing-lg)' }}>
                        <button onClick={() => setShowBranchModal(true)} style={{ padding: '10px 20px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>+ Add Branch</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 'var(--spacing-lg)' }}>
                        {branches.filter(b => b.isActive).map(branch => (
                            <div key={branch.id} style={{ ...cardStyle, borderLeft: '4px solid var(--color-primary)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>🏢 {branch.name}</h3>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--color-gray-100)', padding: '2px 8px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' }}>{branch.code}</span>
                                    </div>
                                    <button onClick={() => { setEditingBranch(branch); setBranchForm(branch); setShowBranchModal(true); }} style={{ padding: '6px 12px', background: 'var(--color-gray-100)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>✏️ Edit</button>
                                </div>
                                <div style={{ marginTop: 'var(--spacing-md)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <div style={{ marginBottom: '6px' }}>📍 {branch.address || 'No address'}</div>
                                    <div style={{ marginBottom: '6px' }}>📞 {branch.phone}</div>
                                    <div style={{ marginBottom: '6px' }}>📧 {branch.email}</div>
                                    <div>👤 Manager: {branch.manager || 'Not assigned'}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Users & Login Tab */}
            {activeTab === 'users' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--spacing-lg)' }}>
                        <button onClick={() => setShowUserModal(true)} style={{ padding: '10px 20px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>+ Add User</button>
                    </div>
                    <div style={cardStyle}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--color-gray-50)' }}>
                                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.85rem' }}>User</th>
                                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.85rem' }}>Username</th>
                                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.85rem' }}>Role</th>
                                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.85rem' }}>Branch</th>
                                    <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.85rem' }}>Status</th>
                                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.85rem' }}>Last Login</th>
                                    <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.85rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                                        <td style={{ padding: '12px' }}>
                                            <div style={{ fontWeight: 500 }}>{user.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                                        </td>
                                        <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '0.9rem' }}>{user.username}</td>
                                        <td style={{ padding: '12px' }}><span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', background: user.role === 'Admin' ? 'rgba(244,67,54,0.1)' : 'rgba(33,150,243,0.1)', color: user.role === 'Admin' ? '#F44336' : '#2196F3' }}>{user.role}</span></td>
                                        <td style={{ padding: '12px', fontSize: '0.9rem' }}>{user.branch}</td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}><span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', background: user.isActive ? 'rgba(76,175,80,0.1)' : 'rgba(158,158,158,0.1)', color: user.isActive ? '#4CAF50' : '#9E9E9E' }}>{user.isActive ? 'Active' : 'Inactive'}</span></td>
                                        <td style={{ padding: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user.lastLogin}</td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                                <button onClick={() => { setEditingUser(user); setUserForm(user); setShowUserModal(true); }} style={{ padding: '4px 8px', background: 'var(--color-gray-100)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>✏️</button>
                                                <button onClick={() => setShowPasswordModal(user)} style={{ padding: '4px 8px', background: 'rgba(255,152,0,0.1)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>🔑</button>
                                                <button onClick={() => setUsers(prev => prev.map(u => u.id === user.id ? { ...u, isActive: !u.isActive } : u))} style={{ padding: '4px 8px', background: user.isActive ? 'rgba(244,67,54,0.1)' : 'rgba(76,175,80,0.1)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>{user.isActive ? '🚫' : '✓'}</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Role Access Tab */}
            {activeTab === 'roles' && (
                <div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--spacing-lg)', flexWrap: 'wrap' }}>
                        {Object.keys(roles).map(role => (
                            <button key={role} onClick={() => setSelectedRole(role)} style={{ padding: '10px 20px', border: selectedRole === role ? 'none' : '1px solid var(--color-gray-200)', borderRadius: '8px', cursor: 'pointer', fontWeight: 500, background: selectedRole === role ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' : 'white', color: selectedRole === role ? 'white' : 'var(--text-primary)' }}>{role}</button>
                        ))}
                    </div>
                    <div style={cardStyle}>
                        <h3 style={{ margin: '0 0 var(--spacing-lg)', fontSize: '1.1rem' }}>🔐 Access Permissions for: <span style={{ color: 'var(--color-primary)' }}>{selectedRole}</span></h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
                            {allModules.map(module => (
                                <div key={module} onClick={() => selectedRole !== 'Admin' && togglePermission(module)} style={{ padding: 'var(--spacing-md)', background: roles[selectedRole]?.[module] ? 'rgba(76,175,80,0.1)' : 'var(--color-gray-50)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: selectedRole === 'Admin' ? 'not-allowed' : 'pointer', border: roles[selectedRole]?.[module] ? '1px solid rgba(76,175,80,0.3)' : '1px solid var(--color-gray-200)' }}>
                                    <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{module}</span>
                                    <span style={{ fontSize: '1.2rem' }}>{roles[selectedRole]?.[module] ? '✅' : '❌'}</span>
                                </div>
                            ))}
                        </div>
                        {selectedRole === 'Admin' && <p style={{ marginTop: 'var(--spacing-md)', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>⚠️ Admin role has full access and cannot be modified</p>}
                    </div>
                </div>
            )}

            {/* Dashboard Settings Tab */}
            {activeTab === 'dashboard' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
                    <div style={cardStyle}>
                        <h3 style={{ margin: '0 0 var(--spacing-lg)', fontSize: '1.1rem' }}>📊 Dashboard Widgets</h3>
                        {[{ key: 'showRevenue', label: 'Revenue Widget' }, { key: 'showPending', label: 'Pending Jobs Widget' }, { key: 'showVehicles', label: 'Vehicles Widget' }, { key: 'showJobs', label: 'Jobs Status Widget' }].map(widget => (
                            <div key={widget.key} onClick={() => setDashboardSettings(prev => ({ ...prev, [widget.key]: !prev[widget.key] }))} style={{ padding: '12px', marginBottom: '8px', background: dashboardSettings[widget.key] ? 'rgba(76,175,80,0.1)' : 'var(--color-gray-50)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                                <span>{widget.label}</span>
                                <span>{dashboardSettings[widget.key] ? '✅' : '❌'}</span>
                            </div>
                        ))}
                    </div>
                    <div style={cardStyle}>
                        <h3 style={{ margin: '0 0 var(--spacing-lg)', fontSize: '1.1rem' }}>⚙️ Dashboard Options</h3>
                        <div style={{ marginBottom: 'var(--spacing-md)' }}>
                            <label style={labelStyle}>Auto Refresh Interval (seconds)</label>
                            <select value={dashboardSettings.refreshInterval} onChange={(e) => setDashboardSettings(prev => ({ ...prev, refreshInterval: e.target.value }))} style={inputStyle}>
                                <option value="15">15 seconds</option>
                                <option value="30">30 seconds</option>
                                <option value="60">1 minute</option>
                                <option value="300">5 minutes</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Default Period</label>
                            <select value={dashboardSettings.defaultPeriod} onChange={(e) => setDashboardSettings(prev => ({ ...prev, defaultPeriod: e.target.value }))} style={inputStyle}>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="year">This Year</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Theme/Appearance Tab */}
            {activeTab === 'theme' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
                    <div style={cardStyle}>
                        <h3 style={{ margin: '0 0 var(--spacing-lg)', fontSize: '1.1rem' }}>🎨 Theme</h3>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                            <div onClick={() => setIsDarkMode(false)} style={{ flex: 1, padding: 'var(--spacing-lg)', background: '#fff', border: !isDarkMode ? '3px solid var(--color-primary)' : '2px solid var(--color-gray-200)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>☀️</div>
                                <div style={{ fontWeight: 600 }}>Light Mode</div>
                            </div>
                            <div onClick={() => setIsDarkMode(true)} style={{ flex: 1, padding: 'var(--spacing-lg)', background: '#1a1a2e', border: isDarkMode ? '3px solid var(--color-primary)' : '2px solid var(--color-gray-200)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', textAlign: 'center', color: 'white' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🌙</div>
                                <div style={{ fontWeight: 600 }}>Dark Mode</div>
                            </div>
                        </div>
                        <p style={{ marginTop: 'var(--spacing-md)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Theme changes will apply on next login</p>
                    </div>
                    <div style={cardStyle}>
                        <h3 style={{ margin: '0 0 var(--spacing-lg)', fontSize: '1.1rem' }}>🎯 Accent Color</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                            {['#0891b2', '#2196F3', '#4CAF50', '#FF9800', '#E91E63', '#9C27B0', '#F44336', '#00BCD4', '#795548', '#607D8B'].map(color => (
                                <div key={color} style={{ width: '40px', height: '40px', borderRadius: '50%', background: color, cursor: 'pointer', border: '3px solid white', boxShadow: 'var(--shadow-sm)' }} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Backup Tab */}
            {activeTab === 'backup' && (
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
                        <div style={{ ...cardStyle, textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                            <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📤</div>
                            <h3 style={{ margin: '0 0 8px' }}>Export Backup</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--spacing-md)' }}>Download all system data as JSON file</p>
                            <button onClick={handleExportBackup} style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #4CAF50, #388E3C)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem' }}>Download Backup</button>
                        </div>
                        <div style={{ ...cardStyle, textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                            <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📥</div>
                            <h3 style={{ margin: '0 0 8px' }}>Import Backup</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 'var(--spacing-md)' }}>Restore system data from JSON backup</p>
                            <label style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #2196F3, #1976D2)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', display: 'inline-block' }}>
                                Restore Backup
                                <input type="file" accept=".json" onChange={handleImportBackup} style={{ display: 'none' }} />
                            </label>
                        </div>
                    </div>
                    <div style={cardStyle}>
                        <h3 style={{ margin: '0 0 var(--spacing-lg)', fontSize: '1.1rem' }}>📋 Backup History</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--color-gray-50)' }}>
                                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.85rem' }}>Date & Time</th>
                                    <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.85rem' }}>Type</th>
                                    <th style={{ padding: '12px', textAlign: 'right', fontSize: '0.85rem' }}>Size</th>
                                    <th style={{ padding: '12px', textAlign: 'center', fontSize: '0.85rem' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {backupHistory.map(backup => (
                                    <tr key={backup.id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                                        <td style={{ padding: '12px' }}>{backup.date}</td>
                                        <td style={{ padding: '12px' }}>{backup.type}</td>
                                        <td style={{ padding: '12px', textAlign: 'right' }}>{backup.size}</td>
                                        <td style={{ padding: '12px', textAlign: 'center' }}><span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', background: 'rgba(76,175,80,0.1)', color: '#4CAF50' }}>✓ Success</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Branch Modal */}
            {showBranchModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', width: '95%', maxWidth: '500px', maxHeight: '90vh', overflow: 'auto' }}>
                        <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-gray-200)' }}><h2 style={{ margin: 0 }}>{editingBranch ? '✏️ Edit' : '🏢 Add'} Branch</h2></div>
                        <div style={{ padding: 'var(--spacing-lg)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                <div><label style={labelStyle}>Branch Name *</label><input type="text" value={branchForm.name} onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })} style={inputStyle} /></div>
                                <div><label style={labelStyle}>Code *</label><input type="text" value={branchForm.code} onChange={(e) => setBranchForm({ ...branchForm, code: e.target.value.toUpperCase() })} style={inputStyle} maxLength={5} /></div>
                            </div>
                            <div style={{ marginBottom: 'var(--spacing-md)' }}><label style={labelStyle}>Address</label><textarea value={branchForm.address} onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })} style={{ ...inputStyle, minHeight: '80px' }} /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                <div><label style={labelStyle}>Phone</label><input type="tel" value={branchForm.phone} onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })} style={inputStyle} /></div>
                                <div><label style={labelStyle}>Email</label><input type="email" value={branchForm.email} onChange={(e) => setBranchForm({ ...branchForm, email: e.target.value })} style={inputStyle} /></div>
                            </div>
                            <div><label style={labelStyle}>Manager</label><input type="text" value={branchForm.manager} onChange={(e) => setBranchForm({ ...branchForm, manager: e.target.value })} style={inputStyle} /></div>
                        </div>
                        <div style={{ padding: 'var(--spacing-lg)', borderTop: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button onClick={resetBranchForm} style={{ padding: '10px 20px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={handleSaveBranch} style={{ padding: '10px 24px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Save Branch</button>
                        </div>
                    </div>
                </div>
            )}

            {/* User Modal */}
            {showUserModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', width: '95%', maxWidth: '550px', maxHeight: '90vh', overflow: 'auto' }}>
                        <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-gray-200)' }}><h2 style={{ margin: 0 }}>{editingUser ? '✏️ Edit' : '👤 Add'} User</h2></div>
                        <div style={{ padding: 'var(--spacing-lg)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                <div><label style={labelStyle}>Full Name *</label><input type="text" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} style={inputStyle} /></div>
                                <div><label style={labelStyle}>Username *</label><input type="text" value={userForm.username} onChange={(e) => setUserForm({ ...userForm, username: e.target.value.toLowerCase() })} style={inputStyle} /></div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                                <div><label style={labelStyle}>Email</label><input type="email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} style={inputStyle} /></div>
                                <div><label style={labelStyle}>Phone</label><input type="tel" value={userForm.phone} onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })} style={inputStyle} /></div>
                            </div>
                            {!editingUser && <div style={{ marginBottom: 'var(--spacing-md)' }}><label style={labelStyle}>Password *</label><input type="password" value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} style={inputStyle} placeholder="Min 6 characters" /></div>}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                <div><label style={labelStyle}>Role *</label><select value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })} style={inputStyle}>{Object.keys(roles).map(r => <option key={r}>{r}</option>)}</select></div>
                                <div><label style={labelStyle}>Branch *</label><select value={userForm.branch} onChange={(e) => setUserForm({ ...userForm, branch: e.target.value })} style={inputStyle}><option>All Branches</option>{branches.filter(b => b.isActive).map(b => <option key={b.id}>{b.name}</option>)}</select></div>
                            </div>
                        </div>
                        <div style={{ padding: 'var(--spacing-lg)', borderTop: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button onClick={resetUserForm} style={{ padding: '10px 20px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={handleSaveUser} style={{ padding: '10px 24px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Save User</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Password Reset Modal */}
            {showPasswordModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', width: '95%', maxWidth: '400px' }}>
                        <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-gray-200)' }}><h2 style={{ margin: 0 }}>🔑 Reset Password</h2></div>
                        <div style={{ padding: 'var(--spacing-lg)' }}>
                            <p style={{ marginBottom: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>Reset password for: <strong>{showPasswordModal.name}</strong></p>
                            <div><label style={labelStyle}>New Password *</label><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={inputStyle} placeholder="Min 6 characters" /></div>
                        </div>
                        <div style={{ padding: 'var(--spacing-lg)', borderTop: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button onClick={() => { setShowPasswordModal(null); setNewPassword(''); }} style={{ padding: '10px 20px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={handleResetPassword} style={{ padding: '10px 24px', background: '#FF9800', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Reset Password</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
