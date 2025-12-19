import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/80 backdrop-blur-md shadow-lg py-4'
                    : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold font-display flex items-center gap-2">
                    <span className="text-indigo-600">Book</span>
                    <span className={isScrolled ? 'text-gray-800' : 'text-gray-800'}>Store</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
                    <Link to="/categories" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Categories</Link>
                    <Link to="/bestsellers" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Best Sellers</Link>
                    <Link to="/about" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">About</Link>
                </div>

                {/* Icons */}
                <div className="hidden md:flex items-center gap-6">
                    <button className="text-gray-600 hover:text-indigo-600 transition-colors">
                        <Search size={20} />
                    </button>
                    <button className="text-gray-600 hover:text-indigo-600 transition-colors">
                        <User size={20} />
                    </button>
                    <button className="text-gray-600 hover:text-indigo-600 transition-colors relative">
                        <ShoppingCart size={20} />
                        <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-800"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium" onClick={() => setIsOpen(false)}>Home</Link>
                            <Link to="/categories" className="text-gray-600 hover:text-indigo-600 font-medium" onClick={() => setIsOpen(false)}>Categories</Link>
                            <Link to="/bestsellers" className="text-gray-600 hover:text-indigo-600 font-medium" onClick={() => setIsOpen(false)}>Best Sellers</Link>
                            <Link to="/about" className="text-gray-600 hover:text-indigo-600 font-medium" onClick={() => setIsOpen(false)}>About</Link>

                            <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
                                <button className="flex items-center gap-2 text-gray-600">
                                    <Search size={20} /> Search
                                </button>
                                <button className="flex items-center gap-2 text-gray-600">
                                    <User size={20} /> Account
                                </button>
                                <button className="flex items-center gap-2 text-gray-600">
                                    <ShoppingCart size={20} /> Cart (0)
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
