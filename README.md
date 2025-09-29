# 📰 NC News API

A RESTful backend API built with **Node.js**, **Express**, and **PostgreSQL**.  
Provides programmatic access to news articles, topics, users, and comments.  
Originally developed as part of a Northcoders bootcamp project.

---

## 📦 Installation & Setup

1. Clone the repo:

   git clone https://github.com/Vnb123/be-nc-news.git
   cd be-nc-news

2. Install dependencies:

   npm install

3. Create environment files in the project root:

- `.env.development`

  PGDATABASE=nc_news

- `.env.test`

  PGDATABASE=nc_news_test

4. Setup databases and seed test data:

   npm run setup-dbs
   npm run seed

5. Start the dev server:

   npm run dev

---

## 🌍 Hosted API (via Render)

The API can be deployed on Render at:  
https://be-nc-news.onrender.com/api

- The `/api` endpoint serves the `endpoints.json` file with a full list of available routes.
- **Note:** The Render service must be launched/deployed to be accessible.
- You can also run it locally with `npm run dev`.

---

## 🧪 Testing

The project uses **Jest** and **Supertest**.  
Run all tests with:

    npm test

---

## ⚙️ Project Structure

- `controllers/` → route handlers
- `models/` → database queries
- `db/` → database setup & seed files
- `__tests__/` → integration & unit tests
- `endpoints.json` → full documentation of API routes
- `error-handling.md` → notes on error-handling strategy

---

## 🛠 Tech Stack

[![Node.js](https://img.shields.io/badge/Node.js-AAF0D1?style=for-the-badge&logo=node.js&logoColor=339933)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-FFE0AC?style=for-the-badge&logo=express&logoColor=000000)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-C6E2FF?style=for-the-badge&logo=postgresql&logoColor=336791)](https://www.postgresql.org/)
[![Jest](https://img.shields.io/badge/Jest-FFB7C5?style=for-the-badge&logo=jest&logoColor=C21325)](https://jestjs.io/)
[![Supertest](https://img.shields.io/badge/Supertest-E0CFFF?style=for-the-badge&logo=javascript&logoColor=6D47C4)](https://www.npmjs.com/package/supertest)
