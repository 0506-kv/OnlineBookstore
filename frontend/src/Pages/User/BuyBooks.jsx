import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import BookListItem from '../../Components/User/BookListItem';
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

    const handleAddToCart = async (book) => {
        if (!book?._id) return;
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/user/login');
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/cart/add`,
                { bookId: book._id, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/user/cart');
        } catch (err) {
            console.error('Error adding to cart:', err);
            alert('Failed to add to cart. Please try again.');
        }
    };

    if (!user) return null;

    return (
        <div className="user-shell min-h-screen flex flex-col bg-[#f0f4f8]">
            <UserHeader user={user} />

            <main className="flex-1">
                <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Hero / filter section */}
                    <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                    Browse Books
                                </h1>
                                <p className="mt-1 text-sm text-gray-500">
                                    Discover your next great read from our community sellers.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="relative group">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#0f766e]" />
                                    </div>
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className="block w-full rounded-full border-0 bg-gray-100 py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#0f766e] sm:w-64 sm:text-sm sm:leading-6 transition-all"
                                        placeholder="Search title, author..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="mt-6 flex flex-wrap gap-2 border-t border-gray-100 pt-6">
                            <span className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                <Filter className="h-3 w-3" /> Filters:
                            </span>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${activeCategory === category
                                        ? 'bg-[#0f766e] text-white'
                                        : 'bg-white text-gray-600 ring-1 ring-inset ring-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <section>
                        {loading ? (
                            <div className="flex flex-col gap-4">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div
                                        key={`skeleton-${index}`}
                                        className="flex animate-pulse flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row"
                                    >
                                        <div className="h-48 w-full shrink-0 rounded-lg bg-gray-200 sm:w-32" />
                                        <div className="flex flex-1 flex-col gap-3">
                                            <div className="h-6 w-3/4 rounded bg-gray-200" />
                                            <div className="h-4 w-1/2 rounded bg-gray-200" />
                                            <div className="mt-auto h-10 w-32 rounded bg-gray-200" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : error ? (
                            <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
                                <h3 className="text-lg font-semibold text-red-800">Unable to load books</h3>
                                <p className="mt-2 text-sm text-red-600">{error}</p>
                                <button
                                    onClick={fetchBooks}
                                    className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-200 hover:bg-red-50"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : filteredBooks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm">
                                <div className="rounded-full bg-gray-100 p-4">
                                    <Search className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">No books found</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    We couldn't find any books matching your search or filters.
                                </p>
                                <button
                                    onClick={() => {
                                        setQuery('');
                                        setActiveCategory('All');
                                    }}
                                    className="mt-6 text-sm font-semibold text-[#0f766e] hover:text-[#0d5f5a]"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <motion.div
                                layout
                                className="flex flex-col gap-4"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredBooks.map((book) => (
                                        <BookListItem
                                            key={book._id}
                                            book={book}
                                            onAddToCart={handleAddToCart}
                                        />
                                    ))}
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
