const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

router.use('/auth', authRoutes);   //api/auth/*
router.use('/users', userRoutes); //api/users/*

module.exports = router;