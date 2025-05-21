const User = require('../models/User');
const db = require('../config/db')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        // const users = await db('users').select('id', 'username', 'email', 'created_at');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};