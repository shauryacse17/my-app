const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    try {
       const authHeader = req.header('Authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Access denied. Token is missing or malformed.' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        const message = error.name === 'TokenExpiredError' 
            ? 'Access denied. Token has expired.' 
            : 'Access denied. Invalid token.';
        
        return res.status(401).json({ error: message });
    }
};
module.exports = { verifyToken };
