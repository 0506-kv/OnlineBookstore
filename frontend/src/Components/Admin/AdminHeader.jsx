import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ admin }) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navItems = [
        { label: 'Dashboard', path: '/admin/home' },
        { label: 'Admin Control', path: '/admin/control' },
        { label: 'Orders', path: '/admin/orders' },
        { label: 'Sales', path: '/admin/sales' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('admin');
        navigate('/seller/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header style={styles.header}>
            <div style={styles.headerContent}>
                <div style={styles.logo}>
                    🛡️ Admin Panel
                </div>

                {/* Desktop Navigation */}
                <nav style={styles.desktopNav} className="desktop-nav">
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            type="button"
                            onClick={() => navigate(item.path)}
                            style={styles.linkBtn}
                        >
                            {item.label}
                        </button>
                    ))}
                    <button type="button" onClick={handleLogout} style={styles.logoutLinkBtn}>Logout</button>
                </nav>

                {/* Desktop User Section */}
                <div style={styles.desktopUserSection} className="desktop-user-section">
                    <span style={styles.userName}>Admin: {admin?.email || 'Admin'}</span>
                </div>

                {/* Mobile Hamburger Button */}
                <button onClick={toggleMenu} style={styles.hamburger} className="hamburger-btn">
                    <span style={{ ...styles.bar, ...(isMenuOpen ? styles.barOpen1 : {}) }}></span>
                    <span style={{ ...styles.bar, ...(isMenuOpen ? styles.barOpen2 : {}) }}></span>
                    <span style={{ ...styles.bar, ...(isMenuOpen ? styles.barOpen3 : {}) }}></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div style={{
                ...styles.mobileMenu,
                ...(isMenuOpen ? styles.mobileMenuOpen : {})
            }}>
                {navItems.map((item) => (
                    <button
                        key={item.path}
                        type="button"
                        style={styles.mobileLinkBtn}
                        onClick={() => {
                            navigate(item.path);
                            setIsMenuOpen(false);
                        }}
                    >
                        {item.label}
                    </button>
                ))}
                <button
                    type="button"
                    onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                    }}
                    style={styles.mobileLogoutLinkBtn}
                >
                    Logout
                </button>
                <div style={styles.mobileUserSection}>
                    <span style={styles.mobileUserName}>Admin: {admin?.email || 'Admin'}</span>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .desktop-nav, .desktop-user-section {
                        display: none !important;
                    }
                    .hamburger-btn {
                        display: flex !important;
                    }
                }
            `}</style>
        </header>
    );
};

const styles = {
    header: {
        background: 'linear-gradient(135deg, #1e293b, #334155)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        fontFamily: "'DM Sans', sans-serif",
    },
    headerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        position: 'relative',
        zIndex: 1001,
        background: 'transparent',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    desktopNav: {
        display: 'flex',
        gap: '2rem',
        // Media query handling is done via class names and style tag
    },
    linkBtn: {
        background: 'transparent',
        border: 'none',
        color: '#cbd5e1',
        fontWeight: '500',
        transition: 'all 0.3s',
        fontSize: '0.95rem',
        cursor: 'pointer',
        padding: 0,
        fontFamily: 'inherit',
    },
    logoutLinkBtn: {
        background: 'transparent',
        border: 'none',
        color: '#fca5a5',
        fontWeight: '600',
        transition: 'all 0.3s',
        fontSize: '0.95rem',
        cursor: 'pointer',
        padding: 0,
        fontFamily: 'inherit',
    },
    desktopUserSection: {
        display: 'flex',
        alignItems: 'center',
    },
    userName: {
        color: '#e2e8f0',
        fontWeight: '600',
        fontSize: '0.9rem',
    },
    // Mobile styles
    hamburger: {
        display: 'none', // Hidden on desktop, shown via media query
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '30px',
        height: '25px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        zIndex: 1002,
    },
    bar: {
        width: '30px',
        height: '3px',
        background: '#fff',
        borderRadius: '10px',
        transition: 'all 0.3s linear',
        position: 'relative',
        transformOrigin: '1px',
    },
    barOpen1: {
        transform: 'rotate(45deg)',
    },
    barOpen2: {
        opacity: 0,
        transform: 'translateX(20px)',
    },
    barOpen3: {
        transform: 'rotate(-45deg)',
    },
    mobileMenu: {
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        background: '#1e293b',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0',
        maxHeight: '0',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    mobileMenuOpen: {
        maxHeight: '380px',
        padding: '1rem 0 2rem',
    },
    mobileLinkBtn: {
        background: 'transparent',
        border: 'none',
        color: '#cbd5e1',
        fontSize: '1.1rem',
        fontWeight: '500',
        padding: '1rem',
        width: '100%',
        textAlign: 'center',
        transition: 'background 0.2s, color 0.2s',
        fontFamily: 'inherit',
    },
    mobileLogoutLinkBtn: {
        background: 'transparent',
        border: 'none',
        color: '#fca5a5',
        fontSize: '1.1rem',
        fontWeight: '600',
        padding: '1rem',
        width: '100%',
        textAlign: 'center',
        transition: 'background 0.2s, color 0.2s',
        fontFamily: 'inherit',
        cursor: 'pointer',
    },
    mobileUserSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '1rem',
        width: '100%',
    },
    mobileUserName: {
        color: '#94a3b8',
        fontSize: '0.9rem',
    },
};

export default AdminHeader;
