import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Heart, Sparkles } from 'lucide-react';

const navLinks = [
    { label: 'Home',to: '/user/home' },
    { label: 'More Books', to: '/user/buy' },
];

const BookHeader = () => {
    const navigate = useNavigate();

    return (
        <motion.header
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="sticky top-0 z-50 border-b border-[#e7dccd] bg-[#f8f3ea]/80 backdrop-blur-xl"
        >
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 rounded-full border border-[#e7dccd] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b5e4d] transition hover:-translate-y-0.5 hover:border-[#0f766e] hover:text-[#0f766e]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>

                <Link to="/" className="group flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-linear-to-br from-[#0f766e] via-[#0ea5a4] to-[#38bdf8] text-white shadow-lg shadow-teal-200/60">
                        <BookOpen className="h-5 w-5" />
                    </span>
                    <span className="hidden sm:block">
                        <span className="block text-lg font-semibold text-[#1f2933]">Readora</span>
                        <span className="block text-xs uppercase tracking-[0.32em] text-[#8b7d6b]">
                            Orbital Library
                        </span>
                    </span>
                </Link>

                <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
                    {navLinks.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition-all ${
                                    isActive
                                        ? 'bg-[#0f766e] text-white shadow-sm'
                                        : 'text-[#6b5e4d] hover:text-[#0f766e]'
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="px-4 pb-4 sm:px-6 lg:hidden">
                <div className="flex items-center gap-2 overflow-x-auto rounded-full border border-[#e7dccd] bg-white/70 p-1 shadow-sm">
                    {navLinks.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition-all ${
                                    isActive
                                        ? 'bg-[#0f766e] text-white shadow-sm'
                                        : 'text-[#6b5e4d] hover:text-[#0f766e]'
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </motion.header>
    );
};

export default BookHeader;
