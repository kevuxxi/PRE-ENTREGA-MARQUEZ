const express = require('express');
const app = express();
const productrouter = require('./routes/products.router.js');
const cartrouter = require('./routes/carts.router.js');
const port = 8080;


app.use(express.json());

app.use("/api/products", productrouter);
app.use("/api/carts", cartrouter);

app.listen(port, () => { console.log('servidor corriendo en puerto 8080') });
