# News Aggregator API

A lightweight **Node.js** RESTful API for fetching, caching, and managing news articles using user preferences. Built with Express, Prisma, Winston, and Axios.

---

##  Features

- **Fetch news** from an external API based on user preferences (locale, language, keywords).
- **In-memory caching layer** to reduce redundant API or DB requests.
- **Prisma ORM** for persistent storage of news data.
- **Mark articles as “Read” or “Favorite”**, with endpoints to retrieve them.
- **Search functionality**: Search news articles using keywords.
- **Logging middleware**: Captures request logs (method, URL, status, response time) in console and files.
- **Background cache refresh** to simulate real-time updates.
- **Clean project structure**: `cache/`, `controller/`, `middleware/`, `model/prisma/`, `router/`, `utils/`.

---

##  Folder Structure
```
.
├── .gitignore
├── app.js
├── cache ---------------------------------------> ## cache related logic functions
    └── cache.js
├── controller 
    ├── login.js
    ├── news.js
    ├── preference.js
    └── register.js
├── logger --------------------------------------> ## Used to generate inbuilt logs
    ├── error.log
    ├── failed.log
    ├── logger.js
    ├── requestLogger.js
    └── success.log
├── middleware ----------------------------------> ## middleware authentication logic
    └── auth.js
├── model
    └── prisma ----------------------------------> ## Used Prisam ORM with SQLite
    │   ├── dev.db
    │   ├── migrations
    │       ├── 20250808145738_init
    │       │   └── migration.sql
    │       ├── 20250808152016_init
    │       │   └── migration.sql
    │       ├── 20250812075313_init
    │       │   └── migration.sql
    │       ├── 20250812123158_init
    │       │   └── migration.sql
    │       └── migration_lock.toml
    │   └── schema.prisma
├── package-lock.json
├── package.json
├── router --------------------------------------> ## Routers are defined here
    ├── newsRouter.js
    └── usersRouter.js
├── server.js
├── test
    └── server.test.js
└── utils ---------------------------------------> ## Logic related to validation and DB Operations are written here
    ├── newsDboperations.js
    ├── requestbodyvalidation.js
    └── responseHandler.js

└── README.md
```

---

##  Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Access to your external News API (API base URL and token)

---

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/airtribe-projects/news-aggregator-api-KIRAN-MISKIN.git
   ```
   ```
   cd news-aggregator-api-KIRAN-MISKIN
   ```
---

2. Install dependencies:
```
   npm install
```    
  or
```
   yarn install
```

---

3. Configure environment variables in a .env file:

-  API_URL=<YOUR_NEWS_API_BASE_URL>

- API_TOKEN=<YOUR_NEWS_API_TOKEN>

-  DATABASE_URL=<YOUR_PRISMA_DATABASE_URL>

---

4. Setup Prisma:

```bash
npx prisma migrate dev --name init
```
```bash
npx prisma generate
```

---

5. Start the server:

```bash
npm run dev
```

---

## API Endpoints

---

 **1. User Registration API**

```http
POST /users/signup
```
* Request body:-

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | **Required**. Enter your name |
| `email`   | `string` | **Required**. Your Email Id |
| `password` | `string` | **Required**. Your Password |
| `preferences` | `json` | **Optional**. Your Preferences |

- Example:- 

```json
{
    "name": "Mahesh",
    "email": "mahesh@gmail.com",
    "password": "miskin",
    "preferences":["Crime"]
}

```
- Curl:-
```bash
curl --location 'http://localhost:3000/users/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Mahesh",
    "email": "mahesh@gmail.com",
    "password": "miskin",
    "preferences":["Crime"]
}'
```
- Expected Output:-

```json
"Successfully Registered"
```

---

 **2. User Login API**

```http
POST /users/login
```
* Request body:-

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**. Your Email Id |
| `password` | `string` | **Required**. Your Password |

- Example:- 

```json
{
    "email": "mahesh@gmail.com",
    "password": "miskin",
}

```
- Curl:-

```bash
curl --location 'http://localhost:3000/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "mahesh@gmail.com",
    "password": "miskin",
}'
```

- Expected Output:-
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFoZXNoIiwiZW1haWwiOiJtYWhlc2hAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMXZTVmRRakJRYlRHV0hVcUVnWC9XdWZCVjd5QmJWbUE4QWxFZ01rbFN1YnNPYlFNZ2hJMzIiLCJpYXQiOjE3NTU1MDM1NjcsImV4cCI6MTc1NTUxMDc2N30.E_H_PD8Dr2hUhpZDegTcIHA6zxIsc6xX0v6i-qd4UhU"
}
```

---

 **3. Get Preferences**

```http
GET /users/preferences
```
- Curl:-

```bash
curl --location 'http://localhost:3000/users/preferences' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFoZXNoIiwiZW1haWwiOiJtYWhlc2hAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMXZTVmRRakJRYlRHV0hVcUVnWC9XdWZCVjd5QmJWbUE4QWxFZ01rbFN1YnNPYlFNZ2hJMzIiLCJpYXQiOjE3NTU1MTk3NzMsImV4cCI6MTc1NTUyNjk3M30.f2vbFKwcyoNQKmGxxPs6zqy14XYMptUvd_apYpPekgE' \''
```

