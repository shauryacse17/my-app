const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

// Load environment variables from .env file
dotenv.config();

// Database connection (dummy for now, assumes connectDB is in './config/db')
const connectDB = require('./config/db');
connectDB(); // This will connect to the database

// Importing routes
const authRoutes = require('./routes/auth'); // For authentication
const documentRoutes = require('./routes/documents'); // For document-related APIs

// Initialize express app and HTTP server
const app = express();
const server = http.createServer(app);

// CORS setup (so frontend can interact with the backend)
app.use(
    cors({
        origin: 'http://localhost:3000', // Frontend runs on this URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// Setting up routes for the backend
app.use('/api/auth', authRoutes); // Routes for user login/signup
app.use('/api/documents', documentRoutes); // Routes for handling documents

// Socket.io setup (for real-time collaboration)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Allow the frontend to use websockets
        methods: ['GET', 'POST'], // Allowed websocket methods
    },
});

// Handling socket.io events
io.on('connection', (socket) => {
    console.log('A user connected through WebSocket!');

    // When a user joins a document for editing
    socket.on('joinDocument', (documentId) => {
        console.log(`User joined document: ${documentId}`);
        socket.join(documentId); // Join the user to a specific document room
    });

    // When a user updates the document
    socket.on('documentUpdate', ({ documentId, title, content }) => {
        console.log(`Document ${documentId} updated by a user.`);
        // Send the update to everyone in the same room except the sender
        socket.to(documentId).emit('receiveUpdate', { title, content });
    });

    // Optional: Handle messages (currently not used by the frontend)
    socket.on('sendMessage', ({ documentId, message }) => {
        console.log(`Message sent in document ${documentId}: ${message}`);
        socket.to(documentId).emit('receiveMessage', message); // Send the message to everyone in the room
    });

    // When the user disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected.');
    });
});

// Start the server on the given PORT (default is 5000)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
