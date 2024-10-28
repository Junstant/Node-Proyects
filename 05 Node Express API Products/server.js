import express from 'express';
import userRouter from './routes/EndPoins.routes.js';

const app = express();
const PORT = 3000;

//middleware para parsear el body de las peticiones
app.use(express.json({ extended: true }));

//* testing
// app.get('/ping', (req, res) => {
//     res.json({
//         ok: true,
//         status: 200,
//         payload: {
//             message: 'pong'
//         }
//     })
// });


//Registramos la ruta /api y delegamos las consultas recibias a esta ruta al userRouter
app.use('/api', userRouter);



//Le digo a express que escuche el puerto 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});