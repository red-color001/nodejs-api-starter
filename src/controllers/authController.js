const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide username, email, and password' });
    }

    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const user = await User.create({ username, email, password });

        if (user) {
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        const user = await User.findByEmail(email);

        if (user && (await User.comparePassword(password, user.password_hash))) {
            res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
};