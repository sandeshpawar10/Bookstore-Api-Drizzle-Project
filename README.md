# 📚 Bookstore REST API (Express + Drizzle ORM + PostgreSQL)

A backend REST API for managing books and authors, built using **Node.js**, **Express**, **Drizzle ORM**, and **PostgreSQL (Docker)**.  
This project demonstrates proper relational database design, foreign key constraints, and modern ORM usage.

---

## 🚀 Features

- 📖 Operations for Books
- ✍️ Operations for Authors
- 🔗 Proper Book–Author relationship (Foreign Key)
- 🧱 PostgreSQL with UUID primary keys
- ⚡ Drizzle ORM (type-safe SQL)
- 🐳 Dockerized PostgreSQL
- 🧪 RESTful API design
- 🔒 Environment variable based configuration

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Drizzle ORM**
- **Docker**
- **dotenv**
- **nodemon**

---

## 📂 Project Structure

project/
│
├── Models/
│ ├── books-schema.js
│ └── author-schema.js
│
├── controllers/
│ └── book-controller.js
│
├── routes/
│ └── book-routes.js
│
├── database/
│ └── orm-to-postgres.js
│
├── drizzle/
│ └── migrations/
│
├── drizzle.config.js
├── docker-compose.yml
├── .env (ignored)
├── server.js
└── README.md

---

▶️ How to Start the Project (Local Setup)

1️⃣ Clone the Repository
git clone https://github.com/sandeshpawar10/Bookstore-Api-Drizzle-Project.git
cd Bookstore-Api-Drizzle-Project

2️⃣ Install Dependencies
npm install

3️⃣ Start PostgreSQL using Docker
docker compose up -d

Check if the container is running:

docker ps

4️⃣ Run Database Migrations
npx drizzle-kit push

(Optional database UI)

npx drizzle-kit studio

5️⃣ Start the Server
npm run dev

or

node server.js

6️⃣ Server Running At
http://localhost:8000

---


## ⚙️ Environment Setup

Create a `.env` file in root:

```env
DATABASE_URL=postgres://username:password@localhost:5432/book-store
