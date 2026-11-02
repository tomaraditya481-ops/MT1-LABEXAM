
import express from 'express';

const app = express();
app.use(express.json());

let cart = [
    { id: 1, productName: "Laptop", price: 50000, quantity: 1, category: "Electronics" },
    { id: 2, productName: "Mouse", price: 500, quantity: 2, category: "Electronics" },
    { id: 3, productName: "Keyboard", price: 1000, quantity: 1, category: "Electronics" }
];

// GET - All products
app.get('/cart', (req, res) => {
    res.json(cart);
});

// GET - Product by ID
app.get('/cart/:id', (req, res) => {
    const product = cart.find(p => p.id == req.params.id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
});

// POST - Add product
app.post('/cart', (req, res) => {
    const { id, productName, price, quantity, category } = req.body;

    if (id == null || !productName || price == null || quantity == null || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const product = { id, productName, price, quantity, category };
    cart.push(product);

    res.status(201).json({
        message: "Product added successfully",
        product
    });
});

// PUT - Update product
app.put('/cart/:id', (req, res) => {
    const product = cart.find(p => p.id == req.params.id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(product, req.body);
    res.json({ message: "Product updated successfully", product });
});

// DELETE - Remove product
app.delete('/cart/:id', (req, res) => {
    const index = cart.findIndex(p => p.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    cart.splice(index, 1);
    res.json({ message: "Product deleted successfully" });
});

// Start server
app.listen(4000, () => {
    console.log("Express server running on port 4000");
});
