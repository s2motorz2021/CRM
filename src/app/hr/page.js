'use client';

import { useState, useEffect } from 'react';

// Sample Data (Moved to Backend)
const sampleStaff = [];
const sampleAttendance = [];
const samplePerformance = [];
const sampleAdvances = [];


const branches = ['Main Branch', 'City Center', 'Highway Outlet'];

export default function HRPage() {
    const [activeTab, setActiveTab] = useState('staff');
    const [staff, setStaff] = useState(sampleStaff);
    const [attendance, setAttendance] = useState(sampleAttendance);
    const [advances, setAdvances] = useState(sampleAdvances);
    const [roles, setRoles] = useState([]); // Roles from API
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedMonth, setSelectedMonth] = useState('2026-01');
    const [showStaffModal, setShowStaffModal] = useState(false);
    const [showAdvanceModal, setShowAdvanceModal] = useState(false);
    const [showApprovalModal, setShowApprovalModal] = useState(null);
    const [showDisbursementModal, setShowDisbursementModal] = useState(null);
    const [showRepaymentModal, setShowRepaymentModal] = useState(null);
    const [editingStaff, setEditingStaff] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [auditLog, setAuditLog] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data from API
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [staffRes, attRes, advRes, rolesRes] = await Promise.all([
                fetch('/api/staff'),
                fetch(`/api/attendance?date=${selectedDate}`),
                fetch('/api/advances'),
                fetch('/api/roles')
            ]);

            if (staffRes.ok) setStaff(await staffRes.json());
            if (attRes.ok) setAttendance(await attRes.json());
            if (advRes.ok) setAdvances(await advRes.json());
            if (rolesRes.ok) setRoles(await rolesRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedDate]); // Re-fetch attendance when date changes

    // Staff form
    const [staffForm, setStaffForm] = useState({
        name: '', gender: 'Male', dob: '', doj: '', experience: '', role: '',
        branch: 'Main Branch', phone: '', email: '', bankAccount: '', ifsc: '', aadhaar: '', pan: '',
        photoPreview: null, aadhaarFile: null, aadhaarFileName: '', panFile: null, panFileName: '',
        basicSalary: 0, hraPercent: 20, pfEnabled: true, esiEnabled: true
    });

    // File upload handlers
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => setStaffForm(prev => ({ ...prev, photoPreview: reader.result }));
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a valid image file (JPG, PNG)');
        }
    };

    const handleDocumentUpload = (e, type) => {
        const file = e.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'aadhaar') {
                    setStaffForm(prev => ({ ...prev, aadhaar: reader.result, aadhaarFileName: file.name }));
                } else {
                    setStaffForm(prev => ({ ...prev, pan: reader.result, panFileName: file.name }));
                }
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a valid PDF or image file');
        }
    };

    // Advance form
    const [advanceForm, setAdvanceForm] = useState({
        staffId: '', amount: '', reason: '', repaymentType: 'onetime', emiAmount: ''
    });

    // Disbursement form
    const [disbursementForm, setDisbursementForm] = useState({ mode: 'Bank Transfer', date: new Date().toISOString().split('T')[0] });

    // Repayment form
    const [repaymentForm, setRepaymentForm] = useState({ amount: '', date: new Date().toISOString().split('T')[0], method: 'Salary Deduction' });

    const tabs = [
        { id: 'staff', label: '👥 Staff Master' },
        { id: 'attendance', label: '📅 Attendance' },
        { id: 'performance', label: '📊 Performance' },
        { id: 'payroll', label: '💰 Payroll' },
        { id: 'advances', label: '💵 Staff Advances' },
    ];

    // Payroll state
    const [payrollMonth, setPayrollMonth] = useState('2026-01');
    const [salaryPayments, setSalaryPayments] = useState([]);
    const [showPaySlipModal, setShowPaySlipModal] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(null);

    // Calculate salary for a staff member
    const calculateSalary = (staffMember) => {
        const basicSalary = parseFloat(staffMember.basicSalary) || 0;
        const hraPercent = parseFloat(staffMember.hraPercent) || 20;

        // Get attendance for the month
        const monthAttendance = attendance.filter(a => a.staffId === staffMember._id && a.date.startsWith(payrollMonth));
        const presentDays = monthAttendance.filter(a => a.status === 'present').length;
        const halfDays = monthAttendance.filter(a => a.status === 'halfday').length * 0.5;
        const workingDays = 30; // standard days in month (can make dynamic)
        const effectiveDays = presentDays + halfDays;

        // Pro-rata salary based on attendance
        const attendanceRatio = Math.min(effectiveDays / workingDays, 1);
        const earnedBasic = Math.round(basicSalary * attendanceRatio);

        // Allowances
        const hra = Math.round(earnedBasic * (hraPercent / 100)); // Use dynamic HRA %
        const conveyance = 1600;
        const medicalAllowance = 1250;
        const specialAllowance = Math.round(earnedBasic * 0.10);

        const grossEarnings = earnedBasic + hra + conveyance + medicalAllowance + specialAllowance;

        // Deductions
        const pf = staffMember.pfEnabled !== false ? Math.round(earnedBasic * 0.12) : 0; // Check if PF enabled
        const esi = (staffMember.esiEnabled !== false && grossEarnings <= 21000) ? Math.round(grossEarnings * 0.0075) : 0; // Check if ESI enabled
        const professionalTax = grossEarnings > 15000 ? 200 : 0;

        // Advance deductions
        const staffAdvances = advances.filter(a => a.staffId === staffMember._id && a.status === 'approved' && a.outstanding > 0);
        const advanceDeductionDetails = staffAdvances.map(adv => {
            let deduction = 0;
            if (adv.repaymentType === 'emi') {
                deduction = Math.min(adv.emiAmount || 0, adv.outstanding);
            } else {
                // One-time: deduct the full outstanding amount
                deduction = adv.outstanding;
            }
            return { id: adv.id, amount: deduction, reason: adv.reason };
        });

        const advanceDeduction = advanceDeductionDetails.reduce((sum, d) => sum + d.amount, 0);

        const totalDeductions = pf + esi + professionalTax + advanceDeduction;
        const netSalary = grossEarnings - totalDeductions;

        return {
            basicSalary, earnedBasic, hra, conveyance, medicalAllowance, specialAllowance,
            grossEarnings, pf, esi, professionalTax, advanceDeduction, advanceDeductionDetails, totalDeductions, netSalary,
            presentDays, halfDays, workingDays, effectiveDays
        };
    };

    // Process salary payment
    const handlePaySalary = (staffMember, salaryData) => {
        const payment = {
            id: `SAL-${payrollMonth}-${staffMember._id}`,
            staffId: staffMember._id,
            staffName: staffMember.name,
            month: payrollMonth,
            ...salaryData,
            paidDate: new Date().toISOString().split('T')[0],
            paidBy: 'Admin',
            status: 'paid'
        };
        setSalaryPayments(prev => [...prev, payment]);

        // Deduct from advances if any
        if (salaryData.advanceDeduction > 0) {
            setAdvances(prev => prev.map(adv => {
                const deductionInfo = salaryData.advanceDeductionDetails.find(d => d.id === adv.id);
                if (deductionInfo) {
                    const deduction = deductionInfo.amount;
                    const newRepaid = adv.totalRepaid + deduction;
                    const newOutstanding = Math.max(0, adv.amount - newRepaid);
                    return {
                        ...adv,
                        totalRepaid: newRepaid,
                        outstanding: newOutstanding,
                        status: newOutstanding <= 0 ? 'closed' : adv.status
                    };
                }
                return adv;
            }));

            // Log repayments in audit
            salaryData.advanceDeductionDetails.forEach(d => {
                logAudit('REPAYMENT_SALARY_DEDUCTION', d.id, null, { amount: d.amount, month: payrollMonth });
            });
        }

        setShowPaymentModal(null);
        alert(`✅ Salary paid to ${staffMember.name} successfully!`);
    };

    // Check if salary already paid
    const isSalaryPaid = (staffId) => salaryPayments.some(p => p.staffId === staffId && p.month === payrollMonth);

    // Attendance helpers
    const getAttendanceForDate = (staffId, date) => attendance.find(a => a.staffId === staffId && a.date === date);

    const toggleAttendance = async (staffId, date, newStatus) => {
        try {
            const response = await fetch('/api/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ staffId, date, status: newStatus }),
            });

            if (response.ok) {
                const data = await response.json();
                setAttendance(prev => {
                    const filtered = prev.filter(a => !(a.staffId === staffId && a.date === date));
                    return [...filtered, data];
                });
            }
        } catch (error) {
            console.error('Attendance toggle error:', error);
        }
    };

    // Staff handlers
    const handleSaveStaff = async () => {
        if (!staffForm.name || !staffForm.phone) { alert('Please fill required fields'); return; }

        try {
            // Map photo and docs before sending
            const { photoPreview, documents, ...rest } = staffForm;
            const body = editingStaff
                ? { ...rest, photo: staffForm.photoPreview, _id: editingStaff._id }
                : { ...rest, photo: staffForm.photoPreview, password: staffForm.phone }; // Default password = phone number

            const response = await fetch('/api/staff', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                await fetchData(); // Refresh list
                resetStaffForm();
                alert(`✅ Staff ${editingStaff ? 'updated' : 'added'} successfully!${!editingStaff ? ' Default password is the phone number.' : ''}`);
            } else {
                const errorData = await response.json();
                alert(`❌ Failed to save staff: ${errorData.details || errorData.error}`);
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('❌ An error occurred while saving staff');
        }
    };

    const handleDeleteStaff = async (staffMember) => {
        if (!confirm(`Are you sure you want to delete ${staffMember.name}?`)) return;

        try {
            const response = await fetch('/api/staff', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: staffMember._id }),
            });

            if (response.ok) {
                await fetchData();
                alert('✅ Staff deleted successfully!');
            } else {
                alert('❌ Failed to delete staff');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('❌ An error occurred');
        }
    };

    const resetStaffForm = () => {
        setStaffForm({
            name: '', gender: 'Male', dob: '', doj: '', experience: '', role: 'Mechanic',
            branch: 'Main Branch', phone: '', email: '', bankAccount: '', ifsc: '',
            aadhaar: '', pan: '', photoPreview: null, aadhaarFile: null, aadhaarFileName: '',
            panFile: null, panFileName: '',
            basicSalary: 0, hraPercent: 20, pfEnabled: true, esiEnabled: true
        });
        setEditingStaff(null);
        setShowStaffModal(false);
    };

    const handleEditStaff = (staffMember) => {
        setEditingStaff(staffMember);
        setStaffForm({
            ...staffMember,
            photoPreview: staffMember.photo,
            aadhaarFileName: staffMember.aadhaar ? 'Aadhar_Saved_Document' : '',
            panFileName: staffMember.pan ? 'PAN_Saved_Document' : ''
        });
        setShowStaffModal(true);
    };

    // Advance handlers
    const handleCreateAdvance = async () => {
        if (!advanceForm.staffId || !advanceForm.amount || !advanceForm.reason) { alert('Please fill required fields'); return; }
        const staffMember = staff.find(s => s._id === advanceForm.staffId);

        try {
            const body = {
                staffId: advanceForm.staffId,
                staffName: staffMember.name,
                branch: staffMember.branch,
                amount: parseFloat(advanceForm.amount),
                reason: advanceForm.reason,
                requestedBy: 'Admin',
                repaymentType: advanceForm.repaymentType,
                emiAmount: advanceForm.repaymentType === 'emi' ? parseFloat(advanceForm.emiAmount) : 0,
                totalRepaid: 0,
                outstanding: parseFloat(advanceForm.amount)
            };

            const response = await fetch('/api/advances', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                await fetchData();
                setAdvanceForm({ staffId: '', amount: '', reason: '', repaymentType: 'onetime', emiAmount: '' });
                setShowAdvanceModal(false);
                alert('✅ Advance requested successfully!');
            }
        } catch (error) {
            console.error('Advance error:', error);
            alert('❌ Failed to create advance');
        }
    };
    const handleApproveAdvance = async (adv, status) => {
        try {
            const response = await fetch('/api/advances', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    _id: adv._id,
                    status,
                    approvedBy: 'Admin',
                    approvedDate: new Date().toISOString().split('T')[0],
                    ...(status === 'rejected' && { rejectionReason: rejectReason })
                }),
            });

            if (response.ok) {
                await fetchData();
                setShowApprovalModal(null);
                setRejectReason('');
                alert(`✅ Advance ${status === 'approved' ? 'approved' : 'rejected'} successfully!`);
            }
        } catch (error) {
            console.error('Approval error:', error);
        }
    };

    const handleDisburseAdvance = async (adv) => {
        try {
            const response = await fetch('/api/advances', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    _id: adv._id,
                    disbursementMode: disbursementForm.mode,
                    disbursementDate: disbursementForm.date,
                    status: 'approved' // status remains approved, but we set disbursement date
                }),
            });

            if (response.ok) {
                await fetchData();
                setShowDisbursementModal(null);
                alert('✅ Funds disbursed successfully!');
            }
        } catch (error) {
            console.error('Disbursement error:', error);
        }
    };

    const handleRepayment = async (adv) => {
        const amount = parseFloat(repaymentForm.amount);
        if (!amount || amount <= 0) { alert('Please enter valid amount'); return; }

        try {
            const newRepaid = adv.totalRepaid + amount;
            const newOutstanding = Math.max(0, adv.amount - newRepaid);

            const response = await fetch('/api/advances', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    _id: adv._id,
                    totalRepaid: newRepaid,
                    outstanding: newOutstanding,
                    status: newOutstanding <= 0 ? 'closed' : adv.status,
                    repayments: [
                        ...(adv.repayments || []),
                        { amount, date: repaymentForm.date, method: repaymentForm.method }
                    ]
                }),
            });

            if (response.ok) {
                await fetchData();
                setShowRepaymentModal(null);
                setRepaymentForm({ amount: '', date: new Date().toISOString().split('T')[0], method: 'Salary Deduction' });
                alert('✅ Repayment recorded!');
            }
        } catch (error) {
            console.error('Repayment error:', error);
            alert('❌ Failed to record repayment');
        }
    };

    const logAudit = (action, id, oldValue, newValue, reason = null) => {
        setAuditLog(prev => [...prev, { action, id, oldValue, newValue, reason, user: 'Admin', timestamp: new Date().toISOString() }]);
    };

    // Stats
    const totalOutstanding = advances.filter(a => a.status !== 'closed' && a.status !== 'rejected').reduce((sum, a) => sum + a.outstanding, 0);
    const pendingApprovals = advances.filter(a => a.status === 'requested').length;

    const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', fontSize: '0.9rem', outline: 'none' };
    const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' };

    const getStatusColor = (status) => {
        switch (status) {
            case 'requested': return '#FF9800';
            case 'approved': return '#2196F3';
            case 'rejected': return '#F44336';
            case 'closed': return '#4CAF50';
            default: return '#9E9E9E';
        }
    };

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                <div>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 'var(--spacing-xs)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'var(--color-primary)' }}>👨‍💼</span> HR Management
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Staff records, attendance, performance & advances</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    {activeTab === 'staff' && (
                        <button onClick={() => setShowStaffModal(true)} className="btn btn-primary" style={{ padding: '12px 24px' }}>+ Add Staff</button>
                    )}
                    {activeTab === 'advances' && (
                        <button onClick={() => setShowAdvanceModal(true)} className="btn btn-primary" style={{ padding: '12px 24px' }}>+ New Advance</button>
                    )}
                </div>
            </div>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--spacing-xl)', background: 'white', padding: '6px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                        flex: 1, padding: '12px 20px', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
                        background: activeTab === tab.id ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' : 'transparent',
                        color: activeTab === tab.id ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s ease',
                    }}>{tab.label}</button>
                ))}
            </div>

            {/* Staff Master Tab */}
            {activeTab === 'staff' && (
                <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                    <div style={{ padding: '16px', borderBottom: '1px solid var(--color-gray-100)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button onClick={async () => {
                            if (!confirm('This will clear current staff and re-seed sample data. Continue?')) return;
                            const res = await fetch('/api/staff/seed');
                            if (res.ok) {
                                await fetchData();
                                alert('✅ Database seeded successfully!');
                            }
                        }} style={{ padding: '8px 16px', background: 'var(--color-gray-100)', border: '1px solid var(--color-gray-300)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>🌱 Seed Sample Data</button>
                        <button onClick={() => setShowStaffModal(true)} style={{ padding: '8px 16px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>➕ Add New Staff</button>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--color-gray-100)' }}>
                                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.85rem' }}>Staff</th>
                                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.85rem' }}>Role</th>
                                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.85rem' }}>Branch</th>
                                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.85rem' }}>Contact</th>
                                <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: '0.85rem' }}>Status</th>
                                <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: '0.85rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staff.map(s => (
                                <tr key={s._id || s.id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                                    <td style={{ padding: '14px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontSize: '1.2rem' }}>
                                                {s.photo && s.photo.startsWith('data:image') ? (
                                                    <img src={s.photo} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <span>{s.photo || (s.gender === 'Female' ? '👩' : '👨')}</span>
                                                )}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{s.name}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Since {s.doj}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '14px 16px' }}>{s.role}</td>
                                    <td style={{ padding: '14px 16px' }}>{s.branch}</td>
                                    <td style={{ padding: '14px 16px' }}><div>{s.phone}</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.email}</div></td>
                                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                        <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 500, background: s.status === 'active' ? 'rgba(76,175,80,0.1)' : 'rgba(244,67,54,0.1)', color: s.status === 'active' ? '#4CAF50' : '#F44336' }}>{s.status.toUpperCase()}</span>
                                    </td>
                                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button onClick={() => handleEditStaff(s)} style={{ padding: '6px 12px', border: '1px solid var(--color-gray-200)', borderRadius: '6px', background: 'white', cursor: 'pointer' }}>✏️ Edit</button>
                                            <button onClick={() => handleDeleteStaff(s)} style={{ padding: '6px 12px', border: '1px solid #fee2e2', borderRadius: '6px', background: '#fef2f2', color: '#dc2626', cursor: 'pointer' }}>🗑️ Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
                <div>
                    <div style={{ marginBottom: 'var(--spacing-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                            <label style={{ fontWeight: 500 }}>Date:</label>
                            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{ ...inputStyle, width: 'auto' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button onClick={() => {
                                // Download CSV template
                                const headers = 'Staff Name,Date,Status (present/halfday/absent)\n';
                                const rows = staff.map(s => `${s.name},${selectedDate},present`).join('\n');
                                const csv = headers + rows;
                                const blob = new Blob([csv], { type: 'text/csv' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `attendance_template_${selectedDate}.csv`;
                                a.click();
                            }} style={{ padding: '10px 16px', background: 'white', border: '1px solid var(--color-gray-300)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                📥 Download Template
                            </button>
                            <label style={{ padding: '10px 16px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                📤 Upload Attendance
                                <input type="file" accept=".csv,.xlsx,.xls" onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        const text = event.target.result;
                                        const lines = text.split('\n').filter(line => line.trim());
                                        let imported = 0;

                                        // Skip header row
                                        for (let i = 1; i < lines.length; i++) {
                                            const cols = lines[i].split(',').map(c => c.trim());
                                            if (cols.length >= 3) {
                                                const staffName = cols[0];
                                                const date = cols[1];
                                                const status = cols[2].toLowerCase();

                                                // Find matching staff
                                                const matchedStaff = staff.find(s => s.name.toLowerCase() === staffName.toLowerCase());
                                                if (matchedStaff && ['present', 'halfday', 'absent'].includes(status)) {
                                                    toggleAttendance(matchedStaff.id, date, status);
                                                    imported++;
                                                }
                                            }
                                        }
                                        alert(`✅ Imported ${imported} attendance records successfully!`);
                                    };
                                    reader.readAsText(file);
                                    e.target.value = '';
                                }} style={{ display: 'none' }} />
                            </label>
                        </div>
                    </div>

                    {/* Attendance Summary */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                        <div style={{ background: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{staff.length}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Staff</div>
                        </div>
                        <div style={{ background: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#4CAF50' }}>{attendance.filter(a => a.date === selectedDate && a.status === 'present').length}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Present</div>
                        </div>
                        <div style={{ background: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF9800' }}>{attendance.filter(a => a.date === selectedDate && a.status === 'halfday').length}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Half Day</div>
                        </div>
                        <div style={{ background: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#F44336' }}>{attendance.filter(a => a.date === selectedDate && a.status === 'absent').length}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Absent</div>
                        </div>
                    </div>

                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--color-gray-100)' }}>
                                    <th style={{ padding: '14px 16px', textAlign: 'left' }}>Staff</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'center' }}>Present</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'center' }}>Half Day</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'center' }}>Absent</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'center' }}>Attendance %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staff.map(s => {
                                    const staffId = s._id || s.id;
                                    const att = getAttendanceForDate(staffId, selectedDate);
                                    const staffAttendance = attendance.filter(a => a.staffId === staffId);
                                    const presentDays = staffAttendance.filter(a => a.status === 'present').length;
                                    const halfDays = staffAttendance.filter(a => a.status === 'halfday').length * 0.5;
                                    const totalDays = staffAttendance.length;
                                    const percentage = totalDays > 0 ? Math.round(((presentDays + halfDays) / totalDays) * 100) : 0;
                                    return (
                                        <tr key={staffId} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                                            <td style={{ padding: '14px 16px' }}><span style={{ marginRight: '8px' }}>{s.photo}</span>{s.name}</td>
                                            {['present', 'halfday', 'absent'].map(status => (
                                                <td key={status} style={{ padding: '14px 16px', textAlign: 'center' }}>
                                                    <button onClick={() => toggleAttendance(staffId, selectedDate, status)} style={{
                                                        width: '40px', height: '40px', borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: '1.2rem',
                                                        background: att?.status === status ? (status === 'present' ? '#4CAF50' : status === 'halfday' ? '#FF9800' : '#F44336') : 'var(--color-gray-100)',
                                                        color: att?.status === status ? 'white' : 'var(--text-muted)'
                                                    }}>{status === 'present' ? '✓' : status === 'halfday' ? '½' : '✕'}</button>
                                                </td>
                                            ))}
                                            <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                                    <div style={{ width: '50px', height: '6px', background: 'var(--color-gray-200)', borderRadius: '3px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${percentage}%`, height: '100%', background: percentage >= 90 ? '#4CAF50' : percentage >= 75 ? '#FF9800' : '#F44336' }} />
                                                    </div>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{percentage}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
                <div>
                    <div style={{ marginBottom: 'var(--spacing-lg)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                        <label style={{ fontWeight: 500 }}>Period:</label>
                        <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} style={{ ...inputStyle, width: 'auto' }} />
                    </div>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--color-gray-100)' }}>
                                    <th style={{ padding: '14px 16px', textAlign: 'left' }}>Staff</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'center' }}>Jobs Completed</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Labour Value</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Spare Value</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'center' }}>Rework</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'center' }}>Attendance %</th>
                                </tr>
                            </thead>
                            <tbody>
                                {samplePerformance.filter(p => p.month === selectedMonth).map(p => {
                                    const s = staff.find(st => (st._id || st.id) === p.staffId);
                                    if (!s) return null;
                                    return (
                                        <tr key={p.staffId} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                                            <td style={{ padding: '14px 16px' }}><span style={{ marginRight: '8px' }}>{s.photo}</span>{s.name}</td>
                                            <td style={{ padding: '14px 16px', textAlign: 'center', fontWeight: 600 }}>{p.jobsCompleted}</td>
                                            <td style={{ padding: '14px 16px', textAlign: 'right' }}>₹{p.labourValue.toLocaleString()}</td>
                                            <td style={{ padding: '14px 16px', textAlign: 'right' }}>₹{p.spareValue.toLocaleString()}</td>
                                            <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                                <span style={{ padding: '4px 10px', borderRadius: '12px', background: p.reworkCount === 0 ? 'rgba(76,175,80,0.1)' : 'rgba(244,67,54,0.1)', color: p.reworkCount === 0 ? '#4CAF50' : '#F44336' }}>{p.reworkCount}</span>
                                            </td>
                                            <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                                    <div style={{ width: '60px', height: '6px', background: 'var(--color-gray-200)', borderRadius: '3px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${p.attendanceScore}%`, height: '100%', background: p.attendanceScore >= 90 ? '#4CAF50' : p.attendanceScore >= 75 ? '#FF9800' : '#F44336' }} />
                                                    </div>
                                                    <span style={{ fontWeight: 500 }}>{p.attendanceScore}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Payroll Tab */}
            {activeTab === 'payroll' && (
                <div>
                    <div style={{ marginBottom: 'var(--spacing-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                            <label style={{ fontWeight: 500 }}>Payroll Month:</label>
                            <input type="month" value={payrollMonth} onChange={(e) => setPayrollMonth(e.target.value)} style={{ ...inputStyle, width: 'auto' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <span style={{ padding: '8px 16px', background: 'rgba(76,175,80,0.1)', color: '#4CAF50', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 500 }}>
                                ✓ Paid: {salaryPayments.filter(p => p.month === payrollMonth).length}/{staff.length}
                            </span>
                        </div>
                    </div>

                    {/* Payroll Summary */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                        <div style={{ background: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center', borderLeft: '4px solid var(--color-primary)' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>₹{staff.reduce((sum, s) => sum + (s.basicSalary || 0), 0).toLocaleString()}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Basic</div>
                        </div>
                        <div style={{ background: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center', borderLeft: '4px solid #4CAF50' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#4CAF50' }}>₹{staff.reduce((sum, s) => sum + calculateSalary(s).grossEarnings, 0).toLocaleString()}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gross Payable</div>
                        </div>
                        <div style={{ background: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center', borderLeft: '4px solid #F44336' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#F44336' }}>₹{staff.reduce((sum, s) => sum + calculateSalary(s).totalDeductions, 0).toLocaleString()}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Deductions</div>
                        </div>
                        <div style={{ background: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', textAlign: 'center', borderLeft: '4px solid #2196F3' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2196F3' }}>₹{staff.reduce((sum, s) => sum + calculateSalary(s).netSalary, 0).toLocaleString()}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Net Payable</div>
                        </div>
                    </div>

                    {/* Salary Table */}
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--color-gray-100)' }}>
                                    <th style={{ padding: '14px 16px', textAlign: 'left' }}>Staff</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Basic</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'center' }}>Days</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Gross</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Deductions</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Net Pay</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'center' }}>Status</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'center' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staff.map(s => {
                                    const salary = calculateSalary(s);
                                    const paid = isSalaryPaid(s._id);
                                    return (
                                        <tr key={s._id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                                            <td style={{ padding: '14px 16px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <span>{s.photo}</span>
                                                    <div>
                                                        <div style={{ fontWeight: 500 }}>{s.name}</div>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.role}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '14px 16px', textAlign: 'right' }}>₹{salary.basicSalary.toLocaleString()}</td>
                                            <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                                <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', background: salary.effectiveDays >= 22 ? 'rgba(76,175,80,0.1)' : 'rgba(255,152,0,0.1)', color: salary.effectiveDays >= 22 ? '#4CAF50' : '#FF9800' }}>
                                                    {salary.effectiveDays}/{salary.workingDays}
                                                </span>
                                            </td>
                                            <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 500, color: '#4CAF50' }}>₹{salary.grossEarnings.toLocaleString()}</td>
                                            <td style={{ padding: '14px 16px', textAlign: 'right', color: '#F44336' }}>-₹{salary.totalDeductions.toLocaleString()}</td>
                                            <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 700, color: 'var(--color-primary)' }}>₹{salary.netSalary.toLocaleString()}</td>
                                            <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                                <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 500, background: paid ? 'rgba(76,175,80,0.1)' : 'rgba(255,152,0,0.1)', color: paid ? '#4CAF50' : '#FF9800' }}>
                                                    {paid ? '✓ PAID' : 'PENDING'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                                <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                                    <button onClick={() => setShowPaySlipModal({ staff: s, salary })} style={{ padding: '6px 10px', background: 'var(--color-gray-100)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>📄 Slip</button>
                                                    {!paid && (
                                                        <button onClick={() => setShowPaymentModal({ staff: s, salary })} style={{ padding: '6px 10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>💰 Pay</button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Staff Advances Tab */}
            {activeTab === 'advances' && (
                <div>
                    {/* Summary Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid #FF9800' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>⏳ Pending Approvals</p>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FF9800' }}>{pendingApprovals}</h2>
                        </div>
                        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid #2196F3' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>✅ Active Advances</p>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2196F3' }}>{advances.filter(a => a.status === 'approved').length}</h2>
                        </div>
                        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid #F44336' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>💰 Total Outstanding</p>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F44336' }}>₹{totalOutstanding.toLocaleString()}</h2>
                        </div>
                        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-lg)', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid #4CAF50' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>✓ Closed Advances</p>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#4CAF50' }}>{advances.filter(a => a.status === 'closed').length}</h2>
                        </div>
                    </div>

                    {/* Advances Table */}
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--color-gray-100)' }}>
                                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.85rem' }}>ID</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.85rem' }}>Staff</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '0.85rem' }}>Amount</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.85rem' }}>Reason</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: '0.85rem' }}>Status</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '0.85rem' }}>Outstanding</th>
                                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: '0.85rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {advances.map(adv => (
                                    <tr key={adv._id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                                        <td style={{ padding: '14px 16px', fontWeight: 500, color: 'var(--color-primary)' }}>{adv._id.substring(adv._id.length - 6).toUpperCase()}</td>
                                        <td style={{ padding: '14px 16px' }}><div style={{ fontWeight: 500 }}>{adv.staffName}</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{adv.branch}</div></td>
                                        <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 600 }}>₹{adv.amount.toLocaleString()}</td>
                                        <td style={{ padding: '14px 16px' }}>{adv.reason}</td>
                                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                            <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 500, background: `${getStatusColor(adv.status)}15`, color: getStatusColor(adv.status) }}>{adv.status.toUpperCase()}</span>
                                        </td>
                                        <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 600, color: adv.outstanding > 0 ? '#F44336' : '#4CAF50' }}>₹{adv.outstanding.toLocaleString()}</td>
                                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                                {adv.status === 'requested' && (
                                                    <button onClick={() => setShowApprovalModal(adv)} style={{ padding: '6px 10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Approve</button>
                                                )}
                                                {adv.status === 'approved' && !adv.disbursementDate && (
                                                    <button onClick={() => setShowDisbursementModal(adv)} style={{ padding: '6px 10px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Disburse</button>
                                                )}
                                                {adv.status === 'approved' && adv.disbursementDate && adv.outstanding > 0 && (
                                                    <button onClick={() => setShowRepaymentModal(adv)} style={{ padding: '6px 10px', background: '#9C27B0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Repay</button>
                                                )}
                                                {adv.status === 'closed' && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>🔒 Closed</span>}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Staff Modal */}
            {showStaffModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', width: '95%', maxWidth: '700px', maxHeight: '90vh', overflow: 'auto' }}>
                        <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between' }}>
                            <h2 style={{ margin: 0 }}>{editingStaff ? '✏️ Edit Staff' : '➕ Add Staff'}</h2>
                            <button onClick={resetStaffForm} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                        </div>
                        <div style={{ padding: 'var(--spacing-lg)' }}>
                            {/* Photo Upload Section */}
                            <div style={{ marginBottom: 'var(--spacing-lg)', textAlign: 'center' }}>
                                <label style={labelStyle}>Employee Photo</label>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--color-gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '3px solid var(--color-primary)' }}>
                                        {staffForm.photoPreview ? (
                                            <img src={staffForm.photoPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <span style={{ fontSize: '3rem' }}>{staffForm.gender === 'Female' ? '👩' : '👨'}</span>
                                        )}
                                    </div>
                                    <label style={{ padding: '8px 16px', background: 'var(--color-primary)', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                                        📷 Upload Photo
                                        <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                                    </label>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>JPG, PNG (Max 2MB)</span>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                <div><label style={labelStyle}>Name *</label><input type="text" value={staffForm.name} onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })} style={inputStyle} /></div>
                                <div><label style={labelStyle}>Gender</label><select value={staffForm.gender} onChange={(e) => setStaffForm({ ...staffForm, gender: e.target.value })} style={inputStyle}><option>Male</option><option>Female</option></select></div>
                                <div><label style={labelStyle}>Date of Birth</label><input type="date" value={staffForm.dob} onChange={(e) => setStaffForm({ ...staffForm, dob: e.target.value })} style={inputStyle} /></div>
                                <div><label style={labelStyle}>Date of Joining</label><input type="date" value={staffForm.doj} onChange={(e) => setStaffForm({ ...staffForm, doj: e.target.value })} style={inputStyle} /></div>
                                <div><label style={labelStyle}>Role</label><select value={staffForm.role} onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })} style={inputStyle}><option value="">Select Role</option>{roles.map(r => <option key={r._id || r.name} value={r.name}>{r.name}</option>)}</select></div>
                                <div><label style={labelStyle}>Branch</label><select value={staffForm.branch} onChange={(e) => setStaffForm({ ...staffForm, branch: e.target.value })} style={inputStyle}>{branches.map(b => <option key={b}>{b}</option>)}</select></div>
                                <div><label style={labelStyle}>Phone *</label><input type="tel" value={staffForm.phone} onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })} style={inputStyle} /></div>
                                <div><label style={labelStyle}>Email</label><input type="email" value={staffForm.email} onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })} style={inputStyle} /></div>
                                <div><label style={labelStyle}>Bank Account</label><input type="text" value={staffForm.bankAccount} onChange={(e) => setStaffForm({ ...staffForm, bankAccount: e.target.value })} style={inputStyle} /></div>
                                <div><label style={labelStyle}>IFSC Code</label><input type="text" value={staffForm.ifsc} onChange={(e) => setStaffForm({ ...staffForm, ifsc: e.target.value })} style={inputStyle} /></div>
                                <div><label style={labelStyle}>Aadhaar No</label><input type="text" value={staffForm.aadhaar} onChange={(e) => setStaffForm({ ...staffForm, aadhaar: e.target.value })} style={inputStyle} /></div>
                                <div><label style={labelStyle}>PAN No</label><input type="text" value={staffForm.pan} onChange={(e) => setStaffForm({ ...staffForm, pan: e.target.value })} style={inputStyle} /></div>
                            </div>

                            {/* Document Upload Section */}
                            <div style={{ marginTop: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
                                <label style={{ ...labelStyle, marginBottom: 'var(--spacing-md)', fontSize: '0.95rem', fontWeight: 600 }}>📎 Document Attachments</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                    {/* Aadhaar Upload */}
                                    <div style={{ padding: 'var(--spacing-md)', background: 'white', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-gray-300)' }}>
                                        <label style={labelStyle}>Aadhaar Card (PDF/JPG)</label>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', background: 'var(--color-gray-100)', borderRadius: '6px', cursor: 'pointer' }}>
                                                <span>📄</span>
                                                <span style={{ fontSize: '0.85rem', color: staffForm.aadhaarFileName ? 'var(--text-primary)' : 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {staffForm.aadhaarFileName || 'Choose file...'}
                                                </span>
                                                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleDocumentUpload(e, 'aadhaar')} style={{ display: 'none' }} />
                                            </label>
                                            {staffForm.aadhaar && (
                                                <button
                                                    onClick={() => {
                                                        const win = window.open();
                                                        win.document.write(`<iframe src="${staffForm.aadhaar}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                                                    }}
                                                    style={{ padding: '10px', background: 'var(--color-gray-800)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
                                                    title="View Document"
                                                >👁️</button>
                                            )}
                                        </div>
                                        {staffForm.aadhaar && <div style={{ marginTop: '6px', fontSize: '0.75rem', color: '#4CAF50' }}>✓ Document saved</div>}
                                    </div>
                                    {/* PAN Upload */}
                                    <div style={{ padding: 'var(--spacing-md)', background: 'white', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-gray-300)' }}>
                                        <label style={labelStyle}>PAN Card (PDF/JPG)</label>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', background: 'var(--color-gray-100)', borderRadius: '6px', cursor: 'pointer' }}>
                                                <span>📄</span>
                                                <span style={{ fontSize: '0.85rem', color: staffForm.panFileName ? 'var(--text-primary)' : 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {staffForm.panFileName || 'Choose file...'}
                                                </span>
                                                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleDocumentUpload(e, 'pan')} style={{ display: 'none' }} />
                                            </label>
                                            {staffForm.pan && (
                                                <button
                                                    onClick={() => {
                                                        const win = window.open();
                                                        win.document.write(`<iframe src="${staffForm.pan}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                                                    }}
                                                    style={{ padding: '10px', background: 'var(--color-gray-800)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
                                                    title="View Document"
                                                >👁️</button>
                                            )}
                                        </div>
                                        {staffForm.pan && <div style={{ marginTop: '6px', fontSize: '0.75rem', color: '#4CAF50' }}>✓ Document saved</div>}
                                    </div>
                                </div>
                            </div>

                            {/* Payroll & Compliance Section */}
                            <div style={{ marginTop: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'rgba(33, 150, 243, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(33, 150, 243, 0.1)' }}>
                                <label style={{ ...labelStyle, marginBottom: 'var(--spacing-md)', fontSize: '0.95rem', fontWeight: 600, color: '#2196F3' }}>💰 Payroll & Compliance Details</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                    <div>
                                        <label style={labelStyle}>Basic Salary (₹) *</label>
                                        <input
                                            type="number"
                                            value={staffForm.basicSalary}
                                            onChange={(e) => setStaffForm({ ...staffForm, basicSalary: e.target.value })}
                                            style={inputStyle}
                                            placeholder="e.g. 25000"
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>HRA %</label>
                                        <input
                                            type="number"
                                            value={staffForm.hraPercent}
                                            onChange={(e) => setStaffForm({ ...staffForm, hraPercent: e.target.value })}
                                            style={inputStyle}
                                            placeholder="Standard 20%"
                                        />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0' }}>
                                        <input
                                            type="checkbox"
                                            id="pfEnabled"
                                            checked={staffForm.pfEnabled}
                                            onChange={(e) => setStaffForm({ ...staffForm, pfEnabled: e.target.checked })}
                                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                        />
                                        <label htmlFor="pfEnabled" style={{ cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }}>Enable PF Deduction (12%)</label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0' }}>
                                        <input
                                            type="checkbox"
                                            id="esiEnabled"
                                            checked={staffForm.esiEnabled}
                                            onChange={(e) => setStaffForm({ ...staffForm, esiEnabled: e.target.checked })}
                                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                        />
                                        <label htmlFor="esiEnabled" style={{ cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }}>Enable ESI Deduction (0.75%)</label>
                                    </div>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                                    * PF is calculated on Basic. ESI is calculated on Gross (if Gross ≤ ₹21,000).
                                </p>
                            </div>
                        </div>
                        <div style={{ padding: 'var(--spacing-lg)', borderTop: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button onClick={resetStaffForm} style={{ padding: '10px 20px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={handleSaveStaff} className="btn btn-primary" style={{ padding: '10px 24px' }}>Save Staff</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Advance Request Modal */}
            {showAdvanceModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', width: '95%', maxWidth: '500px' }}>
                        <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between' }}>
                            <h2 style={{ margin: 0 }}>💵 New Advance Request</h2>
                            <button onClick={() => setShowAdvanceModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                        </div>
                        <div style={{ padding: 'var(--spacing-lg)' }}>
                            <div style={{ marginBottom: 'var(--spacing-md)' }}><label style={labelStyle}>Staff *</label><select value={advanceForm.staffId} onChange={(e) => setAdvanceForm({ ...advanceForm, staffId: e.target.value })} style={inputStyle}><option value="">Select Staff</option>{staff.map(s => <option key={s.id} value={s.id}>{s.name} - {s.branch}</option>)}</select></div>
                            <div style={{ marginBottom: 'var(--spacing-md)' }}><label style={labelStyle}>Amount (₹) *</label><input type="number" value={advanceForm.amount} onChange={(e) => setAdvanceForm({ ...advanceForm, amount: e.target.value })} style={inputStyle} /></div>
                            <div style={{ marginBottom: 'var(--spacing-md)' }}><label style={labelStyle}>Reason *</label><textarea value={advanceForm.reason} onChange={(e) => setAdvanceForm({ ...advanceForm, reason: e.target.value })} style={{ ...inputStyle, minHeight: '80px' }} /></div>
                            <div style={{ marginBottom: 'var(--spacing-md)' }}><label style={labelStyle}>Repayment Type</label><select value={advanceForm.repaymentType} onChange={(e) => setAdvanceForm({ ...advanceForm, repaymentType: e.target.value })} style={inputStyle}><option value="onetime">One-Time</option><option value="emi">EMI</option></select></div>
                            {advanceForm.repaymentType === 'emi' && <div><label style={labelStyle}>EMI Amount (₹)</label><input type="number" value={advanceForm.emiAmount} onChange={(e) => setAdvanceForm({ ...advanceForm, emiAmount: e.target.value })} style={inputStyle} /></div>}
                        </div>
                        <div style={{ padding: 'var(--spacing-lg)', borderTop: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button onClick={() => setShowAdvanceModal(false)} style={{ padding: '10px 20px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={handleCreateAdvance} className="btn btn-primary" style={{ padding: '10px 24px' }}>Create Request</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Approval Modal */}
            {showApprovalModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', width: '95%', maxWidth: '450px' }}>
                        <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-gray-200)' }}><h2 style={{ margin: 0 }}>🔍 Review Advance</h2></div>
                        <div style={{ padding: 'var(--spacing-lg)' }}>
                            <div style={{ marginBottom: '16px' }}><strong>Staff:</strong> {showApprovalModal.staffName}</div>
                            <div style={{ marginBottom: '16px' }}><strong>Amount:</strong> ₹{showApprovalModal.amount.toLocaleString()}</div>
                            <div style={{ marginBottom: '16px' }}><strong>Reason:</strong> {showApprovalModal.reason}</div>
                            <div><label style={labelStyle}>Rejection Reason (if rejecting)</label><textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} style={{ ...inputStyle, minHeight: '60px' }} placeholder="Required for rejection" /></div>
                        </div>
                        <div style={{ padding: 'var(--spacing-lg)', borderTop: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button onClick={() => { setShowApprovalModal(null); setRejectReason(''); }} style={{ padding: '10px 20px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={() => handleRejectAdvance(showApprovalModal.id)} style={{ padding: '10px 20px', background: '#F44336', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Reject</button>
                            <button onClick={() => handleApproveAdvance(showApprovalModal.id)} style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Approve</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Disbursement Modal */}
            {showDisbursementModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', width: '95%', maxWidth: '400px' }}>
                        <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-gray-200)' }}><h2 style={{ margin: 0 }}>💸 Record Disbursement</h2></div>
                        <div style={{ padding: 'var(--spacing-lg)' }}>
                            <div style={{ marginBottom: '16px' }}><strong>Amount:</strong> ₹{showDisbursementModal.amount.toLocaleString()}</div>
                            <div style={{ marginBottom: 'var(--spacing-md)' }}><label style={labelStyle}>Mode</label><select value={disbursementForm.mode} onChange={(e) => setDisbursementForm({ ...disbursementForm, mode: e.target.value })} style={inputStyle}><option>Cash</option><option>Bank Transfer</option><option>UPI</option></select></div>
                            <div><label style={labelStyle}>Date</label><input type="date" value={disbursementForm.date} onChange={(e) => setDisbursementForm({ ...disbursementForm, date: e.target.value })} style={inputStyle} /></div>
                        </div>
                        <div style={{ padding: 'var(--spacing-lg)', borderTop: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button onClick={() => setShowDisbursementModal(null)} style={{ padding: '10px 20px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={() => handleDisbursement(showDisbursementModal.id)} className="btn btn-primary" style={{ padding: '10px 24px' }}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Repayment Modal */}
            {showRepaymentModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', width: '95%', maxWidth: '400px' }}>
                        <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-gray-200)' }}><h2 style={{ margin: 0 }}>💰 Record Repayment</h2></div>
                        <div style={{ padding: 'var(--spacing-lg)' }}>
                            <div style={{ marginBottom: '16px' }}><strong>Outstanding:</strong> ₹{showRepaymentModal.outstanding.toLocaleString()}</div>
                            <div style={{ marginBottom: 'var(--spacing-md)' }}><label style={labelStyle}>Amount (₹)</label><input type="number" value={repaymentForm.amount} onChange={(e) => setRepaymentForm({ ...repaymentForm, amount: e.target.value })} style={inputStyle} max={showRepaymentModal.outstanding} /></div>
                            <div style={{ marginBottom: 'var(--spacing-md)' }}><label style={labelStyle}>Method</label><select value={repaymentForm.method} onChange={(e) => setRepaymentForm({ ...repaymentForm, method: e.target.value })} style={inputStyle}><option>Salary Deduction</option><option>Manual Payment</option></select></div>
                            <div><label style={labelStyle}>Date</label><input type="date" value={repaymentForm.date} onChange={(e) => setRepaymentForm({ ...repaymentForm, date: e.target.value })} style={inputStyle} /></div>
                        </div>
                        <div style={{ padding: 'var(--spacing-lg)', borderTop: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button onClick={() => setShowRepaymentModal(null)} style={{ padding: '10px 20px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={() => handleRepayment(showRepaymentModal.id)} className="btn btn-primary" style={{ padding: '10px 24px' }}>Record Payment</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Pay Slip Modal */}
            {showPaySlipModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div id="printable-pay-slip" style={{ background: 'white', borderRadius: 'var(--radius-lg)', width: '95%', maxWidth: '600px', maxHeight: '90vh', overflow: 'auto' }}>
                        <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'white', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
                            <div>
                                <h2 style={{ margin: 0 }}>📄 Salary Slip</h2>
                                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', opacity: 0.9 }}>S2 Motorz - {payrollMonth}</p>
                            </div>
                            <button onClick={() => setShowPaySlipModal(null)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'white', width: '36px', height: '36px', borderRadius: '50%' }}>×</button>
                        </div>
                        <div style={{ padding: 'var(--spacing-lg)' }}>
                            {/* Employee Info */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
                                <span style={{ fontSize: '3rem' }}>{showPaySlipModal.staff.photo}</span>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{showPaySlipModal.staff.name}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{showPaySlipModal.staff.role} • {showPaySlipModal.staff.branch}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>A/C: {showPaySlipModal.staff.bankAccount} | IFSC: {showPaySlipModal.staff.ifsc}</div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
                                {/* Earnings */}
                                <div>
                                    <h3 style={{ margin: '0 0 12px', color: '#4CAF50', fontSize: '0.95rem' }}>💰 Earnings</h3>
                                    <div style={{ background: 'rgba(76,175,80,0.05)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(76,175,80,0.1)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Basic Salary</span><span>₹{showPaySlipModal.salary.earnedBasic.toLocaleString()}</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>HRA (20%)</span><span>₹{showPaySlipModal.salary.hra.toLocaleString()}</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Conveyance</span><span>₹{showPaySlipModal.salary.conveyance.toLocaleString()}</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Medical Allow.</span><span>₹{showPaySlipModal.salary.medicalAllowance.toLocaleString()}</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Special Allow.</span><span>₹{showPaySlipModal.salary.specialAllowance.toLocaleString()}</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(76,175,80,0.2)', fontWeight: 700, color: '#4CAF50' }}><span>Gross Earnings</span><span>₹{showPaySlipModal.salary.grossEarnings.toLocaleString()}</span></div>
                                    </div>
                                </div>

                                {/* Deductions */}
                                <div>
                                    <h3 style={{ margin: '0 0 12px', color: '#F44336', fontSize: '0.95rem' }}>📉 Deductions</h3>
                                    <div style={{ background: 'rgba(244,67,54,0.05)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(244,67,54,0.1)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>PF (12%)</span><span>₹{showPaySlipModal.salary.pf.toLocaleString()}</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>ESI</span><span>₹{showPaySlipModal.salary.esi.toLocaleString()}</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Prof. Tax</span><span>₹{showPaySlipModal.salary.professionalTax.toLocaleString()}</span></div>
                                        {showPaySlipModal.salary.advanceDeductionDetails && showPaySlipModal.salary.advanceDeductionDetails.map((adv, idx) => (
                                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.75rem', paddingLeft: '8px', fontStyle: 'italic', opacity: 0.8 }}>
                                                <span>↳ Advance ({adv.reason})</span>
                                                <span>₹{adv.amount.toLocaleString()}</span>
                                            </div>
                                        ))}
                                        {!showPaySlipModal.salary.advanceDeductionDetails && showPaySlipModal.salary.advanceDeduction > 0 && (
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>Advance Deduction</span><span>₹{showPaySlipModal.salary.advanceDeduction.toLocaleString()}</span></div>
                                        )}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(244,67,54,0.2)', fontWeight: 700, color: '#F44336' }}><span>Total Deductions</span><span>₹{showPaySlipModal.salary.totalDeductions.toLocaleString()}</span></div>
                                    </div>
                                </div>
                            </div>

                            {/* Attendance & Net Pay */}
                            <div style={{ marginTop: 'var(--spacing-lg)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                <div style={{ padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Days Worked</div>
                                    <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>{showPaySlipModal.salary.effectiveDays} / {showPaySlipModal.salary.workingDays}</div>
                                </div>
                                <div style={{ padding: 'var(--spacing-md)', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'white' }}>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Net Payable</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹{showPaySlipModal.salary.netSalary.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: 'var(--spacing-lg)', borderTop: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button onClick={() => setShowPaySlipModal(null)} style={{ padding: '10px 20px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Close</button>
                            <button onClick={() => window.print()} style={{ padding: '10px 20px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>🖨️ Print Slip</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Confirmation Modal */}
            {showPaymentModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', width: '95%', maxWidth: '450px' }}>
                        <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-gray-200)' }}><h2 style={{ margin: 0 }}>💰 Confirm Salary Payment</h2></div>
                        <div style={{ padding: 'var(--spacing-lg)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
                                <span style={{ fontSize: '2rem' }}>{showPaymentModal.staff.photo}</span>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{showPaymentModal.staff.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{showPaymentModal.staff.role}</div>
                                </div>
                            </div>
                            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}><span>Gross Salary:</span><span style={{ fontWeight: 500 }}>₹{showPaymentModal.salary.grossEarnings.toLocaleString()}</span></div>
                            {showPaymentModal.salary.advanceDeductionDetails && showPaymentModal.salary.advanceDeductionDetails.length > 0 && (
                                <div style={{ marginBottom: '12px', padding: '10px', background: 'rgba(244, 67, 54, 0.05)', borderRadius: 'var(--radius-md)', border: '1px dashed rgba(244, 67, 54, 0.2)' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#F44336', marginBottom: '4px' }}>ADVANCE REPAYMENTS</div>
                                    {showPaymentModal.salary.advanceDeductionDetails.map((adv, idx) => (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666' }}>
                                            <span>{adv.reason}</span>
                                            <span style={{ color: '#F44336' }}>-₹{adv.amount.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', color: '#F44336' }}><span>Total Deductions:</span><span style={{ fontWeight: 500 }}>-₹{showPaymentModal.salary.totalDeductions.toLocaleString()}</span></div>
                            <div style={{ padding: '12px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', borderRadius: 'var(--radius-md)', color: 'white', display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700 }}><span>Net Payable:</span><span>₹{showPaymentModal.salary.netSalary.toLocaleString()}</span></div>
                            <p style={{ marginTop: 'var(--spacing-md)', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>Payment will be recorded and advance deductions applied.</p>
                        </div>
                        <div style={{ padding: 'var(--spacing-lg)', borderTop: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button onClick={() => setShowPaymentModal(null)} style={{ padding: '10px 20px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={() => handlePaySalary(showPaymentModal.staff, showPaymentModal.salary)} style={{ padding: '10px 24px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>✓ Confirm Payment</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
