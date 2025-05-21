require('dotenv').config();
const express = require('express');
const cors = require('cors');
const allRoutes = require('./routes/index');
const { RateLimiterMemory } = require('rate-limiter-flexible');


const app = express();
const PORT = process.env.PORT || 80;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiter
const opts = {
    points: 80,
    duration: 60,
};

const rateLimiter = new RateLimiterMemory(opts);

const rateLimiterMiddleware = async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    rateLimiter.consume(ip)
    .then(() => {
        next();
    })
    .catch((rateLimiterRes) => {
        const secondsTillRetry = Math.ceil(rateLimiterRes.msBeforeNext / 1000);
        res.writeHead(429, {
            'Retry-After': secondsTillRetry,
            'Content-Type': 'application/json',
        });
        console.log(`[X] Rate limit exceeded for IP: ${ip}`);
        res.end(
            JSON.stringify({
                status: 429,
                message: 'Too Many Requests',
            })
        );
    });
};

// Index
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Prefix /api
app.use('/api',rateLimiterMiddleware, allRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[X] Error: ${err.message}`);
  res.status(500).json({ message: 'Internal server error' });
});

app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: "Route not found"
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});