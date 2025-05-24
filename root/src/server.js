const buildApp = require('./app');

const start = async () => {
    const app = await buildApp();
    try {
        const port = process.env.PORT_DEV || 80;
        await app.listen({host: '0.0.0.0', port: port });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
