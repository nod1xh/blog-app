# BLOGAPP

### Table of Contents

Sections headers will be used to reference location of destination.

- [Description](#description)
- [How To Use](#how-to-use)
- [Project Notes](#project-notes)
- [Live Demo](#live-demo)
- [License](#license)
- [Author Info](#author-info)

---

## Description

- Fullstack blog app with MERN Stack.
- User can create an account. Create, update & delete posts of their own creation.
- Users can only read through the page without creating an account. 
- Users can not delete or update/edit other users post.

#### Technologies used

- React
- Context API
- Typescript
- Tailwind
- Vite
- Node.js
- Express.js
- MongoDB

[Back To The Top](#BLOGAPP)

---

## How To Use

#### Installation

The project has two folders: `backend` and `frontend`. Each is set up and run
separately.

**1. Settings**

Both halves read their settings from a `.env` file. Copy the templates and fill
in your own values:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

`backend/.env` needs your MongoDB connection string and a JWT secret. Generate
a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

The defaults in `frontend/.env` work as-is for local development.

Neither `.env` file is committed — both are listed in `.gitignore`. Never put a
password in `frontend/.env`: anything there is sent to the browser and can be
read by anyone using the site.

**2. Install dependencies**

```bash
cd backend && npm install
cd ../frontend && npm install
```

**3. Run**

Open two terminals, one for each half:

```bash
cd backend && npm run dev     # http://localhost:5000
cd frontend && npm run dev    # http://localhost:5173
```

Then open http://localhost:5173.

Both ports are configurable. If you change them, update `PORT` and `CLIENT_URL`
in `backend/.env` and `VITE_API_URL` in `frontend/.env` to match — the backend
only accepts requests from the address in `CLIENT_URL`.

#### Scripts

Frontend:

| Command | What it does |
| --- | --- |
| `npm run dev` | start the dev server with hot reload |
| `npm run build` | type-check and build for production |
| `npm run lint` | check for problems without running anything |
| `npm run preview` | serve the production build locally |

Backend:

| Command | What it does |
| --- | --- |
| `npm run dev` | start with nodemon, restarts on save |
| `npm start` | start once, for production |


## Project Notes

Originally built in 2024 while learning web development, and being modernised
since. [GLOSSARY.md](GLOSSARY.md) records the terminology as it comes up,
pointed at the lines in this repository where each term applies.

[Back To The Top](#BLOGAPP)

---

## Live Demo

- Website - [Blog App](https://blog-app-1-ms9i.onrender.com/)

> **Currently offline.** The frontend is still served, but the deployed backend
> cannot reach the database, so no posts load. Run it locally using the steps
> above.

[Back To The Top](#BLOGAPP)

---

## License

MIT License

Copyright (c) [2024] [Elmedin Hodzic]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[Back To The Top](#BLOGAPP)

---

## Author Info

- LinkedIn - [@elmedin](https://www.linkedin.com/in/e-hodzic/)

[Back To The Top](#BLOGAPP)