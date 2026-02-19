import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, CreditCard, IndianRupee, Landmark, ShoppingBag, Wallet } from 'lucide-react';
import { toast } from 'react-hot-toast';
import UserHeader from '../../Components/User/UserHeader';
import UserFooter from '../../Components/User/UserFooter';

const paymentOptions = [
    {
        id: 'card',
        label: 'Card',
        description: 'Visa, Mastercard, RuPay',
        icon: CreditCard
    },
    {
        id: 'upi',
        label: 'UPI',
        description: 'Google Pay, PhonePe, Paytm',
        icon: Wallet
    },
    {
        id: 'netbanking',
        label: 'Net Banking',
        description: 'All major banks',
        icon: Landmark
    }
];

const UserPayment = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [form, setForm] = useState({
        line1: '',
        line2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
        phone: '',
        notes: ''
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

    const isFormValid = form.line1 && form.city && form.state && form.postalCode && form.country;

    const handlePlaceOrder = async () => {
        if (!isFormValid || items.length === 0) return;
        const token = localStorage.getItem('token');
        if (!token) return;

        setSubmitting(true);
        setError('');
        try {
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/orders/place-cart`,
                {
                    shippingAddress: {
                        line1: form.line1,
                        line2: form.line2,
                        city: form.city,
                        state: form.state,
                        postalCode: form.postalCode,
                        country: form.country
                    },
                    contactPhone: form.phone,
                    notes: form.notes
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Order placed successfully!');
            navigate('/user/orders');
        } catch (err) {
            console.error('Order placement failed:', err);
            setError('We could not place your order right now.');
        } finally {
            setSubmitting(false);
        }
    };

    if (!user) return null;

    return (
        <div className="user-shell min-h-screen flex flex-col">
            <UserHeader user={user} />

            <main className="flex-1">
                <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                        <section className="rounded-[28px] border border-[#eadfd0] bg-white p-8 shadow-sm">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#eadfd0] bg-[#f9f5ef] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#8b7d6b]">
                                <ShoppingBag className="h-4 w-4" />
                                Payment
                            </div>
                            <h1 className="user-heading mt-4 text-3xl font-semibold text-[#1f2933]">
                                Choose payment method
                            </h1>
                            <p className="user-muted mt-2 text-sm">
                                Demo checkout page. Your order will be sent to each seller.
                            </p>

                            <div className="mt-6 grid gap-3">
                                {paymentOptions.map((option) => {
                                    const Icon = option.icon;
                                    const active = selectedMethod === option.id;
                                    return (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => setSelectedMethod(option.id)}
                                            className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                                                active
                                                    ? 'border-[#0f766e] bg-[#0f766e]/10'
                                                    : 'border-[#eadfd0] bg-white hover:border-[#0f766e]'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`grid h-10 w-10 place-items-center rounded-xl ${
                                                        active ? 'bg-[#0f766e] text-white' : 'bg-[#f9f5ef] text-[#0f766e]'
                                                    }`}
                                                >
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-[#1f2933]">{option.label}</div>
                                                    <div className="text-xs text-[#8b7d6b]">{option.description}</div>
                                                </div>
                                            </div>
                                            {active && <CheckCircle2 className="h-5 w-5 text-[#0f766e]" />}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-8">
                                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8b7d6b]">
                                    Shipping details
                                </h2>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    <input
                                        className="w-full rounded-2xl border border-[#eadfd0] px-4 py-3 text-sm text-[#1f2933] outline-none focus:border-[#0f766e]"
                                        placeholder="Address line 1"
                                        value={form.line1}
                                        onChange={(event) => setForm({ ...form, line1: event.target.value })}
                                    />
                                    <input
                                        className="w-full rounded-2xl border border-[#eadfd0] px-4 py-3 text-sm text-[#1f2933] outline-none focus:border-[#0f766e]"
                                        placeholder="Address line 2 (optional)"
                                        value={form.line2}
                                        onChange={(event) => setForm({ ...form, line2: event.target.value })}
                                    />
                                    <input
                                        className="w-full rounded-2xl border border-[#eadfd0] px-4 py-3 text-sm text-[#1f2933] outline-none focus:border-[#0f766e]"
                                        placeholder="City"
                                        value={form.city}
                                        onChange={(event) => setForm({ ...form, city: event.target.value })}
                                    />
                                    <input
                                        className="w-full rounded-2xl border border-[#eadfd0] px-4 py-3 text-sm text-[#1f2933] outline-none focus:border-[#0f766e]"
                                        placeholder="State"
                                        value={form.state}
                                        onChange={(event) => setForm({ ...form, state: event.target.value })}
                                    />
                                    <input
                                        className="w-full rounded-2xl border border-[#eadfd0] px-4 py-3 text-sm text-[#1f2933] outline-none focus:border-[#0f766e]"
                                        placeholder="Postal code"
                                        value={form.postalCode}
                                        onChange={(event) => setForm({ ...form, postalCode: event.target.value })}
                                    />
                                    <input
                                        className="w-full rounded-2xl border border-[#eadfd0] px-4 py-3 text-sm text-[#1f2933] outline-none focus:border-[#0f766e]"
                                        placeholder="Country"
                                        value={form.country}
                                        onChange={(event) => setForm({ ...form, country: event.target.value })}
                                    />
                                    <input
                                        className="w-full rounded-2xl border border-[#eadfd0] px-4 py-3 text-sm text-[#1f2933] outline-none focus:border-[#0f766e]"
                                        placeholder="Phone (optional)"
                                        value={form.phone}
                                        onChange={(event) => setForm({ ...form, phone: event.target.value })}
                                    />
                                    <input
                                        className="w-full rounded-2xl border border-[#eadfd0] px-4 py-3 text-sm text-[#1f2933] outline-none focus:border-[#0f766e]"
                                        placeholder="Delivery notes (optional)"
                                        value={form.notes}
                                        onChange={(event) => setForm({ ...form, notes: event.target.value })}
                                    />
                                </div>
                            </div>
                        </section>

                        <aside className="rounded-[28px] border border-[#eadfd0] bg-white p-8 shadow-sm">
                            <h2 className="text-lg font-semibold text-[#1f2933]">Order summary</h2>
                            <p className="user-muted mt-2 text-sm">
                                {items.length} item{items.length === 1 ? '' : 's'} in your bag
                            </p>

                            <div className="mt-6 space-y-4">
                                {loading ? (
                                    <div className="rounded-2xl border border-[#eadfd0] bg-[#f9f5ef] p-4 text-sm text-[#8b7d6b]">
                                        Loading summary...
                                    </div>
                                ) : error ? (
                                    <div className="rounded-2xl border border-[#f2c3b4] bg-[#fff4f0] p-4 text-sm text-[#b34a2f]">
                                        {error}
                                    </div>
                                ) : items.length === 0 ? (
                                    <div className="rounded-2xl border border-[#eadfd0] bg-white p-4 text-sm text-[#5c4f44]">
                                        Your cart is empty.
                                        <button
                                            type="button"
                                            onClick={() => navigate('/user/buy')}
                                            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-200/70"
                                        >
                                            Browse books
                                        </button>
                                    </div>
                                ) : (
                                    items.map((item) => (
                                        <div
                                            key={String(item.bookId)}
                                            className="flex items-center justify-between rounded-2xl border border-[#eadfd0] bg-white px-4 py-3 text-sm"
                                        >
                                            <div>
                                                <div className="font-semibold text-[#1f2933]">{item.bookName}</div>
                                                <div className="text-xs text-[#8b7d6b]">Qty {item.quantity}</div>
                                            </div>
                                            <div className="font-semibold text-[#1f2933]">
                                                ₹{Number(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="mt-6 flex items-center justify-between rounded-2xl border border-[#eadfd0] bg-[#f9f5ef] px-4 py-3 text-sm font-semibold text-[#1f2933]">
                                <div className="flex items-center gap-2">
                                    <IndianRupee className="h-4 w-4" />
                                    Total
                                </div>
                                <span>{formattedTotal}</span>
                            </div>

                            <button
                                type="button"
                                onClick={handlePlaceOrder}
                                disabled={submitting || loading || items.length === 0 || !isFormValid}
                                className="mt-6 w-full rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-200/70 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {submitting ? 'Placing order...' : 'Place order'}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate('/user/cart')}
                                className="mt-3 w-full rounded-full border border-[#eadfd0] bg-white px-5 py-3 text-sm font-semibold text-[#5c4f44] transition hover:border-[#0f766e] hover:text-[#0f766e]"
                            >
                                Back to cart
                            </button>
                        </aside>
                    </div>
                </div>
            </main>

            <UserFooter />
        </div>
    );
};

export default UserPayment;
