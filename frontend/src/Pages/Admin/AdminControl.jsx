import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../Components/Admin/AdminHeader';
import AdminFooter from '../../Components/Admin/AdminFooter';
import AllUsers from '../../Components/Admin/AllUsers';
import AllSellers from '../../Components/Admin/AllSellers';

const AdminControl = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const adminData = localStorage.getItem('admin');

        if (!token || role !== 'admin') {
            navigate('/seller/login');
        } else {
            setAdmin(adminData ? JSON.parse(adminData) : { email: 'admin@readora.com' });
        }
    }, [navigate]);

    return (
        <div style={styles.pageWrapper}>
            <AdminHeader admin={admin} />

            <div style={styles.container}>
                <div style={styles.content}>
                    <h1 style={styles.mainTitle}>Admin Control Panel</h1>
                    <p style={styles.subtitle}>Manage users and sellers of the platform</p>

                    <div style={styles.grid}>
                        <AllUsers />
                        <AllSellers />
                    </div>
                </div>
            </div>

            <AdminFooter />
        </div>
    );
};

const styles = {
    pageWrapper: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #1e293b, #0f172a)',
    },
    container: {
        flex: 1,
        padding: '3rem 2rem',
        overflowY: 'auto',
    },
    content: {
        maxWidth: '1400px',
        margin: '0 auto',
    },
    mainTitle: {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: '#fff',
        marginBottom: '0.5rem',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: '1.1rem',
        color: '#cbd5e1',
        textAlign: 'center',
        marginBottom: '3rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '2rem',
    },
};

export default AdminControl;
