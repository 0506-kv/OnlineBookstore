import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStore, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SellerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Seller Login Attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 flex justify-center items-center p-4">
      <div className="absolute top-8 left-8">
        <Link to="/login" className="flex items-center text-white/80 hover:text-white transition-colors gap-2">
          <FaArrowLeft /> Back
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 md:p-12 w-full max-w-md shadow-2xl border border-white/20"
      >
        <div className="flex justify-center mb-8">
          <div className="bg-emerald-500/80 p-4 rounded-full shadow-lg shadow-emerald-500/30">
            <FaStore className="text-3xl text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white text-center mb-8">Seller Portal</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-emerald-200" />
            </div>
            <input
              type="email"
              placeholder="Business Email"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white/10 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-emerald-200" />
            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white/10 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-emerald-500/50 transition-all"
            type="submit"
          >
            Access Dashboard
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <a href="#" className="text-emerald-200 hover:text-white text-sm transition-colors">Contact Support</a>
        </div>
      </motion.div>
    </div>
  );
};

export default SellerLogin;
