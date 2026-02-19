import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle2, ChevronDown, IndianRupee, Package, Store, Truck, User } from 'lucide-react';
import AdminHeader from '../../Components/Admin/AdminHeader';
import AdminFooter from '../../Components/Admin/AdminFooter';

const AdminOrders = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [shippedOrders, setShippedOrders] = useState([]);
    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [loading, setLoading] = useState({ shipped: true, delivered: true });
    const [error, setError] = useState({ shipped: '', delivered: '' });
    const [updatingId, setUpdatingId] = useState(null);
    const [deliveredOpen, setDeliveredOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const adminData = localStorage.getItem('admin');

        if (!token || role !== 'admin') {
            navigate('/seller/login');
            return;
        }

        setAdmin(adminData ? JSON.parse(adminData) : { email: 'admin@readora.com' });
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'admin') return;

        const fetchOrdersByStatus = async (status) => {
            setLoading((prev) => ({ ...prev, [status]: true }));
            setError((prev) => ({ ...prev, [status]: '' }));

            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/orders/admin/${status}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const orders = response.data.orders || [];

                if (status === 'shipped') {
                    setShippedOrders(orders);
                } else {
                    setDeliveredOrders(orders);
                }
            } catch (err) {
                console.error(`Error fetching ${status} orders:`, err);
                setError((prev) => ({
                    ...prev,
                    [status]: `We could not load ${status} orders right now.`
                }));
            } finally {
                setLoading((prev) => ({ ...prev, [status]: false }));
            }
        };

        fetchOrdersByStatus('shipped');
        fetchOrdersByStatus('delivered');
    }, []);

    const shippedValue = useMemo(() => {
        return shippedOrders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);
    }, [shippedOrders]);

    const deliveredValue = useMemo(() => {
        return deliveredOrders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);
    }, [deliveredOrders]);

    const formattedShippedValue = Number.isFinite(shippedValue)
        ? shippedValue.toLocaleString('en-IN')
        : '0';

    const formattedDeliveredValue = Number.isFinite(deliveredValue)
        ? deliveredValue.toLocaleString('en-IN')
        : '0';

    const markDelivered = async (orderId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setUpdatingId(orderId);
        setError((prev) => ({ ...prev, shipped: '' }));
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/orders/admin/${orderId}/status`,
                { status: 'delivered' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const updated = response.data.order;
            setShippedOrders((prev) => prev.filter((order) => order._id !== updated._id));
            setDeliveredOrders((prev) => [updated, ...prev]);
        } catch (err) {
            console.error('Error updating order:', err);
            setError((prev) => ({ ...prev, shipped: 'We could not update the order right now.' }));
        } finally {
            setUpdatingId(null);
        }
    };

    const OrderCard = ({ order, index, status }) => {
        const createdAt = order.purchasedAt || order.createdAt;
        const orderedOn = createdAt
            ? new Date(createdAt).toLocaleDateString()
            : 'Date not set';
        const buyer = order.userId?.fullname || 'Customer';
        const buyerEmail = order.userId?.email;
        const seller = order.sellerId?.storename || 'Seller';
        const sellerEmail = order.sellerId?.email;
        const lineTotal = Number(order.totalPrice || 0);
        const formattedTotal = Number.isFinite(lineTotal)
            ? lineTotal.toLocaleString('en-IN')
            : '0';
        const orderRef = order._id ? order._id.slice(-6).toUpperCase() : '------';
        const isShipped = status === 'shipped';

        return (
            <article
                className="order-card fade-up"
                style={{ transitionDelay: `${120 + index * 45}ms` }}
            >
                <div className="order-head">
                    <div>
                        <div className="order-title">
                            {order.bookName || order.bookId?.name || 'Book order'}
                        </div>
                        <div className="order-meta">
                            Ref {orderRef} • Qty {order.quantity} • {order.bookAuthor || order.bookId?.author || 'Unknown author'}
                        </div>
                    </div>
                    <div className="order-amount">
                        <IndianRupee className="h-4 w-4" />
                        {formattedTotal}
                    </div>
                </div>

                <div className="order-info">
                    <div className="info-chip">
                        <User className="h-4 w-4" />
                        <span>{buyer}{buyerEmail ? ` • ${buyerEmail}` : ''}</span>
                    </div>
                    <div className="info-chip">
                        <Store className="h-4 w-4" />
                        <span>{seller}{sellerEmail ? ` • ${sellerEmail}` : ''}</span>
                    </div>
                    <div className="info-chip">
                        <Calendar className="h-4 w-4" />
                        <span>{orderedOn}</span>
                    </div>
                    <span className={`status-chip ${isShipped ? 'shipped' : 'delivered'}`}>
                        {status}
                    </span>
                </div>

                {isShipped && (
                    <div className="order-actions">
                        <button
                            type="button"
                            onClick={() => markDelivered(order._id)}
                            disabled={updatingId === order._id}
                            className="deliver-btn"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            {updatingId === order._id ? 'Updating...' : 'Mark delivered'}
                        </button>
                    </div>
                )}

                {order.shippingAddress && (
                    <div className="address-card">
                        {[
                            order.shippingAddress.line1,
                            order.shippingAddress.line2,
                            order.shippingAddress.city,
                            order.shippingAddress.state,
                            order.shippingAddress.postalCode,
                            order.shippingAddress.country
                        ].filter(Boolean).join(', ')}
                    </div>
                )}
            </article>
        );
    };

    return (
        <div className={`admin-orders ${loaded ? 'is-loaded' : ''}`}>
            <style>{css}</style>
            <AdminHeader admin={admin} />

            <div className="admin-orders__bg">
                <span className="admin-orb orb-1" />
                <span className="admin-orb orb-2" />
                <span className="admin-orb orb-3" />
            </div>

            <main className="admin-orders__main">
                <section className="admin-panel fade-up">
                    <div className="admin-panel__top">
                        <div>
                            <div className="admin-eyebrow">
                                <Truck className="h-4 w-4" />
                                Shipped Orders
                            </div>
                            <h1 className="admin-title">Delivery confirmation queue</h1>
                            <p className="admin-subtitle">
                                Review shipped orders and close the loop with a single, final confirmation.
                            </p>
                        </div>
                        <div className="admin-stats">
                            <div className="stat-card">
                                <div className="stat-label">Shipped</div>
                                <div className="stat-value">
                                    <Package className="h-4 w-4" />
                                    {shippedOrders.length}
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">Shipped Value</div>
                                <div className="stat-value">
                                    <IndianRupee className="h-4 w-4" />
                                    {formattedShippedValue}
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">Delivered</div>
                                <div className="stat-value">
                                    <Package className="h-4 w-4" />
                                    {deliveredOrders.length}
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-label">Delivered Value</div>
                                <div className="stat-value">
                                    <IndianRupee className="h-4 w-4" />
                                    {formattedDeliveredValue}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="admin-divider" />

                    <div className="section-title">
                        <h2>Shipped orders</h2>
                        <p>These orders are waiting for final confirmation.</p>
                    </div>

                    {loading.shipped ? (
                        <div className="state-card fade-up">
                            Loading shipped orders...
                            <div className="skeleton-line" style={{ width: '45%' }} />
                            <div className="skeleton-line" style={{ width: '75%' }} />
                            <div className="skeleton-line" style={{ width: '35%' }} />
                        </div>
                    ) : error.shipped ? (
                        <div className="state-card error fade-up">{error.shipped}</div>
                    ) : shippedOrders.length === 0 ? (
                        <div className="state-card fade-up">No shipped orders at the moment.</div>
                    ) : (
                        <div className="orders-grid">
                            {shippedOrders.map((order, index) => (
                                <OrderCard key={order._id} order={order} index={index} status="shipped" />
                            ))}
                        </div>
                    )}

                    <div className="delivered-section">
                        <button
                            type="button"
                            className={`dropdown-toggle ${deliveredOpen ? 'is-open' : ''}`}
                            onClick={() => setDeliveredOpen((prev) => !prev)}
                        >
                            <div>
                                <div className="dropdown-title">Delivered orders</div>
                                <div className="dropdown-subtitle">Completed shipments for reference.</div>
                            </div>
                            <div className="dropdown-meta">
                                <span>{deliveredOrders.length} delivered</span>
                                <ChevronDown className="dropdown-icon" />
                            </div>
                        </button>

                        <div className={`dropdown-panel ${deliveredOpen ? 'open' : ''}`}>
                            {loading.delivered ? (
                                <div className="state-card fade-up">Loading delivered orders...</div>
                            ) : error.delivered ? (
                                <div className="state-card error fade-up">{error.delivered}</div>
                            ) : deliveredOrders.length === 0 ? (
                                <div className="state-card fade-up">No delivered orders yet.</div>
                            ) : (
                                <div className="orders-grid">
                                    {deliveredOrders.map((order, index) => (
                                        <OrderCard key={order._id} order={order} index={index} status="delivered" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <AdminFooter />
        </div>
    );
};

const css = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Manrope:wght@300;400;500;600;700;800&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
:root {
    --ink: #0b1020;
    --text: #1f2933;
    --muted: #5b6470;
    --glass: rgba(255, 255, 255, 0.88);
    --shadow: 0 24px 60px -40px rgba(15, 23, 42, 0.45);
}
.admin-orders {
    min-height: 100vh;
    background: radial-gradient(circle at 15% 10%, #fef6e8 0%, transparent 55%),
        radial-gradient(circle at 85% 15%, #e9f4ff 0%, transparent 60%),
        linear-gradient(135deg, #f7f5f2 0%, #eef2f7 40%, #e7edf5 100%);
    font-family: 'Manrope', sans-serif;
    color: var(--text);
    position: relative;
    overflow: hidden;
}
.admin-orders__bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
}
.admin-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.6;
}
.orb-1 {
    width: 360px;
    height: 360px;
    background: #7de3d7;
    top: -120px;
    right: -80px;
}
.orb-2 {
    width: 420px;
    height: 420px;
    background: #f7c88c;
    bottom: -160px;
    left: -80px;
    opacity: 0.5;
}
.orb-3 {
    width: 260px;
    height: 260px;
    background: #9dc8ff;
    top: 35%;
    left: 55%;
    opacity: 0.4;
}
.admin-orders__main {
    position: relative;
    z-index: 1;
    padding: 3.5rem 1.5rem 4rem;
}
.admin-panel {
    max-width: 1200px;
    margin: 0 auto;
    background: var(--glass);
    border-radius: 28px;
    border: 1px solid rgba(15, 23, 42, 0.08);
    box-shadow: var(--shadow);
    backdrop-filter: blur(12px);
    padding: 2.5rem;
}
.admin-panel__top {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    align-items: center;
}
.admin-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.9rem;
    border-radius: 999px;
    background: rgba(31, 157, 139, 0.12);
    color: #0f766e;
    font-size: 0.7rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    font-weight: 700;
}
.admin-title {
    font-family: 'Fraunces', serif;
    font-size: clamp(2rem, 3vw, 2.6rem);
    color: var(--ink);
    margin-top: 0.8rem;
}
.admin-subtitle {
    color: var(--muted);
    font-size: 0.95rem;
    margin-top: 0.4rem;
}
.admin-stats {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}
.stat-card {
    position: relative;
    border-radius: 18px;
    padding: 1rem 1.1rem;
    background: linear-gradient(135deg, #ffffff 0%, #f3f6fb 100%);
    border: 1px solid rgba(15, 23, 42, 0.08);
    transition: transform 300ms ease, box-shadow 300ms ease;
}
.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 40px -30px rgba(15, 23, 42, 0.45);
}
.stat-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    color: #6b7280;
    font-weight: 700;
}
.stat-value {
    margin-top: 0.4rem;
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--ink);
    display: flex;
    align-items: center;
    gap: 0.4rem;
}
.admin-divider {
    margin: 2rem 0 1.5rem;
    height: 1px;
    background: linear-gradient(
        90deg,
        rgba(15, 23, 42, 0.05),
        rgba(15, 23, 42, 0.15),
        rgba(15, 23, 42, 0.05)
    );
}
.section-title {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-bottom: 1.2rem;
}
.section-title h2 {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--ink);
}
.section-title p {
    color: var(--muted);
    font-size: 0.9rem;
}
.orders-grid {
    display: grid;
    gap: 1.25rem;
}
@media (min-width: 960px) {
    .orders-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
.order-card {
    border-radius: 22px;
    padding: 1.5rem;
    background: #fff;
    border: 1px solid rgba(15, 23, 42, 0.08);
    box-shadow: 0 18px 45px -40px rgba(15, 23, 42, 0.4);
    transition: transform 250ms ease, box-shadow 250ms ease;
}
.order-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 26px 60px -45px rgba(15, 23, 42, 0.55);
}
.order-head {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
}
.order-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--ink);
}
.order-meta {
    font-size: 0.88rem;
    color: var(--muted);
    margin-top: 0.3rem;
}
.order-amount {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.45rem 0.75rem;
    border-radius: 999px;
    border: 1px solid rgba(15, 23, 42, 0.1);
    background: #f7f9fc;
    font-weight: 700;
    color: var(--ink);
}
.order-info {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem 1.5rem;
    color: var(--muted);
    font-size: 0.85rem;
}
.info-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
}
.status-chip {
    font-weight: 700;
    border-radius: 999px;
    padding: 0.3rem 0.75rem;
    text-transform: uppercase;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
}
.status-chip.shipped {
    background: rgba(34, 197, 94, 0.12);
    color: #166534;
}
.status-chip.delivered {
    background: rgba(59, 130, 246, 0.12);
    color: #1d4ed8;
}
.order-actions {
    margin-top: 1.2rem;
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
}
.deliver-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 1rem;
    border-radius: 999px;
    border: none;
    background: linear-gradient(135deg, #1f9d8b, #12b981);
    color: #fff;
    font-weight: 700;
    font-size: 0.8rem;
    box-shadow: 0 12px 25px -18px rgba(18, 185, 129, 0.8);
    cursor: pointer;
    transition: transform 200ms ease, box-shadow 200ms ease, opacity 200ms ease;
}
.deliver-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 30px -22px rgba(18, 185, 129, 0.9);
}
.deliver-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}
.address-card {
    margin-top: 1rem;
    border-radius: 16px;
    border: 1px dashed rgba(15, 23, 42, 0.15);
    padding: 0.75rem 1rem;
    color: #4b5563;
    font-size: 0.78rem;
    background: #f9fafb;
}
.state-card {
    border-radius: 20px;
    border: 1px solid rgba(15, 23, 42, 0.08);
    background: #fff;
    padding: 1.5rem;
    color: var(--muted);
    font-size: 0.95rem;
}
.state-card.error {
    border-color: rgba(239, 68, 68, 0.3);
    background: #fff5f5;
    color: #b91c1c;
}
.delivered-section {
    margin-top: 2.5rem;
}
.dropdown-toggle {
    width: 100%;
    border: 1px solid rgba(15, 23, 42, 0.08);
    border-radius: 18px;
    padding: 1.2rem 1.4rem;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    cursor: pointer;
    transition: transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease;
}
.dropdown-toggle:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 40px -35px rgba(15, 23, 42, 0.45);
}
.dropdown-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--ink);
}
.dropdown-subtitle {
    font-size: 0.85rem;
    color: var(--muted);
    margin-top: 0.25rem;
}
.dropdown-meta {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 600;
    color: var(--muted);
}
.dropdown-icon {
    transition: transform 250ms ease;
}
.dropdown-toggle.is-open .dropdown-icon {
    transform: rotate(180deg);
}
.dropdown-panel {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transform: translateY(-8px);
    transition: max-height 400ms ease, opacity 350ms ease, transform 350ms ease;
}
.dropdown-panel.open {
    max-height: 2000px;
    opacity: 1;
    transform: translateY(0);
    margin-top: 1.5rem;
}
.skeleton-line {
    height: 10px;
    border-radius: 999px;
    background: linear-gradient(90deg, #edf2f7 0%, #e2e8f0 50%, #edf2f7 100%);
    background-size: 200% 100%;
    animation: shimmer 1.6s infinite;
    margin-top: 0.6rem;
}
@keyframes shimmer {
    0% { background-position: 0% 0; }
    100% { background-position: -200% 0; }
}
.fade-up {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 600ms ease, transform 600ms ease;
}
.admin-orders.is-loaded .fade-up {
    opacity: 1;
    transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
    .fade-up,
    .stat-card,
    .order-card,
    .deliver-btn,
    .dropdown-toggle,
    .dropdown-panel {
        transition: none;
    }
}
`;

export default AdminOrders;
