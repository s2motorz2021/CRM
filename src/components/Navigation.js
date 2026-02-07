import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Added for pathname
import Link from 'next/link';

export function Sidebar() {
    const pathname = usePathname();
    const [user, setUser] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [permissions, setPermissions] = useState(null);

    useEffect(() => {
        setMounted(true);
        try {
            const userJSON = localStorage.getItem('s2_user');
            if (userJSON) setUser(JSON.parse(userJSON));
        } catch (e) {
            console.error('Failed to parse user session in sidebar', e);
        }

        // Check if mobile
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Fetch role permissions from database
    useEffect(() => {
        const fetchPermissions = async () => {
            if (!user?.role) return;
            try {
                const res = await fetch('/api/roles');
                if (res.ok) {
                    const roles = await res.json();
                    const userRoleData = roles.find(r => r.name === user.role);
                    if (userRoleData?.permissions) {
                        setPermissions(userRoleData.permissions);
                    }
                }
            } catch (err) {
                console.error('Error fetching role permissions:', err);
            }
        };
        fetchPermissions();
    }, [user?.role]);

    // Close mobile menu when pathname changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const userRole = user?.role || 'Guest';

    // Menu items with permission key mapping
    const menuItems = [
        { name: 'Dashboard', icon: '📊', path: '/', permissionKey: 'dashboard' },
        { name: 'Job Cards', icon: '📋', path: '/job-cards', permissionKey: 'crm' },
        { name: 'Quick Service', icon: '⚡', path: '/quick-service', permissionKey: 'crm' },
        { name: 'Appointments', icon: '📅', path: '/appointments', permissionKey: 'crm' },
        { name: 'Inventory', icon: '📦', path: '/inventory', permissionKey: 'inventory' },
        { name: 'Billing', icon: '🧾', path: '/billing', permissionKey: 'billing' },
        { name: 'Leads & CRM', icon: '👥', path: '/crm', permissionKey: 'crm' },
        { name: 'Finance', icon: '💰', path: '/finance', permissionKey: 'finance' },
        { name: 'Reports', icon: '📈', path: '/billing/reports', permissionKey: 'reports' },
        { name: 'HR', icon: '👨‍💼', path: '/hr', permissionKey: 'hr' },
        { name: 'Jessi AI', icon: '🤖', path: '/jessi-ai', permissionKey: 'crm' },
        { name: 'Marketing', icon: '📢', path: '/marketing', permissionKey: 'crm' },
        { name: 'Settings', icon: '⚙️', path: '/settings', permissionKey: 'settings' },
    ];

    // Check if user has permission for a menu item
    const hasPermission = (permissionKey) => {
        // Admin and Manager always have full access
        if (userRole === 'Admin' || userRole === 'Manager') return true;
        // If permissions loaded from database, use them
        if (permissions) return permissions[permissionKey] === true;
        // Fallback: show dashboard for everyone
        return permissionKey === 'dashboard';
    };

    if (!mounted) return null;

    const handleNavClick = () => {
        if (isMobile) setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Hamburger Button */}
            {isMobile && (
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                        position: 'fixed',
                        top: '12px',
                        left: '12px',
                        zIndex: 200,
                        background: '#1A1A2E',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                    }}
                >
                    <span style={{ width: '20px', height: '2px', background: 'white', display: 'block' }} />
                    <span style={{ width: '20px', height: '2px', background: 'white', display: 'block' }} />
                    <span style={{ width: '20px', height: '2px', background: 'white', display: 'block' }} />
                </button>
            )}

            {/* Mobile Overlay Backdrop */}
            {isMobile && isMobileMenuOpen && (
                <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 150,
                    }}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`sidebar ${isMobile && isMobileMenuOpen ? 'mobile-open' : ''}`}
                style={{
                    position: 'fixed',
                    // Left and Width handled by CSS for mobile, defaults for desktop
                    top: 0,
                    // Use CSS variable for desktop width, mobile overrides via media query class
                    width: isMobile ? '280px' : 'var(--sidebar-width)',
                    height: '100vh',
                    background: '#1A1A2E',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 160,
                    // Transition handled by CSS
                    overflowY: 'auto',
                }}
            >
                <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                    <img src="/logo.png" alt="S2 Motorz" style={{ width: '150px' }} />
                </div>
                <nav style={{ flex: 1, overflowY: 'auto' }}>
                    <ul style={{ listStyle: 'none' }}>
                        {menuItems.filter(item => hasPermission(item.permissionKey)).map((item, index) => (
                            <li key={index} style={{ marginBottom: '8px' }}>
                                <Link
                                    href={item.path}
                                    onClick={handleNavClick}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '10px',
                                        color: pathname === item.path ? '#00B8D4' : 'white',
                                        textDecoration: 'none',
                                        background: pathname === item.path ? 'rgba(0,184,212,0.1)' : 'transparent',
                                        borderRadius: '8px'
                                    }}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}

