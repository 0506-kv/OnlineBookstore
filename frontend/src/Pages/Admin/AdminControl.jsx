import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../Components/Admin/AdminHeader';
import AdminFooter from '../../Components/Admin/AdminFooter';
import AllUsers from '../../Components/Admin/AllUsers';
import AllSellers from '../../Components/Admin/AllSellers';

const AdminControl = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [loaded, setLoaded] = useState(false);

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

    useEffect(() => {
        const frame = requestAnimationFrame(() => setLoaded(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <div className={`admin-control pro-theme ${loaded ? 'is-loaded' : ''}`}>
            <style>{css}</style>
            <AdminHeader admin={admin} />

            <main className="pro-shell">
                <section className="pro-hero">
                    <div className="pro-hero__top">
                        <span className="pro-badge">Admin Control</span>
                        <div className="pro-meta">
                            <span className="pro-meta__item">Session active</span>
                            <span className="pro-meta__item">Role: Admin</span>
                        </div>
                    </div>
                    <h1 className="pro-hero__title">Account Administration</h1>
                    <p className="pro-hero__subtitle">
                        Manage users and sellers with clear, auditable actions. Deletions remove associated data
                        according to platform policy, while preserving completed order history.
                    </p>
                    <div className="pro-hero__grid">
                        <div>
                            <div className="pro-hero__label">User deletion</div>
                            <div className="pro-hero__value">Removes all reviews + placed orders</div>
                        </div>
                        <div>
                            <div className="pro-hero__label">Seller deletion</div>
                            <div className="pro-hero__value">Removes books + placed/shipped orders</div>
                        </div>
                        <div>
                            <div className="pro-hero__label">Delivered orders</div>
                            <div className="pro-hero__value">Always retained</div>
                        </div>
                    </div>
                </section>

                <section className="pro-stack">
                    <AllUsers />
                    <AllSellers />
                </section>

                <section className="pro-notes">
                    <article className="pro-note">
                        <h3>Confirmation required</h3>
                        <p>Each delete action requires explicit confirmation to avoid accidental removal.</p>
                    </article>
                    <article className="pro-note">
                        <h3>Consistent history</h3>
                        <p>Delivered orders remain intact to preserve financial and fulfillment history.</p>
                    </article>
                </section>
            </main>

            <AdminFooter />
        </div>
    );
};

const css = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

.pro-theme {
    --bg: #f4f6fb;
    --panel: #ffffff;
    --ink: #0f172a;
    --muted: #64748b;
    --border: #e2e8f0;
    --accent: #2563eb;
    --accent-soft: #e0e7ff;
    --danger: #dc2626;
    --shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
    min-height: 100vh;
    background:
        radial-gradient(800px 400px at 10% 0%, rgba(37, 99, 235, 0.08), transparent 60%),
        radial-gradient(700px 350px at 90% 10%, rgba(14, 116, 144, 0.06), transparent 60%),
        #f4f6fb;
    color: var(--ink);
    font-family: 'Sora', sans-serif;
    position: relative;
}

.pro-theme::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: radial-gradient(rgba(148, 163, 184, 0.35) 1px, transparent 1px);
    background-size: 120px 120px;
    opacity: 0.12;
    pointer-events: none;
}

.pro-shell {
    max-width: 1100px;
    margin: 0 auto;
    padding: 3.5rem 2rem 4.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;
    z-index: 1;
}

.pro-hero {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2.2rem 2.4rem;
    box-shadow: var(--shadow);
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.pro-hero__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1.2rem;
}

.pro-badge {
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    font-weight: 600;
}

.pro-meta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.pro-meta__item {
    font-size: 0.85rem;
    color: var(--muted);
}

.pro-hero__title {
    margin: 0 0 0.6rem;
    font-size: clamp(2rem, 3.2vw, 2.8rem);
}

.pro-hero__subtitle {
    margin: 0 0 1.6rem;
    color: var(--muted);
    font-size: 1rem;
    max-width: 720px;
}

.pro-hero__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.pro-hero__label {
    font-size: 0.75rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.2em;
}

.pro-hero__value {
    font-weight: 600;
    margin-top: 0.35rem;
}

.pro-stack {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.pro-card {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 1.6rem;
    box-shadow: var(--shadow);
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease;
}

.pro-card:hover {
    box-shadow: 0 22px 50px rgba(15, 23, 42, 0.12);
}

.pro-card__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
}

.pro-card__actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.4rem;
}

.pro-card__eyebrow {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: var(--muted);
    margin-bottom: 0.35rem;
}

.pro-card__title {
    margin: 0;
    font-size: 1.4rem;
}

.pro-card__count {
    font-weight: 600;
    color: var(--accent);
    font-size: 1.2rem;
}

