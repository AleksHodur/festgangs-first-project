const express = require('express');
const { render } = require('ejs');
const mysql = require('mysql');

//express app
const app = express();

//registro del motor de vista: ejs
app.set('view engine', 'ejs');

//servidor web en el puerto 3000 en localhost
app.listen(3000);

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