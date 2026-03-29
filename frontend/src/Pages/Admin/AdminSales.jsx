import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    BookOpen,
    Calendar,
    ChartColumnBig,
    ChevronDown,
    IndianRupee,
    Mail,
    Package,
    Phone,
    ShieldCheck,
    Store,
    User
} from 'lucide-react';
import AdminHeader from '../../Components/Admin/AdminHeader';
import AdminFooter from '../../Components/Admin/AdminFooter';

const formatAmount = (value) => Number(value || 0).toLocaleString('en-IN');
const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : 'Date not available');

const AdminSales = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [salesData, setSalesData] = useState({
        totalBooksSold: 0,
        totalSalesAmount: 0,
        sellers: []
    });
    const [openSellers, setOpenSellers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setLoaded(true));
        return () => cancelAnimationFrame(frame);
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

        const fetchSales = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/orders/admin/sales`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setSalesData({
                    totalBooksSold: Number(response.data.totalBooksSold) || 0,
                    totalSalesAmount: Number(response.data.totalSalesAmount) || 0,
                    sellers: response.data.sellers || []
                });
            } catch (err) {
                console.error('Error fetching admin sales:', err);

                if ([401, 403].includes(err?.response?.status)) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    localStorage.removeItem('admin');
                    navigate('/seller/login');
                    return;
                }

                setError('We could not load seller sales right now.');
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, [navigate]);

    const activeSellers = useMemo(() => {
        return salesData.sellers.filter((seller) => Number(seller.totalSalesAmount || 0) > 0).length;
    }, [salesData.sellers]);

    const visibleSellers = useMemo(() => {
        return salesData.sellers.filter((seller) => {
            return Number(seller.totalSalesAmount || 0) > 0 || (seller.orders?.length || 0) > 0;
        });
    }, [salesData.sellers]);

    const toggleSeller = (sellerId) => {
        setOpenSellers((prev) => ({
            ...prev,
            [sellerId]: !prev[sellerId]
        }));
    };

    return (
        <div className={`admin-sales-page ${loaded ? 'is-loaded' : ''}`}>
            <style>{css}</style>
            <AdminHeader admin={admin} />

            <div className="admin-sales-page__bg">
                <span className="sales-orb orb-a" />
                <span className="sales-orb orb-b" />
                <span className="sales-orb orb-c" />
            </div>

            <main className="admin-sales-shell">
                <section className="sales-hero fade-up">
                    <div className="sales-hero__copy">
                        <div className="sales-eyebrow">
                            <ChartColumnBig className="h-4 w-4" />
                            Seller Revenue
                        </div>
                        <h1>Admin sales overview</h1>
                        <p>
                            Review each seller in descending order of delivered sales amount, then expand a seller to
                            inspect every delivered order with buyer details.
                        </p>
                    </div>

                    <div className="sales-total-card">
                        <div className="sales-total-card__label">Total sales amount</div>
                        <div className="sales-total-card__value">
                            <IndianRupee className="h-5 w-5" />
                            {formatAmount(salesData.totalSalesAmount)}
                        </div>
                        <div className="sales-total-card__meta">Delivered-order revenue across all sellers</div>
                    </div>
                </section>

                <section className="sales-metrics fade-up">
                    <article className="metric-card">
                        <div className="metric-card__label">All sellers</div>
                        <div className="metric-card__value">
                            <Store className="h-4 w-4" />
                            {salesData.sellers.length}
                        </div>
                    </article>
                    <article className="metric-card">
                        <div className="metric-card__label">Active sellers</div>
                        <div className="metric-card__value">
                            <ShieldCheck className="h-4 w-4" />
                            {activeSellers}
                        </div>
                    </article>
                    <article className="metric-card">
                        <div className="metric-card__label">Books sold</div>
                        <div className="metric-card__value">
                            <BookOpen className="h-4 w-4" />
                            {formatAmount(salesData.totalBooksSold)}
                        </div>
                    </article>
                </section>

                <section className="sales-list-panel fade-up">
                    <div className="sales-list-panel__head">
                        <div>
                            <div className="sales-panel__eyebrow">Seller breakdown</div>
                            <h2>Sellers by delivered sales amount</h2>
                        </div>
                        <div className="sales-panel__caption">All dropdowns start closed</div>
                    </div>

                    {loading ? (
                        <div className="sales-state">
                            Loading seller sales...
                            <div className="sales-skeleton" />
                            <div className="sales-skeleton sales-skeleton--short" />
                        </div>
                    ) : error ? (
                        <div className="sales-state sales-state--error">{error}</div>
                    ) : visibleSellers.length === 0 ? (
                        <div className="sales-state">No sellers with delivered orders found yet.</div>
                    ) : (
                        <div className="sales-accordion">
                            {visibleSellers.map((seller, index) => {
                                const isOpen = Boolean(openSellers[seller.sellerId]);

                                return (
                                    <article
                                        key={seller.sellerId}
                                        className={`seller-dropdown ${isOpen ? 'is-open' : ''}`}
                                        style={{ transitionDelay: `${120 + index * 35}ms` }}
                                    >
                                        <button
                                            type="button"
                                            className="seller-dropdown__toggle"
                                            onClick={() => toggleSeller(seller.sellerId)}
                                            aria-expanded={isOpen}
                                        >
                                            <div className="seller-dropdown__identity">
                                                <div className="seller-dropdown__rank">#{index + 1}</div>
                                                <div>
                                                    <div className="seller-dropdown__name">
                                                        {seller.storename || 'Unknown store'}
                                                    </div>
                                                    <div className="seller-dropdown__email">
                                                        <Mail className="h-4 w-4" />
                                                        <span>{seller.email || 'No email available'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="seller-dropdown__summary">
                                                <div className="seller-summary-chip">
                                                    <IndianRupee className="h-4 w-4" />
                                                    {formatAmount(seller.totalSalesAmount)}
                                                </div>
                                                <div className="seller-summary-chip">
                                                    <BookOpen className="h-4 w-4" />
                                                    {formatAmount(seller.totalBooksSold)}
                                                </div>
                                                <div className="seller-summary-chip">
                                                    <Package className="h-4 w-4" />
                                                    {seller.orders?.length || 0} orders
                                                </div>
                                                <ChevronDown className="seller-dropdown__chevron h-5 w-5" />
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div className="seller-dropdown__panel">
                                                {seller.orders?.length ? (
                                                    <div className="seller-orders">
                                                        {seller.orders.map((order) => (
                                                            <article key={order._id} className="seller-order-card">
                                                                <div className="seller-order-card__top">
                                                                    <div>
                                                                        <div className="seller-order-card__title">
                                                                            {order.bookName || 'Book order'}
                                                                        </div>
                                                                        <div className="seller-order-card__meta">
                                                                            {order.bookAuthor || 'Unknown author'} • Qty {order.quantity}
                                                                        </div>
                                                                    </div>
                                                                    <div className="seller-order-card__amount">
                                                                        <IndianRupee className="h-4 w-4" />
                                                                        {formatAmount(order.totalPrice)}
                                                                    </div>
                                                                </div>

                                                                <div className="seller-order-card__details">
                                                                    <div className="order-detail-chip">
                                                                        <Calendar className="h-4 w-4" />
                                                                        <span>{formatDate(order.purchasedAt || order.createdAt)}</span>
                                                                    </div>
                                                                    <div className="order-detail-chip">
                                                                        <BookOpen className="h-4 w-4" />
                                                                        <span>Unit price: ₹{formatAmount(order.unitPrice)}</span>
                                                                    </div>
                                                                </div>

                                                                <div className="buyer-inline-fields">
                                                                    <div className="buyer-inline-field">
                                                                        <span className="buyer-inline-field__label">Buyer</span>
                                                                        <div className="buyer-inline-field__value">
                                                                            <User className="h-4 w-4" />
                                                                            <span>{order.user?.fullname || 'Customer'}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="buyer-inline-field">
                                                                        <span className="buyer-inline-field__label">Email</span>
                                                                        <div className="buyer-inline-field__value">
                                                                            <Mail className="h-4 w-4" />
                                                                            <span>{order.user?.email || 'Unavailable'}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="buyer-inline-field">
                                                                        <span className="buyer-inline-field__label">Phone</span>
                                                                        <div className="buyer-inline-field__value">
                                                                            <Phone className="h-4 w-4" />
                                                                            <span>{order.contactPhone || 'Not provided'}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {order.shippingAddress && (
                                                                    <div className="seller-order-card__address">
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
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="seller-orders__empty">
                                                        This seller has no delivered orders yet.
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>

            <AdminFooter />
        </div>
    );
};

const css = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

.admin-sales-page {
    --panel: rgba(255, 255, 255, 0.9);
    --panel-solid: #ffffff;
    --border: rgba(148, 163, 184, 0.22);
    --ink: #10233d;
    --muted: #5f738d;
    --accent: #0f766e;
    --accent-strong: #115e59;
    --accent-soft: rgba(15, 118, 110, 0.12);
    --shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
    min-height: 100vh;
    background:
        radial-gradient(900px 420px at 0% 0%, rgba(20, 184, 166, 0.14), transparent 60%),
        radial-gradient(760px 380px at 100% 10%, rgba(14, 116, 144, 0.14), transparent 60%),
        linear-gradient(180deg, #eef6f6 0%, #f7f9fc 45%, #eef3f8 100%);
    color: var(--ink);
    font-family: 'Sora', sans-serif;
    position: relative;
    overflow-x: hidden;
}

.admin-sales-page__bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
}

.sales-orb {
    position: absolute;
    border-radius: 999px;
    filter: blur(80px);
    opacity: 0.6;
}

.orb-a {
    width: 280px;
    height: 280px;
    background: rgba(16, 185, 129, 0.24);
    top: 8%;
    left: -6%;
}

.orb-b {
    width: 340px;
    height: 340px;
    background: rgba(56, 189, 248, 0.2);
    top: 20%;
    right: -8%;
}

.orb-c {
    width: 260px;
    height: 260px;
    background: rgba(99, 102, 241, 0.16);
    bottom: 8%;
    left: 30%;
}

.admin-sales-shell {
    max-width: 1150px;
    margin: 0 auto;
    padding: 3rem 2rem 4.5rem;
    position: relative;
    z-index: 1;
}

.fade-up {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.is-loaded .fade-up,
.is-loaded .seller-dropdown {
    opacity: 1;
    transform: translateY(0);
}

.sales-hero,
.sales-list-panel,
.metric-card {
    backdrop-filter: blur(16px);
}

.sales-hero {
    display: grid;
    grid-template-columns: minmax(0, 1.7fr) minmax(300px, 0.9fr);
    gap: 1.5rem;
    align-items: stretch;
    margin-bottom: 1.4rem;
}

.sales-hero__copy,
.sales-total-card,
.sales-list-panel,
.metric-card {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 28px;
    box-shadow: var(--shadow);
}

.sales-hero__copy {
    padding: 2rem 2.2rem;
}

.sales-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 0.9rem;
    border-radius: 999px;
    background: var(--accent-soft);
    color: var(--accent-strong);
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.sales-hero h1 {
    margin: 1.2rem 0 0.75rem;
    font-size: clamp(2rem, 4vw, 3.25rem);
    line-height: 1.05;
}

.sales-hero p {
    margin: 0;
    max-width: 640px;
    color: var(--muted);
    font-size: 1rem;
    line-height: 1.7;
}

.sales-total-card {
    padding: 1.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.7rem;
    background:
        linear-gradient(140deg, rgba(15, 118, 110, 0.08), rgba(255, 255, 255, 0.92)),
        var(--panel-solid);
}

.sales-total-card__label,
.metric-card__label,
.sales-panel__eyebrow,
.sales-total-card__meta,
.sales-panel__caption,
.buyer-inline-field__label {
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 0.74rem;
}

.sales-total-card__value,
.metric-card__value {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    font-weight: 700;
    color: var(--ink);
}

.sales-metrics {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.metric-card {
    padding: 1.35rem 1.5rem;
}

.metric-card__value {
    margin-top: 0.55rem;
    font-size: 1.55rem;
}

.sales-list-panel {
    padding: 1.6rem;
}

.sales-list-panel__head {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.sales-list-panel__head h2 {
    margin: 0.45rem 0 0;
    font-size: 1.6rem;
}

.sales-accordion {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.seller-dropdown {
    background: rgba(255, 255, 255, 0.82);
    border: 1px solid rgba(148, 163, 184, 0.18);
    border-radius: 24px;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.55s ease, transform 0.55s ease, box-shadow 0.25s ease;
    overflow: hidden;
}

.seller-dropdown:hover {
    box-shadow: 0 24px 50px rgba(15, 23, 42, 0.12);
}

.seller-dropdown.is-open {
    border-color: rgba(15, 118, 110, 0.24);
}

.seller-dropdown__toggle {
    width: 100%;
    padding: 1.2rem 1.3rem;
    border: 0;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    text-align: left;
    cursor: pointer;
}

.seller-dropdown__identity {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 0;
}

.seller-dropdown__rank {
    flex-shrink: 0;
    padding: 0.42rem 0.8rem;
    border-radius: 999px;
    background: #edf7f6;
    color: var(--accent-strong);
    font-size: 0.8rem;
    font-weight: 700;
}

.seller-dropdown__name {
    font-size: 1.08rem;
    font-weight: 700;
}

.seller-dropdown__email {
    margin-top: 0.35rem;
    display: flex;
    align-items: center;
    gap: 0.45rem;
    color: var(--muted);
    font-size: 0.92rem;
}

.seller-dropdown__email span {
    overflow-wrap: anywhere;
}

.seller-dropdown__summary {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.65rem;
    flex-wrap: wrap;
}

.seller-summary-chip,
.order-detail-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.6rem 0.85rem;
    border-radius: 999px;
    background: #f7fafc;
    border: 1px solid rgba(226, 232, 240, 0.9);
    color: var(--ink);
    font-size: 0.88rem;
    font-weight: 600;
}

.seller-dropdown__chevron {
    color: var(--muted);
    transition: transform 0.25s ease;
}

.seller-dropdown.is-open .seller-dropdown__chevron {
    transform: rotate(180deg);
}

.seller-dropdown__panel {
    padding: 0 1.3rem 1.3rem;
}

.seller-orders {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
}

.seller-orders__empty {
    border: 1px dashed rgba(148, 163, 184, 0.48);
    border-radius: 20px;
    padding: 1.4rem;
    text-align: center;
    color: var(--muted);
    background: rgba(255, 255, 255, 0.6);
}

.seller-order-card {
    background: var(--panel-solid);
    border: 1px solid rgba(226, 232, 240, 0.95);
    border-radius: 20px;
    padding: 1rem;
    box-shadow: 0 14px 32px rgba(15, 23, 42, 0.06);
}

.seller-order-card__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
}

.seller-order-card__title {
    font-size: 1rem;
    font-weight: 700;
}

.seller-order-card__meta {
    margin-top: 0.28rem;
    color: var(--muted);
    font-size: 0.88rem;
}

.seller-order-card__amount {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--accent-strong);
    font-weight: 700;
    font-size: 1rem;
    white-space: nowrap;
}

.seller-order-card__details {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 1rem;
}

.buyer-inline-fields {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
    margin-top: 1rem;
}

.buyer-inline-field {
    border-radius: 16px;
    background: #f8fafc;
    border: 1px solid rgba(226, 232, 240, 0.95);
    padding: 0.85rem 0.95rem;
    display: grid;
    grid-template-columns: 72px minmax(0, 1fr);
    align-items: center;
    gap: 0.85rem;
}

.buyer-inline-field__value {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--ink);
    min-width: 0;
}

.buyer-inline-field__value span {
    overflow-wrap: anywhere;
}

.seller-order-card__address {
    margin-top: 1rem;
    padding: 0.9rem 1rem;
    border-radius: 16px;
    background: #f5f9fd;
    border: 1px solid rgba(226, 232, 240, 0.95);
    color: var(--muted);
    font-size: 0.88rem;
    line-height: 1.6;
}

.sales-state {
    padding: 2rem;
    border: 1px dashed rgba(148, 163, 184, 0.5);
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.62);
    color: var(--muted);
    text-align: center;
}

.sales-state--error {
    color: #b91c1c;
    border-color: rgba(248, 113, 113, 0.4);
    background: rgba(254, 242, 242, 0.92);
}

.sales-skeleton {
    width: 100%;
    height: 12px;
    margin: 1rem auto 0;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(226, 232, 240, 0.5), rgba(203, 213, 225, 0.95), rgba(226, 232, 240, 0.5));
    background-size: 200% 100%;
    animation: shimmer 1.4s linear infinite;
}

.sales-skeleton--short {
    width: 64%;
}

@keyframes shimmer {
    from { background-position: 200% 0; }
    to { background-position: -200% 0; }
}

@media (max-width: 980px) {
    .sales-hero {
        grid-template-columns: 1fr;
    }

    .seller-dropdown__toggle {
        flex-direction: column;
        align-items: flex-start;
    }

    .seller-dropdown__summary {
        width: 100%;
        justify-content: flex-start;
    }

    .buyer-inline-fields {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 760px) {
    .admin-sales-shell {
        padding: 2rem 1rem 3.5rem;
    }

    .sales-metrics {
        grid-template-columns: 1fr;
    }

    .sales-list-panel__head {
        align-items: flex-start;
        flex-direction: column;
    }

    .sales-hero__copy,
    .sales-total-card,
    .sales-list-panel,
    .metric-card,
    .seller-dropdown {
        border-radius: 22px;
    }

    .seller-orders {
        grid-template-columns: 1fr;
    }

    .seller-dropdown__identity {
        align-items: flex-start;
    }
}
`;

export default AdminSales;
