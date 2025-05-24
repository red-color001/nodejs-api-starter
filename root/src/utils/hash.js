const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: async (password) => {
        if (!password || typeof password !== 'string') {
            throw new Error('Password argument is missing or not a string for hashing');
        }
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    },

    verifyPassword: async (password, hash) => {
        if (!password || !hash) {
            throw new Error('Missing password or hash in compare');
        }
        return await bcrypt.compare(password, hash);
    }
};