import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (username && name && email && password) {
            const user = { username, name, email, password };
            console.log('User data saved to database:', user);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/login');
        } else {
            setError('Please fill all fields');
        }
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <div style={styles.registerBox}>
                <h2 style={styles.heading}>Register</h2>
                <form onSubmit={handleRegister} style={styles.form}>

                    <div style={styles.fieldContainer}>
                        <label style={styles.label}>Username:</label>
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={styles.input}
                                placeholder="Enter a username"
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.fieldContainer}>
                        <label style={styles.label}>Name:</label>
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={styles.input}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.fieldContainer}>
                        <label style={styles.label}>Email:</label>
                        <div style={styles.inputContainer}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={styles.input}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.fieldContainer}>
                        <label style={styles.label}>Password:</label>
                        <div style={styles.inputContainer}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={styles.input}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    {error && <p style={styles.error}>{error}</p>}

                    <button type="submit" style={styles.button}>Register</button>

                    <p style={styles.loginPrompt}>
                        Already have an account?{' '}
                        <span onClick={goToLogin} style={styles.loginLink}>Login</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'cyan',
    },
    registerBox: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        backgroundImage: 'url(https://images.pexels.com/photos/13567728/pexels-photo-13567728.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    fieldContainer: {
        marginBottom: '1.5rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        color: 'maroon',
    },
    inputContainer: {
        position: 'relative',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        fontSize: '1rem',
        border: '1px solid #ddd',
        borderRadius: '5px',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    button: {
        padding: '0.75rem',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '1rem',
    },
    loginPrompt: {
        textAlign: 'center',
        marginTop: '1rem',
        color: '#333',
    },
    loginLink: {
        color: '#007bff',
        cursor: 'pointer',
        fontWeight: 'bold',
        textDecoration: 'underline',
    },
};

export default Register;