.pro-card__toggle {
    border: 1px solid var(--border);
    background: #fff;
    border-radius: 999px;
    padding: 0.45rem 0.9rem;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: var(--ink);
    cursor: pointer;
    transition: transform 0.2s ease, border 0.2s ease, box-shadow 0.2s ease;
}

.pro-card__toggle:hover {
    transform: translateY(-2px);
    border-color: var(--accent);
    box-shadow: 0 8px 18px rgba(37, 99, 235, 0.12);
}

.pro-card__chev {
    width: 8px;
    height: 8px;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(45deg);
    transition: transform 0.3s ease;
    margin-left: 0.4rem;
    display: inline-block;
}

.pro-card.is-open .pro-card__chev {
    transform: rotate(-135deg);
}

.pro-card__note {
    margin: 0.8rem 0 1rem;
    color: var(--muted);
    font-size: 0.95rem;
}

.pro-card__panel {
    max-height: 0;
    opacity: 0;
    transform: translateY(-6px);
    transition: max-height 0.5s ease, opacity 0.3s ease, transform 0.3s ease;
    overflow: hidden;
}

.pro-card.is-open .pro-card__panel {
    max-height: 1200px;
    opacity: 1;
    transform: translateY(0);
}

.pro-card__status {
    font-size: 0.75rem;
    color: var(--muted);
}

.pro-card__error {
    padding: 0.65rem 0.9rem;
    border-radius: 12px;
    background: rgba(220, 38, 38, 0.08);
    color: #b91c1c;
    border: 1px solid rgba(220, 38, 38, 0.2);
    font-size: 0.85rem;
    margin-bottom: 0.8rem;
}

.pro-card__notice {
    padding: 0.65rem 0.9rem;
    border-radius: 12px;
    background: rgba(37, 99, 235, 0.08);
    color: #1e3a8a;
    border: 1px solid rgba(37, 99, 235, 0.2);
    font-size: 0.85rem;
    margin-bottom: 0.8rem;
}

.pro-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.pro-list__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.85rem 1rem;
    border-radius: 14px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    opacity: 0;
    transform: translateY(10px);
}

.pro-card.is-open .pro-list__item {
    animation: list-rise 0.5s ease forwards;
    animation-delay: var(--delay);
}

.pro-list__meta {
    display: flex;
    align-items: center;
    gap: 0.9rem;
}

.pro-avatar {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: #e2e8f0;
    color: #0f172a;
    display: grid;
    place-items: center;
    font-weight: 600;
}

.pro-name {
    font-weight: 600;
}

.pro-sub {
    font-size: 0.85rem;
    color: var(--muted);
}

.pro-list__side {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: flex-end;
    text-align: right;
}

.pro-date {
    font-size: 0.75rem;
    color: var(--muted);
}

.pro-action {
    border: 1px solid var(--border);
    background: #fff;
    color: var(--ink);
    padding: 0.35rem 0.9rem;
    border-radius: 999px;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    cursor: pointer;
    transition: transform 0.2s ease, border 0.2s ease, box-shadow 0.2s ease;
}

.pro-action:hover {
    transform: translateY(-2px);
    border-color: var(--accent);
    box-shadow: 0 8px 16px rgba(37, 99, 235, 0.12);
}

.pro-action--danger {
    border-color: rgba(220, 38, 38, 0.4);
    color: #b91c1c;
}

.pro-action:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.pro-notes {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.2rem;
}

.pro-note {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.2rem 1.4rem;
    box-shadow: var(--shadow);
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.pro-note h3 {
    margin: 0 0 0.4rem;
    font-size: 1rem;
}

.pro-note p {
    margin: 0;
    color: var(--muted);
    font-size: 0.9rem;
}

.admin-control.is-loaded .pro-hero,
.admin-control.is-loaded .pro-card,
.admin-control.is-loaded .pro-note {
    opacity: 1;
    transform: translateY(0);
}

.admin-control.is-loaded .pro-stack .pro-card:nth-child(1) {
    transition-delay: 0.1s;
}

.admin-control.is-loaded .pro-stack .pro-card:nth-child(2) {
    transition-delay: 0.2s;
}

.admin-control.is-loaded .pro-note:nth-child(1) {
    transition-delay: 0.3s;
}

.admin-control.is-loaded .pro-note:nth-child(2) {
    transition-delay: 0.4s;
}

@keyframes list-rise {
    0% { opacity: 0; transform: translateY(8px); }
    100% { opacity: 1; transform: translateY(0); }
}

@media (max-width: 900px) {
    .pro-shell {
        padding: 3rem 1.5rem 4rem;
    }

    .pro-hero {
        padding: 2rem 2rem;
    }
}

@media (max-width: 640px) {
    .pro-list__item {
        flex-direction: column;
        align-items: flex-start;
    }

    .pro-list__side {
        align-items: flex-start;
        text-align: left;
    }
}

@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
    }
}`;

export default AdminControl;
