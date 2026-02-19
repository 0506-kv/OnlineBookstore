import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Package, Star, LogOut, Store, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SellerHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const seller = JSON.parse(localStorage.getItem('seller') || '{}');

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('seller');
        navigate('/seller/login');
    };

    const navItems = [
        { label: 'Home', path: '/seller/home', icon: LayoutDashboard },
        { label: 'My Books', path: '/seller/sell', icon: BookOpen },
        { label: 'Orders', path: '/seller/orders', icon: Package },
        { label: 'Reviews', path: '/seller/reviews', icon: Star },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200/60 py-2'
                    : 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-3'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
                    {/* Logo Section */}
                    <div className="flex items-center gap-3 shrink-0 group cursor-pointer" onClick={() => navigate('/seller/home')}>
                        <div className="w-12 h-12 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform duration-300">
                            <Store className="text-white w-7 h-7" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none group-hover:text-cyan-600 transition-colors">
                                {seller.storename || 'Seller Portal'}
                            </h1>
                            <p className="text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                                Dashboard
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center justify-center flex-1 gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 group ${isActive
                                        ? 'bg-cyan-50 text-cyan-600'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-cyan-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg text-sm font-semibold transition-all duration-300 shadow-sm shadow-red-500/10 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 shrink-0"
                    >
                        <LogOut className="w-4.5 h-4.5" />
                        <span>Logout</span>
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden flex items-center justify-center p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-slate-200 bg-white"
                        >
                            <div className="flex flex-col p-4 space-y-4 shadow-lg">
                                {/* Seller Profile in Mobile Menu */}
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                                    <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold">
                                        <Store className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">
                                            {seller.storename || 'Seller Portal'}
                                        </div>
                                        <div className="text-xs text-slate-500 font-medium">Dashboard</div>
                                    </div>
                                </div>

                                <nav className="flex flex-col gap-2">
                                    {navItems.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = location.pathname === item.path;
                                        return (
                                            <button
                                                key={item.path}
                                                onClick={() => {
                                                    navigate(item.path);
                                                    setIsMenuOpen(false);
                                                }}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                                                        ? 'bg-cyan-50 text-cyan-600'
                                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                    }`}
                                            >
                                                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-600' : 'text-slate-400'}`} />
                                                <span>{item.label}</span>
                                            </button>
                                        );
                                    })}
                                </nav>

                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
            <div className="h-20" /> {/* Spacer */}
        </>
    );
};

export default SellerHeader;
