//Express
//Nos permite crear una API, aplicattion programming interface
import express from 'express';
import filesystem from 'fs';

//Aqui guardamos a nuestra api
const app = express();

app.use(express.urlencoded({extended: true}));

//Aqui le decimos a nuestra api que escuche en el puerto 3000
app.listen(3000, () => {
    console.log('Server on port 3000');
});

//Aqui le decimos a nuestra api que cuando alguien entre a la ruta principal, le responda con un mensaje
app.get('/holaMundo', (request, response) => {
    response.send('Hello World');
});

//el post puede recibir datos
app.post('/registrar', (request, response) => {
    console.log(request.body);
    //obtenemos la informacion de los usuarios almacenados
    const usuarios = JSON.parse(filesystem.readFileSync('./usuarios.json', 'utf-8'));
    
    //agregamos el nuevo usuario
    usuarios.push({nombre: request.body.nombre, email: request.body.email});
    
    //guardamos la informacion
    filesystem.writeFileSync('./usuarios.json', JSON.stringify(usuarios), 'utf-8');
    
    //respondemos al usuario
    response.send('Usuario registrado');

});

/* POST usuario
vamos a verificar que valores hay en/usuarios.json
Si la resupuesta en null:
crearemos un array ya agregaremos el usuario recibido.
Si la resupuesta es distinta de null o undefined:
Vamos a transfromar la respuesta a objeto de JS y agregregaremos al usuario recibido

finalmente lo guardaremos en el archivo usuarios.json*/