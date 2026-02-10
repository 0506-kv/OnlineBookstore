import React, { useEffect, useId, useState } from 'react';

const AllUsers = () => {
    const panelId = useId();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionError, setActionError] = useState('');
    const [actionNotice, setActionNotice] = useState('');
    const [deletingId, setDeletingId] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/all`);
            const data = await response.json();

            if (response.ok) {
                setUsers(data.users || []);
            } else {
                setError(data.message || 'Failed to fetch users');
            }
        } catch (err) {
            setError('Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    const pluralize = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;

    const handleDelete = async (userId) => {
        if (!window.confirm('Delete this user? This will remove all of their reviews and placed orders. Other orders remain.')) {
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setActionError('Session expired. Please log in again.');
            return;
        }

        setDeletingId(userId);
        setActionError('');
        setActionNotice('');

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/admin/${userId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete user');
            }

            setUsers((prev) => prev.filter((user) => user._id !== userId));

            const deletedReviews = data.deletedReviews ?? 0;
            const deletedOrders = data.deletedOrders ?? 0;
            setActionNotice(
                `User deleted. Removed ${pluralize(deletedReviews, 'review')} and ${pluralize(deletedOrders, 'placed order')}. Other orders remain.`
            );
        } catch (err) {
            setActionError(err.message || 'Failed to delete user');
        } finally {
            setDeletingId(null);
        }
    };

    const getInitials = (name = '') => {
        const parts = name.trim().split(' ').filter(Boolean);
        if (parts.length === 0) return 'U';
        return parts.slice(0, 2).map((part) => part[0]).join('').toUpperCase();
    };

    if (loading) {
        return (
            <section className="pro-card is-loading">
                <div className="pro-card__header">
                    <div>
                        <div className="pro-card__eyebrow">User registry</div>
                        <h2 className="pro-card__title">Users</h2>
                    </div>
                    <div className="pro-card__status">Syncing...</div>
                </div>
                <p className="pro-card__note">Loading user list from the registry.</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="pro-card is-error">
                <div className="pro-card__header">
                    <div>
                        <div className="pro-card__eyebrow">User registry</div>
                        <h2 className="pro-card__title">Users</h2>
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
                    <div className="pro-card__eyebrow">User registry</div>
                    <h2 className="pro-card__title">Users</h2>
                </div>
                <div className="pro-card__actions">
                    <div className="pro-card__count">{users.length}</div>
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
                Deleting a user removes all of their reviews and placed orders. Other orders remain intact.
            </p>
            <div id={panelId} className="pro-card__panel">
                {actionError && <div className="pro-card__error">{actionError}</div>}
                {actionNotice && <div className="pro-card__notice">{actionNotice}</div>}
                {users.length === 0 ? (
                    <p className="pro-card__note">No users found in the registry.</p>
                ) : (
                    <div className="pro-list">
                        {users.map((user, index) => (
                            <div
                                key={user._id}
                                className="pro-list__item"
                                style={{ '--delay': `${index * 0.05}s` }}
                            >
                                <div className="pro-list__meta">
                                    <div className="pro-avatar">{getInitials(user.fullname)}</div>
                                    <div>
                                        <div className="pro-name">{user.fullname || 'Unknown user'}</div>
                                        <div className="pro-sub">{user.email || 'Unknown email'}</div>
                                    </div>
                                </div>
                                <div className="pro-list__side">
                                    <div className="pro-date">
                                        Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                    </div>
                                    <button
                                        type="button"
                                        className="pro-action pro-action--danger"
                                        onClick={() => handleDelete(user._id)}
                                        disabled={deletingId === user._id}
                                    >
                                        {deletingId === user._id ? 'Deleting...' : 'Delete'}
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

export default AllUsers;