- Expected Output:-
```json
{
    "preferences": [
        "Crime"
    ]
}
```

---

 **4. Update Preferences**

```http
PUT /users/preferences
```

* Request body:-

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `preferences` | `array` | **Required**. Enter your preferences in an array |

- Example:- 

```json
{
    "preferences": ["Adventure","comedy"]
}

```

- Curl:-

```bash
curl --location --request PUT 'http://localhost:3000/users/preferences' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFoZXNoIiwiZW1haWwiOiJtYWhlc2hAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMXZTVmRRakJRYlRHV0hVcUVnWC9XdWZCVjd5QmJWbUE4QWxFZ01rbFN1YnNPYlFNZ2hJMzIiLCJpYXQiOjE3NTU1MTk3NzMsImV4cCI6MTc1NTUyNjk3M30.f2vbFKwcyoNQKmGxxPs6zqy14XYMptUvd_apYpPekgE' \
--data '{
    "preferences": ["Adventure","comedy"]
}'
```

- Expected Output:-
```json
{
    "message": "Preferences inserted successfully",
    "preferences": [
        "Crime",
        "Adventure",
        "comedy"
    ]
}
```
---

 **5. Mark a news article as read.**

```http
POST /news/:id/read
```
- Curl:-

```bash
curl --location --request POST 'http://localhost:3000/news/02450fe6-7e2b-4d0e-8f2f-c6692da9b357/read' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFoZXNoIiwiZW1haWwiOiJtYWhlc2hAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMXZTVmRRakJRYlRHV0hVcUVnWC9XdWZCVjd5QmJWbUE4QWxFZ01rbFN1YnNPYlFNZ2hJMzIiLCJpYXQiOjE3NTU1MjA1ODksImV4cCI6MTc1NTUyNzc4OX0.5JE84R5MeZ4vhzxZmFDDC2VCn0MSrU4I7BsL7bMMcsk' \
--data ''
```

- Expected Output:-
```json
{
    "id": "02450fe6-7e2b-4d0e-8f2f-c6692da9b357",
    "title": "USA asks its citizens to leave Russia immediately",
    "description": "US embassy in Russia said,",
    "url": "https://www.opindia.com/2023/02/usa-asks-citizens-leave-russia-immediately/"
}
```
---

 **6. Mark a news article as favorite.**

```http
POST /news/:id/favorite
```
- Curl:-

```bash
curl --location --request POST 'http://localhost:3000/news/02450fe6-7e2b-4d0e-8f2f-c6692da9b357/favorite' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFoZXNoIiwiZW1haWwiOiJtYWhlc2hAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMXZTVmRRakJRYlRHV0hVcUVnWC9XdWZCVjd5QmJWbUE4QWxFZ01rbFN1YnNPYlFNZ2hJMzIiLCJpYXQiOjE3NTU1MjA1ODksImV4cCI6MTc1NTUyNzc4OX0.5JE84R5MeZ4vhzxZmFDDC2VCn0MSrU4I7BsL7bMMcsk' \
--data ''
```

- Expected Output:-
```json
{
    "id": "02450fe6-7e2b-4d0e-8f2f-c6692da9b357",
    "title": "USA asks its citizens to leave Russia immediately",
    "description": "US embassy in Russia said,",
    "url": "https://www.opindia.com/2023/02/usa-asks-citizens-leave-russia-immediately/"
}
```
---

 **7. Retrieve all read news articles.**

```http
GET /news/read
```
- Curl:-

```bash
curl --location 'http://localhost:3000/news/read' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFoZXNoIiwiZW1haWwiOiJtYWhlc2hAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMXZTVmRRakJRYlRHV0hVcUVnWC9XdWZCVjd5QmJWbUE4QWxFZ01rbFN1YnNPYlFNZ2hJMzIiLCJpYXQiOjE3NTU1MjA1ODksImV4cCI6MTc1NTUyNzc4OX0.5JE84R5MeZ4vhzxZmFDDC2VCn0MSrU4I7BsL7bMMcsk'
```

- Expected Output:-
```json
[
    {
        "id": "fc967186-e830-432e-a34d-18aac63bc560",
        "title": "The World Stage Today: Are Iran and Israel Just Puppets? Is It Really About the USA and Russia?",
        "description": "Israel and Iran have been enemies for decades. Iran’s gove...",
        "url": "https://medium.com/@nsia6147/the-world-stage-today-are-iran-and-israel-just-puppets-is-it-really-about-the-usa-and-russia-ffc82b7e1c9b"
    },
    {
        "id": "cec058be-967f-4e3e-a7d2-7036008976a7",
        "title": "Can the Russia-China alliance challenge the USA?",
        "description": "In recent years, the growing closeness between China and Rus...",
        "url": "https://www.pakistantoday.com.pk/2023/10/10/can-the-russia-china-alliance-challenge-the-usa/"
    },
    {
        "id": "02450fe6-7e2b-4d0e-8f2f-c6692da9b357",
        "title": "USA asks its citizens to leave Russia immediately",
        "description": "US embassy in Russia said,",
        "url": "https://www.opindia.com/2023/02/usa-asks-citizens-leave-russia-immediately/"
    }
]
```
---

 **8. Retrieve all favorites news articles.**

