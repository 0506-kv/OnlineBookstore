import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, BookOpen, Heart, ChevronRight, Sparkles, Award, Users, Shield } from 'lucide-react';
import Navbar from "../../Components/Common/Navbar";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600";

const LandingBookCard = ({ book }) => {
    const [coverUrl, setCoverUrl] = useState('');
    const [coverLoaded, setCoverLoaded] = useState(false);
    const [coverSource, setCoverSource] = useState('');

    const coverTitle = book.title?.trim() || '';
    const coverAuthor = book.author?.trim() || '';
    const coverIsbn = String(book.isbn || '').replace(/[^0-9X]/gi, '');

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
                setIfActive(FALLBACK_IMAGE);
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
                    } else {
                        setIfActive(FALLBACK_IMAGE);
                    }
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.error('Cover search error:', err);
                        setIfActive(FALLBACK_IMAGE);
                    }
                }
            })();
        } else {
            setIfActive(FALLBACK_IMAGE);
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
        if (coverUrl !== FALLBACK_IMAGE) {
            setCoverUrl(FALLBACK_IMAGE);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group h-full"
        >
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <div className="relative h-64 overflow-hidden bg-gray-100 flex-shrink-0">
                    {coverUrl ? (
                        <img
                            src={coverUrl}
                            alt={book.title}
                            onError={handleCoverError}
                            onLoad={() => setCoverLoaded(true)}
                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${coverLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                            <BookOpen size={48} />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${book.badge === 'Bestseller' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' :
                        book.badge === 'New' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' :
                            book.badge === 'Popular' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                                'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                        }`}>
                        {book.badge}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-red-50"
                    >
                        <Heart size={18} className="text-gray-400 hover:text-red-500 transition-colors" />
                    </motion.button>
                    <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ scale: 1.02 }}
                        className="absolute bottom-4 left-4 right-4 py-3 bg-white/95 backdrop-blur-sm rounded-xl font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-emerald-600 hover:text-white"
                    >
                        Quick Add to Cart
                    </motion.button>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < Math.floor(book.rating) ? "#f59e0b" : "none"} className="text-amber-500" />
                        ))}
                        <span className="text-sm text-gray-400 ml-1">({book.rating})</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-lg group-hover:text-emerald-600 transition-colors line-clamp-1" title={book.title}>{book.title}</h3>
                    <p className="text-gray-500 text-sm mb-1 line-clamp-1">by {book.author}</p>
                    <p className="text-emerald-600 text-xs font-medium mb-3">Sold by: {book.seller}</p>
                    <div className="flex items-center justify-between mt-auto">
                        <div>
                            <span className="text-xl font-bold text-emerald-600">{book.price}</span>
                            <span className="text-sm text-gray-400 line-through ml-2">{book.oldPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const LandingPage = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const categories = [
        { name: 'Fiction', count: '2,500+', emoji: '📚', gradient: 'from-violet-500 to-purple-600' },
        { name: 'Non-Fiction', count: '1,800+', emoji: '📖', gradient: 'from-blue-500 to-cyan-500' },
        { name: 'Science', count: '1,200+', emoji: '🔬', gradient: 'from-emerald-500 to-teal-500' },
        { name: 'History', count: '950+', emoji: '🏛️', gradient: 'from-amber-500 to-orange-500' }
    ];

    const [featuredBooks, setFeaturedBooks] = useState([]);

    useEffect(() => {
        const fetchRandomBooks = async () => {
            try {
                const response = await axios.get('http://localhost:4000/books/random');
                const books = response.data.books.map(book => ({
                    _id: book._id,
                    title: book.name,
                    author: book.author,
                    price: `₹${book.price}`,
                    oldPrice: `₹${Math.round(book.price * 1.2)}`,
                    rating: (Math.random() * (5 - 4) + 4).toFixed(1),
                    isbn: book.isbn,
                    seller: book.seller?.storename || 'Unknown Seller',
                    badge: ['Bestseller', 'New', 'Popular', 'Trending'][Math.floor(Math.random() * 4)]
                }));
                setFeaturedBooks(books);
            } catch (error) {
                console.error("Error fetching random books:", error);
            }
        };

        fetchRandomBooks();
    }, []);

    const [testimonials, setTestimonials] = useState([]);
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:4000/reviews/random');
                const fetchedReviews = response.data.reviews.map(review => ({
                    name: review.user?.fullname || 'Anonymous Reader',
                    role: 'Verified Reader',
                    text: review.comment,
                    rating: review.rating,
                    avatar: ['👩‍💼', '👨‍🎓', '👩‍🏫', '👨‍💻', '👩‍🎨'][Math.floor(Math.random() * 5)]
                }));
                // Ensure at least 3 reviews for good display, fallback if empty
                if (fetchedReviews.length === 0) {
                    setTestimonials([
                        { name: 'Sarah Johnson', role: 'Book Lover', text: 'Amazing collection! Found rare books I was searching for years.', rating: 5, avatar: '👩‍💼' },
                        { name: 'Mike Chen', role: 'Student', text: 'Fast delivery and great prices. My go-to bookstore (Readora) now!', rating: 5, avatar: '👨‍🎓' },
                        { name: 'Emily Davis', role: 'Teacher', text: 'The recommendations are spot on. Love this platform!', rating: 4, avatar: '👩‍🏫' }
                    ]);
                } else {
                    setTestimonials(fetchedReviews);
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
                // Fallback on error
                setTestimonials([
                    { name: 'Sarah Johnson', role: 'Book Lover', text: 'Amazing collection! Found rare books I was searching for years.', rating: 5, avatar: '👩‍💼' },
                    { name: 'Mike Chen', role: 'Student', text: 'Fast delivery and great prices. My go-to bookstore (Readora) now!', rating: 5, avatar: '👨‍🎓' },
                    { name: 'Emily Davis', role: 'Teacher', text: 'The recommendations are spot on. Love this platform!', rating: 4, avatar: '👩‍🏫' }
                ]);
            }
        };

        fetchReviews();
    }, []);

    useEffect(() => {
        if (testimonials.length === 0) return;
        const interval = setInterval(() => {
            setCurrentTestimonialIndex(prev => (prev + 1) % testimonials.length);
        }, 5000); // Change every 5 seconds
        return () => clearInterval(interval);
    }, [testimonials]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-emerald-50/30 font-sans text-gray-900">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                {/* Animated Background Blobs */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], x: [0, -20, 0], y: [0, 30, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-amber-200/40 to-orange-200/40 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
                    />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="space-y-8"
                        >
                            {/* Badge */}
                            <motion.div
                                variants={fadeInUp}
                                className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-semibold shadow-lg shadow-emerald-500/25"
                            >
                                <Sparkles size={18} />
                                <span>#1 Rated Online Bookstore 2026 (Readora)</span>
                                <Award size={18} />
                            </motion.div>

                            {/* Heading */}
                            <motion.h1
                                variants={fadeInUp}
                                className="text-5xl lg:text-7xl font-extrabold leading-tight"
                            >
                                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                                    Discover Your
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
                                    Next Adventure
                                </span>
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                variants={fadeInUp}
                                className="text-xl text-gray-600 leading-relaxed max-w-lg"
                            >
                                Dive into our world of <span className="font-semibold text-emerald-600">books</span>.
                                <br />
                                Your next favorite read is just a click away!
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        const element = document.getElementById('featured-books');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold text-lg hover:from-emerald-500 hover:to-teal-500 transition-all flex items-center gap-3 shadow-xl shadow-emerald-500/30"
                                >
                                    <BookOpen size={22} />
                                    Start Exploring
                                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                        <ArrowRight size={22} />
                                    </motion.span>
                                </motion.button>
                            </motion.div>

                            {/* Trust Indicators */}
                            <motion.div
                                variants={fadeInUp}
                                className="flex flex-wrap items-center gap-8 pt-8"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-3">
                                        {['😊', '🤓', '📚', '✨'].map((emoji, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.8 + i * 0.1 }}
                                                className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 border-3 border-white shadow-md flex items-center justify-center text-lg"
                                            >
                                                {emoji}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div>
                                        <div className="flex text-amber-500">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                                        </div>
                                        <p className="text-sm text-gray-500 font-medium">50,000+ Happy Readers</p>
                                    </div>
                                </div>
                                <div className="h-12 w-px bg-gray-200 hidden sm:block" />
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Shield size={20} className="text-emerald-500" />
                                    <span className="font-medium">Secure Payments</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Hero Image Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: [6, 8, 6] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-8 left-8 w-80 h-[420px] bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl shadow-xl"
                                />
                                <motion.div
                                    animate={{ rotate: [-3, -1, -3] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute top-4 left-4 w-80 h-[420px] bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl shadow-xl"
                                />
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-80"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600"
                                            alt="Featured Book"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                                            🔥 BESTSELLER
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
                                        >
                                            <Heart size={18} className="text-red-500" />
                                        </motion.button>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-1 mb-2">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <Star key={i} size={14} fill="#f59e0b" className="text-amber-500" />
                                            ))}
                                            <span className="text-sm text-gray-500 ml-1">(4.9)</span>
                                        </div>
                                        <h3 className="font-bold text-xl text-gray-900 mb-1">The Art of Reading</h3>
                                        <p className="text-gray-500 mb-4">by Jane Wilson</p>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-2xl font-bold text-emerald-600">₹124.99</span>
                                                <span className="text-sm text-gray-400 line-through ml-2">₹134.99</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Books Section */}
            <section id="featured-books" className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-12"
                    >
                        <div>
                            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                                🔥 TRENDING NOW
                            </span>
                            <h2 className="text-4xl font-bold text-gray-900">
                                This Week's <span className="text-emerald-600">Bestsellers</span>
                            </h2>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05, x: 5 }}
                            className="flex items-center gap-2 text-emerald-600 font-semibold text-lg hover:text-emerald-700"
                        >
                            View All Books <ChevronRight size={22} />
                        </motion.button>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredBooks.map((book, idx) => (
                            <LandingBookCard key={idx} book={book} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-amber-50 overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                            💬 TESTIMONIALS
                        </span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            What Our Readers <span className="text-emerald-600">Say</span>
                        </h2>
                    </motion.div>

                    <div className="relative max-w-4xl mx-auto h-[400px] flex items-center justify-center">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-8 left-20 w-20 h-20 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                        <AnimatePresence mode="wait">
                            {testimonials.length > 0 && (
                                <motion.div
                                    key={currentTestimonialIndex}
                                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 lg:p-12 bg-white/60 backdrop-blur-md border border-white/40 shadow-2xl rounded-3xl"
                                >
                                    <div className="flex text-amber-500 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={24} fill={i < testimonials[currentTestimonialIndex].rating ? "#f59e0b" : "none"} className="text-amber-500" />
                                        ))}
                                    </div>

                                    <motion.p
                                        className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 leading-relaxed italic relative z-10"
                                    >
                                        <span className="absolute -top-6 -left-4 text-6xl text-emerald-200 opacity-50 font-serif">"</span>
                                        {testimonials[currentTestimonialIndex].text}
                                        <span className="absolute -bottom-10 -right-4 text-6xl text-emerald-200 opacity-50 font-serif">"</span>
                                    </motion.p>

                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center text-3xl shadow-inner">
                                            {testimonials[currentTestimonialIndex].avatar}
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-bold text-xl text-gray-900">{testimonials[currentTestimonialIndex].name}</h4>
                                            <p className="text-emerald-600 font-medium">{testimonials[currentTestimonialIndex].role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentTestimonialIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentTestimonialIndex ? "bg-emerald-600 w-8" : "bg-gray-300 hover:bg-emerald-300"
                                    }`}
                                aria-label={`Go to testimonial ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white pt-20 pb-8">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <BookOpen size={24} />
                                </div>
                                <span className="text-2xl font-bold">Readora</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-6">
                                Your trusted destination for discovering amazing books and stories that inspire.
                            </p>
                            <div className="flex gap-3">
                                {['📘', '🐦', '📸', '💼'].map((emoji, i) => (
                                    <motion.button
                                        key={i}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-xl flex items-center justify-center text-lg transition-colors"
                                    >
                                        {emoji}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                        {[
                            { title: 'Quick Links', links: ['Home', 'Categories', 'Best Sellers', 'New Arrivals'] },
                            { title: 'Support', links: ['Help Center', 'Track Order', 'Shipping', 'Returns'] },
                            { title: 'Company', links: ['About', 'Contact', 'Careers', 'Blog'] }
                        ].map((section, idx) => (
                            <div key={idx}>
                                <h4 className="font-bold mb-4 text-lg">{section.title}</h4>
                                <ul className="space-y-3">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2 group">
                                                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">© 2026 Readora. Made with ❤️ for book lovers</p>
                        <div className="flex gap-6 text-gray-400 text-sm">
                            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
                            <a href="#" className="hover:text-emerald-400 transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
