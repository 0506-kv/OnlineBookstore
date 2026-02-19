import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Plus, Edit2, Trash2, Search, X, Save, IndianRupee, Tag, FileText, User, Package, AlertCircle, RefreshCw } from 'lucide-react';
import SellerHeader from '../../Components/Seller/SellerHeader';
import SellerFooter from '../../Components/Seller/SellerFooter';

const SellBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
    const [currentBook, setCurrentBook] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        author: '',
        price: '',
        category: '',
        description: ''
    });

    const categories = ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'Business', 'Self-Help', 'History', 'Biography', 'Other'];

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/books/sell`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBooks(response.data.books);
        } catch (error) {
            console.error("Error fetching books:", error);
            toast.error("Failed to load your books.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBooks = books.filter(book =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openModal = (mode, book = null) => {
        setModalMode(mode);
        setCurrentBook(book);
        if (mode === 'edit' && book) {
            setFormData({
                name: book.name,
                author: book.author,
                price: book.price,
                category: book.category || '',
                description: book.description || ''
            });
        } else {
            setFormData({ name: '', author: '', price: '', category: '', description: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentBook(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        try {
            if (modalMode === 'add') {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/books/add`, formData, { headers });
                setBooks(prev => [response.data.book, ...prev]);
                toast.success('Book added successfully!');
            } else {
                const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/books/update/${currentBook._id}`, formData, { headers });
                setBooks(prev => prev.map(b => b._id === currentBook._id ? response.data.book : b));
                toast.success('Book updated successfully!');
            }
            closeModal();
        } catch (error) {
            console.error("Error saving book:", error);
            const msg = error.response?.data?.errors?.[0]?.msg || error.response?.data?.message || "Operation failed";
            toast.error(msg);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/books/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBooks(prev => prev.filter(b => b._id !== id));
            toast.success('Book deleted successfully');
        } catch (error) {
            console.error("Error deleting book:", error);
            toast.error("Failed to delete book");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
            <SellerHeader />

            <main className="flex-1 relative z-10 px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto w-full">
                {/* Background Blobs */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10">
                    <div className="absolute top-20 right-0 w-125 h-125 bg-cyan-200/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-125 h-125 bg-indigo-200/20 rounded-full blur-3xl animate-pulse" />
                </div>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                            <Book className="text-cyan-600 w-8 h-8" />
                            Inventory Management
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">Manage your book listings effectively.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative group">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search books..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full sm:w-64 pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all shadow-sm"
                            />
                        </div>
                        <button
                            onClick={() => openModal('add')}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-bold shadow-lg shadow-cyan-200 transition-all active:scale-95"
                        >
                            <Plus className="w-5 h-5" /> Add New Book
                        </button>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
                    </div>
                ) : (
                    <>
                        <AnimatePresence>
                            {filteredBooks.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredBooks.map((book) => (
                                        <motion.div
                                            key={book._id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.2 }}
                                            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 border border-slate-100 hover:border-cyan-100 transition-all duration-300 relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                <button
                                                    onClick={() => openModal('edit', book)}
                                                    className="p-2 bg-slate-100 hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(book._id)}
                                                    className="p-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex items-start justify-between mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20">
                                                    {book.name.charAt(0).toUpperCase()}
                                                </div>
                                                {book.category && (
                                                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-slate-100 text-slate-500 rounded-full">
                                                        {book.category}
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{book.name}</h3>
                                            <p className="text-slate-500 text-sm font-medium mb-4 flex items-center gap-1">
                                                <User className="w-3.5 h-3.5" /> {book.author}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                                <div className="flex items-center text-slate-900 font-bold text-xl">
                                                    <IndianRupee className="w-4 h-4" />
                                                    {book.price}
                                                </div>
                                                <div className="text-xs font-semibold text-slate-400">
                                                    {new Date(book.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-20 text-center bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300"
                                >
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                        <Package className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">No books found</h3>
                                    <p className="text-slate-500 max-w-sm mb-6">
                                        {searchQuery ? "No books match your search." : "You haven't listed any books yet."}
                                    </p>
                                    {!searchQuery && (
                                        <button
                                            onClick={() => openModal('add')}
                                            className="text-cyan-600 font-bold hover:underline"
                                        >
                                            Add your first book
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </main>

            <SellerFooter />

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
                            onClick={closeModal}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                        >
                            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]">
                                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                    <h2 className="text-xl font-bold text-slate-900">
                                        {modalMode === 'add' ? 'Add New Book' : 'Edit Book Details'}
                                    </h2>
                                    <button onClick={closeModal} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                                            <Book className="w-4 h-4 text-slate-400" /> Book Title
                                        </label>
                                        <input
                                            type="text" name="name" required placeholder="e.g. The Alchemist"
                                            value={formData.name} onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                                            <User className="w-4 h-4 text-slate-400" /> Author
                                        </label>
                                        <input
                                            type="text" name="author" required placeholder="e.g. Paulo Coelho"
                                            value={formData.author} onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                                                <IndianRupee className="w-4 h-4 text-slate-400" /> Price
                                            </label>
                                            <input
                                                type="number" name="price" required min="0" placeholder="0"
                                                value={formData.price} onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                                                <Tag className="w-4 h-4 text-slate-400" /> Category
                                            </label>
                                            <select
                                                name="category"
                                                value={formData.category} onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all bg-white"
                                            >
                                                <option value="" disabled>Select</option>
                                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                                            <FileText className="w-4 h-4 text-slate-400" /> Description
                                        </label>
                                        <textarea
                                            name="description" rows="3" placeholder="Short description about the book..."
                                            value={formData.description} onChange={handleInputChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all resize-none"
                                        />
                                    </div>

                                    <div className="pt-4 flex gap-3">
                                        <button
                                            type="button" onClick={closeModal}
                                            className="flex-1 py-2.5 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 py-2.5 rounded-xl font-semibold text-white bg-cyan-600 hover:bg-cyan-700 shadow-lg shadow-cyan-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            <Save className="w-4 h-4" /> Save Book
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SellBooks;
