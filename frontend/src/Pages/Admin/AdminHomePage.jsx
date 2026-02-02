import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../Components/Admin/AdminHeader';
import AdminFooter from '../../Components/Admin/AdminFooter';

const AdminHomePage = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const adminData = localStorage.getItem('admin');

        if (!token || role !== 'admin') {
            navigate('/seller/login');
        } else {
            setAdmin(adminData ? JSON.parse(adminData) : { email: 'admin@readora.com' });
            setIsAdmin(true);
            setLoaded(true);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/seller/login');
    };

    if (!isAdmin) return null;

    return (
        <div style={s.pageWrapper}>
            <style>{css}</style>
            <AdminHeader admin={admin} />

            <div style={s.container}>
                <div style={s.shapes}><div style={{ ...s.shape, ...s.s1 }} /><div style={{ ...s.shape, ...s.s2 }} /></div>

                <div style={{ ...s.card, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)' }}>
                    <div style={s.header}>
                        <div style={s.iconBox}>🛡️</div>
                        <h1 style={s.title}>Admin Dashboard</h1>
                        <p style={s.subtitle}>System Administration</p>
                    </div>

                    <div style={s.content}>
                        <p style={s.welcome}>Welcome, Administrator</p>
                        <div style={s.stats}>
                            <div style={s.statItem}>
                                <span style={s.statLabel}>Status</span>
                                <span style={s.statValue}>Active</span>
                            </div>
                            <div style={s.statItem}>
                                <span style={s.statLabel}>Privileges</span>
                                <span style={s.statValue}>Full Access</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleLogout} style={s.btn}>Logout</button>
                </div>
            </div>

            <AdminFooter />
        </div>
    );
};

const css = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap'); * { margin:0;padding:0;box-sizing:border-box; } @keyframes pulse{0%,100%{opacity:.3}50%{opacity:.6}}`;

const s = {
    pageWrapper: { minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #1e293b, #0f172a)', fontFamily: "'DM Sans',sans-serif" },
    container: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' },
    shapes: { position: 'fixed', inset: 0, zIndex: 0 },
    shape: { position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', animation: 'pulse 6s ease-in-out infinite' },
    s1: { width: '350px', height: '350px', background: '#3b82f630', top: '-10%', right: '-5%' },
    s2: { width: '300px', height: '300px', background: '#10b98130', bottom: '-10%', left: '-5%', animationDelay: '3s' },
    card: { background: '#fff', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', transition: 'all 0.6s', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { textAlign: 'center' },
    iconBox: { width: '80px', height: '80px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem', boxShadow: '0 10px 25px rgba(59,130,246,0.3)', color: '#fff' },
    title: { fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' },
    subtitle: { fontSize: '1rem', color: '#64748b' },
    content: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    welcome: { textAlign: 'center', fontSize: '1.1rem', fontWeight: 600, color: '#334155' },
    stats: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
    statItem: { background: '#f8fafc', padding: '1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' },
    statLabel: { display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: '0.25rem' },
    statValue: { display: 'block', fontSize: '0.95rem', fontWeight: 600, color: '#0f172a' },
};

export default AdminHomePage;
