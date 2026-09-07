# Glossary

Terms I re-learn as I work through this project, written against my own code.

**How to use this:** don't read it front to back. It grows one term at a time, as each one comes up in real work. Every entry points at the line in *this* repository where the thing actually happens — the definition is the small part, the line number is the useful part.

For each term, the test is whether I can answer three questions:

1. Where in my code does this appear?
2. What breaks if I remove it?
3. Can I say what it does in one sentence, without jargon?

---

## Express & the backend

### Middleware

A function that sits **in the middle** of a request arriving and a response going out. A request isn't handled by one function — it passes through a line of them, in the order they were registered. Each one gets a turn to inspect the request, change it, and pass it along — or stop it dead.

Every middleware has the same shape:

```js
function something(req, res, next) { ... }
//                  ^      ^     ^
//            the request  the reply  "done, pass it on"
```

It has exactly three options:

- **modify and pass on** — call `next()`
- **stop and reply** — call `res.json(...)` and never call `next()`
- **fail** — call `next(err)`

**In my code:** `verifyToken` in [backend/middleware/auth.js:5](backend/middleware/auth.js) reads the `Authorization` header, verifies the token, and assigns `req.username` and `req.userId`. That is why [backend/routes/posts.js:77](backend/routes/posts.js) can read `req.username` even though nothing in that file assigns it. The value was attached earlier in the line.

The request to create a post passes through, in order:

| Step | Where | What it does |
|---|---|---|
| 1 | `express.json()` — server.js:8 | parses the raw body, **creates `req.body`** |
| 2 | `cors()` — server.js:12 | attaches the header that lets the browser read the reply |
| 3 | `express.static()` — server.js:34 | "is this URL an image file?" no → passes on |
| 4 | `postsRouter` — server.js:40 | matches `POST /allposts` |
| 5 | `verifyToken` — middleware/auth.js:5 | checks the token, **sets `req.username`** |
| 6 | the handler — routes/posts.js:74 | reads `req.username`, saves the post |

**Why it exists:** so that cross-cutting concerns — auth, body parsing, CORS, logging — live in one place instead of being copy-pasted into every route. One `verifyToken` can guard ten endpoints, and none of those ten contain any auth code.

**Test it:** comment out `app.use(express.json())`, create a post, and watch `req.body` become `undefined`.

### `next()`

The "I'm finished, hand it to the next one" signal inside a middleware. Forgetting to call it is a classic bug — the request just hangs forever, because nothing told the line to continue.

Not calling it **on purpose** is how a middleware blocks a request: [backend/middleware/auth.js:8](backend/middleware/auth.js) replies `401` and never calls `next()`, so the post-creation handler is never reached.

---

## Secrets & configuration

### Credential

Anything that proves you're allowed in: a password, an API key, a token. The professional word for "the keys."

### Connection string

One line of text holding everything needed to reach a database — address, username, and password mashed together:

```
mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

The password is *in the middle of the line*. That's why a leaked connection string is a total compromise, not a partial one.

### Rotate

To **replace** a credential with a new one, making the old one stop working. Not "hide" and not "delete." If a secret has leaked, hiding it achieves nothing — anyone who copied it still holds a working key. The only action that helps is making the old key worthless.

*(Done for this project on 2026-09-07: the MongoDB Atlas password that had been sitting in the README was rotated.)*

### Environment variable

A value handed to a program **by the machine it runs on**, instead of being written inside the program. The code says "use whatever `MONGO_URI` is set to"; my laptop supplies one value, the production server supplies another. **Same code, different settings.**

`process.env` is just Node's name for "the bag of environment variables I was given."

**In my code:** [backend/config/db.js:5](backend/config/db.js) reads `process.env.MONGO_URI`.

### `.env` / `.env.example`

- **`.env`** — the real values, for local development. **Git-ignored.** Never committed, never leaves my machine.
- **`.env.example`** — the template. Same variable names, **no values**. This one *is* committed, because it's the instructions, not the secrets. It answers "what do I need to fill in to run this?" without answering "what are the passwords?"

**In my code:** [backend/.env.example](backend/.env.example). To set up: `cp backend/.env.example backend/.env`, then fill it in.

**Rule of thumb:** a working secret should exist in exactly two places — the service that issued it, and the `.env` on the machine that needs it. Not in code, not in a README, not in a chat message.

---

## Git

### The three-zone model

The thing that makes Git click. Files live in three places:

```
   WORKING TREE          STAGING AREA            REPOSITORY
   (my folder)     ->     (the box)        ->     (history)
                git add              git commit

   what I'm             what I've             permanent,
   editing now          decided goes          named snapshots
                        in the next
                        snapshot
```

Git feels confusing because you expect two steps and there are three. The middle one — **staging** — exists so I can commit *some* changes and not others. Changed five files but only three belong together? Stage those three, commit, deal with the rest separately.

### Repository ("repo")

The project **plus its entire history**. Created by `git init`, which makes a hidden `.git` folder. That folder *is* the repository — everything else is just the current files. Delete `.git` and it's a plain folder again, no history.

### Working tree

The actual files as they are right now. What's open in the editor.

### Staging area

The holding box. `git add` puts things in it. Nothing is recorded permanently until it's committed.

### Commit

A permanent, named snapshot of everything staged — not a backup of one file, but a photograph of the **whole project** at one moment, with a message saying why. Commits are the points I can return to.

**Commits are permanent.** Deleting a secret in a *later* commit does not remove it from history; the old commit still contains it. This is why the README was sanitised **before** the first commit rather than after.

### Branch

A movable label pointing at a commit, marking a line of work. This project's is `main`.

### `.gitignore`

A list of things Git should pretend don't exist.

**In my code:** [.gitignore](.gitignore) — it excludes `node_modules` (tens of thousands of files, rebuildable from `package.json` with `npm install`) and `.env` (secrets).

This repo tracks 48 files. Without `.gitignore` it would track tens of thousands, and would have leaked the `.env`.

### Everyday commands

| Command | What it does |
|---|---|
| `git status` | what's changed, what's staged |
| `git diff` | the exact lines I changed, before staging |
| `git add -A` | stage everything |
| `git commit -m "..."` | take the snapshot |
| `git log --oneline` | the history so far |
| `git checkout .` | **throw away all uncommitted changes** — the undo button |

`git checkout .` is what makes experimenting safe: break something on purpose to see what it does, then restore it in one command.
