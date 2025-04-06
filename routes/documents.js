const express = require('express');
const Document = require('../models/Document');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();
 
router.get('/', verifyToken, async (req, res) => {
    try {
        const documents = await Document.find({ owner: req.user.id }); 
        res.status(200).json(documents);
    } catch (error) {
        console.error('Error fetching documents:', error.message);
        res.status(500).json({ message: 'Failed to fetch documents' });
    }
});
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        if (document.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.status(200).json(document);
    } catch (error) {
        console.error('Error fetching document:', error.message);
        res.status(500).json({ message: 'Failed to fetch document' });
    }
}); 
router.post('/', verifyToken, async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }
    try {
        const newDocument = await Document.create({
            title,
            content,
            owner: req.user.id,  
        });
        res.status(201).json(newDocument);
    } catch (error) {
        console.error('Error creating document:', error.message);
        res.status(500).json({ message: 'Failed to create document' });
    }
}); 
router.put('/:id', verifyToken, async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        if (document.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        document.title = title;
        document.content = content;
        const updatedDocument = await document.save();
        res.status(200).json(updatedDocument);
    } catch (error) {
        console.error('Error updating document:', error.message);
        res.status(500).json({ message: 'Failed to update document' });
    }
});
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        if (document.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        await document.remove();
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Error deleting document:', error.message);
        res.status(500).json({ message: 'Failed to delete document' });
    }
});
module.exports = router;
