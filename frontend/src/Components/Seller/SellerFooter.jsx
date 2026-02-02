import React from 'react';
import { Store, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const SellerFooter = () => {
    const currentYear = new Date().getFullYear();

    const sections = [
        {
            title: 'Quick Links',
            links: [
                { label: 'Dashboard', href: '/seller/home' },
                { label: 'My Books', href: '/seller/my-books' },
                { label: 'Products', href: '/seller/products' },
                { label: 'Analytics', href: '/seller/analytics' },
            ],
        },
        {
            title: 'Resources',
            links: [
                { label: 'Help Center', href: '/seller/help' },
                { label: 'Documentation', href: '/seller/docs' },
                { label: 'Contact Support', href: '/seller/support' },
                { label: 'FAQ', href: '/seller/faq' },
            ],
        },
        {
            title: 'Account',
            links: [
                { label: 'Profile Settings', href: '/seller/profile' },
                { label: 'Security', href: '/seller/security' },
                { label: 'Billing', href: '/seller/billing' },
                { label: 'Notifications', href: '/seller/notifications' },
            ],
        },
    ];

    return (
        <footer className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 font-sans mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                <Store className="text-white w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">Seller Portal</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            Empowering sellers to manage Readora with ease.
                            Track your sales, manage inventory, and reach thousands of readers globally.
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                                <button
                                    key={idx}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 hover:bg-cyan-600 hover:border-cyan-500 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm"
                                >
                                    <Icon className="w-4.5 h-4.5" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {sections.map((section) => (
                        <div key={section.title} className="space-y-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">{section.title}</h3>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-slate-400 hover:text-cyan-400 hover:translate-x-1 inline-block transition-all duration-200"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-slate-700 to-transparent mb-8" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
                    <p>© {currentYear} Seller Portal. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
                        <span className="w-1 h-1 bg-slate-700 rounded-full" />
                        <a href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
                        <span className="w-1 h-1 bg-slate-700 rounded-full" />
                        <a href="/cookies" className="hover:text-cyan-400 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default SellerFooter;
