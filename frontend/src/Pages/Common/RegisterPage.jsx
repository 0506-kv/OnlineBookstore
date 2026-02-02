import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Store, ShieldCheck, ArrowRight, Sparkles, Gift } from 'lucide-react';

const ROLES = [
    {
        id: "user",
        title: "Reader",
        desc: "Browse and purchase your favorite books",
        icon: BookOpen,
        emoji: "📖",
        gradient: "from-indigo-600 to-blue-500",
        bgGradient: "from-indigo-50 to-blue-50",
        path: "/user/register"
    },
    {
        id: "seller",
        title: "Seller",
        desc: "Start selling books to millions of readers",
        icon: Store,
        emoji: "🏢",
        gradient: "from-teal-600 to-emerald-500",
        bgGradient: "from-teal-50 to-emerald-50",
        path: "/seller/register"
    },
];

const RegisterPage = () => {
    return (
        <div className="h-screen bg-gradient-to-br from-purple-50/50 via-white to-emerald-50/50 flex flex-col relative overflow-hidden">
            {/* Animated Background Blobs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1], x: [0, -20, 0], y: [0, 30, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-emerald-200/50 to-teal-200/50 rounded-full blur-3xl"
            />

            {/* Main Content */}
            <main className="relative z-10 container mx-auto px-6 py-8 flex flex-col items-center justify-center flex-grow">
                {/* Back to Home */}
                <Link
                    to="/"
                    className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors font-medium"
                >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    Back to Home
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-2xl mx-auto mb-10"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl shadow-purple-500/30 mb-4"
                    >
                        <Gift size={30} className="text-white" />
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Join Readora! 🎉
                    </h1>
                    <p className="text-xl text-gray-500">
                        Create your account and start your reading journey
                    </p>

                    {/* Benefits Banner */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl shadow-lg"
                    >
                        <Sparkles size={20} />
                        <span className="font-semibold">Join today and get 20% off your first order!</span>
                    </motion.div> */}
                </motion.div>

                {/* Cards Grid */}
                <div className="flex flex-col md:flex-row gap-10 w-full max-w-4xl justify-center items-stretch">
                    {ROLES.map((role, idx) => (
                        <Link key={role.id} to={role.path} className="w-full md:w-1/2 flex">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.15 }}
                                whileHover={{ y: -12, scale: 1.02 }}
                                className="group cursor-pointer w-full"
                            >
                                <div className={`relative bg-gradient-to-br ${role.bgGradient} rounded-3xl p-8 border border-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col`}>
                                    {/* Background Emoji */}
                                    <div className="absolute -right-4 -top-4 text-[100px] opacity-10 group-hover:opacity-20 transition-opacity">
                                        {role.emoji}
                                    </div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <motion.div
                                            whileHover={{ rotate: [0, -10, 10, 0] }}
                                            className={`w-16 h-16 bg-gradient-to-br ${role.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}
                                        >
                                            <role.icon className="w-8 h-8 text-white" />
                                        </motion.div>

                                        <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 transition-all font-outfit">
                                            {role.title}
                                        </h2>
                                        <p className="text-gray-500 mb-6 flex-grow">{role.desc}</p>

                                        <div className="flex items-center gap-2 text-gray-400 group-hover:text-emerald-600 font-semibold transition-colors mt-auto">
                                            <span>Get Started</span>
                                            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                                <ArrowRight className="w-5 h-5" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${role.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-10 text-center"
                >
                    <p className="text-gray-500 mb-4 text-lg">Already have an account?</p>
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-emerald-500 text-emerald-600 rounded-2xl font-bold text-lg hover:bg-emerald-600 hover:text-white transition-all shadow-lg hover:shadow-emerald-500/20"
                    >
                        Sign In
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </main>
        </div>
    );
};

export default RegisterPage;
