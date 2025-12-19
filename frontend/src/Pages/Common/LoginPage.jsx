import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaStore, FaUserShield } from 'react-icons/fa';

const LoginPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        },
        hover: {
            y: -10,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
            transition: { type: "spring", stiffness: 300 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center p-4">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="text-4xl md:text-5xl font-bold text-white mb-12 text-center drop-shadow-lg"
            >
                Welcome Back
            </motion.h1>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
            >
                {/* User Card */}
                <Link to="/user/login">
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 flex flex-col items-center justify-center border border-white/20 cursor-pointer h-80 hover:bg-white/20 transition-colors"
                    >
                        <div className="bg-blue-500/80 p-6 rounded-full mb-6 shadow-lg shadow-blue-500/30">
                            <FaUser className="text-4xl text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">User</h2>
                        <p className="text-blue-100 text-center">Login to browse and buy books</p>
                    </motion.div>
                </Link>

                {/* Seller Card */}
                <Link to="/seller/login">
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 flex flex-col items-center justify-center border border-white/20 cursor-pointer h-80 hover:bg-white/20 transition-colors"
                    >
                        <div className="bg-emerald-500/80 p-6 rounded-full mb-6 shadow-lg shadow-emerald-500/30">
                            <FaStore className="text-4xl text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Seller</h2>
                        <p className="text-emerald-100 text-center">Manage your bookstore inventory</p>
                    </motion.div>
                </Link>

                {/* Admin Card */}
                <Link to="/admin/login">
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 flex flex-col items-center justify-center border border-white/20 cursor-pointer h-80 hover:bg-white/20 transition-colors"
                    >
                        <div className="bg-rose-500/80 p-6 rounded-full mb-6 shadow-lg shadow-rose-500/30">
                            <FaUserShield className="text-4xl text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Admin</h2>
                        <p className="text-rose-100 text-center">System control and oversight</p>
                    </motion.div>
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-12 text-white/60 text-sm"
            >
                Select your role to continue
            </motion.div>
        </div>
    );
};

export default LoginPage;
