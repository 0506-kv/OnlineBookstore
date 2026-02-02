import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ admin }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
        navigate('/seller/login');
    };

    return (
        <header style={styles.header}>
            <div style={styles.logo}>
                🛡️ Admin Panel
            </div>
            <nav style={styles.nav}>
                <a href="/admin/control" style={styles.link}>Admin Control</a>
                <a href="/admin/home" style={styles.link}>Dashboard</a>
                {/* <a href="/admin/books" style={styles.link}>Manage Books</a>
                <a href="/admin/sellers" style={styles.link}>Sellers</a>
                <a href="/admin/users" style={styles.link}>Users</a>
                <a href="/admin/orders" style={styles.link}>Orders</a> */}
            </nav>
            <div style={styles.userSection}>
                <span style={styles.userName}>Admin: {admin?.email || 'Admin'}</span>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </div>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: 'linear-gradient(135deg, #1e293b, #334155)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
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
    nav: {
        display: 'flex',
        gap: '2rem',
    },
    link: {
        textDecoration: 'none',
        color: '#cbd5e1',
        fontWeight: '500',
        transition: 'all 0.3s',
        fontSize: '0.95rem',
        ':hover': {
            color: '#fff',
        }
    },
    userSection: {
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
    }
};

export default AdminHeader;
