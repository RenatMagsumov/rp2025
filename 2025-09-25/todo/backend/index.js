const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const todosRouter = require("./routes/todos.routes");
app.use("/todos", todosRouter);

app.get("/", (_req, res) => res.send("TODO API"));
app.listen(3000, () => console.log("TODO backend on http://localhost:3000"));
