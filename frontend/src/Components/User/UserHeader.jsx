import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserHeader = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/user/login');
    };

    return (
        <header style={styles.header}>
            <div style={styles.logo}>
                📚 Readora
            </div>
            <nav style={styles.nav}>
                <a href="/user/home" style={styles.link}>Home</a>
                <a href="#books" style={styles.link}>Books</a>
                <a href="#categories" style={styles.link}>Categories</a>
                <a href="#about" style={styles.link}>About</a>
            </nav>
            <div style={styles.userSection}>
                <span style={styles.userName}>Hello, {user?.fullname || 'User'}</span>
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
        background: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#7c3aed',
        cursor: 'pointer',
    },
    nav: {
        display: 'flex',
        gap: '2rem',
    },
    link: {
        textDecoration: 'none',
        color: '#64748b',
        fontWeight: '500',
        transition: 'color 0.3s',
        fontSize: '1rem',
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
    },
    userName: {
        color: '#1e293b',
        fontWeight: '600',
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
        transition: 'transform 0.2s',
    }
};

export default UserHeader;
