import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Star,
    IndianRupee,
    Calendar,
    User,
    Store,
    ShoppingCart,
    ArrowRight
} from 'lucide-react';

const BookListItem = ({ book, onAddToCart }) => {
    const navigate = useNavigate();
    const [coverUrl, setCoverUrl] = useState('');
    const [coverLoaded, setCoverLoaded] = useState(false);
    const [coverSource, setCoverSource] = useState('');

    const coverTitle = book.name?.trim() || '';
    const coverAuthor = book.author?.trim() || '';
    const coverIsbn = String(book.isbn || '').replace(/[^0-9X]/gi, '');

    // Determine cover source priority
    useEffect(() => {
        if (coverIsbn) {
            setCoverSource('isbn');
            return;
        }
        if (coverTitle || coverAuthor) {
            setCoverSource('search');
            return;
        }
        setCoverSource('');
    }, [coverAuthor, coverIsbn, coverTitle]);

    // Fetch cover image
    useEffect(() => {
        let active = true;
        const controller = new AbortController();
        const setIfActive = (url) => {
            if (active) setCoverUrl(url);
        };

        setCoverLoaded(false);

        if (coverSource === 'isbn' && coverIsbn) {
            setIfActive(`https://covers.openlibrary.org/b/isbn/${coverIsbn}-M.jpg?default=false`);
            return () => {
                active = false;
                controller.abort();
            };
        }

        if (coverSource === 'search') {
            setIfActive('');
            if (!coverTitle && !coverAuthor) {
                return () => {
                    active = false;
                    controller.abort();
                };
            }
            (async () => {
                try {
                    const params = new URLSearchParams();
                    if (coverTitle) params.set('title', coverTitle);
                    if (coverAuthor) params.set('author', coverAuthor);
                    params.set('limit', '1');
                    const response = await fetch(`https://openlibrary.org/search.json?${params.toString()}`, {
                        signal: controller.signal
                    });
                    if (!response.ok) throw new Error('Cover search failed');
                    const data = await response.json();
                    const doc = data?.docs?.[0];
                    const coverId = doc?.cover_i;
                    const editionKey = doc?.edition_key?.[0];
                    if (coverId) {
                        setIfActive(`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`);
                    } else if (editionKey) {
                        setIfActive(`https://covers.openlibrary.org/b/olid/${editionKey}-M.jpg`);
                    }
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        // Silent failure for cover search
                    }
                }
            })();
        } else {
            setIfActive('');
        }

        return () => {
            active = false;
            controller.abort();
        };
    }, [coverAuthor, coverIsbn, coverSource, coverTitle]);

    const handleCoverError = () => {
        if (coverSource === 'isbn') {
            setCoverSource('search');
            return;
        }
        setCoverUrl('');
    };

    const formatDate = (value) => {
        if (!value) return '';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '';
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
    };

    const openBook = () => {
        if (!book?._id) return;
        navigate(`/user/book/${book._id}`, { state: { book } });
    };

    const rating = Number(book.rating || 0);
    const ratingCount = Number(book.ratingCount || 0);

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -2 }}
            onClick={openBook}
            className="group relative flex flex-col gap-4 rounded-2xl border border-[#eadfd0] bg-white p-4 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-start cursor-pointer"
        >
            {/* Book Cover */}
            <div
                className="shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:w-32 md:w-40"
            >
                <div className="aspect-[2/3] relative">
                    {coverUrl ? (
                        <img
                            src={coverUrl}
                            alt={book.name}
                            className={`h-full w-full object-cover transition-opacity duration-300 ${coverLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setCoverLoaded(true)}
                            onError={handleCoverError}
                            loading="lazy"
                        />
                    ) : null}

                    {/* Fallback / Placeholder */}
                    <div className={`absolute inset-0 flex items-center justify-center bg-linear-to-br from-[#f0f9ff] to-[#e0f2fe] text-slate-400 p-2 text-center text-xs ${coverLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                        <span className="font-semibold text-slate-500 uppercase tracking-wider">
                            {book.name?.slice(0, 20)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Details */}
            <div className="flex flex-1 flex-col justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                            <h3
                                className="text-lg font-bold text-[#1f2933] transition hover:text-[#0f766e] md:text-xl line-clamp-2"
                            >
                                {book.name}
                            </h3>
                            <p className="flex items-center gap-1 text-sm font-medium text-[#5c4f44]">
                                by <span className="text-[#0f766e]">{book.author}</span>
                            </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-1">
                            <div className="flex items-center text-amber-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="ml-1 text-sm font-bold text-[#1f2933]">{rating > 0 ? rating.toFixed(1) : 'New'}</span>
                            </div>
                            <span className="text-xs text-[#8b7d6b]">({ratingCount})</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#6b5b4a]">
                        <span className="rounded-full bg-[#f9f5ef] px-2 py-1 font-medium uppercase tracking-wider text-[#8b7d6b] border border-[#eadfd0]">
                            {book.category || 'General'}
                        </span>
                        {formatDate(book.dateOfPublishing) && (
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(book.dateOfPublishing)}
                            </span>
                        )}
                        <span className="flex items-center gap-1">
                            <Store className="h-3 w-3" />
                            {book.sellerId?.storename || 'Readora Seller'}
                        </span>
                    </div>

                    <p className="text-sm text-[#5c4f44] line-clamp-2 md:line-clamp-3 leading-relaxed">
                        {book.description || 'No description available for this title.'}
                    </p>
                </div>

                {/* Actions / Price */}
                <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#f1e7dd] pt-4">
                    <div className="flex items-baseline gap-1">
                        <span className="text-xs text-[#8b7d6b] font-medium">Price</span>
                        <div className="flex items-center text-xl font-bold text-[#b91c1c]">
                            <IndianRupee className="h-4 w-4 stroke-[2.5]" />
                            {book.price}
                        </div>
                    </div>

                    <div className="flex w-full sm:w-auto items-center gap-3">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                openBook();
                            }}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-full border border-[#eadfd0] bg-white px-4 py-2 text-sm font-medium text-[#5c4f44] transition hover:bg-[#f9f5ef] hover:text-[#1f2933]"
                        >
                            Details
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(book);
                            }}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-full bg-[#f97316] px-5 py-2 text-sm font-bold text-white shadow-md shadow-orange-100 transition hover:bg-[#ea580c] hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

export default BookListItem;
