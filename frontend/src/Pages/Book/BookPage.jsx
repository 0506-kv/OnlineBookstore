import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
    BookOpen,
    Bookmark,
    Calendar,
    Globe,
    Heart,
    IndianRupee,
    Layers,
    MapPin,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
    Star,
    Truck
} from 'lucide-react';
import BookHeader from '../../Components/Book/BookHeader';
import BookFooter from '../../Components/Book/BookFooter';

const FALLBACK_BOOK = {
    name: 'Celestial Atlas: Cartography of Lost Constellations',
    author: 'Anika Rao',
    price: 1299,
    category: 'Science Fiction',
    description:
        'A luminous journey through forgotten star maps, blending speculative science with lyrical storytelling. Explore a universe where cartographers chart emotions across galaxies.',
    pages: 412,
    language: 'English',
    format: 'Hardcover',
    isbn: '978-1-4028-9462-6',
    publisher: 'Aurora Press',
    year: 2024,
    rating: 4.9,
    ratingCount: 2180,
    tags: ['Signed Copy', 'Illustrated', 'Limited Run'],
    sellerId: { storename: 'Nimbus Books', location: 'Mumbai, IN' },
    createdAt: '2024-08-12T00:00:00.000Z'
};

const REVIEW_CARDS = [
    {
        name: 'Meera Patel',
        role: 'Sci-fi collector',
        text: 'The typography, the illustrations, the pacing — it feels like opening a portal. Worth every rupee.',
        score: 5
    },
    {
        name: 'Dev Anand',
        role: 'Book blogger',
        text: 'A rare edition that balances poetic writing with world-building. The packaging was immaculate.',
        score: 4
    },
    {
        name: 'Sana Idris',
        role: 'Design lead',
        text: 'This is the most cinematic book page I have ever owned. Gorgeous from cover to colophon.',
        score: 5
    }
];

const BookPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();

    const initialBook = location.state?.book ?? null;
    const [book, setBook] = useState(initialBook);
    const [loading, setLoading] = useState(!initialBook);
    const [error, setError] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    const [coverLoaded, setCoverLoaded] = useState(false);
    const [coverSource, setCoverSource] = useState('');

    useEffect(() => {
        if (initialBook) {
            setBook(initialBook);
            setLoading(false);
            return;
        }

        if (!id) {
            setBook(FALLBACK_BOOK);
            setLoading(false);
            return;
        }

        const fetchBook = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/books/all`);
                const found = response.data.books?.find((item) => item._id === id);
                if (!found) {
                    setError('We could not find this book in the catalog.');
                    setBook(null);
                } else {
                    setBook(found);
                }
            } catch (err) {
                console.error('Error fetching book:', err);
                setError('We could not load the book right now. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id, initialBook]);

    const displayBook = book || FALLBACK_BOOK;
    const coverTitle = displayBook?.name?.trim() || '';
    const coverAuthor = displayBook?.author?.trim() || '';
    const coverIsbn = String(displayBook?.isbn || '').replace(/[^0-9X]/gi, '');

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

    useEffect(() => {
        let active = true;
        const controller = new AbortController();
        const setIfActive = (url) => {
            if (active) setCoverUrl(url);
        };

        setCoverLoaded(false);

        if (coverSource === 'isbn' && coverIsbn) {
            setIfActive(`https://covers.openlibrary.org/b/isbn/${coverIsbn}-L.jpg?default=false`);
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
                        setIfActive(`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`);
                    } else if (editionKey) {
                        setIfActive(`https://covers.openlibrary.org/b/olid/${editionKey}-L.jpg`);
                    }
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.error('Cover search error:', err);
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

    useEffect(() => {
        setCoverLoaded(false);
    }, [coverUrl]);

    const priceValue = Number(displayBook.price);
    const formattedPrice = Number.isFinite(priceValue)
        ? priceValue.toLocaleString('en-IN')
        : displayBook.price || '—';

    const handleAddToCart = async () => {
        if (!displayBook?._id) return;
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/user/login');
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/cart/add`,
                { bookId: displayBook._id, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/user/cart');
        } catch (err) {
            console.error('Error adding to cart:', err);
        }
    };

    const handleCoverError = () => {
        if (coverSource === 'isbn') {
            setCoverSource('search');
            return;
        }
        setCoverUrl('');
    };

    const sellerName = displayBook.sellerId?.storename || 'Readora Prime';
    const sellerLocation = displayBook.sellerId?.location || 'Jaipur, IN';

    const formattedDate = useMemo(() => {
        if (!displayBook.createdAt) return 'Date not available';
        const date = new Date(displayBook.createdAt);
        if (Number.isNaN(date.getTime())) return 'Date not available';
        return date.toLocaleDateString();
    }, [displayBook.createdAt]);

    const badges = useMemo(() => {
        const list = [displayBook.category, displayBook.format, displayBook.language];
        return list.filter(Boolean);
    }, [displayBook.category, displayBook.format, displayBook.language]);

    const tagList = useMemo(() => {
        if (Array.isArray(displayBook.tags)) return displayBook.tags;
        return [];
    }, [displayBook.tags]);

    const highlights = useMemo(
        () => [
            {
                title: 'Vaulted Edition',
                description: 'Printed on archival paper with gold-foil maps and stitched binding.',
                icon: Sparkles
            },
            {
                title: 'Verified Authenticity',
                description: 'Every copy is QR-verified and shipped in climate-sealed packaging.',
                icon: ShieldCheck
            },
            {
                title: 'Hyperfast Dispatch',
                description: 'Ships within 24 hours from our cosmic fulfillment pods.',
                icon: Truck
            }
        ],
        []
    );

    const metadata = useMemo(
        () => [
            { label: 'Publisher', value: displayBook.publisher || 'Aurora Press', icon: BookOpen },
            { label: 'Release', value: displayBook.year || '2024', icon: Calendar },
            { label: 'Language', value: displayBook.language || 'English', icon: Globe },
            { label: 'Pages', value: displayBook.pages || '412', icon: Layers }
        ],
        [displayBook.language, displayBook.pages, displayBook.publisher, displayBook.year]
    );

    const floatingChips = [
        { label: 'Signed', tone: 'from-[#0f766e] to-[#14b8a6]' },
        { label: 'Illustrated', tone: 'from-[#38bdf8] to-[#0ea5e9]' },
        { label: 'First Print', tone: 'from-[#f97316] to-[#fb923c]' }
    ];

    return (
        <div className="min-h-screen bg-[#f7f2ea] font-['Space_Grotesk',sans-serif] text-[#1f2933]">
            <BookHeader />

            <main className="relative overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <motion.div
                        animate={reduceMotion ? { opacity: 1 } : { y: [0, -18, 0], opacity: [0.9, 1, 0.9] }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -top-32 right-[-10%] h-105 w-105 rounded-full bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.35),transparent_65%)] blur-3xl"
                    />
                    <motion.div
                        animate={reduceMotion ? { opacity: 1 } : { y: [0, 20, 0], opacity: [0.85, 1, 0.85] }}
                        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute left-[-12%] top-[24%] h-90 w-90 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.35),transparent_65%)] blur-3xl"
                    />
                    <motion.div
                        animate={reduceMotion ? { opacity: 1 } : { y: [0, -14, 0], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-[-10%] right-[18%] h-80 w-[320px] rounded-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.35),transparent_65%)] blur-3xl"
                    />
                </div>

                <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"
                            >
                                <div className="space-y-4">
                                    <div className="h-6 w-40 rounded-full bg-[#e9dfd1]" />
                                    <div className="h-10 w-2/3 rounded-2xl bg-[#e9dfd1]" />
                                    <div className="h-4 w-1/2 rounded-full bg-[#e9dfd1]" />
                                    <div className="h-24 w-full rounded-3xl bg-[#e9dfd1]" />
                                    <div className="h-10 w-44 rounded-full bg-[#e9dfd1]" />
                                </div>
                                <div className="h-105 rounded-4xl bg-[#e9dfd1]" />
                            </motion.div>
                        ) : error ? (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="rounded-[28px] border border-[#f2c3b4] bg-[#fff4f0] p-8"
                            >
                                <h2 className="text-xl font-semibold text-[#b34a2f]">Book not found</h2>
                                <p className="mt-3 text-sm text-[#8c3c27]">{error}</p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/user/buy')}
                                        className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-200/70"
                                    >
                                        Browse catalog
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate(0)}
                                        className="inline-flex items-center gap-2 rounded-full border border-[#f2c3b4] bg-white px-5 py-2 text-sm font-semibold text-[#b34a2f]"
                                    >
                                        Retry
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-12"
                            >
                                <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                        className="space-y-6"
                                    >
                                        <div className="inline-flex items-center gap-2 rounded-full border border-[#e7dccd] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#8b7d6b]">
                                            <Sparkles className="h-4 w-4 text-[#f97316]" />
                                            Featured Release
                                        </div>

                                        <div className="space-y-3">
                                            <h1 className="text-3xl font-semibold leading-tight text-[#1f2933] font-['Playfair_Display',serif] md:text-4xl">
                                                {displayBook.name}
                                            </h1>
                                            <p className="text-sm uppercase tracking-[0.3em] text-[#8b7d6b]">
                                                {displayBook.author}
                                            </p>
                                        </div>

                                        <p className="text-base text-[#5c4f44]">{displayBook.description}</p>

                                        <div className="flex flex-wrap gap-3">
                                            {badges.map((badge) => (
                                                <span
                                                    key={badge}
                                                    className="rounded-full border border-[#e7dccd] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b5e4d]"
                                                >
                                                    {badge}
                                                </span>
                                            ))}
                                            {tagList.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full bg-[#0f766e]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0f766e]"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-6">
                                            <div className="flex items-center gap-2 rounded-2xl border border-[#e7dccd] bg-white/80 px-4 py-3 shadow-sm">
                                                <Star className="h-5 w-5 text-[#f97316]" />
                                                <div>
                                                    <div className="text-lg font-semibold text-[#1f2933]">
                                                        {displayBook.rating || 4.8}
                                                    </div>
                                                    <div className="text-xs text-[#8b7d6b]">
                                                        {displayBook.ratingCount || 1600}+ reviews
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-2xl border border-[#e7dccd] bg-white/80 px-4 py-3 shadow-sm">
                                                <BookOpen className="h-5 w-5 text-[#0f766e]" />
                                                <div>
                                                    <div className="text-lg font-semibold text-[#1f2933]">
                                                        {displayBook.pages || 410}
                                                    </div>
                                                    <div className="text-xs text-[#8b7d6b]">Pages</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-2xl border border-[#e7dccd] bg-white/80 px-4 py-3 shadow-sm">
                                                <Globe className="h-5 w-5 text-[#38bdf8]" />
                                                <div>
                                                    <div className="text-lg font-semibold text-[#1f2933]">
                                                        {displayBook.language || 'English'}
                                                    </div>
                                                    <div className="text-xs text-[#8b7d6b]">Language</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3">
                                            <div className="flex items-center gap-2 text-2xl font-semibold text-[#1f2933]">
                                                <IndianRupee className="h-5 w-5" />
                                                {formattedPrice}
                                            </div>
                                            <span className="text-xs uppercase tracking-[0.3em] text-[#8b7d6b]">
                                                Premium edition
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                type="button"
                                                onClick={handleAddToCart}
                                                className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-200/70 transition hover:-translate-y-0.5"
                                            >
                                                <ShoppingBag className="h-4 w-4" />
                                                Add to bag
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-full border border-[#e7dccd] bg-white/80 px-6 py-3 text-sm font-semibold text-[#6b5e4d] transition hover:-translate-y-0.5 hover:border-[#0f766e] hover:text-[#0f766e]"
                                            >
                                                <Heart className="h-4 w-4" />
                                                Save for later
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-full border border-[#e7dccd] bg-white/80 px-6 py-3 text-sm font-semibold text-[#6b5e4d] transition hover:-translate-y-0.5 hover:border-[#0f766e] hover:text-[#0f766e]"
                                            >
                                                <Bookmark className="h-4 w-4" />
                                                Read a sample
                                            </button>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                        className="relative"
                                    >
                                        <div className="relative overflow-hidden rounded-4xl border border-white/60 bg-white/70 p-6 shadow-2xl shadow-teal-100/60 backdrop-blur">
                                            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,118,110,0.16),rgba(56,189,248,0.12),rgba(249,115,22,0.12))]" />
                                            <div className="relative z-10 flex flex-col gap-6">
                                                <motion.div
                                                    animate={
                                                        reduceMotion
                                                            ? { y: 0 }
                                                            : { y: [0, -10, 0] }
                                                    }
                                                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                                    className="mx-auto w-full max-w-70"
                                                >
                                                    <div className="relative aspect-3/4 overflow-hidden rounded-3xl border border-white/70 bg-[#0f172a] shadow-[0_30px_80px_rgba(15,118,110,0.25)]">
                                                        {coverUrl && (
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <img
                                                                    src={coverUrl}
                                                                    alt={`${displayBook.name} cover`}
                                                                    className={`max-h-full max-w-full object-contain brightness-110 contrast-105 saturate-105 transition-opacity duration-500 ${
                                                                        coverLoaded ? 'opacity-100' : 'opacity-0'
                                                                    }`}
                                                                    onLoad={() => setCoverLoaded(true)}
                                                                    onError={handleCoverError}
                                                                    loading="lazy"
                                                                    decoding="async"
                                                                />
                                                            </div>
                                                        )}
                                                        <div
                                                            className={`absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.5),transparent_60%)] transition-opacity duration-500 ${
                                                                coverLoaded ? 'opacity-0' : 'opacity-100'
                                                            }`}
                                                        />
                                                        <div
                                                            className={`absolute inset-0 bg-[linear-gradient(160deg,rgba(15,118,110,0.6),rgba(30,41,59,0.6),rgba(249,115,22,0.5))] transition-opacity duration-500 ${
                                                                coverLoaded ? 'opacity-0' : 'opacity-100'
                                                            }`}
                                                        />
                                                        {!coverLoaded && (
                                                            <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
                                                                <div className="space-y-2">
                                                                    <span className="text-xs uppercase tracking-[0.4em] text-white/70">
                                                                        Cosmic Edition
                                                                    </span>
                                                                    <h2 className="text-2xl font-semibold leading-tight font-['Playfair_Display',serif]">
                                                                        {displayBook.name.split(':')[0]}
                                                                    </h2>
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <div className="text-sm uppercase tracking-[0.3em] text-white/70">
                                                                        {displayBook.author}
                                                                    </div>
                                                                    <div className="text-xs text-white/60">
                                                                        {displayBook.publisher}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>

                                                <div className="grid gap-3">
                                                    {floatingChips.map((chip) => (
                                                        <motion.div
                                                            key={chip.label}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.6, ease: 'easeOut' }}
                                                            className={`rounded-2xl bg-linear-to-r ${chip.tone} px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-lg`}
                                                        >
                                                            {chip.label}
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </section>

                                <section className="grid gap-6 lg:grid-cols-3">
                                    {highlights.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <motion.div
                                                key={item.title}
                                                initial={{ opacity: 0, y: 16 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, amount: 0.4 }}
                                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                                className="rounded-[26px] border border-[#e7dccd] bg-white/80 p-6 shadow-sm"
                                            >
                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f766e]/10 text-[#0f766e]">
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <h3 className="mt-4 text-lg font-semibold text-[#1f2933] font-['Playfair_Display',serif]">
                                                    {item.title}
                                                </h3>
                                                <p className="mt-2 text-sm text-[#5c4f44]">{item.description}</p>
                                            </motion.div>
                                        );
                                    })}
                                </section>

                                <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                                    <div className="rounded-[28px] border border-[#e7dccd] bg-white/80 p-8 shadow-sm">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-semibold text-[#1f2933] font-['Playfair_Display',serif]">
                                                Inside the edition
                                            </h2>
                                            <span className="text-xs uppercase tracking-[0.3em] text-[#8b7d6b]">
                                                {formattedDate}
                                            </span>
                                        </div>
                                        <p className="mt-4 text-sm text-[#5c4f44]">
                                            ISBN {displayBook.isbn || 'N/A'} · {displayBook.format || 'Hardcover'} ·
                                            Collector grade
                                        </p>
                                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                            {metadata.map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <div
                                                        key={item.label}
                                                        className="flex items-center gap-3 rounded-2xl border border-[#e7dccd] bg-white px-4 py-3"
                                                    >
                                                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f2efe8] text-[#0f766e]">
                                                            <Icon className="h-5 w-5" />
                                                        </span>
                                                        <div>
                                                            <div className="text-xs uppercase tracking-[0.28em] text-[#8b7d6b]">
                                                                {item.label}
                                                            </div>
                                                            <div className="text-sm font-semibold text-[#1f2933]">
                                                                {item.value}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="rounded-[28px] border border-[#e7dccd] bg-white/80 p-8 shadow-sm">
                                        <h2 className="text-xl font-semibold text-[#1f2933] font-['Playfair_Display',serif]">
                                            Seller capsule
                                        </h2>
                                        <p className="mt-4 text-sm text-[#5c4f44]">
                                            Curated by <span className="font-semibold text-[#1f2933]">{sellerName}</span>
                                        </p>
                                        <div className="mt-6 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f766e]/10 text-[#0f766e]">
                                                    <MapPin className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <div className="text-xs uppercase tracking-[0.28em] text-[#8b7d6b]">
                                                        Dispatch
                                                    </div>
                                                    <div className="text-sm font-semibold text-[#1f2933]">
                                                        {sellerLocation}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f97316]/10 text-[#f97316]">
                                                    <Star className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <div className="text-xs uppercase tracking-[0.28em] text-[#8b7d6b]">
                                                        Seller rating
                                                    </div>
                                                    <div className="text-sm font-semibold text-[#1f2933]">4.9 / 5</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#38bdf8]/10 text-[#38bdf8]">
                                                    <Truck className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <div className="text-xs uppercase tracking-[0.28em] text-[#8b7d6b]">
                                                        Delivery window
                                                    </div>
                                                    <div className="text-sm font-semibold text-[#1f2933]">2-4 days</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 rounded-2xl border border-dashed border-[#e7dccd] bg-[#f9f5ef] p-4 text-xs uppercase tracking-[0.28em] text-[#8b7d6b]">
                                            Every order includes a nebula dust jacket and collector certificate.
                                        </div>
                                    </div>
                                </section>

                                <section className="rounded-4xl border border-[#e7dccd] bg-white/80 p-8 shadow-sm">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div>
                                            <h2 className="text-xl font-semibold text-[#1f2933] font-['Playfair_Display',serif]">
                                                Reader signals
                                            </h2>
                                            <p className="mt-2 text-sm text-[#5c4f44]">
                                                Real reactions from readers who unlocked this story.
                                            </p>
                                        </div>
                                        <Link
                                            to="/user/buy"
                                            className="inline-flex items-center gap-2 rounded-full border border-[#e7dccd] bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b5e4d] transition hover:-translate-y-0.5 hover:border-[#0f766e] hover:text-[#0f766e]"
                                        >
                                            View more
                                        </Link>
                                    </div>
                                    <div className="mt-6 grid gap-4 lg:grid-cols-3">
                                        {REVIEW_CARDS.map((review) => (
                                            <div
                                                key={review.name}
                                                className="flex h-full flex-col justify-between rounded-2xl border border-[#e7dccd] bg-white p-5 shadow-sm"
                                            >
                                                <div>
                                                    <div className="flex items-center gap-1 text-[#f97316]">
                                                        {Array.from({ length: review.score }).map((_, index) => (
                                                            <Star key={`${review.name}-${index}`} className="h-4 w-4" />
                                                        ))}
                                                    </div>
                                                    <p className="mt-3 text-sm text-[#5c4f44]">{review.text}</p>
                                                </div>
                                                <div className="mt-6">
                                                    <div className="text-sm font-semibold text-[#1f2933]">{review.name}</div>
                                                    <div className="text-xs uppercase tracking-[0.28em] text-[#8b7d6b]">
                                                        {review.role}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <BookFooter />
        </div>
    );
};

export default BookPage;
