import React, { useEffect, useState } from 'react';

const AllSellers = () => {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSellers();
    }, []);

    const fetchSellers = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/sellers/all`);
            const data = await response.json();

            if (response.ok) {
                setSellers(data.sellers);
            } else {
                setError(data.message || 'Failed to fetch sellers');
            }
        } catch (err) {
            setError('Error fetching sellers');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div style={styles.loading}>Loading sellers...</div>;
    if (error) return <div style={styles.error}>{error}</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>All Sellers ({sellers.length})</h2>
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.headerRow}>
                            <th style={styles.th}>Store Name</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Registered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.length > 0 ? (
                            sellers.map((seller, index) => (
                                <tr key={seller._id || index} style={styles.row}>
                                    <td style={styles.td}>{seller.storename}</td>
                                    <td style={styles.td}>{seller.email}</td>
                                    <td style={styles.td}>
                                        {seller.createdAt ? new Date(seller.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={styles.noData}>No sellers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    container: {
        background: '#fff',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '1.5rem',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    headerRow: {
        background: '#f8fafc',
        borderBottom: '2px solid #e2e8f0',
    },
    th: {
        padding: '1rem',
        textAlign: 'left',
        fontWeight: '600',
        color: '#475569',
        fontSize: '0.9rem',
    },
    row: {
        borderBottom: '1px solid #e2e8f0',
        transition: 'background 0.2s',
    },
    td: {
        padding: '1rem',
        color: '#334155',
        fontSize: '0.9rem',
    },
    loading: {
        textAlign: 'center',
        padding: '2rem',
        color: '#64748b',
        fontSize: '1.1rem',
    },
    error: {
        textAlign: 'center',
        padding: '2rem',
        color: '#ef4444',
        background: '#fee2e2',
        borderRadius: '8px',
    },
    noData: {
        textAlign: 'center',
        padding: '2rem',
        color: '#94a3b8',
    }
};

export default AllSellers;
