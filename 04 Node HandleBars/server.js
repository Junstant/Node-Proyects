import express from "express";
import { engine } from "express-handlebars";

const app = express();
const PORT = 3000;

//Defino la carpeta de archivos estaticos
app.use(express.static("./public"));

//Defino el motor de plantillas, busca los archivos que terminan en .handlebars y los renderiza
app.engine("handlebars", engine());

//Defino que el servidor va a recibir y enviar datos en formato JSON
app.use(express.urlencoded({ extended: true }));

//Cuando el usuario entra a la raiz, el servidor renderiza el archivo index.handlebars
app.set("view engine", "handlebars");

//Defino la carpeta de las vistas
app.set("views", "./views");

//Defino los productos
const products = [
  {
    titulo: "producto 1",
    precio: 1000,
    descripcion: "descripcion del producto 1",
    id: 1,
  },
  {
    titulo: "producto 2",
    precio: 2000,
    descripcion: "descripcion del producto 2",
    id: 2,
  },
  {
    titulo: "producto 3",
    precio: 3000,
    descripcion: "descripcion del producto 3",
    id: 3,
  },
];

//Ruta para mostrar todos los productos
app.get("/", (req, res) => {
  const response = {
    ok: true,
    message: "Hello World",
    status: 200,
    products: products,
    layout: "products", //layout que se va a utilizar
  };
  res.render("home", response);
});

//Ruta para mostrar un formulario de creacion de productos
app.get("/products/new", (req, res) => {
  const response = {
    errors: {
      titulo: null,
      precio: null,
      descripcion: null,
    },
  };
  res.render("productForm", response);
});

//Ruta para mostrar un producto en especifico
app.get("/products/:product_id", (req, res) => {
  const product_id = req.params.product_id;
  const productFinded = products.find((product) => product.id == product_id);
  const response = {
    ok: true,
    message: "Product found",
    status: 200,
    product: productFinded,
  };
  res.render("productDetail", response);
});

//Ruta para que lleguen los datos del formulario
app.post("/products/new", (req, res) => {
  console.log(req.body);

  //Objeto de valores
  const { titulo, precio, descripcion } = req.body;
  //Desestructuracion de objetos
  const newProduct = {titulo, precio, descripcion, id: products.length + 1};
  console.log(`Nuevo producto: ${newProduct}`);

  //Objeto de errores
  const errors = {
    titulo: null,
    precio: null,
    descripcion: null,
  };

  //Si el precio no es un numero, se agrega un error
  if (!req.body.titulo.trim() || !isNaN(req.body.titulo)) {
    console.error("El nombre es obligatorio");
    errors.titulo = "El nombre es obligatorio";
  }

  if (!req.body.precio.trim() || isNaN(req.body.precio)) {
    console.error("El precio es obligatorio");
    errors.precio = "El precio es obligatorio";
  }

  if (!req.body.descripcion.trim() || !isNaN(req.body.descripcion)) {
    console.error("La descripcion es obligatoria");
    errors.descripcion = "La descripcion es obligatoria";
  }

  //Si el precio no es un numero, se agrega un error en el objeto, => [null, null, null]
  let errorExist = Object.values(errors).some((error) => error !== null);
  //Si hay errores, se renderiza el formulario con los errores y los valores ingresados
  if (errorExist) {
    return res.render("productForm", { errors, newProduct });
  }

  console.log("Formulario recibido");
  products.push(newProduct);
  res.redirect("/");
});

//Confirmacion de que el servidor esta corriendo
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
