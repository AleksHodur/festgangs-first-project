const express = require('express');
const { render } = require('ejs');
const mysql = require('mysql');

//express app
const app = express();

//registro del motor de vista: ejs
app.set('view engine', 'ejs');

//definir ruta archivos estáticos
/* Para usar archivos estáticos en el front (js, css, ...) */
app.use(express.static('public'));

//servidor web en el puerto 3000 en localhost
app.listen(3000, 'localhost');

//para parsear url request en objetos
app.use(express.urlencoded({extended: true}));

//conexión base de datos
const conexionBD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
});

conexionBD.connect((err) => {
    if(err) throw err;
    console.log('Connected! :)');
});

app.get('/', (request, response) => {
    response.render('index');
});

app.get('/user/:email', (request, response) => {
    response.json();
});

app.get('/prueba', (request, response) => {
    response.status(200).json({ message: 'Success!' });
    console.log('éxito');
    //response.send('Success!');
});

app.post('/login', (request, response) => {
    const {email, password} = request.body;

    response.status(201).json({message: 'Mensaje del servidor: éxito', email: email, password: password});
});