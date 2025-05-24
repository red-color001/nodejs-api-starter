# 🚀 Fastify + Knex + PostgreSQL Starterkit

Starterkit backend modular dan scalable dengan Fastify, Knex, dan PostgreSQL. Dirancang untuk memulai proyek besar dengan struktur yang bersih dan standarisasi sejak awal.

## 📦 Tech Stack

- [Fastify](https://www.fastify.io/) - Web framework performa tinggi
- [Knex.js](https://knexjs.org/) - Query builder untuk SQL (PostgreSQL)
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [@fastify/jwt](https://github.com/fastify/fastify-jwt) - JWT Authentication plugin
- [@fastify/sensible](https://github.com/fastify/fastify-sensible) - Error handling & helpers
- [dotenv](https://github.com/motdotla/dotenv) - Environment variable loader
- [fastify-plugin](https://github.com/fastify/fastify-plugin) - Plugin wrapper untuk Fastify

---

## 📁 Struktur Proyek

root/
├── src/
│   ├── app.js                 # Entry point Fastify
│   ├── plugins/               # Plugin Fastify terpisah
│   │   ├── knex.js            # Plugin Knex
│   │   └── jwt.js             # Plugin JWT
│   ├── routes/                # Routing aplikasi
│   │   ├── public.js          # Rute publik
│   │   └── auth.js            # Rute dengan autentikasi
│   ├── controllers/           # Logika bisnis per route
│   │   ├── publicController.js
│   │   └── authController.js
│   ├── models/                # Abstraksi akses data
│   │   └── userModel.js
│   └── utils/                 # Utilitas umum (hashing, dsb.)
│       └── hash.js
├── migrations/                # Migrasi database Knex
├── seeds/                     # Seed database jika diperlukan
├── .env                       # Konfigurasi environment
├── knexfile.js                # Konfigurasi Knex
└── package.json               # Konfigurasi proyek Node.js
