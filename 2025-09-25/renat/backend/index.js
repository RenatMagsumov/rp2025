const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");
const catsRoutes = require("./routes/cats.routes");
const todosRouter = require("./routes/todos.routes");

app.use(cors());
app.use(express.json());

app.use("/cats", catsRoutes);
app.use("/todos", todosRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
