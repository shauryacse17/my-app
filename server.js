const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
 
dotenv.config();
const connectDB = require('./config/db');
connectDB();  
 
const authRoutes = require('./routes/auth');  
const documentRoutes = require('./routes/documents');  
const app = express();
const server = http.createServer(app);
app.use(
    cors({
        origin: 'http://localhost:3000',  
        methods: ['GET', 'POST', 'PUT', 'DELETE'], 
        allowedHeaders: ['Content-Type', 'Authorization'],  
    })
); 
app.use(express.json());
app.use('/api/auth', authRoutes);  
app.use('/api/documents', documentRoutes);  
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST'],  
    },
});
io.on('connection', (socket) => {
    console.log('A user connected through WebSocket!');
    socket.on('joinDocument', (documentId) => {
        console.log(`User joined document: ${documentId}`);
        socket.join(documentId);  
    });
    socket.on('documentUpdate', ({ documentId, title, content }) => {
        console.log(`Document ${documentId} updated by a user.`);
     
        socket.to(documentId).emit('receiveUpdate', { title, content });
    });
    socket.on('sendMessage', ({ documentId, message }) => {
        console.log(`Message sent in document ${documentId}: ${message}`);
        socket.to(documentId).emit('receiveMessage', message); 
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected.');
    });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
