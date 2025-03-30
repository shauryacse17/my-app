const jwt = require('jsonwebtoken');

 
const verifyToken = (req, res, next) => {
    try {
         
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const token = authHeader.split(' ')[1];  

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  
        next();  
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = { verifyToken };
