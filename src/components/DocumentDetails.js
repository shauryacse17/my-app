import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDocumentById, updateDocument, deleteDocument } from '../services/documentService';
import { io } from 'socket.io-client';

const DocumentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [document, setDocument] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const message = location.state?.message;

    
    const socketRef = useRef(null);

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const doc = await getDocumentById(id);
                setDocument(doc);
                setTitle(doc.title);
                setContent(doc.content);
            } catch (error) {
                setError('Failed to fetch document');
            }
        };
        fetchDocument();
    }, [id]);

    useEffect(() => {
        
        socketRef.current = io('http://localhost:5000');

        socketRef.current.emit('joinDocument', id);

        socketRef.current.on('receiveUpdate', (updatedData) => {
            if (updatedData.title !== undefined) setTitle(updatedData.title);
            if (updatedData.content !== undefined) setContent(updatedData.content);
        });

        socketRef.current.on('receiveUpdatedTitle', (updatedContent) => {
            setContent(updatedContent);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [id]);

    const handleUpdate = async () => {
        try {
            await updateDocument(id, { title, content });
            socketRef.current.emit('documentUpdate', { documentId: id, title, content });
            setSuccessMessage('Document updated successfully!');
            navigate(`/document/${id}`);
        } catch (error) {
            setError('Failed to update document');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDocument(id);
            navigate('/dashboard');
        } catch (error) {
            setError('Failed to delete document');
        }
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        socketRef.current.emit('documentUpdate', { documentId: id, title: newTitle, content });
    };

    const handleContentChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);
        socketRef.current.emit('documentUpdate', { documentId: id, title, content: newContent });
    };

    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!document) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            {message && <div className="alert alert-success mt-3">{message}</div>}
            <h2 className="mb-4">Document Details</h2>

            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>

            <div className="form-group mt-3">
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    className="form-control"
                    rows="5"
                    value={content}
                    onChange={handleContentChange}
                />
            </div>

            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

            <div className="mt-3">
                <button className="btn btn-primary" onClick={handleUpdate}>Update Document</button>
                <button className="btn btn-danger ms-2" onClick={handleDelete}>Delete Document</button>
            </div>
        </div>
    );
};

export default DocumentDetails;
