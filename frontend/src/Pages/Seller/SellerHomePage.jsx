import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerHeader from '../../Components/Seller/SellerHeader';
import SellerFooter from '../../Components/Seller/SellerFooter';
import { Store, Mail, Book, Package, IndianRupee, Star, PartyPopper, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';

const SellerHomePage = () => {
    const navigate = useNavigate();
    const [seller, setSeller] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const storedSeller = localStorage.getItem('seller');
        const token = localStorage.getItem('token');

        if (!storedSeller || !token) {
            navigate('/seller/login');
        } else {
            setSeller(JSON.parse(storedSeller));
            setTimeout(() => setLoaded(true), 100);
        }
    }, [navigate]);

    if (!seller) return null;


    return (
        <div className="flex flex-col min-h-screen bg-slate-50 overflow-x-hidden font-sans">
            <SellerHeader />

            <main className="flex-1 relative">
                {/* Background Shapes */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                    <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] bg-cyan-200/40 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-[10%] -left-[5%] w-[450px] h-[450px] bg-violet-200/40 rounded-full blur-3xl animate-pulse [animation-delay:3s]" />
                    <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-emerald-100/30 rounded-full blur-3xl animate-pulse [animation-delay:6s]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
                    {/* Welcome Section */}
                    <section
                        className={`bg-white/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 shadow-2xl shadow-slate-200/50 border border-white/60 transition-all duration-700 ease-out flex flex-col items-center text-center ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <div className="w-20 h-20 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/30">
                            <PartyPopper className="text-white w-10 h-10" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                            Welcome Back, <span className="text-cyan-600">{seller.storename}</span>!
                        </h2>
                        <p className="text-slate-500 font-medium text-lg max-w-xl">
                            Great to see you again. Here is what's happening with your store today.
                        </p>
                    </section>


                    {/* Store Info Card */}
                    <section
                        style={{ transitionDelay: '500ms' }}
                        className={`bg-white/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl shadow-slate-200/50 border border-white/60 transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-8 w-1.5 bg-cyan-600 rounded-full" />
                            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Store Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { label: 'Store Name', value: seller.storename, icon: Store },
                                { label: 'Email Address', value: seller.email, icon: Mail },
                                { label: 'Account Status', value: 'Active', icon: CheckCircle2, isBadge: true },
                                { label: 'Member Since', value: 'Jan 2026', icon: Clock },
                            ].map((info) => (
                                <div key={info.label} className="space-y-2 group">
                                    <div className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <info.icon className="w-3.5 h-3.5" />
                                        {info.label}
                                    </div>
                                    {info.isBadge ? (
                                        <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                                                {info.value}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="text-lg font-bold text-slate-800 break-words group-hover:text-cyan-600 transition-colors group-hover:translate-x-1 transition-transform">
                                            {info.value}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Quick Actions */}
                    <section
                        style={{ transitionDelay: '700ms' }}
                        className={`bg-white/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl shadow-slate-200/50 border border-white/60 transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-8 w-1.5 bg-cyan-600 rounded-full" />
                            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Quick Actions</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <button
                                onClick={() => navigate('/seller/sell')}
                                className="group p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-100/50 transition-all duration-300 flex flex-col items-center text-center gap-4"
                            >
                                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-cyan-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <Book className="w-7 h-7" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-1">Manage Books</h4>
                                    <p className="text-sm text-slate-500">Add, edit, or remove books from your store.</p>
                                </div>
                                <div className="mt-2 text-xs font-bold text-cyan-600 uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Go to Inventory <ArrowUpRight className="w-3.5 h-3.5" />
                                </div>
                            </button>

                            <button
                                onClick={() => navigate('/seller/orders')}
                                className="group p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100/50 transition-all duration-300 flex flex-col items-center text-center gap-4"
                            >
                                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-amber-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <Package className="w-7 h-7" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-1">View Orders</h4>
                                    <p className="text-sm text-slate-500">Track and manage incoming customer orders.</p>
                                </div>
                                <div className="mt-2 text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                                    See Orders <ArrowUpRight className="w-3.5 h-3.5" />
                                </div>
                            </button>

                            <button
                                onClick={() => navigate('/seller/reviews')}
                                className="group p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-100 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/50 transition-all duration-300 flex flex-col items-center text-center gap-4"
                            >
                                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-violet-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <Star className="w-7 h-7" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-1">Read Reviews</h4>
                                    <p className="text-sm text-slate-500">See feedback and ratings on your books.</p>
                                </div>
                                <div className="mt-2 text-xs font-bold text-violet-600 uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Open Reviews <ArrowUpRight className="w-3.5 h-3.5" />
                                </div>
                            </button>
                        </div>
                    </section>
                </div>
            </main>

            <SellerFooter />
        </div>
    );
};

export default SellerHomePage;
