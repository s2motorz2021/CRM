'use client';

import { useState, useEffect } from 'react';

const serviceTypes = [
    { id: 1, name: 'General Service' },
    { id: 2, name: 'Oil Change' },
    { id: 3, name: 'Brake Service' },
    { id: 4, name: 'Tire Replacement' },
    { id: 5, name: 'Engine Repair' },
];

const statusColors = {
    Pending: { bg: 'rgba(255, 152, 0, 0.15)', text: '#FF9800', border: '#FF9800' },
    Confirmed: { bg: 'rgba(33, 150, 243, 0.15)', text: '#2196F3', border: '#2196F3' },
    Completed: { bg: 'rgba(76, 175, 80, 0.15)', text: '#4CAF50', border: '#4CAF50' },
    Cancelled: { bg: 'rgba(158, 158, 158, 0.15)', text: '#9E9E9E', border: '#9E9E9E' },
};

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState(null);

    // Modal form state
    const [formData, setFormData] = useState({
        customerId: '',
        vehicleId: '',
        serviceType: '',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        status: 'Pending',
        notes: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [appRes, custRes, vehRes] = await Promise.all([
                fetch('/api/appointments'),
                fetch('/api/customers'),
                fetch('/api/vehicles')
            ]);
            setAppointments(await appRes.json());
            setCustomers(await custRes.json());
            setVehicles(await vehRes.json());
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingAppointment(null);
        setFormData({
            customerId: '',
            vehicleId: '',
            serviceType: '',
            date: new Date().toISOString().split('T')[0],
            time: '10:00',
            status: 'Pending',
            notes: '',
        });
        setShowModal(true);
    };

    const handleEdit = (app) => {
        setEditingAppointment(app);
        const appDate = new Date(app.date);
        setFormData({
            _id: app._id,
            customerId: app.customerId?._id || app.customerId,
            vehicleId: app.vehicleId?._id || app.vehicleId,
            serviceType: app.serviceType,
            date: appDate.toISOString().split('T')[0],
            time: appDate.toTimeString().slice(0, 5),
            status: app.status,
            notes: app.notes || '',
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const appointmentDate = new Date(`${formData.date}T${formData.time}`);

        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    date: appointmentDate,
                    branch: 'Main Branch'
                })
            });

            if (res.ok) {
                alert('✅ Appointment saved!');
                setShowModal(false);
                fetchData();
            }
        } catch (error) {
            alert('Error saving appointment');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await fetch(`/api/appointments?id=${id}`, { method: 'DELETE' });
            fetchData();
        } catch (error) {
            alert('Error deleting');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700 }}>📅 Appointments</h1>
                <button onClick={handleAdd} className="btn btn-primary">+ New Appointment</button>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                {isLoading ? <p>Loading...</p> : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                                <th style={{ padding: '12px' }}>Date & Time</th>
                                <th style={{ padding: '12px' }}>Customer</th>
                                <th style={{ padding: '12px' }}>Vehicle</th>
                                <th style={{ padding: '12px' }}>Service</th>
                                <th style={{ padding: '12px' }}>Status</th>
                                <th style={{ padding: '12px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(app => (
                                <tr key={app._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>{new Date(app.date).toLocaleString()}</td>
                                    <td style={{ padding: '12px' }}>{app.customerId?.name || 'Unknown'}</td>
                                    <td style={{ padding: '12px' }}>{app.vehicleId?.registrationNo || 'N/A'}</td>
                                    <td style={{ padding: '12px' }}>{app.serviceType}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600,
                                            background: statusColors[app.status]?.bg, color: statusColors[app.status]?.text
                                        }}>{app.status}</span>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <button onClick={() => handleEdit(app)} style={{ marginRight: '8px', cursor: 'pointer', background: 'none', border: 'none' }}>✏️</button>
                                        <button onClick={() => handleDelete(app._id)} style={{ cursor: 'pointer', background: 'none', border: 'none' }}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <form onSubmit={handleSubmit} style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '500px' }}>
                        <h2 style={{ marginBottom: '16px' }}>{editingAppointment ? 'Edit' : 'New'} Appointment</h2>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', marginBottom: '4px' }}>Customer</label>
                            <select value={formData.customerId} onChange={(e) => setFormData({ ...formData, customerId: e.target.value })} style={{ width: '100%', padding: '10px' }} required>
                                <option value="">Select Customer</option>
                                {customers.map(c => <option key={c._id} value={c._id}>{c.name} ({c.phone})</option>)}
                            </select>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', marginBottom: '4px' }}>Vehicle</label>
                            <select value={formData.vehicleId} onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })} style={{ width: '100%', padding: '10px' }} required>
                                <option value="">Select Vehicle</option>
                                {vehicles.filter(v => v.customerId === formData.customerId || v.customerId?._id === formData.customerId).map(v => (
                                    <option key={v._id} value={v._id}>{v.registrationNo} - {v.brand}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', marginBottom: '4px' }}>Service Type</label>
                            <select value={formData.serviceType} onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })} style={{ width: '100%', padding: '10px' }} required>
                                <option value="">Select Service</option>
                                {serviceTypes.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '4px' }}>Date</label>
                                <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={{ width: '100%', padding: '10px' }} required />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '4px' }}>Time</label>
                                <input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} style={{ width: '100%', padding: '10px' }} required />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                            <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #ddd' }}>Cancel</button>
                            <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px' }} disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save Appointment'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
