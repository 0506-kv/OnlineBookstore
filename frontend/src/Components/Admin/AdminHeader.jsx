import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ admin }) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                    <a href="/admin/control" style={styles.link}>Admin Control</a>
                    <a href="/admin/home" style={styles.link}>Dashboard</a>
                    <a href="/admin/orders" style={styles.link}>Orders</a>
                </nav>

                {/* Desktop User Section */}
                <div style={styles.desktopUserSection} className="desktop-user-section">
                    <span style={styles.userName}>Admin: {admin?.email || 'Admin'}</span>
                    <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
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
                <a href="/admin/control" style={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Admin Control</a>
                <a href="/admin/home" style={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Dashboard</a>
                <a href="/admin/orders" style={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Orders</a>
                <div style={styles.mobileUserSection}>
                    <span style={styles.mobileUserName}>Admin: {admin?.email || 'Admin'}</span>
                    <button onClick={handleLogout} style={styles.mobileLogoutBtn}>Logout</button>
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
    link: {
        textDecoration: 'none',
        color: '#cbd5e1',
        fontWeight: '500',
        transition: 'all 0.3s',
        fontSize: '0.95rem',
        cursor: 'pointer',
    },
    desktopUserSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
    },
    userName: {
        color: '#e2e8f0',
        fontWeight: '600',
        fontSize: '0.9rem',
    },
    logoutBtn: {
        padding: '0.6rem 1.2rem',
        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '0.9rem',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
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
        maxHeight: '300px', // Adjust based on content
        padding: '1rem 0 2rem',
    },
    mobileLink: {
        color: '#cbd5e1',
        textDecoration: 'none',
        fontSize: '1.1rem',
        fontWeight: '500',
        padding: '1rem',
        width: '100%',
        textAlign: 'center',
        transition: 'background 0.2s, color 0.2s',
    },
    mobileUserSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        marginTop: '1rem',
        width: '100%',
    },
    mobileUserName: {
        color: '#94a3b8',
        fontSize: '0.9rem',
    },
    mobileLogoutBtn: {
        padding: '0.75rem 2rem',
        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '1rem',
        width: '80%',
        maxWidth: '200px',
    }
};

export default AdminHeader;
