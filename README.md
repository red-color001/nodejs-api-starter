# Node.js REST API Starter Kit (Express + Knex + PostgreSQL + JWT)

Ini adalah starter kit ringan untuk membangun REST API menggunakan Node.js, Express.js, Knex.js (dengan PostgreSQL), dan autentikasi JWT. Starter kit ini dirancang untuk menjadi dasar yang solid untuk proyek-proyek skala besar, dengan fokus pada struktur yang terorganisir dan praktik pengembangan yang baik.

## ✨ Fitur Utama

* **Framework Express.js**: Framework web yang cepat, fleksibel, dan minimalis untuk Node.js.
* **Query Builder Knex.js**: SQL query builder yang kuat untuk PostgreSQL (dan database SQL lainnya).
* **Koneksi PostgreSQL**: Dikonfigurasi untuk terhubung dengan database PostgreSQL.
* **Struktur Model-Controller**: Pemisahan logika bisnis dan akses data yang jelas.
* **Migrasi Database**: Menggunakan Knex migrations untuk manajemen skema database yang versionable.
* **Autentikasi JWT**: Implementasi JSON Web Token untuk rute yang aman.
* **Rute Publik & Terautentikasi**: Contoh implementasi untuk kedua jenis rute.
* **Manajemen Variabel Lingkungan**: Menggunakan `dotenv` untuk konfigurasi yang aman.
* **CORS Enabled**: Middleware CORS sudah diaktifkan.

## 🛠️ Tumpukan Teknologi

* Node.js
* Express.js
* PostgreSQL
* Knex.js
* jsonwebtoken
* bcryptjs
* dotenv
* cors

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal perangkat lunak berikut:

