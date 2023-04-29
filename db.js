const mysql = require('mysql');
const userModel = require('./models/userModel');

const conexionBD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
});

conexionBD.connect((err) => {
    if(err) throw err;
    console.log('Connected! :)');
});

conexionBD.query('DROP DATABASE IF EXISTS festgangs;', (err, result) => {
    if (err) throw err;
    console.log('Result: ' + result);
});

conexionBD.query('CREATE DATABASE festgangs;', (err, result) => {
    if (err) throw err;
    console.log('Base de datos creada con éxito');
});

conexionBD.query('DROP TABLE IF EXISTS festgangs.user;', (err, result) => {
    if (err) throw err;
    console.log('Result: ' + result);
});

let crearTablaUser = 'CREATE TABLE festgangs.user (' +
                    'id INT AUTO_INCREMENT PRIMARY KEY,' +
                    'email VARCHAR(50) NOT NULL,' +
                    'name VARCHAR(30) NOT NULL,' +
                    'password VARCHAR(30) NOT NULL' +
                    ');';

console.log(crearTablaUser);

conexionBD.query(crearTablaUser, (err, result) => {
    if (err) throw err;
    console.log('Tabla user creada con éxito');
});

let llenarTablaUser = 'INSERT INTO festgangs.user (email, name, password) VALUES' +
                    "('correo@basic.es', 'Basic Martínez', '1234')," +
                    "('juan@gmail.com', 'Juan Coppola', '4321');";

console.log(llenarTablaUser);

conexionBD.query(llenarTablaUser, (err, result) => {
    if (err) throw err;
    console.log('Tabla user rellenada con éxito');
});

let userId = 2;
/*
conexionBD.query('SELECT * FROM festgangs.user WHERE id = ?;', [userId], (err, result, fields) => {
    if (err) throw err;
    console.log(result);
    console.log(fields);
}); */

conexionBD.query('SELECT * FROM festgangs.user WHERE id = ?;', [userId], (err, result, fields) => {
    if (err) throw err;
/*     console.log(result);
    console.log(result[0].id); */
    console.log(result);
    let field = result[0];
    let user = userModel(field.id, field.email, field.name, field.password);
    console.log(user.saludo());
});