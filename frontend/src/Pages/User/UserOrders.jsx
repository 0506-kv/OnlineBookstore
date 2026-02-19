import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar, IndianRupee, Package, ShoppingBag } from 'lucide-react';
import UserHeader from '../../Components/User/UserHeader';
import UserFooter from '../../Components/User/UserFooter';

const statusStyles = {
    placed: 'bg-[#0f766e]/10 text-[#0f766e]',
    processing: 'bg-[#fef9c3] text-[#92400e]',
    shipped: 'bg-[#dbeafe] text-[#1d4ed8]',
    delivered: 'bg-[#dcfce7] text-[#166534]',
    cancelled: 'bg-[#fff4f0] text-[#b34a2f]'
};

const UserOrders = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedSections, setExpandedSections] = useState({
        placed: true,
        shipped: false,
        delivered: false,
        cancelled: false
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!storedUser || !token) {
            navigate('/user/login');
            return;
        }

        setUser(JSON.parse(storedUser));
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const fetchOrders = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/orders/my`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(response.data.orders || []);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('We could not load your orders right now.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const totalSpent = useMemo(() => {
        return orders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);
    }, [orders]);

    const formattedTotal = Number.isFinite(totalSpent)
        ? totalSpent.toLocaleString('en-IN')
        : '0';

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
                <div className="p-6 text-sm text-[#8b7d6b] italic">
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
                    const statusClass = statusStyles[status] || statusStyles.placed;

                    return (
                        <div
                            key={order._id}
                            className="rounded-xl border border-[#eadfd0] bg-white p-5 shadow-sm transition hover:shadow-md"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-base font-semibold text-[#1f2933]">
                                        {order.bookName || order.bookId?.name || 'Book order'}
                                    </h3>
                                    <p className="text-sm text-[#8b7d6b]">
                                        Qty {order.quantity} • {order.bookAuthor || order.bookId?.author || 'Unknown author'}
                                    </p>
                                </div>
                                <div className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusClass}`}>
                                    {status}
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#5c4f44]">
                                <div className="flex items-center gap-1.5">
                                    <IndianRupee className="h-3.5 w-3.5 text-[#8b7d6b]" />
                                    <span>{Number(order.totalPrice || 0).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5 text-[#8b7d6b]" />
                                    <span>{orderedOn}</span>
                                </div>
                            </div>

                            {order.shippingAddress && (
                                <div className="mt-3 rounded-lg border border-[#eadfd0] bg-[#f9f5ef] px-3 py-2 text-xs text-[#6b5e4d]">
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
            <div className="overflow-hidden rounded-2xl border border-[#eadfd0] bg-white shadow-sm">
                <button
                    onClick={() => toggleSection(type)}
                    className="flex w-full items-center justify-between bg-[#f9f5ef] px-6 py-4 transition hover:bg-[#f3ede1]"
                >
                    <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isOpen ? 'bg-[#0f766e] text-white' : 'bg-[#eadfd0] text-[#8b7d6b]'}`}>
                            {icon}
                        </div>
                        <div className="text-left">
                            <h3 className="text-sm font-bold text-[#1f2933]">{title}</h3>
                            <p className="text-xs text-[#8b7d6b]">{count} orders</p>
                        </div>
                    </div>
                    <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                        <svg className="h-5 w-5 text-[#8b7d6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

    if (!user) return null;

    return (
        <div className="user-shell min-h-screen flex flex-col">
            <UserHeader user={user} />

            <main className="flex-1">
                <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="user-heading text-3xl font-semibold text-[#1f2933]">
                                My Orders
                            </h1>
                            <p className="user-muted mt-1 text-sm">
                                Track order status and delivery details.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-[#eadfd0] bg-white px-5 py-2.5 text-sm font-semibold text-[#1f2933] shadow-sm">
                            <IndianRupee className="h-4 w-4 text-[#0f766e]" />
                            <span>Total Spent: {formattedTotal}</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex h-64 items-center justify-center rounded-3xl border border-[#eadfd0] bg-white">
                            <div className="text-sm text-[#8b7d6b]">Loading your orders...</div>
                        </div>
                    ) : error ? (
                        <div className="rounded-2xl border border-[#f2c3b4] bg-[#fff4f0] p-6 text-center text-sm text-[#b34a2f]">
                            {error}
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="rounded-2xl border border-[#eadfd0] bg-white p-8 text-center">
                            <p className="text-sm text-[#5c4f44]">You do not have any orders yet.</p>
                            <button
                                type="button"
                                onClick={() => navigate('/user/buy')}
                                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-200/70 transition hover:-translate-y-0.5"
                            >
                                <ShoppingBag className="h-4 w-4" />
                                Browse books
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {renderSection('Placed Orders', groupedOrders.placed.length, 'placed', <Package className="h-4 w-4" />)}
                            {renderSection('Shipped Orders', groupedOrders.shipped.length, 'shipped', <Package className="h-4 w-4" />)}
                            {renderSection('Delivered Orders', groupedOrders.delivered.length, 'delivered', <Package className="h-4 w-4" />)}
                            {renderSection('Cancelled Orders', groupedOrders.cancelled.length, 'cancelled', <Package className="h-4 w-4" />)}
                        </div>
                    )}
                </div>
            </main>

            <UserFooter />
        </div>
    );
};

export default UserOrders;
