    const fs = require('fs').promises;
    const path = require('path');


    class ProductManager {
        constructor(route) {
            this.route = path.resolve(route);
        }


        async #readfile() {

            try {
                const products = await fs.readFile(this.route, 'utf-8');
                return JSON.parse(products);
            } catch (error) {
                if (error.code === 'ENOENT') {
                    // Archivo no existe, devolver lista vacía
                    return [];
                }
                throw new Error(`Error leyendo el archivo: ${error.message}`);
            }
        }

        async #writefile(product) {
            try {
                await fs.writeFile(this.route, JSON.stringify(product, null, 2), 'utf-8');
            } catch (error) {
                throw new Error(`Error escribiendo el archivo: ${error.message}`);
            }
        }

        async addProduct(product) {
            const products = await this.#readfile();
            let newid = 0;
            if (products.length === 0) {
                newid = 1
            } else {
                newid = products[products.length - 1].id + 1;
            }

            const newproduct = {
                id: newid,
                ...product
            }
            products.push(newproduct);
            await this.#writefile(products);
            console.log(" Producto agregado:", newproduct);
            return newproduct
        }

        async getProducts() {
            return await this.#readfile();
        }

        async getProductById(productid) {
            const products = await this.#readfile();
            const product = products.find(product => product.id === productid)

            console.log(" Producto encontrado:", product);
            return product;
        }


        async updateProduct(productid, updatedFields) {
            const products = await this.#readfile();
            const productindex = products.findIndex(product => product.id === productid);

            if (productindex === -1) {
                console.log(" Producto no encontrado");
                return null;
            }

            products[productindex] = {
                ...products[productindex],
                ...updatedFields,
                id: products[productindex].id
            }

            await this.#writefile(products);
            console.log("Producto actualizado:", products[productindex]);
            return products[productindex];

        }

        async deleteProduct(productid) {
            const products = await this.#readfile();
            const productsfilter = products.filter(product => product.id !== productid);

            await this.#writefile(productsfilter);
            console.log(`Producto con ID ${productid} eliminado`);
            return productsfilter;

        }


    }

    module.exports = ProductManager;