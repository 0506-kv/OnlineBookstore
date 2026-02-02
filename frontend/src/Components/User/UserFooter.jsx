import React from 'react';

const UserFooter = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.content}>
                <div style={styles.section}>
                    <h3 style={styles.title}>Readora</h3>
                    <p style={styles.text}>Your favorite place to buy and sell books.</p>
                </div>
                <div style={styles.section}>
                    <h4 style={styles.subtitle}>Quick Links</h4>
                    <ul style={styles.list}>
                        <li style={styles.listItem}><a href="#" style={styles.link}>Home</a></li>
                        <li style={styles.listItem}><a href="#" style={styles.link}>About Us</a></li>
                        <li style={styles.listItem}><a href="#" style={styles.link}>Contact</a></li>
                    </ul>
                </div>
                <div style={styles.section}>
                    <h4 style={styles.subtitle}>Contact</h4>
                    <p style={styles.text}>Email: support@readora.com</p>
                    <p style={styles.text}>Phone: +1 234 567 890</p>
                </div>
            </div>
            <div style={styles.copyright}>
                &copy; {new Date().getFullYear()} Readora. All rights reserved.
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        background: '#1e293b',
        color: '#f8fafc',
        padding: '3rem 2rem 1rem',
        marginTop: 'auto',
    },
    content: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    title: {
        fontSize: '1.5rem',
        color: '#fff',
    },
    subtitle: {
        fontSize: '1.1rem',
        color: '#e2e8f0',
        marginBottom: '0.5rem',
    },
    text: {
        color: '#94a3b8',
        lineHeight: '1.6',
    },
    list: {
        listStyle: 'none',
        padding: 0,
    },
    listItem: {
        marginBottom: '0.5rem',
    },
    link: {
        color: '#94a3b8',
        textDecoration: 'none',
        transition: 'color 0.2s',
    },
    copyright: {
        borderTop: '1px solid #334155',
        paddingTop: '1.5rem',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.9rem',
    }
};

export default UserFooter;
