const jwt = require("jsonwebtoken");

const user = { username: "admin", role: "admin", password: "admin123" };
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

exports.login = (req, res) => {
    const { username, password } = req.body || {};
    if (username !== user.username || password !== user.password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
};

exports.ping = (req, res) => {
    const auth = req.headers.authorization || "";
    const parts = auth.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ ok: false });
    }
    try {
        jwt.verify(parts[1], JWT_SECRET);
        return res.json({ ok: true });
    } catch {
        return res.status(401).json({ ok: false });
    }
};
