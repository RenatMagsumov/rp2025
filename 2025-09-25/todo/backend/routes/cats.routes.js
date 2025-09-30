const express = require("express");
const router = express.Router();
const catsController = require("../controllers/cats.controller");
const {
    catsRouteMiddleware,
    catsGetRouteMiddleware,
} = require("../middlewares/cats.middlewares");
const { body } = require("express-validator");

router.use(catsRouteMiddleware);

router.get("/", catsGetRouteMiddleware, catsController.read);

router.post(
    "/",
    body("name")
        .isString()
        .trim()
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters"),
    catsController.create
);

router.put("/", catsController.update);

router.delete("/", catsController.delete);

module.exports = router;
