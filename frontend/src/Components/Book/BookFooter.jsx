import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, MapPin, Sparkles } from 'lucide-react';

const BookFooter = () => {
    return (
        <footer className="relative overflow-hidden border-t border-[#e7dccd] bg-[#f8f3ea]">
            <div className="absolute inset-0">
                <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.18),transparent_68%)] blur-3xl" />
                <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.2),transparent_70%)] blur-3xl" />
            </div>

            <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
                <div className="grid gap-10 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-linear-to-br from-[#0f766e] via-[#0ea5a4] to-[#38bdf8] text-white shadow-lg shadow-teal-200/60">
                                <BookOpen className="h-5 w-5" />
                            </span>
                            <div>
                                <div className="text-lg font-semibold text-[#1f2933]">Readora</div>
                                <div className="text-xs uppercase tracking-[0.32em] text-[#8b7d6b]">Orbital Library</div>
                            </div>
                        </div>
                        <p className="text-sm text-[#6b5e4d]">
                            Crafted for readers who want stories that feel like stardust. Discover rare editions, curated
                            bundles, and author-led journeys.
                        </p>
                        <div className="flex items-center gap-3 text-sm text-[#6b5e4d]">
                            <MapPin className="h-4 w-4" />
                            Global dispatch from Mumbai, Jaipur, and Kolkata hubs.
                        </div>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b7d6b]">Explore</div>
                        <div className="flex flex-col gap-2 text-[#6b5e4d]">
                            <Link className="transition hover:text-[#0f766e]" to="/user/buy">
                                Browse catalog
                            </Link>
                            <Link className="transition hover:text-[#0f766e]" to="/user/home">
                                Reading dashboard
                            </Link>
                            <Link className="transition hover:text-[#0f766e]" to="/">
                                Editorial picks
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b7d6b]">Community</div>
                        <div className="flex flex-col gap-2 text-[#6b5e4d]">
                            <span className="inline-flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-[#f97316]" />
                                Author salons every Friday
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-[#0f766e]" />
                                Cosmic reading challenges
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-[#38bdf8]" />
                                Limited-run drops
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b7d6b]">Support</div>
                        <div className="flex flex-col gap-2 text-[#6b5e4d]">
                            <span>Shipping in 24-48 hours</span>
                            <span>Easy 14-day returns</span>
                            <span className="inline-flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                hello@readora.com
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[#e7dccd] pt-6 text-xs uppercase tracking-[0.26em] text-[#8b7d6b] sm:flex-row sm:items-center">
                    <span>© 2026 Readora. All rights reserved.</span>
                    <span>Designed for the cosmic reader.</span>
                </div>
            </div>
        </footer>
    );
};

export default BookFooter;
