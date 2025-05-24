const Fastify = require('fastify');
const dotenv = require('dotenv');

dotenv.config();

async function buildApp() {
    const app = Fastify({
        // logger: true
        logger: {
            level: 'info',
            redact: ['req.headers.authorization', 'req.body.password'],
        }
    });

    app.register(require('@fastify/sensible'));
    app.register(require('@fastify/cors'), {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    });
    app.register(require('@fastify/formbody'));
    app.register(require('@fastify/multipart'), {
        addToBody: true,
        limits: {
            fileSize: 5 * 1024 * 1024 // 5 MB
        }
    });
    if (process.env.RATE_LIMITER_ENABLED === 'true') {
        console.log('Rate limiter is enabled');
        app.register(require('@fastify/rate-limit'), {
            max: 100,
            timeWindow: '1 minute',
            keyGenerator: (req) => {
                console.log(req.ip)
                return req.ip;
            },
            skipOnError: true,
            errorResponseBuilder: (req, res) => {
                return {
                    statusCode: 429,
                    error: 'Too Many Requests',
                    message: 'You have exceeded the request limit. Please try again later.'
                };
            }
        });
    }
    app.register(require('@fastify/helmet'), {
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
    });
    app.register(require('@fastify/compress'), {
        global: true,
        encodings: ['gzip', 'deflate'],
        threshold: 1024
    });

    app.register(require('./plugins/knex'));
    app.register(require('./plugins/jwt'));

    app.setErrorHandler((error, request, reply) => {
        // Selalu log error lengkap di sisi server, terlepas dari environment.
        request.log.error(error);

        const isDevelopment = process.env.NODE_ENV === 'development';

        // 1. Menangani error validasi dari Fastify
        if (error.validation) {
            const responsePayload = {
                error: 'Validation failed',
                message: "Input yang diberikan tidak valid.", // Pesan umum
                details: error.validation, // Detail validasi dari Fastify
            };
            if (isDevelopment) {
                responsePayload.stack = error.stack; // Tambahkan stack trace di development
            }
            return reply.code(400).send(responsePayload);
        }

        // 2. Menangani error yang sudah memiliki statusCode (error terstruktur)
        if (error.statusCode && error.statusCode >= 400 && error.statusCode < 600) {
            const responsePayload = {
                error: error.name || 'Error', // Gunakan nama error jika ada
                message: error.message,       // Pesan error spesifik
            };
            if (isDevelopment) {
                responsePayload.stack = error.stack; // Tambahkan stack trace di development
            }
            return reply.code(error.statusCode).send(responsePayload);
        }

        if (isDevelopment) {
            reply.code(error.statusCode || 500).send({
                error: error.name || 'InternalServerError',
                message: error.message,
                stack: error.stack,
            });
        } else {
            reply.code(500).send({
                error: 'Internal Server Error',
                message: 'An error occurred on our server. Please try again later.',
            });
        }
    });

    // Register routes
    app.register(require('./routes/public'), { prefix: '/api' });
    app.register(require('./routes/auth'), { prefix: '/api' });

    return app;
}

module.exports = buildApp;
