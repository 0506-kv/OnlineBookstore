import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, BookOpen, ChevronRight } from 'lucide-react';
import Navbar from "../../Components/Common/Navbar";
import { toast } from 'react-hot-toast';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to a backend
        console.log(formData);
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactInfo = [
        { icon: MapPin, title: 'Visit Us', details: '123 Book St, Library City, BK 56789', color: 'bg-emerald-100 text-emerald-600' },
        { icon: Mail, title: 'Email Us', details: 'support@readora.com', color: 'bg-blue-100 text-blue-600' },
        { icon: Phone, title: 'Call Us', details: '+1 (555) 123-4567', color: 'bg-purple-100 text-purple-600' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Navbar />

            {/* Hero & Form Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-emerald-600 to-teal-800 rounded-b-[50px] lg:rounded-b-[80px]" />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-white mb-16"
                    >
                        <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
                        <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                            Have a question or just want to say hi? We'd love to hear from you.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        {/* Contact Info Cards */}
                        <div className="space-y-6 lg:col-span-1">
                            {contactInfo.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 + 0.3 }}
                                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4 hover:shadow-xl transition-shadow"
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{item.title}</h3>
                                        <p className="text-sm text-gray-500">{item.details}</p>
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <MessageSquare size={32} className="mb-4 text-purple-200" />
                                    <h3 className="text-2xl font-bold mb-2">Live Chat</h3>
                                    <p className="text-purple-100 mb-6">Need instant help? Start a live chat with our support team.</p>
                                    <button className="px-5 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                        Start Chat
                                    </button>
                                </div>
                                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                            </motion.div>
                        </div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="lg:col-span-2 bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-100"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    ></textarea>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
                                >
                                    <Send size={20} />
                                    Send Message
                                </motion.button>
                            </form>
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

export default ContactUs;
