import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Search, BookOpen, Sparkles, Heart } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Categories', path: '/categories' },
        { name: 'Best Sellers', path: '/bestsellers' },
        { name: 'About', path: '/about' }
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-gray-100/50 py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/40 transition-shadow"
                    >
                        <BookOpen size={22} className="text-white" />
                    </motion.div>
                    <span className="text-2xl font-bold">
                        <span className="text-emerald-600">Book</span>
                        <span className="text-gray-900">Store</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1 bg-gray-100/80 backdrop-blur-sm rounded-full px-2 py-2">
                    {navLinks.map((link, idx) => (
                        <Link
                            key={idx}
                            to={link.path}
                            className="relative px-5 py-2 text-gray-600 hover:text-emerald-600 font-medium transition-all rounded-full hover:bg-white group"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Section */}
                <div className="hidden md:flex items-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                    >
                        <Search size={20} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <Heart size={20} />
                    </motion.button>

                    <Link
                        to="/login"
                        className="px-5 py-2.5 text-gray-700 hover:text-emerald-600 font-semibold transition-colors"
                    >
                        Login
                    </Link>

                    <Link to="/register">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25"
                        >
                            <Sparkles size={16} />
                            Get Started
                        </motion.button>
                    </Link>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative p-2.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                    >
                        <ShoppingCart size={20} />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                            0
                        </span>
                    </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="md:hidden p-2.5 text-gray-700 bg-gray-100 rounded-xl"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl overflow-hidden"
                    >
                        <div className="flex flex-col p-5 gap-1">
                            {navLinks.map((link, idx) => (
                                <Link
                                    key={idx}
                                    to={link.path}
                                    className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 font-medium py-3 px-4 rounded-xl transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
                                <Link
                                    to="/login"
                                    className="text-center py-3 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Sparkles size={16} />
                                    Get Started Free
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
