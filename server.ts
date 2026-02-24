import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("lab.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS papers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    authors TEXT,
    journal TEXT,
    year INTEGER,
    link TEXT,
    researcher_name TEXT
  );

  CREATE TABLE IF NOT EXISTS site_content (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Seed Admin User (In a real app, use hashing. For this demo, we'll use a simple check)
const adminUser = db.prepare("SELECT * FROM users WHERE username = ?").get("admin");
if (!adminUser) {
  db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run("admin", "admin123");
}

// Seed default content
const seedContent = [
  ['hero_title', 'Benninger Neurology Lab'],
  ['hero_subtitle', 'Advancing Neurological Care through Innovative Research at Rabin Medical Center'],
  ['about_text', 'The Benninger Lab, led by Dr. Felix Benninger at the Rabin Medical Center, is dedicated to understanding and treating complex neurological disorders. Our research focuses on epilepsy, neurophysiology, and clinical neurology, aiming to translate scientific discoveries into improved patient outcomes.'],
  ['research_focus', 'Our lab utilizes advanced neurophysiological techniques and clinical data to investigate the mechanisms of epilepsy and other neurological conditions. We are committed to developing personalized treatment strategies for our patients.'],
];

const insertContent = db.prepare("INSERT OR IGNORE INTO site_content (key, value) VALUES (?, ?)");
seedContent.forEach(([key, value]) => insertContent.run(key, value));

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-lab-key";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // Auth Middleware
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // API Routes
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user: any = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password);
    if (user) {
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1d" });
      res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });
      res.json({ success: true, user: { username: user.username } });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.post("/api/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ success: true });
  });

  app.get("/api/me", (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({ user: null });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.json({ user: decoded });
    } catch (err) {
      res.json({ user: null });
    }
  });

  app.get("/api/papers", (req, res) => {
    const papers = db.prepare("SELECT * FROM papers ORDER BY year DESC").all();
    res.json(papers);
  });

  app.post("/api/papers", authenticate, (req, res) => {
    const { title, authors, journal, year, link, researcher_name } = req.body;
    const result = db.prepare("INSERT INTO papers (title, authors, journal, year, link, researcher_name) VALUES (?, ?, ?, ?, ?, ?)").run(title, authors, journal, year, link, researcher_name);
    res.json({ id: result.lastInsertRowid });
  });

  app.delete("/api/papers/:id", authenticate, (req, res) => {
    db.prepare("DELETE FROM papers WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/content", (req, res) => {
    const content = db.prepare("SELECT * FROM site_content").all();
    const contentMap = content.reduce((acc: any, item: any) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
    res.json(contentMap);
  });

  app.post("/api/content", authenticate, (req, res) => {
    const { key, value } = req.body;
    db.prepare("INSERT OR REPLACE INTO site_content (key, value) VALUES (?, ?)").run(key, value);
    res.json({ success: true });
  });

  app.get("/api/seed", async (req, res) => {
    try {
      const { getPublications } = await import("./src/services/publicationsFetcher.ts");
      const papers = await getPublications();
      const insert = db.prepare("INSERT INTO papers (title, authors, journal, year, link, researcher_name) VALUES (?, ?, ?, ?, ?, ?)");
      const transaction = db.transaction((papers) => {
        for (const paper of papers) {
          insert.run(paper.title, paper.authors, paper.journal, paper.year, paper.link || "", paper.researcher_name);
        }
      });
      transaction(papers);
      res.json({ success: true, count: papers.length });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
