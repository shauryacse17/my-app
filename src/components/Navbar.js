import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faUserPlus, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const location = useLocation();  

    return (
        <nav style={styles.nav}>
            <div style={styles.logoContainer}>
                <Link to="/" style={styles.logoLink}>
                    <div style={styles.logoText}>CollabTool</div>
                </Link>
            </div>
 
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link
                        to="/"
                        style={{
                            ...styles.navLink,
                            ...(location.pathname === '/' && styles.activeLink),  
                        }}
                    >
                        <FontAwesomeIcon icon={faHome} style={styles.icon} /> Home
                    </Link>
                </li>
                <li style={styles.navItem}>
                    <Link
                        to="/login"
                        style={{
                            ...styles.navLink,
                            ...(location.pathname === '/login' && styles.activeLink),  
                        }}
                    >
                        <FontAwesomeIcon icon={faSignInAlt} style={styles.icon} /> Login
                    </Link>
                </li>
                <li style={styles.navItem}>
                    <Link
                        to="/register"
                        style={{
                            ...styles.navLink,
                            ...(location.pathname === '/register' && styles.activeLink), 
                        }}
                    >
                        <FontAwesomeIcon icon={faUserPlus} style={styles.icon} /> Register
                    </Link>
                </li>
                <li style={styles.navItem}>
                    <Link
                        to="/dashboard"
                        style={{
                            ...styles.navLink,
                            ...(location.pathname === '/dashboard' && styles.activeLink),  
                        }}
                    >
                        <FontAwesomeIcon icon={faTachometerAlt} style={styles.icon} /> Dashboard
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#007bff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    logoLink: {
        textDecoration: 'none',
        color: '#fff',
    },
    logoText: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: '0.9rem',
        color: '#f0f0f0',
        marginTop: '0.25rem',
    },
    navList: {
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    navItem: {
        margin: '0 1rem',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
    },
    activeLink: {
        backgroundColor: '#0056b3',  
        color: '#fff',
    },
    icon: {
        marginRight: '0.5rem',
    },
};

export default Navbar;
