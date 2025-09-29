📰 NC News API

A RESTful API built with Node.js, Express, and PostgreSQL. It provides programmatic access to news articles, topics, users, and comments. Originally developed as part of a Northcoders bootcamp project.

📦 Setup

• Clone the repo:

git clone https://github.com/Vnb123/be-nc-news.git
cd be-nc-news

• Install dependencies:

npm install

• Create environment files in the project root:

.env.development →
PGDATABASE=nc_news

.env.test →
PGDATABASE=nc_news_test

• Setup databases:

npm run setup-dbs
npm run seed

• Start the server:

npm run dev

🧪 Testing

• Run all tests with:

npm test

📖 API Documentation

API Documentation

• Base URL when running locally:
http://localhost:9090/api

• Hosted version on Render:
https://be-nc-news.onrender.com/api

The /api endpoint serves the endpoints.json file with a full list of available routes.

Note: The Render service must be launched/deployed to be accessible.

🛠️ Tech Stack

• Node.js
• Express.js
• PostgreSQL (pg)
• Jest & Supertest
