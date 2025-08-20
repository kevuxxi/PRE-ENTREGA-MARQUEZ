const express = require('express');
const ProductManager = require('../managers/ProductManager.js');

const router = express.Router();

const productmanager = new ProductManager('./data/products.json');

router.get('/', async (req, res) => {
    try {
        res.json(await productmanager.getProducts()
        );
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const pid = Number(req.params.pid)
        const product = await productmanager.getProductById(pid)
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        } = req.body
        if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
            return res.status(400).json({ error: "Faltan campos" });
        }

        const newproduct = {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        }

        await productmanager.addProduct(newproduct);
        res.status(201).json({ message: "Producto agregado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const pid = Number(req.params.pid);
        const updatedFields = req.body
        const updatedproduct = await productmanager.updateProduct(pid, updatedFields);
        if (!updatedproduct) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json(updatedproduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const id = Number(req.params.pid); // 👈 usamos params
        await productmanager.deleteProduct(id);
        res.json({ message: `Producto con ID ${id} eliminado` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;



