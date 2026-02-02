import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Store, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

const ROLES = [
    {
        id: "reader",
        title: "Reader",
        tagline: "Discover Amazing Books",
        desc: "Browse millions of books and get personalized recommendations",
        icon: BookOpen,
        emoji: "📖",
        gradient: "from-indigo-600 to-blue-500",
        bgGradient: "from-indigo-50 to-blue-50",
        path: "/user/login"
    },
    {
        id: "seller",
        title: "Seller",
        tagline: "Grow Your Business",
        desc: "Reach millions of readers and manage your inventory",
        icon: Store,
        emoji: "🏢",
        gradient: "from-teal-600 to-emerald-500",
        bgGradient: "from-teal-50 to-emerald-50",
        path: "/seller/login"
    },
];

function RoleCard({ role, index }) {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5, type: "spring" }}
            whileHover={{ y: -12, scale: 1.02 }}
            onClick={() => navigate(role.path)}
            className="group cursor-pointer w-full h-full"
        >
            <div className={`relative bg-gradient-to-br ${role.bgGradient} rounded-3xl p-8 border border-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col`}>
                {/* Background Emoji */}
                <div className="absolute -right-4 -top-4 text-[120px] opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                    {role.emoji}
                </div>

                {/* Icon */}
                <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    className={`relative z-10 w-16 h-16 bg-gradient-to-br ${role.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                    <role.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 transition-all">
                        {role.title}
                    </h3>
                    <p className={`text-sm font-semibold bg-gradient-to-r ${role.gradient} bg-clip-text text-transparent mb-3`}>
                        {role.tagline}
                    </p>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">
                        {role.desc}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-emerald-600 transition-colors font-semibold">
                        <span>Continue</span>
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <ArrowRight className="w-5 h-5" />
                        </motion.div>
                    </div>
                </div>

                {/* Bottom gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${role.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
        </motion.div>
    );
}

export default function LoginPage() {
    return (
        <div className="h-screen bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/50 flex flex-col relative overflow-hidden">
            {/* Animated Background Blobs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-emerald-200/50 to-teal-200/50 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1], x: [0, -20, 0], y: [0, 30, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200/50 to-cyan-200/50 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-amber-200/40 to-orange-200/40 rounded-full blur-3xl"
            />

            {/* Main Content */}
            <main className="relative z-10 container mx-auto px-6 py-8 flex flex-col items-center justify-center flex-grow">
                {/* Back to Home */}
                <Link
                    to="/"
                    className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors font-medium group"
                >
                    <motion.div whileHover={{ x: -3 }}>
                        <ArrowRight className="w-4 h-4 rotate-180" />
                    </motion.div>
                    Back to Home
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-10"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-xl shadow-emerald-500/30 mb-4"
                    >
                        <BookOpen size={30} className="text-white" />
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Welcome Back! 👋
                    </h1>
                    <p className="text-xl text-gray-500">
                        Choose your account type to continue
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="flex flex-col md:flex-row gap-10 w-full max-w-4xl justify-center items-stretch">
                    {ROLES.map((role, idx) => (
                        <div key={role.id} className="w-full md:w-1/2 flex">
                            <RoleCard role={role} index={idx} />
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-10 text-center"
                >
                    <p className="text-gray-500 mb-6 text-lg">
                        New to Readora? <span className="text-2xl">🎉</span>
                    </p>
                    <Link to="/register">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-emerald-500/30 hover:from-emerald-500 hover:to-teal-500 transition-all"
                        >
                            <Sparkles size={22} />
                            Create Free Account
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </motion.div>
            </main>
        </div>
    );
}
