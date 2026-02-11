import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, BookOpen, ShieldCheck, Sparkles, UserCircle } from 'lucide-react';
import UserHeader from '../../Components/User/UserHeader';
import UserFooter from '../../Components/User/UserFooter';


const UserHomePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!storedUser || !token) {
            navigate('/user/login');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    if (!user) return null;

    const firstName = user.fullname?.split(' ')[0] || 'Reader';

    return (
        <div className="user-shell font-serif min-h-screen flex flex-col">
            <UserHeader user={user} />

            <main className="flex-1">
                <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
                    <motion.section
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="relative overflow-hidden rounded-[28px] border border-[#eadfd0] bg-linear-to-br from-white via-[#fff8f1] to-[#fef1e7] p-8 md:p-12"
                    >
                        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#0ea5a4]/20 blur-3xl" />
                        <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#f97316]/20 blur-3xl" />

                        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#8b7d6b]">
                                    <Sparkles className="h-4 w-4" />
                                    Reader Dashboard
                                </div>
                                <h1 className="user-heading mt-4 text-3xl font-semibold text-[#1f2933] md:text-4xl">
                                    Welcome back, {firstName}.
                                </h1>
                                <p className="mt-3 text-base text-[#5c4f44]">
                                    Your profile is ready. Jump into the full catalog or review your account details below.
                                </p>

                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/user/buy')}
                                        className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-200/60 transition-all hover:-translate-y-0.5"
                                    >
                                        Browse all books
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#6b5b4a]">
                                    <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-2">
                                        <BadgeCheck className="h-4 w-4 text-[#0f766e]" />
                                        Verified account
                                    </div>
                                </div>
                            </div>

                            <div
                                id="profile"
                                className="rounded-3xl border border-[#eadfd0] bg-white/70 p-6 shadow-sm backdrop-blur"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1f2933] text-white">
                                        <UserCircle className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8b7d6b]">
                                            Profile
                                        </div>
                                        <div className="user-heading text-xl text-[#1f2933]">Account snapshot</div>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4 text-sm">
                                    <div className="flex items-center justify-between border-b border-[#f1e7dd] pb-3">
                                        <span className="user-muted">Full name</span>
                                        <span className="font-semibold text-[#1f2933]">{user.fullname || 'Reader'}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-[#f1e7dd] pb-3">
                                        <span className="user-muted">Email</span>
                                        <span className="font-semibold text-[#1f2933]">{user.email || 'Not provided'}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-[#f1e7dd] pb-3">
                                        <span className="user-muted">Member ID</span>
                                        <span className="max-w-50 truncate font-semibold text-[#1f2933]">
                                            {user._id || 'Not assigned'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="user-muted">Status</span>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-[#0f766e]/10 px-3 py-1 text-xs font-semibold text-[#0f766e]">
                                            <BadgeCheck className="h-3.5 w-3.5" />
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </main>

            <UserFooter />
        </div>
    );
};

export default UserHomePage;
