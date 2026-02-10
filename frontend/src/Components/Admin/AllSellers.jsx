import React, { useEffect, useId, useState } from 'react';

const AllSellers = () => {
    const panelId = useId();
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionError, setActionError] = useState('');
    const [actionNotice, setActionNotice] = useState('');
    const [deletingId, setDeletingId] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchSellers();
    }, []);

    const fetchSellers = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/sellers/all`);
            const data = await response.json();

            if (response.ok) {
                setSellers(data.sellers || []);
            } else {
                setError(data.message || 'Failed to fetch sellers');
            }
        } catch (err) {
            setError('Error fetching sellers');
        } finally {
            setLoading(false);
        }
    };

    const pluralize = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;

    const handleDelete = async (sellerId) => {
        if (!window.confirm('Delete this seller? This will remove all of their books and delete placed and shipped orders. Delivered orders remain.')) {
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setActionError('Session expired. Please log in again.');
            return;
        }

        setDeletingId(sellerId);
        setActionError('');
        setActionNotice('');

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/sellers/admin/${sellerId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete seller');
            }

            setSellers((prev) => prev.filter((seller) => seller._id !== sellerId));

            const deletedBooks = data.deletedBooks ?? 0;
            const deletedOrders = data.deletedOrders ?? 0;
            setActionNotice(
                `Seller deleted. Removed ${pluralize(deletedBooks, 'book')} and ${pluralize(deletedOrders, 'placed/shipped order')}. Delivered orders remain.`
            );
        } catch (err) {
            setActionError(err.message || 'Failed to delete seller');
        } finally {
            setDeletingId(null);
        }
    };

    const getInitials = (name = '') => {
        const parts = name.trim().split(' ').filter(Boolean);
        if (parts.length === 0) return 'S';
        return parts.slice(0, 2).map((part) => part[0]).join('').toUpperCase();
    };

    if (loading) {
        return (
            <section className="pro-card is-loading">
                <div className="pro-card__header">
                    <div>
                        <div className="pro-card__eyebrow">Seller registry</div>
                        <h2 className="pro-card__title">Sellers</h2>
                    </div>
                    <div className="pro-card__status">Syncing...</div>
                </div>
                <p className="pro-card__note">Loading seller list from the registry.</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="pro-card is-error">
                <div className="pro-card__header">
                    <div>
                        <div className="pro-card__eyebrow">Seller registry</div>
                        <h2 className="pro-card__title">Sellers</h2>
                    </div>
                    <div className="pro-card__status">Unavailable</div>
                </div>
                <p className="pro-card__note">{error}</p>
            </section>
        );
    }

    return (
        <section className={`pro-card ${open ? 'is-open' : ''}`}>
            <div className="pro-card__header">
                <div>
                    <div className="pro-card__eyebrow">Seller registry</div>
                    <h2 className="pro-card__title">Sellers</h2>
                </div>
                <div className="pro-card__actions">
                    <div className="pro-card__count">{sellers.length}</div>
                    <button
                        type="button"
                        className="pro-card__toggle"
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        {open ? 'Hide list' : 'View list'}
                        <span className="pro-card__chev" />
                    </button>
                </div>
            </div>
            <p className="pro-card__note">
                Deleting a seller removes their books and placed/shipped orders. Delivered orders remain intact.
            </p>
            <div id={panelId} className="pro-card__panel">
                {actionError && <div className="pro-card__error">{actionError}</div>}
                {actionNotice && <div className="pro-card__notice">{actionNotice}</div>}
                {sellers.length === 0 ? (
                    <p className="pro-card__note">No sellers found in the registry.</p>
                ) : (
                    <div className="pro-list">
                        {sellers.map((seller, index) => (
                            <div
                                key={seller._id}
                                className="pro-list__item"
                                style={{ '--delay': `${index * 0.05}s` }}
                            >
                                <div className="pro-list__meta">
                                    <div className="pro-avatar">{getInitials(seller.storename)}</div>
                                    <div>
                                        <div className="pro-name">{seller.storename || 'Unknown store'}</div>
                                        <div className="pro-sub">{seller.email || 'Unknown email'}</div>
                                    </div>
                                </div>
                                <div className="pro-list__side">
                                    <div className="pro-date">
                                        Joined {seller.createdAt ? new Date(seller.createdAt).toLocaleDateString() : 'N/A'}
                                    </div>
                                    <button
                                        type="button"
                                        className="pro-action pro-action--danger"
                                        onClick={() => handleDelete(seller._id)}
                                        disabled={deletingId === seller._id}
                                    >
                                        {deletingId === seller._id ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllSellers;
