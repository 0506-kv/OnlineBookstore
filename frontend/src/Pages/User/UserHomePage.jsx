import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../../Components/User/UserHeader';
import UserFooter from '../../Components/User/UserFooter';

const dummyBooks = [
    {
        id: 1,
        title: "The Great Gatsby",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
        description: "A classic novel set in the Roaring Twenties.",
        price: "₹115.99",
        seller: "Classic Books Inc."
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
        description: "Harper Lee's masterpiece about justice.",
        price: "₹212.50",
        seller: "Readers Haven"
    },
    {
        id: 3,
        title: "1984",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
        description: "Dystopian social science fiction novel and cautionary tale.",
        price: "₹314.00",
        seller: "Orwellian Store"
    },
    {
        id: 4,
        title: "Harry Potter",
        image: "https://images.unsplash.com/photo-1626618012641-bf8ca552980d?q=80&w=800&auto=format&fit=crop",
        description: "A young wizard's journey through magic and mystery.",
        price: "₹120.00",
        seller: "Magic World"
    },
    {
        id: 5,
        title: "The Alchemist",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
        description: "A story about following your dreams.",
        price: "₹183.50",
        seller: "Dream Books"
    },
    {
        id: 6,
        title: "The Hobbit",
        image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=800&auto=format&fit=crop",
        description: "Bilbo Baggins's quest to reclaim the Lonely Mountain.",
        price: "₹252.99",
        seller: "Middle Earth Ltd."
    }
];

const UserHomePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!storedUser || !token) {
            navigate('/user/login');
        } else {
            setUser(JSON.parse(storedUser));
            setLoaded(true);
        }
    }, [navigate]);

    if (!user) return null;

    return (
        <div style={s.pageWrapper}>
            <style>{globalCss}</style>
            <UserHeader user={user} />

            <main style={s.mainContent}>
                <div style={s.heroSection}>
                    <h1 style={s.heroTitle}>Discover Your Next Favorite Book</h1>
                    <p style={s.heroSubtitle}>Explore books from sellers around the world.</p>
                </div>

                <div style={s.gridContainer} id="books">
                    {dummyBooks.map((book) => (
                        <div key={book.id} style={s.bookCard}>
                            <div style={s.imageContainer}>
                                <img src={book.image} alt={book.title} style={s.bookImage} />
                                <div style={s.priceTag}>{book.price}</div>
                            </div>
                            <div style={s.bookInfo}>
                                <h3 style={s.bookTitle}>{book.title}</h3>
                                <p style={s.bookSeller}>Sold by: {book.seller}</p>
                                <p style={s.bookDesc}>{book.description}</p>
                                <button style={s.buyBtn}>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <UserFooter />
        </div>
    );
};

const globalCss = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap'); 
* { margin:0; padding:0; box-sizing:border-box; }
`;

const s = {
    pageWrapper: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'DM Sans', sans-serif",
        background: '#f8fafc',
    },
    mainContent: {
        flex: 1,
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
    },
    heroSection: {
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '3rem 0',
        background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
        borderRadius: '24px',
        color: 'white',
        boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
    },
    heroTitle: {
        fontSize: '2.5rem',
        marginBottom: '1rem',
        fontWeight: '700',
    },
    heroSubtitle: {
        fontSize: '1.2rem',
        opacity: 0.9,
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem',
        padding: '1rem 0',
    },
    bookCard: {
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e2e8f0',
        ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }
    },
    imageContainer: {
        height: '200px',
        overflow: 'hidden',
        position: 'relative',
    },
    bookImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.5s',
    },
    priceTag: {
        position: 'absolute',
        top: '12px',
        right: '12px',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '4px 12px',
        borderRadius: '20px',
        fontWeight: '700',
        color: '#7c3aed',
        fontSize: '0.9rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    bookInfo: {
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    bookTitle: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '0.5rem',
        lineHeight: 1.3,
    },
    bookSeller: {
        fontSize: '0.875rem',
        color: '#64748b',
        marginBottom: '0.75rem',
        fontWeight: '500',
    },
    bookDesc: {
        fontSize: '0.95rem',
        color: '#475569',
        marginBottom: '1.5rem',
        lineHeight: 1.5,
        display: '-webkit-box',
        WebkitLineClamp: '3',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    buyBtn: {
        marginTop: 'auto',
        width: '100%',
        padding: '0.8rem',
        background: '#1e293b',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background 0.2s',
    }
};

export default UserHomePage;
