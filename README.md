# 📝 TodoApp

TodoApp adalah aplikasi full-stack untuk mengelola daftar tugas harian dengan fitur CRUD lengkap, manajemen kategori, dan antarmuka modern menggunakan Ant Design.  
Proyek ini terdiri dari dua bagian:
- **Frontend** → React (Vite + TypeScript)
- **Backend** → Node.js (Express + Sequelize + PostgreSQL)


---

# 📌 1. Project Overview

TodoApp memungkinkan pengguna untuk:
- Membuat, membaca, memperbarui, dan menghapus todo  
- Menandai todo sebagai selesai atau belum selesai  
- Mengelompokkan todo berdasarkan kategori  
- Membuat dan kategori baru
- Menggunakan UI modern berbasis Ant Design  
- Menampilkan data menggunakan tabel dengan pagination dan loading state  

---

# ✨ 2. Features Implemented

### ✅ Todo Features
- Create todo  
- Read list of todos  
- Update todo  
- Delete todo  
- Toggle completed status  
- Pagination  
- Filter

### 🏷️ Category Features
- Create category    
- Assign category_id to todo  

### 🧩 UI/UX (Frontend)
- Ant Design components  
- Context API for global state   
- Validation & loading states  

### ⚙️ Backend Features
- RESTful API  
- Sequelize ORM  
- Model relations  
- Error handling  

---

# 🛠️ 3. Setup & Installation 


## 🔧 Requirements
Pastikan perangkat kamu telah menginstal:
- Node.js versi LTS (>= 18)
- NPM atau Yarn
- Postgre Server
- Git

---

## 📂 4. Clone Repository

```sh
git clone https://github.com/glody71/todoapp.git
cd todoapp

```

## API Documentation
| Method | Endpoint          | Deskripsi                       | Request Body                                                         |
| ------ | ----------------- | ------------------------------- | -------------------------------------------------------------------- |
| GET    | `/api/todos`      | Mendapatkan semua todo          | N/A                                                                  |
| POST   | `/api/todos`      | Membuat todo baru               | `{ title, description, category_id, priority, due_date }`            |
| GET    | `/api/todos/:id`  | Mendapatkan todo berdasarkan ID | N/A                                                                  |
| PUT    | `/api/todos/:id`  | Memperbarui todo                | `{ title, description, completed, category_id, priority, due_date }` |
| DELETE | `/api/todos/:id`  | Menghapus todo                  | N/A                                                                  |
| GET    | `/api/categories` | Mendapatkan semua kategori      | N/A                                                                  |
| POST   | `/api/categories` | Membuat kategori baru           | `{ name }`                                                           |


## Database Design Questions
### 1.What database tables did you create and why?

Tabel yang Dibuat:

todos – Menyimpan item todo dengan field: id, title, description, completed, category_id, priority, due_date.

categories – Menyimpan kategori untuk todos dengan field: id, name, dan color.

id, created_at, dan updated_at terbuat otomatis ketika migrate sequalize

Relasi:
todos.category_id → categories.id (Banyak todo dimiliki oleh satu kategori).

### 2 How did you handle pagination and filtering in the database?
Pagination & Filtering:

Query menggunakan LIMIT dan OFFSET untuk pagination.

Filtering di TodoTable.tsx:

- Category, Priority, Status: Table membuat filter otomatis menggunakan filters dan onFilter.

- Category: Menampilkan todos berdasarkan kategori yang dipilih.

- Priority: Menampilkan todos berdasarkan prioritas yang dipilih.

- Status: Menampilkan todos berdasarkan status (completed atau pending).

- Title & Due Date: Filter berbasis substring; hanya menampilkan todos yang mengandung teks atau tanggal yang dicari.

- Ant Design Table menggunakan fungsi onFilter untuk menentukan baris mana yang ditampilkan sesuai filter yang dipilih.

- Beberapa filter dapat digabungkan; Table hanya menampilkan todos yang memenuhi semua kondisi filter yang aktif.


## Technical Decision Questions
### 1. Desain Responsif:
- Breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop)
- Komponen Ant Design seperti Row, Col, dan Card digunakan untuk layout yang adaptif.
- UI menyesuaikan dengan cara menumpuk elemen pada layar kecil dan menggunakan grid pada layar besar.

### 2. How did you structure your React components?
- Komponen Hierarchy:
TodoPage
├── TodoSearch
├── TodoTable
├── TodoForm
└── CategoryForm

Penjelasan:

- TodoPage
Komponen halaman utama yang menampilkan semua fitur todo.
Mengambil data dari TodoContext dan mengatur state untuk daftar todo, kategori, filter, dan pagination.

- TodoSearch
Komponen untuk melakukan pencarian atau filter todo berdasarkan kata kunci.
Mengirimkan input pengguna ke TodoContext untuk memperbarui daftar todo yang ditampilkan.

- TodoTable
Menampilkan daftar todo dalam bentuk tabel.
Mendukung fitur edit, hapus, sorting, dan pagination.
Mengambil data dari TodoContext.

- TodoForm
Komponen form untuk membuat atau mengedit todo.
Mengirimkan data ke backend melalui todoApi dan memperbarui TodoContext.

- CategoryForm
Komponen form untuk membuat kategori baru.
Mengirimkan data ke backend melalui todoApi dan memperbarui TodoContext.

- Manajemen State:
useState dan useEffect untuk state lokal komponen.
Context API untuk state global (todos, kategori, filter, pagination).

- Status filter dan pagination disimpan di Context agar konsisten di seluruh komponen

  
### 3. What backend architecture did you choose and why?
- Rute diatur berdasarkan resource (/api/todos, /api/categories) menggunakan controller
- Struktur Backend

backend/
├── controllers/
│   ├── todoController.js      # Logika CRUD untuk todos
│   └── categoryController.js  # Logika CRUD untuk categories
├── models/
│   ├── todo.js                # Definisi model Todo (fields & relasi)
│   └── category.js            # Definisi model Category
├── routes/
│   ├── todoRoutes.js          # Endpoint API untuk todos
│   └── categoryRoutes.js      # Endpoint API untuk categories
└── server.js     

Error handling menggunakan try and catch  yang mengembalikan response JSON dengan status code sesuai.

### 4.How did you handle data validation?

Validasi: masih belum menggunakan validasi

## Testing and Quality Questions

### 1. What did you choose to unit test and why?
Unit Testing:

Dilakukan pada service backend (logika CRUD) dan fungsi penting.
baru menggunakan postman untuk uji service

### 2. If you had more time, what would you improve or add?
- Menambahkan autentikasi dan akun pengguna.
- Meningkatkan tampilan UI dengan animasi dan efek interaktif.
- Menambahkan test lebih lengkap untuk komponen frontend.
