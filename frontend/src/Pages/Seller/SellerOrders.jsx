import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar, IndianRupee, Package, Truck, User, XCircle } from 'lucide-react';
import SellerHeader from '../../Components/Seller/SellerHeader';
import SellerFooter from '../../Components/Seller/SellerFooter';

const statusStyles = {
    placed: 'bg-emerald-50 text-emerald-600',
    processing: 'bg-amber-50 text-amber-600',
    shipped: 'bg-cyan-50 text-cyan-700',
    delivered: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-rose-50 text-rose-600'
};

const SellerOrders = () => {
    const navigate = useNavigate();
    const [seller, setSeller] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        const storedSeller = localStorage.getItem('seller');
        const token = localStorage.getItem('token');

        if (!storedSeller || !token) {
            navigate('/seller/login');
            return;
        }

        setSeller(JSON.parse(storedSeller));
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const fetchOrders = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/orders/seller`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(response.data.orders || []);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('We could not load orders right now.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const totalRevenue = useMemo(() => {
        return orders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);
    }, [orders]);

    const formattedRevenue = Number.isFinite(totalRevenue)
        ? totalRevenue.toLocaleString('en-IN')
        : '0';

    const updateOrderStatus = async (orderId, status) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setUpdatingId(orderId);
        setError('');
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/orders/seller/${orderId}/status`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const updated = response.data.order;
            setOrders((prev) => prev.map((order) => (order._id === updated._id ? updated : order)));
        } catch (err) {
            console.error('Error updating order:', err);
            setError('We could not update the order right now.');
        } finally {
            setUpdatingId(null);
        }
    };

    if (!seller) return null;

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
            <SellerHeader />

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <section className="rounded-3xl border border-slate-200/60 bg-white/90 p-8 shadow-xl shadow-slate-200/40">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                                    <Package className="h-4 w-4" />
                                    Orders
                                </div>
                                <h1 className="mt-4 text-3xl font-bold text-slate-900">Recent orders</h1>
                                <p className="mt-2 text-sm text-slate-500">
                                    Each order reflects a book sold from your store.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm">
                                <IndianRupee className="h-4 w-4" />
                                {formattedRevenue}
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            {loading ? (
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                                    Loading orders...
                                </div>
                            ) : error ? (
                                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-600">
                                    {error}
                                </div>
                            ) : orders.length === 0 ? (
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                                    No orders yet. When customers checkout, you will see them here.
                                </div>
                            ) : (
                                orders.map((order) => {
                                    const createdAt = order.purchasedAt || order.createdAt;
                                    const orderedOn = createdAt
                                        ? new Date(createdAt).toLocaleDateString()
                                        : 'Date not set';
                                    const status = (order.status || 'placed').toLowerCase();
                                    const buyer = order.userId?.fullname || 'Customer';
                                    const buyerEmail = order.userId?.email;
                                    const lineTotal = Number(order.totalPrice || 0);
                                    const formattedTotal = Number.isFinite(lineTotal)
                                        ? lineTotal.toLocaleString('en-IN')
                                        : '0';
                                    const canAct = !['cancelled', 'shipped', 'delivered'].includes(status);
                                    const statusClass = statusStyles[status] || statusStyles.placed;

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
                                                    <Calendar className="h-4 w-4 text-slate-400" />
                                                    <span>{orderedOn}</span>
                                                </div>
                                                <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClass}`}>
                                                    {status}
                                                </div>
                                            </div>

                                            {canAct && (
                                                <div className="mt-4 flex flex-wrap gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateOrderStatus(order._id, 'shipped')}
                                                        disabled={updatingId === order._id}
                                                        className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-xs font-semibold text-cyan-700 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        <Truck className="h-4 w-4" />
                                                        Dispatch
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateOrderStatus(order._id, 'cancelled')}
                                                        disabled={updatingId === order._id}
                                                        className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-600 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        <XCircle className="h-4 w-4" />
                                                        Cancel
                                                    </button>
                                                </div>
                                            )}

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
                </div>
            </main>

            <SellerFooter />
        </div>
    );
};

export default SellerOrders;
