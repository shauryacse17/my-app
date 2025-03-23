 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === 'test@example.com' && password === 'password') {
            localStorage.setItem('user', JSON.stringify({ email }));
            navigate('/dashboard');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h2 style={styles.heading}>Login</h2>
                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.formGroup}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <p style={styles.error}>{error}</p>}
                    <button type="submit" style={styles.button}>Login</button>
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
        backgroundImage: 'url( https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)', // Add your image URL here
        backgroundSize: 'cover',  
        backgroundPosition: 'center',  
    },
    loginBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',  
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
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
    formGroup: {
        marginBottom: '1rem',
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
};

export default Login;