const mysql = require('mysql');

const conexionBD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
});

conexionBD.connect((err) => {
    if(err) throw err;
    console.log('Connected! :)');
});


conexionBD.query('DROP TABLE IF EXISTS festgangs.user;', (err, result) => {
    if (err) throw err;
    console.log('Result: ' + result);
});

let crearTablaUser = 'CREATE TABLE festgangs.user (' +
                    'email VARCHAR(50) PRIMARY KEY,' +
                    'name VARCHAR(30) NOT NULL,' +
                    'password VARCHAR(30) NOT NULL' +
                    ');';

console.log(crearTablaUser);

conexionBD.query(crearTablaUser, (err, result) => {
    if (err) throw err;
    console.log('Result: ' + result);
});

let llenarTablaUser = 'INSERT INTO festgangs.user (email, name, password) VALUES' +
                    "('correo@basic.es', 'Basic Martínez', '1234')," +
                    "('juan@gmail.com', 'Juan Coppola', '4321');";

console.log(llenarTablaUser);

conexionBD.query(llenarTablaUser, (err, result) => {
    if (err) throw err;
    console.log('Result: ' + result);
});