export function Header() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [user, setUser] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        try {
            const userJSON = localStorage.getItem('s2_user');
            if (userJSON) setUser(JSON.parse(userJSON));
        } catch (e) {
            console.error('Failed to parse user session in header', e);
        }

        // Check if mobile
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const userRole = user?.role || 'Guest';

    const notifications = [
        { id: 1, text: 'New appointment booked for today', time: '5 min ago', type: 'info' },
        { id: 2, text: 'Job Card #1234 completed', time: '1 hour ago', type: 'success' },
        { id: 3, text: 'Low stock alert: Engine Oil', time: '2 hours ago', type: 'warning' },
        { id: 4, text: 'Payment received: ₹2,500', time: '3 hours ago', type: 'success' },
    ];

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: isMobile ? 0 : 'var(--sidebar-width)',
            right: 0,
            height: 'var(--header-height)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--color-gray-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile ? 'flex-end' : 'space-between',
            padding: isMobile ? '0 var(--spacing-md)' : '0 var(--spacing-xl)',
            paddingLeft: isMobile ? '60px' : 'var(--spacing-xl)',
            zIndex: 99,
        }}>
            {/* Search - hide on mobile */}
            {!isMobile && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    background: 'var(--color-gray-100)',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    borderRadius: 'var(--radius-md)',
                    width: '300px',
                }}>
                    <span>🔍</span>
                    <input
                        type="text"
                        placeholder="Search customers, vehicles..."
                        style={{
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            width: '100%',
                            fontSize: '0.9rem',
                            color: 'var(--text-primary)',
                        }}
                    />
                </div>
            )}

            {/* Right Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
                {/* Notifications */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => {
                            setShowNotifications(!showNotifications);
                            setShowProfileMenu(false);
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            position: 'relative',
                            fontSize: '1.3rem',
                            padding: '8px',
                            borderRadius: 'var(--radius-sm)',
                            transition: 'background 0.2s',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-gray-100)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                    >
                        🔔
                        <span style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            width: '10px',
                            height: '10px',
                            background: 'var(--color-accent)',
                            borderRadius: '50%',
                            border: '2px solid white',
                        }} />
                    </button>

                    {/* Notifications Dropdown */}
                    {showNotifications && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            marginTop: '8px',
                            width: '320px',
                            background: 'white',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-lg)',
                            border: '1px solid var(--color-gray-200)',
                            overflow: 'hidden',
                            zIndex: 1000,
                        }}>
                            <div style={{
                                padding: 'var(--spacing-md)',
                                borderBottom: '1px solid var(--color-gray-200)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Notifications</h4>
                                <span style={{
                                    background: 'var(--color-accent)',
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: '10px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                }}>{notifications.length}</span>
                            </div>
                            <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                                {notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        style={{
                                            padding: 'var(--spacing-md)',
                                            borderBottom: '1px solid var(--color-gray-100)',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s',
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-gray-100)'}
                                        onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                                    >
                                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'flex-start' }}>
                                            <span style={{ fontSize: '1.2rem' }}>
                                                {notif.type === 'success' ? '✅' : notif.type === 'warning' ? '⚠️' : 'ℹ️'}
                                            </span>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{notif.text}</p>
                                                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{notif.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{
                                padding: 'var(--spacing-sm)',
                                textAlign: 'center',
                                borderTop: '1px solid var(--color-gray-200)',
                            }}>
                                <button style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-primary)',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    fontSize: '0.85rem',
                                }}>
                                    View All Notifications
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Profile */}
                <div style={{ position: 'relative' }}>
                    <div
                        onClick={() => {
                            setShowProfileMenu(!showProfileMenu);
                            setShowNotifications(false);
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)',
                            cursor: 'pointer',
                            padding: '6px 10px',
                            borderRadius: 'var(--radius-md)',
                            transition: 'background 0.2s',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-gray-100)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 600,
                        }}>
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>{user?.name || 'User'}</p>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{userRole}</p>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>▼</span>
                    </div>

                    {/* Profile Dropdown */}
                    {showProfileMenu && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            marginTop: '8px',
                            width: '200px',
                            background: 'white',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-lg)',
                            border: '1px solid var(--color-gray-200)',
                            overflow: 'hidden',
                            zIndex: 1000,
                        }}>
                            <div style={{ padding: 'var(--spacing-md)', borderBottom: '1px solid var(--color-gray-200)' }}>
                                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.95rem' }}>{user?.name || 'User'}</p>
                                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8rem' }}>{user?.phone || 'admin@s2motorz.com'}</p>
                            </div>
                            {[
                                { icon: '👤', label: 'My Profile', href: '#' },
                                { icon: '⚙️', label: 'Settings', href: '/settings' },
                                { icon: '🔐', label: 'Change Password', href: '#' },
                            ].map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.href}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-sm)',
                                        padding: 'var(--spacing-sm) var(--spacing-md)',
                                        color: 'var(--text-primary)',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        transition: 'background 0.2s',
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-gray-100)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </a>
                            ))}
                            <div style={{ borderTop: '1px solid var(--color-gray-200)' }}>
                                <button
                                    onClick={async () => {
                                        await fetch('/api/auth/logout', { method: 'POST' });
                                        localStorage.removeItem('s2_user');
                                        window.location.href = '/login';
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-sm)',
                                        padding: 'var(--spacing-sm) var(--spacing-md)',
                                        color: 'var(--color-accent)',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        transition: 'background 0.2s',
                                        background: 'none',
                                        border: 'none',
                                        width: '100%',
                                        cursor: 'pointer',
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(227, 6, 19, 0.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                                >
                                    <span>🚪</span>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Click outside to close dropdowns */}
            {(showNotifications || showProfileMenu) && (
                <div
                    onClick={() => {
                        setShowNotifications(false);
                        setShowProfileMenu(false);
                    }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 98,
                    }}
                />
            )}
        </header>
    );
}
