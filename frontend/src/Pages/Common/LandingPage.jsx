import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, Shield, Clock } from 'lucide-react';
import Navbar from '../../Components/Navbar';

const LandingPage = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#FDFBF7]">
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full border border-orange-100/50"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[10%] -left-[10%] w-[600px] h-[600px] rounded-full border border-indigo-50"
                    />
                    <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="space-y-8"
                        >
                            <motion.div variants={fadeInUp} className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full font-medium text-sm">
                                #1 Online Bookstore Award 2024
                            </motion.div>

                            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-bold leading-tight">
                                Discover Your Next <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                                    Great Adventure
                                </span>
                            </motion.h1>

                            <motion.p variants={fadeInUp} className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                Explore our vast collection of over 5 million titles. From timeless classics to modern bestsellers, find the stories that move you.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                                <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all flex items-center gap-2 group shadow-lg hover:shadow-xl hover:-translate-y-1">
                                    Start Reading
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md">
                                    View Categories
                                </button>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex items-center gap-8 pt-6">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-12 h-12 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center text-xs font-bold text-gray-500">
                                            U{i}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex text-yellow-500 mb-1">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                                    </div>
                                    <p className="text-sm text-gray-500">Trusted by 50k+ Readers</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative z-10 grid grid-cols-2 gap-4">
                                <motion.div
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="mt-12 bg-white p-4 rounded-2xl shadow-xl"
                                >
                                    <div className="w-full h-64 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" alt="Book Cover" className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">Modern Classics</h3>
                                    <p className="text-gray-500 text-sm">Curated Collection</p>
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, 20, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="bg-white p-4 rounded-2xl shadow-xl"
                                >
                                    <div className="w-full h-64 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800" alt="Book Cover" className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">Best Sellers</h3>
                                    <p className="text-gray-500 text-sm">Trending Now</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: <Truck size={32} />, title: "Free Shipping", desc: "On all orders over $50" },
                            { icon: <Shield size={32} />, title: "Secure Payment", desc: "100% secure payment methods" },
                            { icon: <Clock size={32} />, title: "Fast Delivery", desc: "2-3 business days delivery" }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold">{feature.title}</h3>
                                <p className="text-gray-500">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold mb-4">Explore Categories</h2>
                            <p className="text-gray-600 max-w-lg">Find the perfect book for your mood from our wide range of curated categories.</p>
                        </div>
                        <button className="hidden md:flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all">
                            View All <ArrowRight size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {['Fiction', 'Non-Fiction', 'Science', 'History'].map((category, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/30 transition-colors z-10" />
                                <img
                                    src={`https://source.unsplash.com/random/400x600?book,${category}`} // Note: Using reliable placeholders in prod
                                    alt={category}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute bottom-0 left-0 p-6 z-20">
                                    <h3 className="text-white text-2xl font-bold mb-2">{category}</h3>
                                    <span className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                                        Explore <ArrowRight size={16} />
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="bg-gray-900 rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                            </svg>
                        </div>

                        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                            <h2 className="text-3xl lg:text-5xl font-bold text-white">Subscribe to our Newsletter</h2>
                            <p className="text-gray-400 text-lg">
                                Get the latest updates on new releases, special offers, and book signing events directly to your inbox.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="flex-1 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 transition-all font-medium"
                                />
                                <button className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/20">
                                    Subscribe Now
                                </button>
                            </div>
                            <p className="text-sm text-gray-500">No spam, we promise. Unsubscribe at any time.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer (Simplified) */}
            <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-2xl font-bold text-gray-900">
                            Book<span className="text-indigo-600">Store</span>
                        </div>
                        <div className="flex gap-8 text-gray-500">
                            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
                            <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
                        </div>
                        <p className="text-gray-400 text-sm">© 2024 BookStore. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
