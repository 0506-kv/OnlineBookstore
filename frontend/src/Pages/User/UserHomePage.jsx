import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserHomePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!storedUser || !token) {
            navigate('/user/login');
        } else {
            setUser(JSON.parse(storedUser));
            setLoaded(true);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/user/login');
    };

    if (!user) return null;

    return (
        <div style={s.container}>
            <style>{css}</style>
            <div style={s.shapes}><div style={{ ...s.shape, ...s.s1 }} /><div style={{ ...s.shape, ...s.s2 }} /></div>

            <div style={{ ...s.card, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)' }}>
                <div style={s.header}>
                    <div style={s.iconBox}>👤</div>
                    <h1 style={s.title}>Welcome, {user.fullname}!</h1>
                    <p style={s.subtitle}>You are successfully logged in.</p>
                </div>

                <div style={s.info}>
                    <div style={s.row}>
                        <span style={s.label}>Full Name:</span>
                        <span style={s.value}>{user.fullname}</span>
                    </div>
                    <div style={s.row}>
                        <span style={s.label}>Email:</span>
                        <span style={s.value}>{user.email}</span>
                    </div>
                </div>

                <button onClick={handleLogout} style={s.btn}>Logout</button>
            </div>
        </div>
    );
};

const css = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap'); * { margin:0;padding:0;box-sizing:border-box; } @keyframes pulse{0%,100%{opacity:.3}50%{opacity:.6}}`;

const s = {
    container: { minHeight: '100vh', background: 'linear-gradient(135deg, #fafbff, #f0f4ff)', fontFamily: "'DM Sans',sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' },
    shapes: { position: 'fixed', inset: 0, zIndex: 0 },
    shape: { position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', animation: 'pulse 6s ease-in-out infinite' },
    s1: { width: '350px', height: '350px', background: '#8b5cf650', top: '-10%', right: '-5%' },
    s2: { width: '300px', height: '300px', background: '#06b6d450', bottom: '-10%', left: '-5%', animationDelay: '3s' },
    card: { background: '#fff', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 20px 50px rgba(139,92,246,0.1)', transition: 'all 0.6s', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { textAlign: 'center' },
    iconBox: { width: '80px', height: '80px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem', boxShadow: '0 10px 25px rgba(139,92,246,0.3)', color: '#fff' },
    title: { fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' },
    subtitle: { fontSize: '1rem', color: '#64748b' },
    info: { display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' },
    row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' },
    label: { fontWeight: 600, color: '#64748b', fontSize: '0.9rem' },
    value: { fontWeight: 500, color: '#1e293b', fontSize: '1rem' },
    btn: { padding: '1rem', background: 'linear-gradient(135deg, #ef4444, #dc2626)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 20px rgba(239,68,68,0.3)', transition: 'transform 0.2s', marginTop: 'auto' },
};

export default UserHomePage;
