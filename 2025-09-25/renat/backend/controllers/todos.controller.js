const { validationResult } = require("express-validator");

const todos = [
    { id: "1", title: "First task", completed: false, deleted: false, createdAt: Date.now(), updatedAt: null }
];

exports.create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title } = req.body;
    const newTodo = {
        id: Date.now().toString(),
        title,
        completed: false,
        deleted: false,
        createdAt: Date.now(),
        updatedAt: null
    };
    todos.push(newTodo);
    return res.status(201).json(newTodo);
};

exports.read = (req, res) => {
    const includeDeleted = String(req.query.includeDeleted || "false").toLowerCase() === "true";
    const data = includeDeleted ? todos : todos.filter(t => t.deleted !== true);
    return res.json(data);
};

exports.update = (req, res) => {
    const { id, title, completed } = req.body;
    if (!id) return res.status(400).json({ message: "Field 'id' is required" });
    const idx = todos.findIndex(t => t.id === id);
    if (idx === -1) return res.status(404).json({ message: "Todo not found" });

    if (typeof title === "string" && title.trim().length > 0) todos[idx].title = title.trim();
    if (typeof completed === "boolean") todos[idx].completed = completed;
    todos[idx].updatedAt = Date.now();
    return res.json(todos[idx]);
};

exports.delete = (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Field 'id' is required" });
    const idx = todos.findIndex(t => t.id === id);
    if (idx === -1) return res.status(404).json({ message: "Todo not found" });

    todos[idx].deleted = true;
    todos[idx].updatedAt = Date.now();
    return res.json(todos[idx]);
};

exports.toggleDeleted = (req, res) => {
    const { id } = req.params;
    const idx = todos.findIndex(t => t.id === id);
    if (idx === -1) return res.status(404).json({ message: "Todo not found" });
    todos[idx].deleted = !todos[idx].deleted;
    todos[idx].updatedAt = Date.now();
    return res.json(todos[idx]);
};
