import fileSystem from "fs";
import ProductGenerator from "./ProductTemplate.utils.js";

const PRODUCT_PATH = "./public/Products.public.json";

// ? <---------------------------------------  Crear producto --------------------------------------->
const createProduct = (name, price, description, stock) => {
  // Creo un nuevo producto con la clase ProductGenerator
  const newProduct = new ProductGenerator(name, price, description, stock);

  // Obtengo los productos del archivo
  const products = readFile();

  // Agrego el nuevo producto al array de productos
  products.push(newProduct);

  // Guardo el array de productos en el archivo
  fileSystem.writeFileSync(PRODUCT_PATH, JSON.stringify(products, null, 2));

  //Aviso que se creó el producto
  console.log(`Product ${newProduct.name} created`);

  // Guardo el array de productos en el archivo
  return newProduct;
};

// ? <---------------------------------------  Leer archivo --------------------------------------->
const readFile = () => {
  try {
    const products = fileSystem.readFileSync(PRODUCT_PATH, "utf-8");
    return JSON.parse(products);
  } catch (error) {
    console.error("Error reading file", error);
    return [];
  }
};

// Buscar producto por nombre
const searchProduct = (name) => {
  try {
    // Leer los productos desde el archivo
    const products = readFile(); // Suponiendo que readFile() retorna un array de productos

    // Buscar el producto por nombre
    const product = products.find((product) => product.name === name);
    if (!product) {
      throw new Error("Product not found");
    }

    // Crear un nuevo producto utilizando ProductGenerator
    const newProduct = new ProductGenerator(product.name, product.price, product.description, product.stock);

    // Reemplazar el producto en la lista original si se necesita
    const productIndex = products.findIndex((prod) => prod.name === name);
    products[productIndex] = newProduct; // Actualizar con el nuevo producto generado

    // Escribir el archivo JSON con los cambios
    fileSystem.writeFileSync(PRODUCT_PATH, JSON.stringify(products, null, 2));

    return newProduct; // Retornar el nuevo producto
  } catch (error) {
    console.error("Error searching product:", error);
    return null;
  }
};

// ? <---------------------------------------  Actualizar producto por nombre--------------------------------------->
const updateProductByName = (name, newName, newPrice, newDescription, newStock) => {
  try {
    //Obtengo los productos del archivo
    const products = readFile();

    //Busco el producto por nombre
    const product = products.find((product) => product.name === name);
    if (!product) {
      throw new Error("Product not found");
    }

    //Creo un producto nuevo con los datos actualizados
    const updatedProduct = new ProductGenerator(newName, newPrice, newDescription, newStock);

    //Busco el producto por nombre
    const productsModified = products.map((product) => {
      if (product.name === name) {
        return updatedProduct;
      }
      return product;
    });

    //Guardo el array de productos en el archivo
    fileSystem.writeFileSync(PRODUCT_PATH, JSON.stringify(productsModified, null, 2));

    //Aviso que se actualizó el producto
    console.log(`${name} updated`);

    //Devuelvo el producto actualizado
    return updatedProduct;
  } 
  catch (error) {
    console.error("Error updating product", error);
    return null;
  }
};

// ? <---------------------------------------  Borrar producto por nombre --------------------------------------->
const deleteProductByName = (name) => {
  try {
    //Obtengo los productos del archivo
    const products = readFile();

    //Busco el producto por nombre
    const product = products.find((product) => product.name.toLowerCase() === name.toLowerCase());
    if (!product) {
      throw new Error("Product not found");
    }

    //Filtro los productos que no sean el que quiero borrar
    const productsFiltered = products.filter((product) => product.name.toLowerCase() !== name.toLowerCase());

    //Guardo el array de productos en el archivo
    fileSystem.writeFileSync(PRODUCT_PATH, JSON.stringify(productsFiltered, null, 2));

    //Aviso que se eliminó el producto
    console.log(`${name} deleted`);

    //Devuelvo el producto eliminado
    return product;
  } 
  catch (error) {
    console.error("Error deleting product", error);
    return null;
  }
};

export { createProduct, searchProduct, updateProductByName, deleteProductByName, readFile };
