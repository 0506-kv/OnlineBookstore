import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const [focused, setFocused] = useState(null);

    useEffect(() => { setLoaded(true); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
                email: form.email,
                password: form.password
            });

            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/user/home');
            }
        } catch (error) {
            console.error("Login error:", error);
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div style={s.container}>
            <style>{css}</style>
            <div style={s.shapes}><div style={{ ...s.shape, ...s.s1 }} /><div style={{ ...s.shape, ...s.s2 }} /></div>

            <button style={s.backBtn} onClick={() => navigate('/login')}>← Back</button>

            <div style={{ ...s.card, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)' }}>
                <div style={s.iconBox}>👤</div>
                <h1 style={s.title}>Customer Login</h1>
                <p style={s.subtitle}>Welcome back! Sign in to continue</p>

                <form style={s.form} onSubmit={handleSubmit}>
                    <div style={s.field}>
                        <label style={s.label}>Email</label>
                        <input type="email" placeholder="you@example.com" style={{ ...s.input, borderColor: focused === 'e' ? '#8b5cf6' : '#e2e8f0' }} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused('e')} onBlur={() => setFocused(null)} required />
                    </div>
                    <div style={s.field}>
                        <label style={s.label}>Password</label>
                        <input type="password" placeholder="••••••••" style={{ ...s.input, borderColor: focused === 'p' ? '#8b5cf6' : '#e2e8f0' }} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} onFocus={() => setFocused('p')} onBlur={() => setFocused(null)} required />
                    </div>
                    <button type="submit" style={s.btn}>Sign In</button>
                </form>

                <p style={s.footer}>New here? <button style={s.link} onClick={() => navigate('/user/register')}>Create account</button></p>
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
    backBtn: { position: 'absolute', top: '1.5rem', left: '1.5rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.5rem 1rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', zIndex: 10 },
    card: { background: '#fff', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '380px', boxShadow: '0 20px 50px rgba(139,92,246,0.1)', transition: 'all 0.6s', position: 'relative', zIndex: 1 },
    iconBox: { width: '64px', height: '64px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.75rem', boxShadow: '0 10px 25px rgba(139,92,246,0.3)' },
    title: { fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', textAlign: 'center', marginBottom: '0.25rem' },
    subtitle: { fontSize: '0.9rem', color: '#64748b', textAlign: 'center', marginBottom: '2rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
    field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
    label: { fontSize: '0.85rem', fontWeight: 600, color: '#475569' },
    input: { padding: '0.85rem 1rem', border: '2px solid #e2e8f0', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.3s', color: '#1e293b' },
    btn: { marginTop: '0.5rem', padding: '0.9rem', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 20px rgba(139,92,246,0.35)' },
    footer: { textAlign: 'center', marginTop: '1.5rem', color: '#64748b', fontSize: '0.9rem' },
    link: { background: 'none', border: 'none', color: '#8b5cf6', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' },
};

export default UserLogin;
