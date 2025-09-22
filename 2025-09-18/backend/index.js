const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- Root route ---
app.get("/", (req, res) => {
    res.type("text").send("Backend is running!");
});

// --- CRUD demo with in-memory data ---
let items = [
    { id: 1, name: "First item" },
    { id: 2, name: "Second item" },
];
let nextId = 3;

// Read all
app.get("/items", (req, res) => {
    res.json(items);
});

// Read one
app.get("/items/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = items.find((x) => x.id === id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
});

// Create
app.post("/items", (req, res) => {
    const { name } = req.body || {};
    if (!name) return res.status(400).json({ error: "name is required" });
    const created = { id: nextId++, name };
    items.push(created);
    res.status(201).json(created);
});

// Update
app.put("/items/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body || {};
    const idx = items.findIndex((x) => x.id === id);
    if (idx === -1) return res.status(404).json({ error: "Not found" });
    if (!name) return res.status(400).json({ error: "name is required" });
    items[idx] = { ...items[idx], name };
    res.json(items[idx]);
});

// Delete
app.delete("/items/:id", (req, res) => {
    const id = Number(req.params.id);
    const idx = items.findIndex((x) => x.id === id);
    if (idx === -1) return res.status(404).json({ error: "Not found" });
    const removed = items.splice(idx, 1)[0];
    res.json(removed);
});

app.get("/users/:userId/books/:bookId", (req, res) => {
    const { userId, bookId } = req.params;
    res.json({ userId, bookId, message: "Route params example" });
});

app.get("/flights/:from-:to", (req, res) => {
    const { from, to } = req.params;
    res.json({ from, to, message: "Route params example" });
});

app.use((req, res) => {
    res.status(404).json({ error: "Route not found", path: req.path });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