```http
GET /news/favorites
```
- Curl:-

```bash
curl --location 'http://localhost:3000/news/favorites' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFoZXNoIiwiZW1haWwiOiJtYWhlc2hAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMXZTVmRRakJRYlRHV0hVcUVnWC9XdWZCVjd5QmJWbUE4QWxFZ01rbFN1YnNPYlFNZ2hJMzIiLCJpYXQiOjE3NTU1MjA1ODksImV4cCI6MTc1NTUyNzc4OX0.5JE84R5MeZ4vhzxZmFDDC2VCn0MSrU4I7BsL7bMMcsk'
```

- Expected Output:-
```json
[
    {
        "id": "fc967186-e830-432e-a34d-18aac63bc560",
        "title": "The World Stage Today: Are Iran and Israel Just Puppets? Is It Really About the USA and Russia?",
        "description": "Israel and Iran have been enemies for decades. Iran’s gove...",
        "url": "https://medium.com/@nsia6147/the-world-stage-today-are-iran-and-israel-just-puppets-is-it-really-about-the-usa-and-russia-ffc82b7e1c9b"
    },
    {
        "id": "cec058be-967f-4e3e-a7d2-7036008976a7",
        "title": "Can the Russia-China alliance challenge the USA?",
        "description": "In recent years, the growing closeness between China and Rus...",
        "url": "https://www.pakistantoday.com.pk/2023/10/10/can-the-russia-china-alliance-challenge-the-usa/"
    },
    {
        "id": "02450fe6-7e2b-4d0e-8f2f-c6692da9b357",
        "title": "USA asks its citizens to leave Russia immediately",
        "description": "US embassy in Russia said,",
        "url": "https://www.opindia.com/2023/02/usa-asks-citizens-leave-russia-immediately/"
    }
]
```
---

 **9. Get news articles based on keywords**

```http
GET /news/search/:keyword
```
- Curl:-

```bash
curl --location 'http://localhost:3000/news/search/USA and Russia' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFoZXNoIiwiZW1haWwiOiJtYWhlc2hAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMXZTVmRRakJRYlRHV0hVcUVnWC9XdWZCVjd5QmJWbUE4QWxFZ01rbFN1YnNPYlFNZ2hJMzIiLCJpYXQiOjE3NTU1MjA1ODksImV4cCI6MTc1NTUyNzc4OX0.5JE84R5MeZ4vhzxZmFDDC2VCn0MSrU4I7BsL7bMMcsk'
```

- Expected Output:-
```json
{
    "news": [
        {
            "id": "fc967186-e830-432e-a34d-18aac63bc560",
            "title": "The World Stage Today: Are Iran and Israel Just Puppets? Is It Really About the USA and Russia?",
            "description": "Israel and Iran have been enemies for decades. Iran’s government sees Israel as an illegitimate state and supports groups that oppose Israel, like Hezbollah i...",
            "url": "https://medium.com/@nsia6147/the-world-stage-today-are-iran-and-israel-just-puppets-is-it-really-about-the-usa-and-russia-ffc82b7e1c9b"
        },
        {
            "id": "cec058be-967f-4e3e-a7d2-7036008976a7",
            "title": "Can the Russia-China alliance challenge the USA?",
            "description": "In recent years, the growing closeness between China and Russia has been the center of attention on the global scene. Both countries are increasing cooperation ...",
            "url": "https://www.pakistantoday.com.pk/2023/10/10/can-the-russia-china-alliance-challenge-the-usa/"
        },
        {
            "id": "02450fe6-7e2b-4d0e-8f2f-c6692da9b357",
            "title": "USA asks its citizens to leave Russia immediately",
            "description": "US embassy in Russia said,",
            "url": "https://www.opindia.com/2023/02/usa-asks-citizens-leave-russia-immediately/"
        }
    ]
}
```
---

### Caching Strategy
---
- In-memory cache with a configurable TTL (e.g., 10 minutes).

- Uses cache/ module to store articles by uuid.

- Background task (via setInterval) clears the cache periodically to simulate real-time refresh.

---
### Logging
---

- Built with Winston.

- middleware/requestLogger.js automatically logs each request:
  - Method, URL, status code, and response time.
- Logs are categorized into:
  - error.log for server errors (500-level).
  - failed.log for warnings (400-level).
  - success.log for successful responses (200-level).

---

### Authors & Acknowledgments

- Kiran Miskin — project lead and primary author.

- Based on the Airtribe Engineering Learners template.

- Crafted using Node.js, Express, Prisma, Axios, Winston.
