const express = require('express');
const { getAllUsers, } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// /api/users/*
router.get('/', protect, getAllUsers);

module.exports = router;