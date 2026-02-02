import React from 'react';

const AdminFooter = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.content}>
                <div style={styles.section}>
                    <h3 style={styles.title}>Admin Panel</h3>
                    <p style={styles.text}>Manage Readora efficiently and securely.</p>
                </div>
                <div style={styles.section}>
                    <h4 style={styles.subtitle}>Quick Access</h4>
                    <ul style={styles.list}>
                        <li style={styles.listItem}><a href="/admin/analytics" style={styles.link}>Analytics</a></li>
                        <li style={styles.listItem}><a href="/admin/settings" style={styles.link}>Settings</a></li>
                        <li style={styles.listItem}><a href="/admin/reports" style={styles.link}>Reports</a></li>
                    </ul>
                </div>
                <div style={styles.section}>
                    <h4 style={styles.subtitle}>Admin Support</h4>
                    <p style={styles.text}>Email: admin@readora.com</p>
                    <p style={styles.text}>Support: +1 234 567 890</p>
                </div>
                <div style={styles.section}>
                    <h4 style={styles.subtitle}>System Info</h4>
                    <p style={styles.text}>Version: 1.0.0</p>
                    <p style={styles.text}>Last Login: {new Date().toLocaleDateString()}</p>
                </div>
            </div>
            <div style={styles.copyright}>
                &copy; {new Date().getFullYear()} Readora Admin Panel. All rights reserved. | Secure Access Only
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        color: '#f8fafc',
        padding: '2.5rem 2rem 1rem',
        marginTop: 'auto',
        borderTop: '2px solid #334155',
    },
    content: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginBottom: '1.5rem',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
    },
    title: {
        fontSize: '1.3rem',
        color: '#fff',
        fontWeight: '700',
        marginBottom: '0.3rem',
    },
    subtitle: {
        fontSize: '1rem',
        color: '#e2e8f0',
        fontWeight: '600',
        marginBottom: '0.3rem',
    },
    text: {
        color: '#94a3b8',
        lineHeight: '1.6',
        fontSize: '0.9rem',
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    listItem: {
        marginBottom: '0.5rem',
    },
    link: {
        color: '#94a3b8',
        textDecoration: 'none',
        transition: 'color 0.2s',
        fontSize: '0.9rem',
    },
    copyright: {
        borderTop: '1px solid #334155',
        paddingTop: '1.5rem',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.85rem',
    }
};

export default AdminFooter;
