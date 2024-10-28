import { createProduct, deleteProductByName, updateProductByName, readFile, searchProduct } from "../utils/JsonManager.utils.js";
import express from 'express';
import ResponseBuilder from "../utils/ResponseTemplate.utils.js";

// Import the user controller
const userRouter = express.Router();

//? ----------------> Endpoint para obtener todos los productos
userRouter.get('/products', (req, res) => {
    // Obtengo los productos del archivo
    const products = readFile();
    // Si no hay productos, devuelvo un error
    if (!products) {
        const response = new ResponseBuilder().setOk(false).setStatus(404).setPayload({ message: 'Products not found' }).build();
        res.status(404).json(response);
        return;
    }

    console.warn(`Products obtained: ${products.length}`);
    // Creo la respuesta
    const response = new ResponseBuilder().setOk(true).setStatus(200).setPayload({ products }).build();
    // Envio la respuesta
    res.json(response);
});

//? ----------------> Endpoint para obtener un producto por nombre
userRouter.get('/products/:name', (req, res) => {
    const { name } = req.params;
    const product = searchProduct(name);
    if (!product) {
        const response = new ResponseBuilder().setOk(false).setStatus(404).setPayload({ message: 'Product not found' }).build();
        res.status(404).json(response);
        return;
    }
    // Si no hay productos, devuelvo un error
    console.warn(`Product obtained: ${product.name}`);
    console.log(`Product obtained: ${JSON.stringify(product)}`);
    // Creo la respuesta
    const response = new ResponseBuilder().setOk(true).setStatus(200).setPayload({ product }).build();
    // Envio la respuesta
    res.json(response);
});

//? ----------------> Endpoint para actualizar un producto por nombre
userRouter.put('/products/update/:name', (req, res) => {
    const { name } = req.params;
    const newData = req.body;
    const product = updateProductByName(name, newData.name, newData.price, newData.description, newData.stock);
    if (!product) {
        const response = new ResponseBuilder().setOk(false).setStatus(404).setPayload({ message: 'Product not found' }).build();
        res.status(404).json(response);
        return;
    }
    console.warn(`Product updated: ${product.name}`);
    console.log(`Product updated: ${JSON.stringify(product)}`);

    // Creo la respuesta
    const response = new ResponseBuilder().setOk(true).setStatus(200).setPayload({ product }).build();
    // Envio la respuesta
    res.json(response);
});

//? ----------------> Endpoint para crear un producto
userRouter.post('/products/create', (req, res) => {
    const { name, price, description, stock } = req.body;
    const product = createProduct(name, price, description, stock);

    console.warn(`Product created: ${product.name}`);
    console.log(`Product created: ${JSON.stringify(product)}`);

    // Creo la respuesta
    const response = new ResponseBuilder().setOk(true).setStatus(200).setPayload({ product }).build();

    // Envio la respuesta
    res.json(response);
});

//? ----------------> Endpoint para eliminar un producto por nombre
userRouter.delete('/products/delete/:name', (req, res) => {
    const { name } = req.params;
    const product = deleteProductByName(name);
    if (!product) {
        const response = new ResponseBuilder().setOk(false).setStatus(404).setPayload({ message: 'Product not found' }).build();
        res.status(404).json(response);
        return;
    }
    console.warn(`Product deleted: ${product.name}`);
    console.log(`Product deleted: ${JSON.stringify(product)}`);

    // Creo la respuesta
    const response = new ResponseBuilder().setOk(true).setStatus(200).setPayload({ product }).build();

    // Envio la respuesta
    res.json(response);
});

export default userRouter;