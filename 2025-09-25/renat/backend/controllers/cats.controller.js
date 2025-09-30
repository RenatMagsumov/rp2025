const { validationResult } = require("express-validator");

const cats = [
    {
        id: "7d613b93-fa3e-4ef3-a9d2-e09e5ca6e4e6",
        name: "Meow",
        createdAt: 1727098800585,
        updatedAt: null,
        deleted: false,
    },
    {
        id: "2dc9ce08-d345-4fed-8560-4c6b66fb0836",
        name: "Kitty",
        createdAt: 1727098952739,
        updatedAt: null,
        deleted: false,
    },
];

exports.create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    const newCat = {
        id: Date.now().toString(),
        name,
        createdAt: Date.now(),
        updatedAt: null,
        deleted: false,
    };

    cats.push(newCat);
    return res.status(201).json(newCat);
};

exports.read = (_req, res) => {
    const visibleCats = cats.filter((cat) => cat.deleted !== true);
    return res.send(visibleCats);
};

exports.update = (req, res) => { };

exports.delete = (req, res) => { };
