import React, { useState, useEffect } from 'react';
import SellerHeader from './SellerHeader';
import SellerFooter from './SellerFooter';
import { Book, IndianRupee, Star, Package, Search, Filter, ArrowUpRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const SellBooks = () => {
    const [loaded, setLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100);
    }, []);

    // Demo data for books sold
    const demoBooks = [
        {
            id: 1,
            title: "The Alchemist",
            author: "Paulo Coelho",
            price: 299,
            category: "Fiction",
            status: "In Stock",
            image: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
            sales: 12,
            rating: 4.8
        },
        {
            id: 2,
            title: "Atomic Habits",
            author: "James Clear",
            price: 450,
            category: "Self-Help",
            status: "Low Stock",
            image: "https://m.media-amazon.com/images/I/91bYsX41hOL.jpg",
            sales: 45,
            rating: 4.9
        },
        {
            id: 3,
            title: "Rich Dad Poor Dad",
            author: "Robert Kiyosaki",
            price: 350,
            category: "Finance",
            status: "In Stock",
            image: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg",
            sales: 28,
            rating: 4.7
        },
        {
            id: 4,
            title: "Deep Work",
            author: "Cal Newport",
            price: 399,
            category: "Productivity",
            status: "Out of Stock",
            image: "https://m.media-amazon.com/images/I/81I-uKndm9L.jpg",
            sales: 8,
            rating: 4.6
        },
        {
            id: 5,
            title: "Psychology of Money",
            author: "Morgan Housel",
            price: 320,
            category: "Finance",
            status: "In Stock",
            image: "https://m.media-amazon.com/images/I/71g2ednj0JL.jpg",
            sales: 34,
            rating: 4.8
        },
        {
            id: 6,
            title: "Thinking, Fast and Slow",
            author: "Daniel Kahneman",
            price: 550,
            category: "Psychology",
            status: "In Stock",
            image: "https://m.media-amazon.com/images/I/41shS294SXL._SX331_BO1,204,203,200_.jpg",
            sales: 15,
            rating: 4.7
        }
    ];

    const filteredBooks = demoBooks.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Stock': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Low Stock': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'Out of Stock': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'In Stock': return <CheckCircle2 className="w-3.5 h-3.5" />;
            case 'Low Stock': return <Clock className="w-3.5 h-3.5" />;
            case 'Out of Stock': return <AlertCircle className="w-3.5 h-3.5" />;
            default: return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 overflow-x-hidden font-sans">
            <SellerHeader />

            <main className="flex-1 relative">
                {/* Background Shapes */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                    <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] bg-cyan-200/30 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-[10%] -left-[5%] w-[450px] h-[450px] bg-violet-200/30 rounded-full blur-3xl animate-pulse [animation-delay:3s]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Page Header */}
                    <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2 flex items-center gap-3">
                                <Book className="text-cyan-600 w-8 h-8" />
                                My Bookshelf
                            </h1>
                            <p className="text-slate-500 font-medium">Manage and monitor all the books you've listed for sale.</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative group flex-1 md:w-80">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search by title or author..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all shadow-sm"
                                />
                            </div>
                            <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                                <Filter className="w-5 h-5 text-slate-600" />
                            </button>
                        </div>
                    </div>

                    {/* Books Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                        {filteredBooks.map((book, index) => (
                            <div
                                key={book.id}
                                style={{ transitionDelay: `${index * 100}ms` }}
                                className={`group bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/60 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 ease-out flex flex-col ${loaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}
                            >
                                {/* Book Image & Overlay */}
                                <div className="relative h-64 overflow-hidden bg-slate-100">
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                        <button className="w-full py-2.5 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold text-sm tracking-wide hover:bg-white hover:text-slate-900 transition-all">
                                            Manage Details
                                        </button>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${getStatusColor(book.status)}`}>
                                            {getStatusIcon(book.status)}
                                            {book.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Book Content */}
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[0.65rem] font-black text-cyan-600 uppercase tracking-widest">{book.category}</span>
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <Star className="w-3 h-3 fill-current" />
                                                <span className="text-xs font-bold text-slate-700">{book.rating}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-cyan-600 transition-colors line-clamp-1">{book.title}</h3>
                                        <p className="text-slate-500 text-sm font-medium">by {book.author}</p>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                        <div className="flex items-center gap-1.5">
                                            <IndianRupee className="w-4.5 h-4.5 text-slate-900" />
                                            <span className="text-2xl font-black text-slate-900">{book.price}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-wider">Total Sold</p>
                                            <p className="text-lg font-bold text-slate-900 flex items-center gap-1 justify-end">
                                                {book.sales}
                                                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredBooks.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6">
                                <Package className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No books found</h3>
                            <p className="text-slate-500 max-w-sm">We couldn't find any books matching your search. Try a different title or author.</p>
                        </div>
                    )}
                </div>
            </main>

            <SellerFooter />
        </div>
    );
};

export default SellBooks;
