import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DocumentForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const document = { title, content };
        localStorage.setItem('document', JSON.stringify(document));
        navigate('/dashboard');
    };

    return (
        <div style={styles.container}>
            <h2>Create New Document</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={styles.textarea}
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>Create</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '2rem',
    },
    form: {
        maxWidth: '500px',
        margin: '0 auto',
    },
    formGroup: {
        marginBottom: '1rem',
    },
    input: {
        width: '100%',
        padding: '0.5rem',
        fontSize: '1rem',
    },
    textarea: {
        width: '100%',
        padding: '0.5rem',
        fontSize: '1rem',
        minHeight: '150px',
    },
    button: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        backgroundColor: '#007bffB',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default DocumentForm;