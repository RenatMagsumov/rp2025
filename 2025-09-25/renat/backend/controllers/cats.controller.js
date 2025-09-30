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
    const { name: myName } = req.body;

    console.log({ myName });
    res.sendStatus(200);
};

exports.read = (req, res) => {
    exports.read = (req, res) => {
        const visibleCats = cats.filter(cat => cat.deleted !== true);
        res.send(visibleCats);
    };

};

exports.update = (req, res) => { };

exports.delete = (req, res) => { };

