import express from 'express';
import { request } from 'http';
import userRouter from './routes/user.routes.js';

const app = express();
const PORT = 3000;

//MIDDLEWARRE es una apliacion que se ejecuta entre el cliente y el servidor tipo raw json
app.use(express.json());
//MIDDLEWARRE para poder recibir datos de un tipo de url-encoded
app.use(express.urlencoded({ extended: true }));

//Probando el servidor
app.get('/ping',(req, res) => {
    res.send('pong');
})

app.post('/enviar',(req, res) => {
    console.log(req.body);
    res.send('Recibido');
})

//Registramos la ruta /api/users y delegamos las consultas recibias a esta ruta al userRouter
app.use('/api/users', userRouter);


// app.get('/users', (req, res) => {
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})