* [Node.js](https://nodejs.org/) (disarankan versi LTS terbaru)
* [npm](https://www.npmjs.com/) (biasanya terinstal bersama Node.js) atau [Yarn](https://yarnpkg.com/)
* [PostgreSQL](https://www.postgresql.org/download/) (pastikan server PostgreSQL berjalan)
* [Git](https://git-scm.com/) (untuk mengkloning repositori)

## 🚀 Memulai

Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal:

1.  **Kloning Repositori:**
    ```bash
    git clone https://github.com/red-color001/nodejs-api-starter.git
    ```

2.  **Instal Dependensi:**
    ```bash
    npm install
    # atau jika menggunakan yarn
    # yarn install
    ```

3.  **Konfigurasi Variabel Lingkungan:**
    * Buat salinan dari file `.env.example` (jika Anda membuatnya, jika tidak buat file `.env` secara manual).
        ```bash
        cp .env.example .env
        ```
    * Buka file `.env` dan sesuaikan variabel-variabel berikut dengan konfigurasi lokal Anda:
        ```dotenv
        NODE_ENV=development
        PORT=3000

        DB_CLIENT=pg
        DB_HOST=127.0.0.1
        DB_PORT=5432
        DB_USER=user_postgresql_anda
        DB_PASSWORD=password_postgresql_anda
        DB_NAME=nama_database_anda

        JWT_SECRET=kunci_rahasia_jwt_anda_yang_sangat_aman
        JWT_EXPIRES_IN=1h
        ```
    * **Penting**: Pastikan database (`DB_NAME`) sudah dibuat di server PostgreSQL Anda.

4.  **Jalankan Migrasi Database:**
    Perintah ini akan membuat tabel-tabel yang diperlukan dalam database Anda berdasarkan file migrasi di `db/migrations/`.
    ```bash
    npm run knex migrate:latest
    ```
    *Catatan: Jika Anda belum menginstal Knex CLI secara global, Anda bisa menggunakan `npx knex migrate:latest` atau pastikan script `knex` ada di `package.json` Anda.*

5.  **Jalankan Aplikasi:**
    * Untuk mode produksi (atau mode standar):
        ```bash
        npm start
        ```
    * Untuk mode pengembangan dengan `nodemon` (server akan otomatis restart saat ada perubahan file):
        ```bash
        npm run dev
        ```
    Server akan berjalan di `http://localhost:PORT` (defaultnya `http://localhost:3000`).

## 📜 Skrip yang Tersedia

Dalam direktori proyek, Anda dapat menjalankan beberapa skrip bawaan:

* `npm start`
    * Menjalankan aplikasi menggunakan `node index.js`.

* `npm run dev`
    * Menjalankan aplikasi dalam mode pengembangan menggunakan `nodemon`. Server akan otomatis restart jika ada perubahan pada file.

* `npm run knex <perintah_knex>`
    * Memungkinkan Anda menjalankan perintah Knex CLI langsung dari proyek. Contoh:
        * `npm run knex migrate:make nama_migrasi_baru` (untuk membuat file migrasi baru)
        * `npm run knex migrate:latest` (untuk menjalankan migrasi terbaru)
        * `npm run knex migrate:rollback` (untuk membatalkan migrasi terakhir)
        * `npm run knex seed:make nama_seed_baru` (untuk membuat file seed baru)
        * `npm run knex seed:run` (untuk menjalankan semua file seed)

## 📁 Struktur Proyek
```
.
├── config/               # Konfigurasi (misalnya, database)
│   └── db.js             # Instance dan konfigurasi Knex
├── controllers/          # Logika bisnis dan penanganan permintaan
│   ├── authController.js
│   └── userController.js
├── db/
│   ├── migrations/       # File migrasi database Knex
│   └── seeds/            # (Opsional) File data awal (seeds) Knex
├── middleware/
│   └── authMiddleware.js # Middleware (misalnya, untuk autentikasi JWT)
├── models/               # Model data untuk interaksi dengan database
│   └── User.js
├── routes/               # Definisi rute API
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── index.js          # Titik masuk untuk semua rute (prefix /api)
├── .env                  # Variabel lingkungan (JANGAN DI-COMMIT KE GIT)
├── .env.example          # Contoh file variabel lingkungan
├── .gitignore            # File dan folder yang diabaikan oleh Git
├── knexfile.js           # Konfigurasi Knex untuk CLI
├── index.js              # Titik masuk utama aplikasi (server Express)
├── package.json          # Metadata proyek dan dependensi
└── README.md             # Anda sedang membacanya!
```

## 🔑 Autentikasi JWT

Starter kit ini menggunakan JSON Web Tokens (JWT) untuk mengamankan rute API.

* **Registrasi (`/api/auth/register`)**: Membuat pengguna baru dan mengembalikan token JWT.
* **Login (`/api/auth/login`)**: Memverifikasi kredensial pengguna dan mengembalikan token JWT.
* **Akses Rute Terproteksi**: Untuk mengakses rute yang memerlukan autentikasi, sertakan token JWT dalam header `Authorization` dengan skema `Bearer`.
    Contoh: `Authorization: Bearer <token_anda>`
* **Middleware `protect`**: Middleware ini (`middleware/authMiddleware.js`) digunakan pada rute yang memerlukan autentikasi untuk memverifikasi token JWT. Jika valid, informasi pengguna akan ditambahkan ke objek `req.user`.

##  Datenbank-Migrationen (Database Migrations)

Knex.js digunakan untuk mengelola perubahan skema database Anda dari waktu ke waktu.

* **Membuat Migrasi Baru:**
    ```bash
    npm run knex migrate:make nama_deskriptif_migrasi
    ```
    Ini akan membuat file migrasi baru di direktori `db/migrations/`.

* **Menjalankan Migrasi Terbaru:**
    ```bash
    npm run knex migrate:latest
    ```

* **Membatalkan Migrasi Terakhir:**
    ```bash
    npm run knex migrate:rollback
    ```

## ⚙️ Variabel Lingkungan (.env)

Pastikan file `.env` Anda dikonfigurasi dengan benar. Berikut adalah variabel utama yang digunakan:

* `NODE_ENV`: Lingkungan aplikasi (misalnya, `development`, `production`).
* `PORT`: Port tempat server akan berjalan.
* `DB_CLIENT`: Klien database yang digunakan oleh Knex (diatur ke `pg` untuk PostgreSQL).
* `DB_HOST`: Host server database Anda.
* `DB_PORT`: Port server database Anda.
* `DB_USER`: Nama pengguna untuk koneksi database.
* `DB_PASSWORD`: Kata sandi untuk koneksi database.
* `DB_NAME`: Nama database yang akan digunakan.
* `JWT_SECRET`: Kunci rahasia yang digunakan untuk menandatangani dan memverifikasi token JWT. **Buat ini menjadi string yang panjang, acak, dan unik!**
* `JWT_EXPIRES_IN`: Durasi masa berlaku token JWT (misalnya, `1h`, `7d`, `30m`).

## 🌐 Contoh Endpoint API

Semua endpoint API diawali dengan `/api`.

### Rute Publik

* `POST /api/auth/register`
    * Mendaftarkan pengguna baru.
    * Body: `{ "username": "userbaru", "email": "user@example.com", "password": "password123" }`
* `POST /api/auth/login`
    * Login pengguna yang sudah ada.
    * Body: `{ "email": "user@example.com", "password": "password123" }`
* `GET /api/users`
    * (Contoh) Mendapatkan daftar semua pengguna. *Dalam aplikasi nyata, ini mungkin memerlukan hak akses admin.*

### Rute Terautentikasi (Memerlukan Header `Authorization: Bearer <token>`)

* `GET /api/auth/me`
    * Mendapatkan detail profil pengguna yang sedang login.

## 🤝 Berkontribusi

Kontribusi, isu, dan permintaan fitur sangat kami harapkan! Jangan ragu untuk membuka *issue* atau *pull request*.

1.  Fork repositori ini.
2.  Buat branch fitur Anda (`git checkout -b fitur/FiturLuarBiasa`).
3.  Commit perubahan Anda (`git commit -m 'Menambahkan FiturLuarBiasa'`).
4.  Push ke branch (`git push origin fitur/FiturLuarBiasa`).
5.  Buka Pull Request.

## 📄 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file `LICENSE` (jika ada) untuk detail lebih lanjut.
(Jika Anda belum memiliki file LICENSE, Anda bisa membuatnya atau menghapus bagian ini).

---

*Selamat melakukan coding!* 💻
