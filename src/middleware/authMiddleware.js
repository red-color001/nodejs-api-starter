const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);

            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
module.exports = { protect };