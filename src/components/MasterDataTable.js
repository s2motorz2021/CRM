'use client';

import { useState } from 'react';

export default function MasterDataTable({ master, data, onSave, onDelete, onRestore, vehicleBrands = [], vehicleModels = [], vehicleColors = [] }) {
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showInactive, setShowInactive] = useState(false);
    const [formData, setFormData] = useState({});

    // For customers - handle multiple vehicles
    const isCustomerMaster = master.id === 'customers';

    const handleAdd = () => {
        setEditingItem(null);
        setFormData(isCustomerMaster ? { vehicles: [] } : {});
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({ ...item, vehicles: item.vehicles || [] });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editingItem ? { ...formData, id: editingItem.id } : formData);
        setShowModal(false);
        setFormData({});
        setEditingItem(null);
    };

    // Vehicle management for customers
    const addVehicle = () => {
        setFormData({
            ...formData,
            vehicles: [...(formData.vehicles || []), {
                id: Date.now(),
                brand: '',
                model: '',
                color: '',
                registrationNo: '',
                year: ''
            }],
        });
    };

    const removeVehicle = (vehicleId) => {
        setFormData({
            ...formData,
            vehicles: (formData.vehicles || []).filter(v => v.id !== vehicleId),
        });
    };

    const updateVehicle = (vehicleId, field, value) => {
        setFormData({
            ...formData,
            vehicles: (formData.vehicles || []).map(v =>
                v.id === vehicleId ? { ...v, [field]: value } : v
            ),
        });
    };

    const filteredData = data
        .filter(item => showInactive ? true : item.isActive)
        .filter(item => {
            if (!searchTerm) return true;
            return Object.values(item).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

    const displayFields = master.fields.slice(0, 4); // Show first 4 fields in table

    return (
        <div>
            {/* Header with title and actions */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-lg)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: 'var(--radius-md)',
                        background: `${master.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                    }}>
                        {master.icon}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.3rem', fontWeight: 600 }}>{master.name}</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            {filteredData.length} records {!showInactive && data.filter(i => !i.isActive).length > 0 &&
                                `(${data.filter(i => !i.isActive).length} inactive)`}
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-xs)',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                    }}>
                        <input
                            type="checkbox"
                            checked={showInactive}
                            onChange={(e) => setShowInactive(e.target.checked)}
                            style={{ cursor: 'pointer' }}
                        />
                        Show Inactive
                    </label>
                    <button
                        onClick={handleAdd}
                        className="btn btn-primary"
                        style={{ padding: '8px 20px' }}
                    >
                        + Add {master.name.replace(/s$/, '')}
                    </button>
                </div>
            </div>

            {/* Search */}
            <div style={{
                marginBottom: 'var(--spacing-lg)',
                display: 'flex',
                gap: 'var(--spacing-md)',
            }}>
                <div style={{
                    flex: 1,
                    maxWidth: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    background: 'white',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-gray-200)',
                }}>
                    <span>🔍</span>
                    <input
                        type="text"
                        placeholder={`Search ${master.name.toLowerCase()}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            width: '100%',
                            fontSize: '0.9rem',
                        }}
                    />
                </div>
            </div>

            {/* Table */}
            <div style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                overflow: 'hidden',
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'var(--color-gray-100)' }}>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                #
                            </th>
                            {displayFields.map((field) => (
                                <th key={field.key} style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                    {field.label}
                                </th>
                            ))}
                            {isCustomerMaster && (
                                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                    Vehicles
                                </th>
                            )}
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                Status
                            </th>
                            <th style={{ padding: 'var(--spacing-md)', textAlign: 'right', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length === 0 ? (
                            <tr>
                                <td colSpan={displayFields.length + (isCustomerMaster ? 4 : 3)} style={{ padding: 'var(--spacing-2xl)', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No records found. Click "Add" to create one.
                                </td>
                            </tr>
                        ) : (
                            filteredData.map((item, index) => (
                                <tr
                                    key={item.id}
                                    style={{
                                        borderBottom: '1px solid var(--color-gray-200)',
                                        background: !item.isActive ? 'rgba(0,0,0,0.02)' : 'transparent',
                                        opacity: item.isActive ? 1 : 0.6,
                                    }}
                                >
                                    <td style={{ padding: 'var(--spacing-md)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        {index + 1}
                                    </td>
                                    {displayFields.map((field) => (
                                        <td key={field.key} style={{ padding: 'var(--spacing-md)', fontSize: '0.9rem' }}>
                                            {field.type === 'color' ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: item[field.key] || '#ccc' }} />
                                                    {item[field.key]}
                                                </div>
                                            ) : field.type === 'checkbox' ? (
                                                item[field.key] ? '✓ Yes' : '✗ No'
                                            ) : (
                                                item[field.key] || '-'
                                            )}
                                        </td>
                                    ))}
                                    {isCustomerMaster && (
                                        <td style={{ padding: 'var(--spacing-md)', fontSize: '0.9rem' }}>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                background: 'rgba(0, 184, 212, 0.1)',
                                                padding: '4px 10px',
                                                borderRadius: '12px',
                                                color: 'var(--color-primary)',
                                                fontWeight: 500,
                                            }}>
                                                🏍️ {(item.vehicles || []).length} vehicle{(item.vehicles || []).length !== 1 ? 's' : ''}
                                            </span>
                                        </td>
                                    )}
                                    <td style={{ padding: 'var(--spacing-md)' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            fontWeight: 500,
                                            background: item.isActive ? 'rgba(76, 175, 80, 0.15)' : 'rgba(244, 67, 54, 0.15)',
                                            color: item.isActive ? '#4CAF50' : '#F44336',
                                        }}>
                                            {item.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
                                            <button
                                                onClick={() => handleEdit(item)}
                                                style={{
                                                    background: 'var(--color-gray-100)',
                                                    border: 'none',
                                                    padding: '6px 12px',
                                                    borderRadius: 'var(--radius-sm)',
                                                    cursor: 'pointer',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 500,
                                                    color: 'var(--color-primary)',
                                                }}
                                            >
                                                ✏️ Edit
                                            </button>
                                            {item.isActive ? (
                                                <button
                                                    onClick={() => onDelete(item.id)}
                                                    style={{
                                                        background: 'rgba(244, 67, 54, 0.1)',
                                                        border: 'none',
                                                        padding: '6px 12px',
                                                        borderRadius: 'var(--radius-sm)',
                                                        cursor: 'pointer',
                                                        fontSize: '0.8rem',
                                                        fontWeight: 500,
                                                        color: '#F44336',
                                                    }}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => onRestore(item.id)}
                                                    style={{
                                                        background: 'rgba(76, 175, 80, 0.1)',
                                                        border: 'none',
                                                        padding: '6px 12px',
                                                        borderRadius: 'var(--radius-sm)',
                                                        cursor: 'pointer',
                                                        fontSize: '0.8rem',
                                                        fontWeight: 500,
                                                        color: '#4CAF50',
                                                    }}
                                                >
                                                    ♻️ Restore
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
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
                        padding: 'var(--spacing-xl)',
                        width: '100%',
                        maxWidth: isCustomerMaster ? '700px' : '500px',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        boxShadow: 'var(--shadow-lg)',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                                {editingItem ? 'Edit' : 'Add'} {master.name.replace(/s$/, '')}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
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

                        <form onSubmit={handleSubmit}>
                            {/* Regular form fields */}
                            {master.fields.map((field) => (
                                <div key={field.key} style={{ marginBottom: 'var(--spacing-md)' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: 'var(--spacing-xs)',
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                        color: 'var(--text-secondary)',
                                    }}>
                                        {field.label} {field.required && <span style={{ color: 'var(--color-accent)' }}>*</span>}
                                    </label>

                                    {field.type === 'textarea' ? (
                                        <textarea
                                            value={formData[field.key] || ''}
                                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                            required={field.required}
                                            rows={3}
                                            style={{
                                                width: '100%',
                                                padding: 'var(--spacing-sm)',
                                                borderRadius: 'var(--radius-sm)',
                                                border: '1px solid var(--color-gray-200)',
                                                fontSize: '0.9rem',
                                                resize: 'vertical',
                                            }}
                                        />
                                    ) : field.type === 'select' ? (
                                        <select
                                            value={formData[field.key] || ''}
                                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                            required={field.required}
                                            style={{
                                                width: '100%',
                                                padding: 'var(--spacing-sm)',
                                                borderRadius: 'var(--radius-sm)',
                                                border: '1px solid var(--color-gray-200)',
                                                fontSize: '0.9rem',
                                            }}
                                        >
                                            <option value="">Select {field.label}</option>
                                            {(field.options || []).map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : field.type === 'checkbox' ? (
                                        <input
                                            type="checkbox"
                                            checked={formData[field.key] || false}
                                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.checked })}
                                            style={{ width: '20px', height: '20px' }}
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            value={formData[field.key] || ''}
                                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                            required={field.required}
                                            style={{
                                                width: '100%',
                                                padding: 'var(--spacing-sm)',
                                                borderRadius: 'var(--radius-sm)',
                                                border: '1px solid var(--color-gray-200)',
                                                fontSize: '0.9rem',
                                            }}
                                        />
                                    )}
                                </div>
                            ))}

                            {/* Vehicle Section for Customers */}
                            {isCustomerMaster && (
                                <div style={{
                                    marginTop: 'var(--spacing-lg)',
                                    paddingTop: 'var(--spacing-lg)',
                                    borderTop: '2px solid var(--color-gray-200)',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: 'var(--spacing-md)',
                                    }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            🏍️ Vehicles
                                            <span style={{
                                                background: 'var(--color-primary)',
                                                color: 'white',
                                                padding: '2px 8px',
                                                borderRadius: '10px',
                                                fontSize: '0.75rem',
                                            }}>
                                                {(formData.vehicles || []).length}
                                            </span>
                                        </h4>
                                        <button
                                            type="button"
                                            onClick={addVehicle}
                                            style={{
                                                background: 'rgba(0, 184, 212, 0.1)',
                                                border: '1px dashed var(--color-primary)',
                                                padding: '6px 14px',
                                                borderRadius: 'var(--radius-sm)',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                fontWeight: 500,
                                                color: 'var(--color-primary)',
                                            }}
                                        >
                                            + Add Vehicle
                                        </button>
                                    </div>

                                    {(formData.vehicles || []).length === 0 ? (
                                        <div style={{
                                            padding: 'var(--spacing-lg)',
                                            background: 'var(--color-gray-100)',
                                            borderRadius: 'var(--radius-md)',
                                            textAlign: 'center',
                                            color: 'var(--text-muted)',
                                        }}>
                                            No vehicles added. Click "Add Vehicle" to add one.
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                            {(formData.vehicles || []).map((vehicle, idx) => (
                                                <div
                                                    key={vehicle.id}
                                                    style={{
                                                        background: 'var(--color-gray-100)',
                                                        borderRadius: 'var(--radius-md)',
                                                        padding: 'var(--spacing-md)',
                                                        border: '1px solid var(--color-gray-200)',
                                                    }}
                                                >
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        marginBottom: 'var(--spacing-sm)',
                                                    }}>
                                                        <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                                                            Vehicle {idx + 1}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeVehicle(vehicle.id)}
                                                            style={{
                                                                background: 'rgba(244, 67, 54, 0.1)',
                                                                border: 'none',
                                                                padding: '4px 10px',
                                                                borderRadius: 'var(--radius-sm)',
                                                                cursor: 'pointer',
                                                                fontSize: '0.75rem',
                                                                color: '#F44336',
                                                            }}
                                                        >
                                                            ✕ Remove
                                                        </button>
                                                    </div>

                                                    <div style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                                        gap: 'var(--spacing-sm)',
                                                    }}>
                                                        <div>
                                                            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                                                                Registration No. *
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="MH 01 AB 1234"
                                                                value={vehicle.registrationNo || ''}
                                                                onChange={(e) => updateVehicle(vehicle.id, 'registrationNo', e.target.value)}
                                                                required
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '8px',
                                                                    borderRadius: 'var(--radius-sm)',
                                                                    border: '1px solid var(--color-gray-200)',
                                                                    fontSize: '0.85rem',
                                                                    background: 'white',
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                                                                Brand *
                                                            </label>
                                                            <select
                                                                value={vehicle.brand || ''}
                                                                onChange={(e) => updateVehicle(vehicle.id, 'brand', e.target.value)}
                                                                required
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '8px',
                                                                    borderRadius: 'var(--radius-sm)',
                                                                    border: '1px solid var(--color-gray-200)',
                                                                    fontSize: '0.85rem',
                                                                    background: 'white',
                                                                }}
                                                            >
                                                                <option value="">Select Brand</option>
                                                                {vehicleBrands.filter(b => b.isActive).map((brand) => (
                                                                    <option key={brand.id} value={brand.name}>{brand.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                                                                Model
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="e.g. Activa 6G"
                                                                value={vehicle.model || ''}
                                                                onChange={(e) => updateVehicle(vehicle.id, 'model', e.target.value)}
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '8px',
                                                                    borderRadius: 'var(--radius-sm)',
                                                                    border: '1px solid var(--color-gray-200)',
                                                                    fontSize: '0.85rem',
                                                                    background: 'white',
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                                                                Color
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="e.g. Pearl White"
                                                                value={vehicle.color || ''}
                                                                onChange={(e) => updateVehicle(vehicle.id, 'color', e.target.value)}
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '8px',
                                                                    borderRadius: 'var(--radius-sm)',
                                                                    border: '1px solid var(--color-gray-200)',
                                                                    fontSize: '0.85rem',
                                                                    background: 'white',
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                                                                Year
                                                            </label>
                                                            <input
                                                                type="number"
                                                                placeholder="2024"
                                                                value={vehicle.year || ''}
                                                                onChange={(e) => updateVehicle(vehicle.id, 'year', e.target.value)}
                                                                min="1990"
                                                                max="2030"
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '8px',
                                                                    borderRadius: 'var(--radius-sm)',
                                                                    border: '1px solid var(--color-gray-200)',
                                                                    fontSize: '0.85rem',
                                                                    background: 'white',
                                                                }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                                                                Chassis No.
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="XXXXXXXXXXXXXXX"
                                                                value={vehicle.chassisNo || ''}
                                                                onChange={(e) => updateVehicle(vehicle.id, 'chassisNo', e.target.value)}
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '8px',
                                                                    borderRadius: 'var(--radius-sm)',
                                                                    border: '1px solid var(--color-gray-200)',
                                                                    fontSize: '0.85rem',
                                                                    background: 'white',
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{
                                        flex: 1,
                                        padding: 'var(--spacing-sm) var(--spacing-lg)',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-gray-200)',
                                        background: 'white',
                                        cursor: 'pointer',
                                        fontWeight: 500,
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{ flex: 1 }}
                                >
                                    {editingItem ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
