import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [focused, setFocused] = useState(null);

    useEffect(() => { setLoaded(true); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, {
                fullname: form.name,
                email: form.email,
                password: form.password
            });

            if (response.status === 201) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/user/home');
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div style={s.container}>
            <style>{css}</style>
            <div style={s.shapes}><div style={{ ...s.shape, ...s.s1 }} /><div style={{ ...s.shape, ...s.s2 }} /></div>

            <button style={s.backBtn} onClick={() => navigate('/register')}>← Back</button>

            <div style={{ ...s.card, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)' }}>
                <div style={s.iconBox}>👤</div>
                <h1 style={s.title}>Create Account</h1>
                <p style={s.subtitle}>Join our reading community</p>

                <form style={s.form} onSubmit={handleSubmit}>
                    <div style={s.field}>
                        <label style={s.label}>Full Name</label>
                        <input type="text" placeholder="John Doe" style={{ ...s.input, borderColor: focused === 'n' ? '#8b5cf6' : '#e2e8f0' }} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused('n')} onBlur={() => setFocused(null)} required />
                    </div>
                    <div style={s.field}>
                        <label style={s.label}>Email</label>
                        <input type="email" placeholder="you@example.com" style={{ ...s.input, borderColor: focused === 'e' ? '#8b5cf6' : '#e2e8f0' }} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused('e')} onBlur={() => setFocused(null)} required />
                    </div>
                    <div style={s.field}>
                        <label style={s.label}>Password</label>
                        <input type="password" placeholder="••••••••" style={{ ...s.input, borderColor: focused === 'p' ? '#8b5cf6' : '#e2e8f0' }} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} onFocus={() => setFocused('p')} onBlur={() => setFocused(null)} required />
                    </div>
                    <div style={s.field}>
                        <label style={s.label}>Confirm Password</label>
                        <input type="password" placeholder="••••••••" style={{ ...s.input, borderColor: focused === 'c' ? '#8b5cf6' : '#e2e8f0' }} value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} onFocus={() => setFocused('c')} onBlur={() => setFocused(null)} required />
                    </div>
                    <button type="submit" style={s.btn}>Create Account</button>
                </form>

                <p style={s.footer}>Have an account? <button style={s.link} onClick={() => navigate('/user/login')}>Sign in</button></p>
            </div>
        </div>
    );
};

const css = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap'); * { margin:0;padding:0;box-sizing:border-box; } @keyframes pulse{0%,100%{opacity:.3}50%{opacity:.6}}`;

const s = {
    container: { minHeight: '100vh', background: 'linear-gradient(135deg, #fafbff, #f0f4ff)', fontFamily: "'DM Sans',sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' },
    shapes: { position: 'fixed', inset: 0, zIndex: 0 },
    shape: { position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', animation: 'pulse 6s ease-in-out infinite' },
    s1: { width: '350px', height: '350px', background: '#8b5cf650', top: '-10%', left: '-5%' },
    s2: { width: '300px', height: '300px', background: '#06b6d450', bottom: '-10%', right: '-5%', animationDelay: '3s' },
    backBtn: { position: 'absolute', top: '1.5rem', left: '1.5rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.5rem 1rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', zIndex: 10 },
    card: { background: '#fff', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '380px', boxShadow: '0 20px 50px rgba(139,92,246,0.1)', transition: 'all 0.6s', position: 'relative', zIndex: 1 },
    iconBox: { width: '56px', height: '56px', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.5rem', boxShadow: '0 10px 25px rgba(139,92,246,0.3)' },
    title: { fontSize: '1.4rem', fontWeight: 700, color: '#1e293b', textAlign: 'center', marginBottom: '0.2rem' },
    subtitle: { fontSize: '0.85rem', color: '#64748b', textAlign: 'center', marginBottom: '1.5rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    field: { display: 'flex', flexDirection: 'column', gap: '0.3rem' },
    label: { fontSize: '0.8rem', fontWeight: 600, color: '#475569' },
    input: { padding: '0.75rem 1rem', border: '2px solid #e2e8f0', borderRadius: '10px', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s', color: '#1e293b' },
    btn: { marginTop: '0.5rem', padding: '0.85rem', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 20px rgba(139,92,246,0.35)' },
    footer: { textAlign: 'center', marginTop: '1.25rem', color: '#64748b', fontSize: '0.85rem' },
    link: { background: 'none', border: 'none', color: '#8b5cf6', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' },
};

export default UserRegister;
