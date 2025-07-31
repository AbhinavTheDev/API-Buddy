# API Buddy

Test REST APIs with ease.

## Features

- Send HTTP requests (GET, POST, PUT, DELETE, PATCH, etc.)
- View formatted responses and headers
- Request history stored in SQLite (via MikroORM)
- Re-run or clear previous requests
- Modern UI built with Next.js, React, and Tailwind CSS

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MikroORM](https://mikro-orm.io/) (with SQLite)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone https://github.com/yourusername/warewe.git
cd warewe
npm install
```

### Running the App

This will create the SQLite database and start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database

- Uses SQLite for storing request history.
- MikroORM handles schema and migrations.
- To (re)create tables:
  ```bash
  npm run db
  ```

## Project Structure

```
app/            # Next.js app directory (API routes, pages)
components/     # React UI components
db/             # MikroORM entities and DB scripts
lib/            # Shared config (e.g., MikroORM config)
```

## License

MIT

---

**Contributions welcome!**