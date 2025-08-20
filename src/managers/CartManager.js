const fs = require('fs').promises;
const path = require('path');
const ProductManager = require('./ProductManager');
const productManager = new ProductManager(path.resolve(__dirname, '..', 'data', 'products.json'));


class CartManager {
    constructor(route) {
        this.route = path.resolve(route)
    }

    async #readfile() {

        try {
            const carts = await fs.readFile(this.route, 'utf-8');
            return JSON.parse(carts);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Archivo no existe, devolver lista vacía
                return [];
            }
            throw new Error(`Error leyendo el archivo: ${error.message}`);
        }
    }

    async #writefile(cart) {
        try {
            await fs.writeFile(this.route, JSON.stringify(cart, null, 2), 'utf-8');
        } catch (error) {
            throw new Error(`Error escribiendo el archivo: ${error.message}`);
        }
    }


    async createCart() {
        const carts = await this.#readfile();
        let newid = 0;
        if (carts.length === 0) {
            newid = 1
        } else {
            newid = carts[carts.length - 1].id + 1;
        }
        const newcar = {
            id: newid,
            products: []
        }

        carts.push(newcar);
        await this.#writefile(carts)
        console.log(" Carrito creado:", newcar);
        return newcar
    }

    async getCartById(id) {
        const carts = await this.#readfile();
        const carbyid = carts.find(cart => cart.id === id);
        console.log(" Carrito encontrado:", carbyid);
        return carbyid;
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.#readfile();
        const cartindex = carts.findIndex(cart => cart.id === cartId);

        if (cartindex === -1) {
            console.log(" Carrito no encontrado.");
            return null;
        }


        const productexists = await productManager.getProductById(productId);
        if (!productexists) {
            console.log(" Producto no encontrado.");
            return null;
        }

        const cart = carts[cartindex];
        const productincartindex = cart.products.findIndex(p => p.product === productId);


        if (productincartindex !== -1) {
            cart.products[productincartindex].quantity += 1;
            console.log(`Cantidad del producto ${productId} incrementada en el carrito ${cartId}.`);
        } else {
            cart.products.push({
                product: productId,
                quantity: 1
            });
            console.log(` Producto ${productId} agregado al carrito ${cartId}.`);
        }


        await this.#writefile(carts);
        return cart;



    }

}

module.exports = CartManager;