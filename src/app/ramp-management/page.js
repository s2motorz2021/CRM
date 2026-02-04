'use client';

import { useState } from 'react';

// Sample ramps/bays data (in real app, this would come from Settings/Master Data)
const sampleRamps = [
    { id: 1, name: 'Service Bay 1', bayType: 'Service', branch: 'Main Branch', isActive: true },
    { id: 2, name: 'Service Bay 2', bayType: 'Service', branch: 'Main Branch', isActive: true },
    { id: 3, name: 'Service Bay 3', bayType: 'Service', branch: 'Main Branch', isActive: true },
    { id: 4, name: 'Water Wash Bay', bayType: 'Water Wash', branch: 'Main Branch', isActive: true },
    { id: 5, name: 'Quick Service Bay', bayType: 'Quick Service', branch: 'Main Branch', isActive: true },
];

// Sample technicians
const sampleTechnicians = [
    { id: 1, name: 'Ramesh Kumar', specialty: 'Engine' },
    { id: 2, name: 'Suresh Yadav', specialty: 'Electrical' },
    { id: 3, name: 'Vijay Singh', specialty: 'Washing' },
    { id: 4, name: 'Anil Sharma', specialty: 'General' },
];

// Sample unassigned job cards
const sampleUnassignedJobs = [
    { id: 'JC-2026-0143', customer: 'Rahul Sharma', vehicle: 'Honda Activa 6G', regNo: 'MH 01 AB 1234', complaint: 'Engine noise', priority: 'High', createdAt: '2026-02-02T09:30:00' },
    { id: 'JC-2026-0144', customer: 'Priya Patel', vehicle: 'TVS Jupiter', regNo: 'MH 02 CD 5678', complaint: 'General service', priority: 'Normal', createdAt: '2026-02-02T09:45:00' },
    { id: 'JC-2026-0145', customer: 'Amit Kumar', vehicle: 'Bajaj Pulsar 150', regNo: 'MH 03 EF 9012', complaint: 'Brake issue', priority: 'High', createdAt: '2026-02-02T10:00:00' },
    { id: 'JC-2026-0146', customer: 'Sneha Reddy', vehicle: 'Royal Enfield', regNo: 'MH 04 GH 3456', complaint: 'Water wash', priority: 'Normal', createdAt: '2026-02-02T10:15:00' },
];

// Bay type configurations
const bayTypeConfig = {
    'Service': { icon: '🔧', color: '#2196F3', bgColor: 'rgba(33, 150, 243, 0.1)' },
    'Water Wash': { icon: '💧', color: '#00BCD4', bgColor: 'rgba(0, 188, 212, 0.1)' },
    'Quick Service': { icon: '⚡', color: '#FF9800', bgColor: 'rgba(255, 152, 0, 0.1)' },
};

