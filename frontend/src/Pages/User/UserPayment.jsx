import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Landmark, Wallet, Banknote, ShieldCheck, MapPin, Search, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import UserHeader from '../../Components/User/UserHeader';
import UserFooter from '../../Components/User/UserFooter';

const paymentOptions = [
    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
    { id: 'netbanking', label: 'Net Banking', icon: Landmark },
    { id: 'upi', label: 'UPI / QR', icon: Search },
    { id: 'wallet', label: 'Wallets', icon: Wallet },
    { id: 'cod', label: 'Cash on Delivery', icon: Banknote }
];

const banks = ["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra Bank", "Punjab National Bank"];
const wallets = ["Paytm", "PhonePe", "Amazon Pay", "MobiKwik"];

// Small reusable input for shipping
const InputField = ({ label, placeholder, value, onChange, required = false }) => (
    <div className="flex flex-col gap-1.5 w-full">
        <label className="text-xs font-semibold text-gray-600 ml-1">{label} {required && <span className="text-red-500">*</span>}</label>
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-shadow"
        />
    </div>
);

const UserPayment = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // UI state
    const [selectedMethod, setSelectedMethod] = useState('card');

    // Payment specific details
    const [upiId, setUpiId] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [selectedWallet, setSelectedWallet] = useState('');

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
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart/my`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCart(response.data.cart || { items: [] });
            } catch (err) {
                console.error('Error fetching cart:', err);
                toast.error('Could not load cart items.');
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

    const codCharge = 30;
    const finalTotal = selectedMethod === 'cod' ? totalAmount + codCharge : totalAmount;

    const formattedTotal = Number.isFinite(finalTotal)
        ? finalTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })
        : '0.00';

    const isFormValid = form.line1 && form.city && form.state && form.postalCode && form.country;

    const handlePlaceOrder = async () => {
        if (!isFormValid) {
            toast.error('Please fill in required shipping details.');
            return;
        }
        if (items.length === 0) return;

        // Validate chosen payment method
        if (selectedMethod === 'upi' && !upiId.trim()) {
            toast.error('Please enter a valid UPI ID');
            return;
        }
        if (selectedMethod === 'netbanking' && !selectedBank) {
            toast.error('Please select a bank for Net Banking');
            return;
        }
        if (selectedMethod === 'wallet' && !selectedWallet) {
            toast.error('Please select a wallet');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) return;

        setSubmitting(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/orders/place-cart`,
                {
                    shippingAddress: { ...form },
                    contactPhone: form.phone,
                    notes: form.notes
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(`Order successfully placed! Paid via ${selectedMethod.toUpperCase()}`);
            navigate('/user/orders');
        } catch (err) {
            console.error('Order placement failed:', err);
            toast.error('Failed to process payment. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (!user) return null;

    return (
        <div className="user-shell min-h-screen flex flex-col bg-gray-50">
            <UserHeader user={user} />

            <main className="flex-1 py-10 px-4 sm:px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
                            <p className="text-sm text-gray-500 mt-1">Complete your purchase safely and securely.</p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-gray-400 text-sm bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                            <ShieldCheck className="h-4 w-4 text-green-600" />
                            256-bit Encryption
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* LEFT COLUMN: Payment Methods */}
                        <div className="lg:w-7/12 flex flex-col gap-6">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-200 bg-gray-50/50">
                                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                        <CreditCard className="h-5 w-5 text-blue-600" />
                                        Select Payment Method
                                    </h2>
                                </div>

                                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                                    {/* Sidebar for Payment Options */}
                                    <div className="md:col-span-4 flex flex-col gap-2">
                                        {paymentOptions.map((opt) => {
                                            const Icon = opt.icon;
                                            const isActive = selectedMethod === opt.id;
                                            return (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setSelectedMethod(opt.id)}
                                                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center gap-3 ${isActive
                                                        ? 'border-blue-600 bg-blue-50 text-blue-800 font-semibold shadow-sm'
                                                        : 'border-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                                                        }`}
                                                >
                                                    <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                                    <span className="text-sm">{opt.label}</span>
                                                    {isActive && <CheckCircle2 className="h-4 w-4 ml-auto text-blue-600" />}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    {/* Content Area for Selected Method */}
                                    <div className="md:col-span-8 bg-gray-50 border border-gray-100 rounded-xl p-5 md:p-6 min-h-[300px] flex flex-col justify-center">

                                        {selectedMethod === 'card' && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                <h3 className="text-sm font-semibold text-gray-800">Enter Card Details</h3>
                                                <div className="space-y-3">
                                                    <input type="text" placeholder="Card Number" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <input type="text" placeholder="MM/YY" className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
                                                        <input type="text" placeholder="CVV" className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
                                                    </div>
                                                    <input type="text" placeholder="Name on Card" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
                                                </div>
                                            </div>
                                        )}

                                        {selectedMethod === 'netbanking' && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                <h3 className="text-sm font-semibold text-gray-800">Select your Bank</h3>
                                                <select
                                                    value={selectedBank}
                                                    onChange={e => setSelectedBank(e.target.value)}
                                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-4"
                                                >
                                                    <option value="" disabled>Choose a bank...</option>
                                                    {banks.map(bank => <option key={bank} value={bank}>{bank}</option>)}
                                                    <option value="other">Other Banks</option>
                                                </select>
                                            </div>
                                        )}

                                        {selectedMethod === 'upi' && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                <h3 className="text-sm font-semibold text-gray-800">Pay via UPI App or ID</h3>
                                                <p className="text-xs text-gray-500 mb-4">Enter your UPI ID (VPA) to receive a payment request on your UPI app.</p>
                                                <input
                                                    type="text"
                                                    placeholder="example@upi"
                                                    value={upiId}
                                                    onChange={e => setUpiId(e.target.value)}
                                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                                                />
                                            </div>
                                        )}

                                        {selectedMethod === 'wallet' && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                <h3 className="text-sm font-semibold text-gray-800">Select Wallet</h3>
                                                <select
                                                    value={selectedWallet}
                                                    onChange={e => setSelectedWallet(e.target.value)}
                                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-4"
                                                >
                                                    <option value="" disabled>Choose a wallet...</option>
                                                    {wallets.map(wallet => <option key={wallet} value={wallet}>{wallet}</option>)}
                                                </select>
                                            </div>
                                        )}

                                        {selectedMethod === 'cod' && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col items-center text-center">
                                                <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
                                                    <Banknote className="h-8 w-8" />
                                                </div>
                                                <h3 className="text-sm font-semibold text-gray-800">Cash on Delivery</h3>
                                                <div className="text-sm text-gray-600 max-w-xs">
                                                    Pay using cash or UPI at the time of delivery.
                                                    <div className="mt-3 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-xs font-medium border border-red-100">
                                                        A standard fee of ₹{codCharge} applies to all COD orders.
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Shipping & Order Summary */}
                        <div className="lg:w-5/12 flex flex-col gap-6">

                            {/* Shipping Details */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
                                    <MapPin className="h-5 w-5 text-blue-600" />
                                    Shipping Details
                                </h2>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <InputField label="Address Line 1" placeholder="House/Flat No., Street" value={form.line1} onChange={e => setForm({ ...form, line1: e.target.value })} required />
                                    </div>
                                    <div className="col-span-2">
                                        <InputField label="Address Line 2 (Optional)" placeholder="Apartment, suite, etc." value={form.line2} onChange={e => setForm({ ...form, line2: e.target.value })} />
                                    </div>
                                    <InputField label="City" placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} required />
                                    <InputField label="State" placeholder="State" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} required />
                                    <InputField label="PIN Code" placeholder="ZIP Code" value={form.postalCode} onChange={e => setForm({ ...form, postalCode: e.target.value })} required />
                                    <InputField label="Country" placeholder="Country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} required />
                                    <div className="col-span-2">
                                        <InputField label="Phone Number" placeholder="Delivery contact number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
                                <h2 className="text-lg font-bold text-gray-800 mb-5 pb-4 border-b border-gray-100 flex items-center justify-between">
                                    Order Summary
                                    <span className="text-xs bg-gray-100 text-gray-600 py-1 px-2.5 rounded-full">{items.length} Items</span>
                                </h2>

                                <div className="space-y-4 mb-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                    {items.length === 0 ? (
                                        <p className="text-sm text-gray-500 italic">No items in cart</p>
                                    ) : (
                                        items.map(item => (
                                            <div key={item.bookId} className="flex justify-between items-start">
                                                <div className="flex-1 pr-4">
                                                    <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{item.bookName}</h4>
                                                    <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                                                </div>
                                                <span className="text-sm font-semibold text-gray-900">
                                                    ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="space-y-3 pt-5 border-t border-gray-100 mb-6">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-gray-900">₹{totalAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Shipping</span>
                                        <span className="font-medium text-green-600">Free</span>
                                    </div>
                                    {selectedMethod === 'cod' && (
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>COD Fe</span>
                                            <span className="font-medium text-red-600">+ ₹{codCharge}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-center mb-6 pt-5 border-t border-gray-200 border-dashed">
                                    <span className="text-base font-bold text-gray-900">Grand Total</span>
                                    <span className="text-2xl font-bold text-blue-700">₹{formattedTotal}</span>
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={submitting || items.length === 0}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                >
                                    {submitting ? 'Processing...' : `Pay ₹${formattedTotal}`}
                                </button>

                                {!isFormValid && (
                                    <p className="text-xs text-red-500 text-center flex w-full justify-center mt-3 font-medium">Please complete shipping details above.</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                    border-radius: 10px;
                }
            `}</style>
            <UserFooter />
        </div>
    );
};

export default UserPayment;
