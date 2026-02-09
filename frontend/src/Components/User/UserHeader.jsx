import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BookOpen, LayoutGrid, LogOut, ShoppingBag } from 'lucide-react';

const navItems = [
    { label: 'Home', to: '/user/home', icon: LayoutGrid },
    { label: 'Browse Books', to: '/user/buy', icon: BookOpen },
    { label: 'Cart', to: '/user/cart', icon: ShoppingBag }
];

const UserHeader = ({ user }) => {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        let active = true;
        const fetchCartCount = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart/my`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const items = response.data.cart?.items || [];
                const count = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
                if (active) setCartCount(count);
            } catch (err) {
                console.error('Error fetching cart count:', err);
            }
        };

        fetchCartCount();
        return () => {
            active = false;
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCartCount(0);
        navigate('/user/login');
    };

    const initials = (user?.fullname || 'Reader')
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <motion.header
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="sticky top-0 z-50 border-b border-[#e7dfd6] bg-[#f9f5ef]/80 backdrop-blur"
        >
            <style>{headerStyles}</style>
            <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 sm:px-6">
                <button
                    type="button"
                    onClick={() => navigate('/user/home')}
                    className="group flex items-center gap-3 text-left"
                >
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-linear-to-br from-[#0f766e] to-[#0ea5a4] text-white text-sm font-semibold shadow-lg shadow-teal-200/60 transition-transform group-hover:-translate-y-0.5">
                        R
                    </span>
                    <span className="hidden sm:block">
                        <span className="block text-lg font-semibold text-[#1f2933]">Readora</span>
                        <span className="block text-xs uppercase tracking-[0.24em] text-[#8b7d6b]">Book Club</span>
                    </span>
                </button>

                <nav className="hidden md:flex items-center gap-2 rounded-full border border-[#e7dfd6] bg-white/70 p-1 shadow-sm">
                    {navItems.map(({ label, to, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                                    isActive
                                        ? 'bg-[#0f766e] text-white shadow-sm'
                                        : 'text-[#5c4f44] hover:text-[#0f766e]'
                                }`
                            }
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                            {to === '/user/cart' && cartCount > 0 && (
                                <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#0f766e]">
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-3">
                    <div className="hidden lg:flex items-center gap-3 rounded-full border border-[#e7dfd6] bg-white/70 px-3 py-1.5 shadow-sm">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-[#1f2933] text-xs font-semibold text-white">
                            {initials}
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-semibold text-[#1f2933] leading-tight">
                                {user?.fullname || 'Reader'}
                            </div>
                            <div className="text-xs text-[#8b7d6b]">{user?.email || 'member@readora.com'}</div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 rounded-full border border-[#f2c3b4] bg-[#fff4f0] px-4 py-2 text-sm font-semibold text-[#b34a2f] transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            </div>

            <div className="px-4 pb-4 md:hidden">
                <div className="flex items-center gap-2 overflow-x-auto rounded-full border border-[#e7dfd6] bg-white/70 p-1 shadow-sm">
                    {navItems.map(({ label, to, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                                    isActive
                                        ? 'bg-[#0f766e] text-white shadow-sm'
                                        : 'text-[#5c4f44] hover:text-[#0f766e]'
                                }`
                            }
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                            {to === '/user/cart' && cartCount > 0 && (
                                <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#0f766e]">
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>
        </motion.header>
    );
};

const headerStyles = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Playfair+Display:wght@500;700&display=swap');
html { scroll-behavior: smooth; }
.user-shell { font-family: 'Space Grotesk', sans-serif; background: #f9f5ef; color: #1f2933; }
.user-heading { font-family: 'Playfair Display', serif; }
.user-muted { color: #8b7d6b; }
`;

export default UserHeader;
