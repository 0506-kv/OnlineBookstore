import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Shield, ChevronRight, Heart, Sparkles, Coffee } from 'lucide-react';
import Navbar from "../../Components/Common/Navbar";

const AboutUs = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const stats = [
        { label: 'Books Available', value: '5M+', icon: BookOpen, color: 'from-emerald-500 to-teal-500' },
        { label: 'Happy Readers', value: '50K+', icon: Users, color: 'from-blue-500 to-cyan-500' },
        { label: 'Registered Sellers', value: '1,200+', icon: Award, color: 'from-purple-500 to-pink-500' },
        { label: 'Cities Covered', value: '100+', icon: Shield, color: 'from-amber-500 to-orange-500' },
    ];

    const team = [
        { name: 'Krish Parikh', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
        { name: 'Sarah Wilson', role: 'Head of Content', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
        { name: 'David Chen', role: 'Tech Lead', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-white">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-50/50 to-transparent" />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl"
                    />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
                            👋 HELLO THERE
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
                            We Are <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Readora</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            More than just a bookstore. We are a community of book lovers, creators, and dreamers connecting through the power of stories.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-6 rounded-3xl bg-gray-50 border border-gray-100 text-center hover:shadow-lg transition-all"
                            >
                                <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                    <stat.icon size={28} className="text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                <p className="text-gray-500 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800"
                                    alt="Library"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-8 left-8 text-white">
                                    <p className="text-lg font-medium opacity-90">Established 2026</p>
                                    <h3 className="text-2xl font-bold">The Journey Begins</h3>
                                </div>
                            </div>
                            <div className="absolute -bottom-8 -right-8 w-64 p-6 bg-white rounded-2xl shadow-xl border border-gray-100 hidden lg:block">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                                        <Coffee size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Our Mission</p>
                                        <p className="text-xs text-gray-500">Spread the joy of reading</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 italic">"Books are a uniquely portable magic."</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-4xl font-bold text-gray-900">Crafting Stories, <br /><span className="text-emerald-600">Inspiring Minds.</span></h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Readora started with a simple idea: to make books accessible to everyone, everywhere. We believe that every book has a reader, and every reader deserves a great story.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Today, we are proud to be one of the fastest-growing online bookstores, connecting independent sellers with passionate readers. Our platform is built on trust, quality, and a shared love for literature.
                            </p>
                            <div className="pt-4">
                                <button className="px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2">
                                    Meet the Team <ChevronRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer - Copied from LandingPage for consistency */}
            <footer className="bg-gray-900 text-white pt-20 pb-8">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <BookOpen size={24} />
                                </div>
                                <span className="text-2xl font-bold">Readora</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-6">
                                Your trusted destination for discovering amazing books and stories that inspire.
                            </p>
                        </div>
                        {[
                            { title: 'Quick Links', links: ['Home', 'Categories', 'Best Sellers', 'New Arrivals'] },
                            { title: 'Support', links: ['Help Center', 'Track Order', 'Shipping', 'Returns'] },
                            { title: 'Company', links: ['About', 'Contact', 'Careers', 'Blog'] }
                        ].map((section, idx) => (
                            <div key={idx}>
                                <h4 className="font-bold mb-4 text-lg">{section.title}</h4>
                                <ul className="space-y-3">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group">
                                                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">{new Date().getFullYear()} Readora. Made with ❤️ for book lovers</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;
