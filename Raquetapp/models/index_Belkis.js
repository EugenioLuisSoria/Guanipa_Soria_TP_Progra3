import express from "express";
import { sequelize } from "./database/index.js";

import 'dotenv/config'
//importar modelos

import { Nombre, Precio, Categoria, Imagen} from "./models/index.js";

//importar rutas

import nombreRouter from "./routers/nombre.js";
import precioRouter from "./routers/precio.js";
import categoriaRouter from "./routers/categoria.js";
import imagenRouter from "./routers/imagen.js";

const app = express();
const PORT = 3000;

app.use(express.json());

const initDDBB = async () => {
  await Nombre.create({
    nombre: "pepe",
    email: "pepe@example.com",
    direccion: "calle falsa 123",
  });

  await Nombre.create({
    nombre: "moni",
    email: "moni@example.com",
    direccion: "calle falsa 123",
  });

  await Precio.create({
    Precio: 40000 ,
    
  });

  await Precio.create({
    codigo: 60000,
  
  });

  await Categoria.create({
    titulo: "Raquetas",
    year: 1990,
  });

  await Categoria.create({
    titulo: "Cuerdas",
    year: 1995,
  });

  await Imagen.create({
    genero: "Raqueta",
  });

  await Imagen.create({
    genero: "Cuerdas",
  });
};

//definimos las rutas

app.use("/nombre",nombreRouter);
app.use("/precio", precioRouter);
app.use("/categoria", categoriaRouter);
app.use("/imagen", imagenRouter);


sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Inicializamos la base de datos");
  })
  .then(() => {
    initDDBB();
    console.log("Cargo la DDBB");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("El servidor esta corriendo en el puerto " + PORT);
    });
  })
  .catch((error) => {
    console.log({ error });
  });