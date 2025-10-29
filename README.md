# 🧠 Simple REST API – NestJS + TypeORM + JWT

Proyek ini merupakan **simple REST API** yang dibuat menggunakan **NestJS (TypeScript)** dengan fitur **autentikasi JWT**, **relasi antar entitas**, dan **pengujian E2E (End-to-End Test)** menggunakan **Supertest**.

Proyek ini mensimulasikan sistem sederhana seperti forum mini, di mana pengguna dapat **register**, **login**, serta **membuat dan melihat postingan**.

---

## 🚀 Fitur Utama

✅ **Autentikasi JWT**  
Pengguna dapat register dan login untuk mendapatkan token akses (JWT).  
Token ini digunakan untuk mengakses endpoint yang dilindungi.

✅ **Relasi Antar Entity (User ↔ Post)**  
Setiap postingan terhubung dengan pengguna yang membuatnya (one-to-many relationship).

✅ **Operasi CRUD Sederhana**

- Create dan Get All Posts
- Create User (Register)

✅ **Database SQL (PostgreSQL / MySQL / SQLite)**  
Menggunakan **TypeORM** untuk ORM mapping dan relasi antar tabel.

✅ **E2E Testing**  
Dilengkapi pengujian otomatis untuk validasi endpoint register, login, dan akses endpoint dengan JWT.

---

## 🧩 Arsitektur & Pola yang Digunakan

### 🧱 Pattern: **Modular Architecture Pattern (NestJS Default)**

Proyek ini menggunakan **pattern modular**, di mana setiap fitur memiliki module sendiri — seperti `auth`, `users`, dan `posts`.

#### 📦 Alasan Menggunakan Pattern Ini:

1. **Terstruktur dan Skalabel** – Setiap fitur terpisah dalam modulnya sendiri, sehingga mudah dikembangkan tanpa saling mengganggu.
2. **Mendukung Dependency Injection (DI)** – NestJS mengoptimalkan arsitektur ini agar setiap service/controller bisa di-_inject_ dengan mudah.
3. **Mempermudah Testing dan Maintenance** – Modul yang terpisah memungkinkan pengujian unit dan E2E dilakukan lebih terisolasi.
4. **Best Practice NestJS** – Modular pattern adalah _recommended pattern_ di dokumentasi resmi NestJS untuk project enterprise-level.

Struktur folder:

```

src/
├── auth/
│ ├── auth.controller.ts
│ ├── auth.module.ts
│ ├── auth.service.ts
│ └── jwt.strategy.ts
├── users/
│ ├── dto/
│ ├── user.entity.ts
│ ├── users.controller.ts
│ ├── users.module.ts
│ └── users.service.ts
├── posts/
│ ├── post.entity.ts
│ ├── posts.controller.ts
│ ├── posts.module.ts
│ └── posts.service.ts
├── common/
│ └── guards/
│ └── jwt-auth.guard.ts
└── app.module.ts

```

---

## ⚙️ Instalasi & Konfigurasi

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Nitaa1904/nestjs-rest-jwt-starter.git
cd nestjs-simple-restapi
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Konfigurasi Environment

Buat file `.env` di root project:

```
DATABASE_URL=postgres://user:password@localhost:5432/db_name
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=3600s
```

### 4️⃣ Jalankan Database Migration (jika pakai TypeORM)

```bash
npm run build
npm run typeorm migration:run
```

### 5️⃣ Jalankan Aplikasi

```bash
npm run start:dev
```

Aplikasi akan berjalan di:
👉 `http://localhost:3000`

---

## 📮 Dokumentasi API (Postman)

### 🧑‍💻 Register

**POST** `/auth/register`

```json
{
  "email": "nita@gmail.com",
  "password": "123456",
  "name": "Nita"
}
```

### 🔐 Login

**POST** `/auth/login`

```json
{
  "email": "nita@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "access_token": "<JWT_TOKEN>"
}
```

### 📝 Create Post (Protected)

**POST** `/posts`
Header:

```
Authorization: Bearer <JWT_TOKEN>
```

Body:

```json
{
  "title": "My First Post",
  "content": "Halo ini post pertama Nita!"
}
```

### 📜 Get All Posts

**GET** `/posts`

Response:

```json
[
  {
    "id": 1,
    "title": "My First Post",
    "content": "Halo ini post pertama Nita!",
    "user": {
      "id": 5,
      "email": "nita@gmail.com",
      "name": "Nita"
    }
  }
]
```

---

## 🧪 E2E Testing

Jalankan pengujian:

```bash
npm run test:e2e
```

Contoh pengujian di `app.e2e-spec.ts`:

```typescript
it('Register -> Login -> Access Protected', async () => {
  await request(app.getHttpServer())
    .post('/auth/register')
    .send({ email: 'nita@gmail.com', password: '123456', name: 'Nita' })
    .expect(201);

  const res = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ email: 'nita@gmail.com', password: '123456' })
    .expect(200);

  token = res.body.access_token;

  await request(app.getHttpServer())
    .get('/posts')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);
});
```

---

## 🧠 Teknologi yang Digunakan

| Teknologi              | Deskripsi                             |
| ---------------------- | ------------------------------------- |
| **NestJS**             | Framework backend berbasis TypeScript |
| **TypeORM**            | ORM untuk koneksi ke database SQL     |
| **PostgreSQL/MySQL**   | Database relational                   |
| **JWT (jsonwebtoken)** | Untuk autentikasi dan otorisasi       |
| **Bcrypt**             | Untuk hashing password                |
| **Supertest + Jest**   | Untuk E2E testing                     |

---

## 📌 Kesimpulan

Proyek ini menunjukkan implementasi dasar sistem backend modern dengan:

- Struktur modular yang rapi
- Autentikasi JWT
- Relasi antar entitas (User ↔ Post)
- Pengujian end-to-end (E2E)

Pattern modular membuat proyek lebih mudah dikembangkan, dimaintain, dan diuji — cocok untuk skala kecil hingga menengah.

---

## 👩‍💻 Author

**Nita Fitrotul Mar’ah**
📧 [nitafitrotul1904@gmail.com](mailto:nitafitrotul1904@gmail.com)
💻 Telkom University Purwokerto
✨ "Belajar dari proyek kecil, menuju sistem besar."
