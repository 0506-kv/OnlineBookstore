import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Star, User } from 'lucide-react';
import SellerHeader from '../../Components/Seller/SellerHeader';
import SellerFooter from '../../Components/Seller/SellerFooter';

const SellerBookReviews = () => {
    const navigate = useNavigate();
    const [seller, setSeller] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedSeller = localStorage.getItem('seller');
        const token = localStorage.getItem('token');

        if (!storedSeller || !token) {
            navigate('/seller/login');
            return;
        }

        setSeller(JSON.parse(storedSeller));
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const fetchReviews = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/reviews/seller`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setReviews(response.data.reviews || []);
            } catch (err) {
                console.error('Error fetching seller reviews:', err);
                setError('We could not load reviews right now.');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const averageRating = useMemo(() => {
        if (!reviews.length) return 0;
        const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
        return total / reviews.length;
    }, [reviews]);

    const uniqueBooks = useMemo(() => {
        const ids = new Set();
        reviews.forEach((review) => {
            const id = review.bookId?._id || review.bookId;
            if (id) ids.add(id);
        });
        return ids.size;
    }, [reviews]);

    const formattedAverage = reviews.length ? averageRating.toFixed(1) : 'N/A';

    const renderStars = (value, size = 'h-4 w-4') => {
        const filledCount = Math.round(Number(value || 0));
        return Array.from({ length: 5 }).map((_, index) => {
            const filled = index < filledCount;
            return (
                <Star
                    key={`${value}-${index}`}
                    className={`${size} ${filled ? 'text-amber-500' : 'text-slate-300'}`}
                    fill={filled ? 'currentColor' : 'none'}
                />
            );
        });
    };

    if (!seller) return null;

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
            <SellerHeader />

            <main className="flex-1">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <section className="rounded-3xl border border-slate-200/60 bg-white/90 p-8 shadow-xl shadow-slate-200/40">
                        <div className="flex flex-wrap items-center justify-between gap-6">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                                    <BookOpen className="h-4 w-4" />
                                    Reviews
                                </div>
                                <h1 className="mt-4 text-3xl font-bold text-slate-900">Customer feedback</h1>
                                <p className="mt-2 text-sm text-slate-500">
                                    See what readers are saying about the books you have sold.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm">
                                    {reviews.length} Reviews
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm">
                                    Avg {formattedAverage}
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm">
                                    {uniqueBooks} Books
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            {loading ? (
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                                    Loading reviews...
                                </div>
                            ) : error ? (
                                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-600">
                                    {error}
                                </div>
                            ) : reviews.length === 0 ? (
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                                    No reviews yet. Once customers leave feedback, it will appear here.
                                </div>
                            ) : (
                                reviews.map((review) => {
                                    const book = review.bookId || {};
                                    const reviewer = review.userId || {};
                                    const reviewDate = review.createdAt
                                        ? new Date(review.createdAt).toLocaleDateString()
                                        : 'Date not available';

                                    return (
                                        <div
                                            key={review._id}
                                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                                        >
                                            <div className="flex flex-wrap items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-slate-900">
                                                        {book.name || 'Book review'}
                                                    </h3>
                                                    <p className="text-sm text-slate-500">
                                                        {book.author || 'Unknown author'}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center gap-1 text-amber-500">
                                                        {renderStars(review.rating, 'h-4 w-4')}
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-900">
                                                        {review.rating}/5
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="mt-3 text-sm text-slate-600">{review.comment}</p>
                                            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-slate-400" />
                                                    <span>
                                                        {reviewer.fullname || 'Customer'}
                                                        {reviewer.email ? ` - ${reviewer.email}` : ''}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-slate-400" />
                                                    <span>{reviewDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <SellerFooter />
        </div>
    );
};

export default SellerBookReviews;
