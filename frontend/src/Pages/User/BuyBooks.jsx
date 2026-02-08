import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Calendar, Filter, IndianRupee, Mail, Search, Sparkles, User } from 'lucide-react';
import UserHeader from '../../Components/User/UserHeader';
import UserFooter from '../../Components/User/UserFooter';

const BuyBooks = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!storedUser || !token) {
            navigate('/user/login');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/books/all`);
            setBooks(response.data.books || []);
        } catch (err) {
            console.error('Error fetching books:', err);
            setError('We could not load the catalog right now. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const categories = useMemo(() => {
        const set = new Set();
        books.forEach((book) => {
            const category = book.category?.trim() ? book.category.trim() : 'Uncategorized';
            set.add(category);
        });
        return ['All', ...Array.from(set)];
    }, [books]);

    const filteredBooks = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        return books.filter((book) => {
            const category = book.category?.trim() ? book.category.trim() : 'Uncategorized';
            const matchesCategory = activeCategory === 'All' || category === activeCategory;
            const matchesQuery =
                !normalizedQuery ||
                book.name?.toLowerCase().includes(normalizedQuery) ||
                book.author?.toLowerCase().includes(normalizedQuery) ||
                book.sellerId?.storename?.toLowerCase().includes(normalizedQuery);
            return matchesCategory && matchesQuery;
        });
    }, [books, activeCategory, query]);

    const formatDate = (value) => {
        if (!value) return 'Date not set';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return 'Date not set';
        return date.toLocaleDateString();
    };

    if (!user) return null;

    return (
        <div className="user-shell min-h-screen flex flex-col">
            <UserHeader user={user} />

            <main className="flex-1">
                <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="relative overflow-hidden rounded-[28px] border border-[#eadfd0] bg-white p-8 shadow-sm md:p-12"
                    >
                        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#0ea5a4]/15 blur-3xl" />
                        <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#f97316]/15 blur-3xl" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#eadfd0] bg-[#f9f5ef] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#8b7d6b]">
                                <Sparkles className="h-4 w-4" />
                                Marketplace
                            </div>
                            <h1 className="user-heading mt-4 text-3xl font-semibold text-[#1f2933] md:text-4xl">
                                Browse all books
                            </h1>
                            <p className="mt-3 text-base text-[#5c4f44]">
                                Every listing from every seller, thoughtfully organized for you.
                            </p>

                            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b7d6b]" />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Search by title, author, or seller..."
                                        className="w-full rounded-full border border-[#eadfd0] bg-white py-3 pl-11 pr-4 text-sm text-[#1f2933] outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/15"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eadfd0] bg-[#f9f5ef] text-[#8b7d6b]">
                                        <Filter className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                type="button"
                                                onClick={() => setActiveCategory(category)}
                                                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all ${
                                                    activeCategory === category
                                                        ? 'border-[#0f766e] bg-[#0f766e] text-white shadow-sm'
                                                        : 'border-[#eadfd0] bg-white text-[#8b7d6b] hover:border-[#0f766e] hover:text-[#0f766e]'
                                                }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <section className="mt-10">
                        {loading ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div
                                        key={`skeleton-${index}`}
                                        className="animate-pulse rounded-3xl border border-[#eadfd0] bg-white p-6"
                                    >
                                        <div className="h-12 w-12 rounded-2xl bg-[#f1e7dd]" />
                                        <div className="mt-4 h-4 w-2/3 rounded bg-[#f1e7dd]" />
                                        <div className="mt-2 h-3 w-1/2 rounded bg-[#f1e7dd]" />
                                        <div className="mt-6 h-20 rounded bg-[#f1e7dd]" />
                                    </div>
                                ))}
                            </div>
                        ) : error ? (
                            <div className="rounded-3xl border border-[#f2c3b4] bg-[#fff4f0] p-6 text-[#b34a2f]">
                                <h2 className="text-lg font-semibold">Unable to load books</h2>
                                <p className="mt-2 text-sm">{error}</p>
                                <button
                                    type="button"
                                    onClick={fetchBooks}
                                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#f2c3b4] bg-white px-4 py-2 text-sm font-semibold text-[#b34a2f] transition hover:-translate-y-0.5"
                                >
                                    Try again
                                </button>
                            </div>
                        ) : filteredBooks.length === 0 ? (
                            <div className="rounded-3xl border border-[#eadfd0] bg-white p-6 text-[#5c4f44]">
                                <h2 className="text-lg font-semibold">No matching books</h2>
                                <p className="mt-2 text-sm">
                                    Try a different search or switch categories to see more listings.
                                </p>
                            </div>
                        ) : (
                            <motion.div
                                layout
                                variants={{
                                    hidden: { opacity: 0 },
                                    show: { opacity: 1, transition: { staggerChildren: 0.06 } }
                                }}
                                initial="hidden"
                                animate="show"
                                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredBooks.map((book) => {
                                        const category = book.category?.trim()
                                            ? book.category.trim()
                                            : 'Uncategorized';
                                        return (
                                            <motion.article
                                                key={book._id}
                                                layout
                                                variants={{
                                                    hidden: { opacity: 0, y: 18 },
                                                    show: { opacity: 1, y: 0 }
                                                }}
                                                exit={{ opacity: 0, y: 12 }}
                                                whileHover={{ y: -6 }}
                                                transition={{ duration: 0.3 }}
                                                className="group relative flex flex-col rounded-3xl border border-[#eadfd0] bg-white p-6 shadow-sm"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0f766e] to-[#0ea5a4] text-white text-lg font-semibold shadow-lg shadow-teal-200/60">
                                                        {book.name?.charAt(0)?.toUpperCase() || 'B'}
                                                    </div>
                                                    <span className="rounded-full border border-[#eadfd0] bg-[#f9f5ef] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b7d6b]">
                                                        {category}
                                                    </span>
                                                </div>

                                                <h3 className="mt-4 text-lg font-semibold text-[#1f2933]">{book.name}</h3>
                                                <p className="mt-1 flex items-center gap-2 text-sm text-[#6b5b4a]">
                                                    <User className="h-4 w-4" />
                                                    {book.author}
                                                </p>
                                                <p className="mt-3 text-sm text-[#5c4f44] line-clamp-3">
                                                    {book.description || 'No description provided.'}
                                                </p>

                                                <div className="mt-4 flex items-center justify-between border-t border-[#f1e7dd] pt-4 text-sm">
                                                    <div className="flex items-center gap-1 text-lg font-semibold text-[#0f766e]">
                                                        <IndianRupee className="h-4 w-4" />
                                                        {book.price}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-[#8b7d6b]">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        {formatDate(book.dateOfPublishing)}
                                                    </div>
                                                </div>

                                                <div className="mt-4 rounded-2xl border border-[#eadfd0] bg-[#f9f5ef] p-4">
                                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8b7d6b]">
                                                        <BookOpen className="h-4 w-4" />
                                                        Seller
                                                    </div>
                                                    <div className="mt-2 text-sm font-semibold text-[#1f2933]">
                                                        {book.sellerId?.storename || 'Independent seller'}
                                                    </div>
                                                    <div className="mt-1 flex items-center gap-2 text-xs text-[#8b7d6b]">
                                                        <Mail className="h-3.5 w-3.5" />
                                                        {book.sellerId?.email || 'Contact info not available'}
                                                    </div>
                                                </div>
                                            </motion.article>
                                        );
                                    })}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </section>
                </div>
            </main>

            <UserFooter />
        </div>
    );
};

export default BuyBooks;
