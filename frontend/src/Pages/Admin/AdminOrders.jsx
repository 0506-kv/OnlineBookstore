import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle2, IndianRupee, Package, Store, Truck, User } from 'lucide-react';
import AdminHeader from '../../Components/Admin/AdminHeader';
import AdminFooter from '../../Components/Admin/AdminFooter';

const AdminOrders = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updatingId, setUpdatingId] = useState(null);

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

        const fetchOrders = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/orders/admin/shipped`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(response.data.orders || []);
            } catch (err) {
                console.error('Error fetching shipped orders:', err);
                setError('We could not load shipped orders right now.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const shippedValue = useMemo(() => {
        return orders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);
    }, [orders]);

    const formattedValue = Number.isFinite(shippedValue)
        ? shippedValue.toLocaleString('en-IN')
        : '0';

    const markDelivered = async (orderId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setUpdatingId(orderId);
        setError('');
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/orders/admin/${orderId}/status`,
                { status: 'delivered' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const updated = response.data.order;
            setOrders((prev) => prev.filter((order) => order._id !== updated._id));
        } catch (err) {
            console.error('Error updating order:', err);
            setError('We could not update the order right now.');
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <style>{css}</style>
            <AdminHeader admin={admin} />

            <main style={styles.container}>
                <section style={styles.card}>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                                <Truck className="h-4 w-4" />
                                Shipped Orders
                            </div>
                            <h1 className="mt-4 text-3xl font-semibold text-slate-900">
                                Awaiting delivery confirmation
                            </h1>
                            <p className="mt-2 text-sm text-slate-500">
                                Only shipped orders appear here for final confirmation.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm">
                                <Package className="h-4 w-4" />
                                {orders.length} shipped
                            </div>
                            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm">
                                <IndianRupee className="h-4 w-4" />
                                {formattedValue}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        {loading ? (
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                                Loading shipped orders...
                            </div>
                        ) : error ? (
                            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-600">
                                {error}
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                                No shipped orders at the moment.
                            </div>
                        ) : (
                            orders.map((order) => {
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

                                return (
                                    <div
                                        key={order._id}
                                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-900">
                                                    {order.bookName || order.bookId?.name || 'Book order'}
                                                </h3>
                                                <p className="text-sm text-slate-500">
                                                    Qty {order.quantity} • {order.bookAuthor || order.bookId?.author || 'Unknown author'}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900">
                                                <IndianRupee className="h-4 w-4" />
                                                {formattedTotal}
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-slate-400" />
                                                <span>{buyer}{buyerEmail ? ` • ${buyerEmail}` : ''}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Store className="h-4 w-4 text-slate-400" />
                                                <span>{seller}{sellerEmail ? ` • ${sellerEmail}` : ''}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-slate-400" />
                                                <span>{orderedOn}</span>
                                            </div>
                                            <div className="inline-flex items-center rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold capitalize text-cyan-700">
                                                shipped
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-3">
                                            <button
                                                type="button"
                                                onClick={() => markDelivered(order._id)}
                                                disabled={updatingId === order._id}
                                                className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                <CheckCircle2 className="h-4 w-4" />
                                                {updatingId === order._id ? 'Updating...' : 'Mark delivered'}
                                            </button>
                                        </div>

                                        {order.shippingAddress && (
                                            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
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
                                    </div>
                                );
                            })
                        )}
                    </div>
                </section>
            </main>

            <AdminFooter />
        </div>
    );
};

const css = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap'); * { margin:0;padding:0;box-sizing:border-box; }`;

const styles = {
    pageWrapper: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        fontFamily: "'DM Sans', sans-serif",
    },
    container: {
        flex: 1,
        padding: '3rem 2rem',
    },
    card: {
        maxWidth: '1200px',
        margin: '0 auto',
        background: '#fff',
        borderRadius: '28px',
        padding: '2.5rem',
        boxShadow: '0 25px 45px -30px rgba(15, 23, 42, 0.4)',
    }
};

export default AdminOrders;
