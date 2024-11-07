let trees = [
    {
        id: 0,
        manufacturer: "GreenForest",
        height: 180,
        price: 1200,
        material: "ПВХ"
    },
    {
        id: 1,
        manufacturer: "EcoTree",
        height: 200,
        price: 1500,
        material: "Поліетилен"
    },
    {
        id: 2,
        manufacturer: "SnowyPine",
        height: 150,
        price: 1000,
        material: "ПВХ"
    },
    {
        id: 3,
        manufacturer: "EverGreen",
        height: 220,
        price: 2000,
        material: "Поліпропілен"
    },
    {
        id: 4,
        manufacturer: "NatureTouch",
        height: 170,
        price: 1350,
        material: "Поліетилен"
    },
    {
        id: 5,
        manufacturer: "WinterMagic",
        height: 190,
        price: 1600,
        material: "ПВХ"
    },
    {
        id: 6,
        manufacturer: "EcoDecor",
        height: 210,
        price: 2200,
        material: "Поліпропілен"
    },
    {
        id: 7,
        manufacturer: "Snowflake",
        height: 160,
        price: 1100,
        material: "ПВХ"
    }
];

let filteredTrees = [...trees];

export const getAllTrees = (req, res) => {
    res.json(trees);
};

export const addTree = (req, res) => {
    const { manufacturer, price, height, material } = req.body;
    const newTree = {
        id: trees.length > 0 ? Math.max(...trees.map(tree => tree.id)) + 1 : 1,
        manufacturer,
        price,
        height,
        material
    };
    trees.push(newTree);
    res.status(201).json(newTree);
};

export const editTree = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const treeIndex = trees.findIndex(tree => tree.id === id);
    if (treeIndex === -1) {
        return res.status(404).send('Tree not found');
    }

    const { manufacturer, price, height, material } = req.body;
    trees[treeIndex] = { ...trees[treeIndex], manufacturer, price, height, material };
    res.json(trees[treeIndex]);
};

export const deleteTree = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const treeIndex = trees.findIndex(tree => tree.id === id);
    if (treeIndex === -1) {
        return res.status(404).send('Tree not found');
    }
    const deletedTree = trees.splice(treeIndex, 1);
    res.json(deletedTree);
};

export const searchTrees = (req, res) => {
    const query = req.query.q ? req.query.q.trim().toLowerCase() : '';
    filteredTrees = trees.filter(tree => tree.manufacturer.toLowerCase().includes(query));
    res.json(filteredTrees);
};

export const sortTrees = (req, res) => {
    const query = req.query.q ? req.query.q.trim().toLowerCase() : '';

    let sortedTrees;
    switch (query) {
        case "manufacturer":
            sortedTrees = [...filteredTrees].sort((a, b) => a.manufacturer.localeCompare(b.manufacturer));
            break;
        case "material":
            sortedTrees = [...filteredTrees].sort((a, b) => a.material.localeCompare(b.material));
            break;
        case "height":
            sortedTrees = [...filteredTrees].sort((a, b) => b.height - a.height);
            break;
        case "price_asc":
            sortedTrees = [...filteredTrees].sort((a, b) => a.price - b.price);
            break;
        case "price_desc":
            sortedTrees = [...filteredTrees].sort((a, b) => b.price - a.price);
            break;
    }
    res.json(sortedTrees);
};

export const getTotalPrice = (req, res) => {
    const totalPrice = trees.reduce((sum, tree) => sum + tree.price, 0);
    res.json({ totalPrice });
};