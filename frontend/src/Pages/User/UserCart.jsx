import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import UserHeader from '../../Components/User/UserHeader';
import UserFooter from '../../Components/User/UserFooter';

const UserCart = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updatingId, setUpdatingId] = useState(null);

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

        const fetchCart = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart/my`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCart(response.data.cart || { items: [] });
            } catch (err) {
                console.error('Error fetching cart:', err);
                setError('We could not load your cart right now.');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const items = cart?.items || [];
    const totalAmount = useMemo(() => {
        return items.reduce((sum, item) => {
            const lineTotal = Number(item.unitPrice) * Number(item.quantity || 0);
            return sum + (Number.isFinite(lineTotal) ? lineTotal : 0);
        }, 0);
    }, [items]);

    const formattedTotal = Number.isFinite(totalAmount)
        ? totalAmount.toLocaleString('en-IN')
        : '0';

    const updateQuantity = async (bookId, nextQty) => {
        if (nextQty < 1) {
            return removeItem(bookId);
        }

        const token = localStorage.getItem('token');
        if (!token) return;

        setUpdatingId(String(bookId));
        setError('');
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/cart/update`,
                { bookId, quantity: nextQty },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(response.data.cart || { items: [] });
        } catch (err) {
            console.error('Error updating cart:', err);
            setError('We could not update the cart right now.');
        } finally {
            setUpdatingId(null);
        }
    };

    const removeItem = async (bookId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setUpdatingId(String(bookId));
        setError('');
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/cart/remove/${bookId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(response.data.cart || { items: [] });
        } catch (err) {
            console.error('Error removing item:', err);
            setError('We could not update the cart right now.');
        } finally {
            setUpdatingId(null);
        }
    };

    if (!user) return null;

    return (
        <div className="user-shell min-h-screen flex flex-col">
            <UserHeader user={user} />

            <main className="flex-1">
                <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
                    <section className="rounded-[28px] border border-[#eadfd0] bg-white p-8 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-[#eadfd0] bg-[#f9f5ef] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#8b7d6b]">
                                    <ShoppingBag className="h-4 w-4" />
                                    Your Bag
                                </div>
                                <h1 className="user-heading mt-4 text-3xl font-semibold text-[#1f2933]">
                                    Cart summary
                                </h1>
                                <p className="user-muted mt-2 text-sm">
                                    Review your selections before checkout.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 rounded-full border border-[#eadfd0] bg-white px-5 py-3 text-sm font-semibold text-[#1f2933] shadow-sm">
                                <IndianRupee className="h-4 w-4" />
                                {formattedTotal}
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            {loading ? (
                                <div className="rounded-2xl border border-[#eadfd0] bg-[#f9f5ef] p-6 text-sm text-[#8b7d6b]">
                                    Loading your cart...
                                </div>
                            ) : error ? (
                                <div className="rounded-2xl border border-[#f2c3b4] bg-[#fff4f0] p-6 text-sm text-[#b34a2f]">
                                    {error}
                                </div>
                            ) : items.length === 0 ? (
                                <div className="rounded-2xl border border-[#eadfd0] bg-white p-6 text-sm text-[#5c4f44]">
                                    Your cart is empty. Pick a book to get started.
                                    <button
                                        type="button"
                                        onClick={() => navigate('/user/buy')}
                                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-200/70"
                                    >
                                        Browse books
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => {
                                    const lineTotal = Number(item.unitPrice) * Number(item.quantity || 0);
                                    const formattedLine = Number.isFinite(lineTotal)
                                        ? lineTotal.toLocaleString('en-IN')
                                        : '0';
                                    const formattedUnit = Number.isFinite(Number(item.unitPrice))
                                        ? Number(item.unitPrice).toLocaleString('en-IN')
                                        : item.unitPrice || '—';

                                    return (
                                        <div
                                            key={String(item.bookId)}
                                            className="flex flex-col gap-4 rounded-2xl border border-[#eadfd0] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            <div>
                                                <h3 className="text-base font-semibold text-[#1f2933]">
                                                    {item.bookName}
                                                </h3>
                                                <p className="text-sm text-[#8b7d6b]">
                                                    {item.bookAuthor || 'Unknown author'}
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-6 text-sm text-[#5c4f44]">
                                                <div className="inline-flex items-center gap-2 rounded-full border border-[#eadfd0] bg-[#f9f5ef] px-3 py-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.bookId, Number(item.quantity) - 1)}
                                                        disabled={updatingId === String(item.bookId)}
                                                        className="rounded-full p-1 text-[#5c4f44] transition hover:text-[#0f766e] disabled:opacity-50"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="min-w-6 text-center font-semibold text-[#1f2933]">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.bookId, Number(item.quantity) + 1)}
                                                        disabled={updatingId === String(item.bookId)}
                                                        className="rounded-full p-1 text-[#5c4f44] transition hover:text-[#0f766e] disabled:opacity-50"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                                <span>Unit: ₹{formattedUnit}</span>
                                                <span className="font-semibold text-[#1f2933]">₹{formattedLine}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.bookId)}
                                                    disabled={updatingId === String(item.bookId)}
                                                    className="inline-flex items-center gap-1 rounded-full border border-[#f2c3b4] bg-[#fff4f0] px-3 py-1 text-xs font-semibold text-[#b34a2f] transition hover:-translate-y-0.5 disabled:opacity-50"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <UserFooter />
        </div>
    );
};

export default UserCart;
