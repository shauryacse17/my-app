const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    try {
        // Extract the Authorization header
        const authHeader = req.header('Authorization');
        
        // Check if the Authorization header is present and properly formatted
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Access denied. Token is missing or malformed.' });
        }

        // Extract the token by removing the "Bearer " prefix
        const token = authHeader.split(' ')[1];

        // Verify the token using the secret key from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Check for specific error types and respond accordingly
        const message = error.name === 'TokenExpiredError' 
            ? 'Access denied. Token has expired.' 
            : 'Access denied. Invalid token.';
        
        return res.status(401).json({ error: message });
    }
};

module.exports = { verifyToken };
