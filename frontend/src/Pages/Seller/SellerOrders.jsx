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
    const [expandedSections, setExpandedSections] = useState({
        placed: true,
        shipped: false,
        delivered: false,
        cancelled: false
    });

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

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const groupedOrders = useMemo(() => {
        const placed = [];
        const shipped = [];
        const delivered = [];
        const cancelled = [];

        orders.forEach(order => {
            const status = (order.status || 'placed').toLowerCase();
            if (status === 'placed' || status === 'processing') {
                placed.push(order);
            } else if (status === 'shipped') {
                shipped.push(order);
            } else if (status === 'delivered') {
                delivered.push(order);
            } else if (status === 'cancelled') {
                cancelled.push(order);
            }
        });

        return { placed, shipped, delivered, cancelled };
    }, [orders]);

    const renderOrderList = (orderList) => {
        if (orderList.length === 0) {
            return (
                <div className="p-6 text-sm text-slate-500 italic">
                    No orders in this category.
                </div>
            );
        }

        return (
            <div className="space-y-4 p-4">
                {orderList.map((order) => {
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
                            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-base font-semibold text-slate-900">
                                        {order.bookName || order.bookId?.name || 'Book order'}
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        Qty {order.quantity} • {order.bookAuthor || order.bookId?.author || 'Unknown author'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-900">
                                    <IndianRupee className="h-3.5 w-3.5" />
                                    {formattedTotal}
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-600">
                                <div className="flex items-center gap-1.5">
                                    <User className="h-3.5 w-3.5 text-slate-400" />
                                    <span>{buyer}{buyerEmail ? ` • ${buyerEmail}` : ''}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                    <span>{orderedOn}</span>
                                </div>
                                <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold capitalize ${statusClass}`}>
                                    {status}
                                </div>
                            </div>

                            {canAct && (
                                <div className="mt-4 flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={() => updateOrderStatus(order._id, 'shipped')}
                                        disabled={updatingId === order._id}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <Truck className="h-3.5 w-3.5" />
                                        Dispatch
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => updateOrderStatus(order._id, 'cancelled')}
                                        disabled={updatingId === order._id}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <XCircle className="h-3.5 w-3.5" />
                                        Cancel
                                    </button>
                                </div>
                            )}

                            {order.shippingAddress && (
                                <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2 text-xs text-slate-500">
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
                })}
            </div>
        );
    };

    const renderSection = (title, count, type, icon) => {
        const isOpen = expandedSections[type];
        return (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <button
                    onClick={() => toggleSection(type)}
                    className="flex w-full items-center justify-between bg-slate-50 px-6 py-4 transition hover:bg-slate-100/80"
                >
                    <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isOpen ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-500'}`}>
                            {icon}
                        </div>
                        <div className="text-left">
                            <h3 className="text-sm font-bold text-slate-900">{title}</h3>
                            <p className="text-xs text-slate-500">{count} orders</p>
                        </div>
                    </div>
                    <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                        <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>

                <div
                    className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    {renderOrderList(groupedOrders[type])}
                </div>
            </div>
        );
    };

    if (!seller) return null;

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
            <SellerHeader />

            <main className="flex-1">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Manage Orders</h1>
                            <p className="mt-1 text-sm text-slate-500">Track and update your book sales.</p>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm">
                            <IndianRupee className="h-4 w-4 text-emerald-600" />
                            <span>Total Revenue: {formattedRevenue}</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex h-64 items-center justify-center rounded-3xl border border-slate-200 bg-white">
                            <div className="text-sm text-slate-500">Loading orders...</div>
                        </div>
                    ) : error ? (
                        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-sm text-rose-600">
                            {error}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {renderSection('Placed Orders', groupedOrders.placed.length, 'placed', <Package className="h-4 w-4" />)}
                            {renderSection('Shipped Orders', groupedOrders.shipped.length, 'shipped', <Truck className="h-4 w-4" />)}
                            {renderSection('Delivered Orders', groupedOrders.delivered.length, 'delivered', <User className="h-4 w-4" />)}
                            {renderSection('Cancelled Orders', groupedOrders.cancelled.length, 'cancelled', <User className="h-4 w-4" />)}
                        </div>
                    )}
                </div>
            </main>

            <SellerFooter />
        </div>
    );
};

export default SellerOrders;
