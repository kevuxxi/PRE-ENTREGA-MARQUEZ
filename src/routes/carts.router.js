const express = require('express');
const CartManager = require('../managers/CartManager');
const ProductManager = require('../managers/ProductManager');

const router = express.Router();

const cartmanager = new CartManager('./data/carts.json')
const productmanager = new ProductManager('./data/products.json');


router.post('/', async (req, res) => {
    try {
        await cartmanager.createCart();
        res.status(201).json({ message: "Carrito creado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cid = Number(req.params.cid)
        const cart = await cartmanager.getCartById(cid)
        if (cart) {
            res.json({ message: "Carrito encontrado", cart });
        } else {
            res.status(404).json({ error: "Carrito no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try {

        const cid = Number(req.params.cid);
        const pid = Number(req.params.pid);

        const updatedcart = await cartmanager.addProductToCart(cid, pid);
        if (updatedcart) {
            res.status(201).json({
                message: "Producto agregado al carrito con éxito",
                cart: updatedcart
            });
        } else {
            res.status(404).json({ error: "Carrito o producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;