export default function RampManagementPage() {
    const [ramps] = useState(sampleRamps);
    const [unassignedJobs, setUnassignedJobs] = useState(sampleUnassignedJobs);
    const [bayAssignments, setBayAssignments] = useState({
        // bayId: { job, technician, startTime, estimatedCompletion }
    });
    const [showAssignModal, setShowAssignModal] = useState(null); // bayId
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedTechnician, setSelectedTechnician] = useState(null);
    const [draggedJob, setDraggedJob] = useState(null);
    const [dragOverBay, setDragOverBay] = useState(null);

    // Calculate statistics
    const totalBays = ramps.filter(r => r.isActive).length;
    const occupiedBays = Object.keys(bayAssignments).length;
    const availableBays = totalBays - occupiedBays;
    const utilizationPercent = totalBays > 0 ? Math.round((occupiedBays / totalBays) * 100) : 0;

    // Assign job to bay
    const handleAssignJob = (bayId) => {
        if (!selectedJob) return;

        const now = new Date();
        const estimatedCompletion = new Date(now.getTime() + 2 * 60 * 60 * 1000); // +2 hours

        setBayAssignments(prev => ({
            ...prev,
            [bayId]: {
                job: selectedJob,
                technician: selectedTechnician || sampleTechnicians[0],
                startTime: now.toISOString(),
                estimatedCompletion: estimatedCompletion.toISOString(),
            }
        }));

        setUnassignedJobs(prev => prev.filter(j => j.id !== selectedJob.id));
        setShowAssignModal(null);
        setSelectedJob(null);
        setSelectedTechnician(null);
    };

    // Release bay
    const handleReleaseBay = (bayId) => {
        const assignment = bayAssignments[bayId];
        if (assignment) {
            // Optionally move job back to unassigned or mark as complete
            // For now, we just release the bay (job is considered done)
        }
        setBayAssignments(prev => {
            const newAssignments = { ...prev };
            delete newAssignments[bayId];
            return newAssignments;
        });
    };

    // Auto-assign jobs to available bays
    const handleAutoAssign = () => {
        const availableRamps = ramps.filter(r => r.isActive && !bayAssignments[r.id]);
        const jobsToAssign = [...unassignedJobs];
        const newAssignments = { ...bayAssignments };
        const assignedJobIds = [];

        availableRamps.forEach((ramp, index) => {
            if (jobsToAssign[index]) {
                const job = jobsToAssign[index];
                const now = new Date();
                const estimatedCompletion = new Date(now.getTime() + 2 * 60 * 60 * 1000);

                // Match bay type with job type if possible
                let assignJob = job;
                if (ramp.bayType === 'Water Wash') {
                    const washJob = jobsToAssign.find(j => j.complaint.toLowerCase().includes('wash') && !assignedJobIds.includes(j.id));
                    if (washJob) assignJob = washJob;
                }

                newAssignments[ramp.id] = {
                    job: assignJob,
                    technician: sampleTechnicians[index % sampleTechnicians.length],
                    startTime: now.toISOString(),
                    estimatedCompletion: estimatedCompletion.toISOString(),
                };
                assignedJobIds.push(assignJob.id);
            }
        });

        setBayAssignments(newAssignments);
        setUnassignedJobs(prev => prev.filter(j => !assignedJobIds.includes(j.id)));
    };

    // Drag handlers
    const handleDragStart = (e, job) => {
        setDraggedJob(job);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, bayId) => {
        e.preventDefault();
        if (!bayAssignments[bayId]) {
            setDragOverBay(bayId);
        }
    };

    const handleDragLeave = () => {
        setDragOverBay(null);
    };

    const handleDrop = (e, bayId) => {
        e.preventDefault();
        setDragOverBay(null);

        if (draggedJob && !bayAssignments[bayId]) {
            const now = new Date();
            const estimatedCompletion = new Date(now.getTime() + 2 * 60 * 60 * 1000);

            setBayAssignments(prev => ({
                ...prev,
                [bayId]: {
                    job: draggedJob,
                    technician: sampleTechnicians[0],
                    startTime: now.toISOString(),
                    estimatedCompletion: estimatedCompletion.toISOString(),
                }
            }));

            setUnassignedJobs(prev => prev.filter(j => j.id !== draggedJob.id));
        }
        setDraggedJob(null);
    };

    // Format time
    const formatTime = (isoString) => {
        return new Date(isoString).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    };

    const getTimeRemaining = (estimatedCompletion) => {
        const now = new Date();
        const end = new Date(estimatedCompletion);
        const diffMs = end - now;
        if (diffMs <= 0) return 'Overdue';
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 60) return `${diffMins}m remaining`;
        const hours = Math.floor(diffMins / 60);
        const mins = diffMins % 60;
        return `${hours}h ${mins}m remaining`;
    };

    // Styles
    const cardStyle = {
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-lg)',
        boxShadow: 'var(--shadow-sm)',
    };

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: 'var(--spacing-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 'var(--spacing-xs)' }}>🅿️ Ramp Management</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Manage service bay allocations and job assignments</p>
                </div>
                <button
                    onClick={handleAutoAssign}
                    disabled={unassignedJobs.length === 0 || availableBays === 0}
                    style={{
                        padding: '12px 24px',
                        background: unassignedJobs.length === 0 || availableBays === 0
                            ? 'var(--color-gray-200)'
                            : 'linear-gradient(135deg, #4CAF50, #388E3C)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        cursor: unassignedJobs.length === 0 || availableBays === 0 ? 'not-allowed' : 'pointer',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    🤖 Auto-Assign Jobs
                </button>
            </div>

            {/* Statistics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                <div style={{ ...cardStyle, borderLeft: '4px solid #2196F3' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Total Bays</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2196F3' }}>{totalBays}</div>
                </div>
                <div style={{ ...cardStyle, borderLeft: '4px solid #4CAF50' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Available</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#4CAF50' }}>{availableBays}</div>
                </div>
                <div style={{ ...cardStyle, borderLeft: '4px solid #F44336' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Occupied</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F44336' }}>{occupiedBays}</div>
                </div>
                <div style={{ ...cardStyle, borderLeft: '4px solid #FF9800' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Utilization</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FF9800' }}>{utilizationPercent}%</div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 'var(--spacing-xl)' }}>
                {/* Bay Grid */}
                <div>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 'var(--spacing-lg)' }}>Service Bays</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
                        {ramps.filter(r => r.isActive).map(ramp => {
                            const assignment = bayAssignments[ramp.id];
                            const config = bayTypeConfig[ramp.bayType] || bayTypeConfig['Service'];
                            const isOccupied = !!assignment;
                            const isDragOver = dragOverBay === ramp.id;

                            return (
                                <div
                                    key={ramp.id}
                                    onDragOver={(e) => handleDragOver(e, ramp.id)}
                                    onDragLeave={handleDragLeave}
                                    onDrop={(e) => handleDrop(e, ramp.id)}
                                    style={{
                                        ...cardStyle,
                                        borderLeft: `4px solid ${isOccupied ? '#F44336' : '#4CAF50'}`,
                                        background: isDragOver ? 'rgba(76, 175, 80, 0.1)' : 'white',
                                        transition: 'all 0.2s ease',
                                        transform: isDragOver ? 'scale(1.02)' : 'scale(1)',
                                    }}
                                >
                                    {/* Bay Header */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontSize: '1.3rem' }}>{config.icon}</span>
                                                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{ramp.name}</h3>
                                            </div>
                                            <span style={{
                                                display: 'inline-block',
                                                marginTop: '6px',
                                                padding: '2px 10px',
                                                borderRadius: '12px',
                                                fontSize: '0.75rem',
                                                fontWeight: 500,
                                                background: config.bgColor,
                                                color: config.color,
                                            }}>
                                                {ramp.bayType}
                                            </span>
                                        </div>
                                        <span style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            background: isOccupied ? '#F44336' : '#4CAF50',
                                            boxShadow: `0 0 8px ${isOccupied ? 'rgba(244, 67, 54, 0.5)' : 'rgba(76, 175, 80, 0.5)'}`,
                                        }} />
                                    </div>

                                    {/* Bay Content */}
                                    {isOccupied ? (
                                        <div>
                                            <div style={{
                                                background: 'var(--color-gray-50)',
                                                borderRadius: 'var(--radius-md)',
                                                padding: 'var(--spacing-md)',
                                                marginBottom: 'var(--spacing-md)',
                                            }}>
                                                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
                                                    {assignment.job.id}
                                                </div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                                    👤 {assignment.job.customer}
                                                </div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                                    🏍️ {assignment.job.vehicle} • {assignment.job.regNo}
                                                </div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                                    🔧 {assignment.job.complaint}
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                                                    <span style={{ color: 'var(--text-muted)' }}>👨‍🔧 {assignment.technician.name}</span>
                                                    <span style={{
                                                        padding: '2px 8px',
                                                        borderRadius: '8px',
                                                        background: 'rgba(255, 152, 0, 0.1)',
                                                        color: '#FF9800',
                                                        fontWeight: 500,
                                                    }}>
                                                        ⏱️ {getTimeRemaining(assignment.estimatedCompletion)}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleReleaseBay(ramp.id)}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px',
                                                    background: 'linear-gradient(135deg, #4CAF50, #388E3C)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 'var(--radius-md)',
                                                    cursor: 'pointer',
                                                    fontWeight: 600,
                                                    fontSize: '0.85rem',
                                                }}
                                            >
                                                ✓ Mark Complete & Release
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <div style={{
                                                background: 'rgba(76, 175, 80, 0.05)',
                                                border: '2px dashed rgba(76, 175, 80, 0.3)',
                                                borderRadius: 'var(--radius-md)',
                                                padding: 'var(--spacing-lg)',
                                                textAlign: 'center',
                                                marginBottom: 'var(--spacing-md)',
                                                color: 'var(--text-muted)',
                                            }}>
                                                <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🚗</div>
                                                <div style={{ fontSize: '0.85rem' }}>Bay Available</div>
                                                <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Drag job here or click below</div>
                                            </div>
                                            <button
                                                onClick={() => setShowAssignModal(ramp.id)}
                                                disabled={unassignedJobs.length === 0}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px',
                                                    background: unassignedJobs.length === 0
                                                        ? 'var(--color-gray-200)'
                                                        : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 'var(--radius-md)',
                                                    cursor: unassignedJobs.length === 0 ? 'not-allowed' : 'pointer',
                                                    fontWeight: 600,
                                                    fontSize: '0.85rem',
                                                }}
                                            >
                                                + Assign Job
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Unassigned Jobs Panel */}
                <div>
                    <div style={{ ...cardStyle, position: 'sticky', top: 'calc(var(--header-height) + var(--spacing-lg))' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>📋 Pending Jobs</h2>
                            <span style={{
                                background: unassignedJobs.length > 0 ? 'rgba(244, 67, 54, 0.1)' : 'var(--color-gray-100)',
                                color: unassignedJobs.length > 0 ? '#F44336' : 'var(--text-muted)',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                            }}>
                                {unassignedJobs.length}
                            </span>
                        </div>

                        {unassignedJobs.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: 'var(--spacing-xl)',
                                color: 'var(--text-muted)',
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✅</div>
                                <div>All jobs assigned!</div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                                {unassignedJobs.map(job => (
                                    <div
                                        key={job.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, job)}
                                        onDragEnd={() => setDraggedJob(null)}
                                        style={{
                                            padding: 'var(--spacing-md)',
                                            background: 'var(--color-gray-50)',
                                            borderRadius: 'var(--radius-md)',
                                            cursor: 'grab',
                                            transition: 'all 0.2s',
                                            border: '1px solid var(--color-gray-200)',
                                            opacity: draggedJob?.id === job.id ? 0.5 : 1,
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{job.id}</span>
                                            <span style={{
                                                padding: '2px 8px',
                                                borderRadius: '8px',
                                                fontSize: '0.7rem',
                                                fontWeight: 600,
                                                background: job.priority === 'High' ? 'rgba(244, 67, 54, 0.1)' : 'var(--color-gray-100)',
                                                color: job.priority === 'High' ? '#F44336' : 'var(--text-muted)',
                                            }}>
                                                {job.priority}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                            👤 {job.customer}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                            🏍️ {job.vehicle}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            🔧 {job.complaint}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Assign Job Modal */}
            {showAssignModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: 'var(--radius-lg)',
                        width: '95%',
                        maxWidth: '500px',
                        maxHeight: '80vh',
                        overflow: 'auto',
                    }}>
                        <div style={{
                            padding: 'var(--spacing-lg)',
                            borderBottom: '1px solid var(--color-gray-200)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <h2 style={{ margin: 0, fontSize: '1.1rem' }}>
                                Assign Job to {ramps.find(r => r.id === showAssignModal)?.name}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowAssignModal(null);
                                    setSelectedJob(null);
                                    setSelectedTechnician(null);
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: 'var(--text-muted)',
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <div style={{ padding: 'var(--spacing-lg)' }}>
                            {/* Select Job */}
                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>
                                    Select Job Card *
                                </label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflow: 'auto' }}>
                                    {unassignedJobs.map(job => (
                                        <div
                                            key={job.id}
                                            onClick={() => setSelectedJob(job)}
                                            style={{
                                                padding: 'var(--spacing-md)',
                                                background: selectedJob?.id === job.id ? 'rgba(0, 184, 212, 0.1)' : 'var(--color-gray-50)',
                                                border: selectedJob?.id === job.id ? '2px solid var(--color-primary)' : '1px solid var(--color-gray-200)',
                                                borderRadius: 'var(--radius-md)',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{job.id} - {job.customer}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{job.vehicle} • {job.complaint}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Select Technician */}
                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '0.9rem' }}>
                                    Assign Technician
                                </label>
                                <select
                                    value={selectedTechnician?.id || ''}
                                    onChange={(e) => setSelectedTechnician(sampleTechnicians.find(t => t.id === parseInt(e.target.value)))}
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        border: '1px solid var(--color-gray-200)',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    <option value="">Select technician...</option>
                                    {sampleTechnicians.map(tech => (
                                        <option key={tech.id} value={tech.id}>{tech.name} ({tech.specialty})</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div style={{
                            padding: 'var(--spacing-lg)',
                            borderTop: '1px solid var(--color-gray-200)',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '12px',
                        }}>
                            <button
                                onClick={() => {
                                    setShowAssignModal(null);
                                    setSelectedJob(null);
                                    setSelectedTechnician(null);
                                }}
                                style={{
                                    padding: '10px 20px',
                                    border: '1px solid var(--color-gray-200)',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'white',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleAssignJob(showAssignModal)}
                                disabled={!selectedJob}
                                style={{
                                    padding: '10px 24px',
                                    background: !selectedJob
                                        ? 'var(--color-gray-200)'
                                        : 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: !selectedJob ? 'not-allowed' : 'pointer',
                                    fontWeight: 600,
                                }}
                            >
                                Assign Job
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
