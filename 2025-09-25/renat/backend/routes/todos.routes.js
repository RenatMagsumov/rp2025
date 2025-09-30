const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const todosController = require("../controllers/todos.controller");

router.get("/", todosController.read);

router.post(
    "/",
    body("title").isString().trim().isLength({ min: 1 }).withMessage("Title is required"),
    todosController.create
);

router.put("/", todosController.update);

router.delete("/", todosController.delete);

router.patch("/:id/toggle-deleted", param("id").isString().isLength({ min: 1 }), todosController.toggleDeleted);

module.exports = router;
