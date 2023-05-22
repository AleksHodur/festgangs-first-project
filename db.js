const mysql = require('mysql');
//const userModel = require('./models/userModel');

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

conexionBD.query('DROP TABLE IF EXISTS festgangs.usertype;', (err, result) => {
    if (err) throw err;
    console.log('Result: ' + result);
});

conexionBD.query('DROP TABLE IF EXISTS festgangs.user;', (err, result) => {
    if (err) throw err;
    console.log('Result: ' + result);
});

conexionBD.query('DROP TABLE IF EXISTS festgangs.event;', (err, result) => {
    if (err) throw err;
    console.log('Result: ' + result);
});

conexionBD.query('DROP TABLE IF EXISTS festgangs.eventgroup;', (err, result) => {
    if (err) throw err;
    console.log('Result: ' + result);
});

conexionBD.query('DROP TABLE IF EXISTS festgangs.usergroup;', (err, result) => {
    if (err) throw err;
    console.log('Result: ' + result);
});

conexionBD.query('DROP TABLE IF EXISTS festgangs.groupcomment;', (err, result) => {
    if (err) throw err;
    console.log('Result: ' + result);
});

const crearTablaUserType = 'CREATE TABLE festgangs.usertype (' +
                            'id INT AUTO_INCREMENT PRIMARY KEY,' +
                            'name VARCHAR(30) NOT NULL,' +
                            'description TEXT)';

conexionBD.query(crearTablaUserType, (err, result) => {
    if(err) throw err;
    console.log('Tabla usertype creada con éxito');
});

const llenarTablaUserType = 'INSERT INTO festgangs.usertype (name, description) VALUES ' +
                            "('standard', 'Poderes: crear perfil personal, organizar/partcipar en grupos/eventos, buscar información sobre estos'), " +
                            "('moderator', 'Poderes: borrar mensajes, borrar fotos, banear usuarios'), " +
                            "('administrator', 'Poderes: editar eventos, gestionar usuarios')";

conexionBD.query(llenarTablaUserType, (err, result) => {
    if (err) throw err;
    console.log('Tabla userType rellenada con éxito');
});

const crearTablaUser = 'CREATE TABLE festgangs.user (' +
                    'id INT AUTO_INCREMENT PRIMARY KEY,' +
                    'type INT NOT NULL,' +
                    'email VARCHAR(50) NOT NULL,' +
                    'name VARCHAR(30) NOT NULL,' +
                    'password VARCHAR(30) NOT NULL,' +
                    'profile_photo BOOL NOT NULL,' +
                    'bio VARCHAR(500),' +
                    'artists VARCHAR(500),' +
                    'genres VARCHAR(500),' +
                    'FOREIGN KEY (type) REFERENCES usertype(id)' +
                    ');';

//console.log(crearTablaUser);

conexionBD.query(crearTablaUser, (err, result) => {
    if (err) throw err;
    console.log('Tabla user creada con éxito');
});

const llenarTablaUser = 'INSERT INTO festgangs.user (type, email, name, password, profile_photo) VALUES' +
                    "(1, 'ana29@gmail.es', 'Ana29', '1234', 0)," +
                    "(1, 'juan@gmail.com', 'juan_guay', '1234', 0)," +
                    "(1, 'george.blunt@gmail.com', 'GeorgeBlunt', '1234', 1)," +
                    "(1, 'matilda.perfe@pm.com', 'Mtilda', '1234', 0)";

console.log(llenarTablaUser);

conexionBD.query(llenarTablaUser, (err, result) => {
    if (err) throw err;
    console.log('Tabla user rellenada con éxito');
});

const crearTablaEvent = 'CREATE TABLE festgangs.event (' +
                    'id INT AUTO_INCREMENT PRIMARY KEY,' +
                    'title VARCHAR(50) NOT NULL,' +
                    'artist TEXT NOT NULL,' +
                    'city VARCHAR(50) NOT NULL,' +
                    'country VARCHAR(50) NOT NULL,' +
                    'location VARCHAR(100),' +
                    'date DATE NOT NULL' +
                    ');';

conexionBD.query(crearTablaEvent, (err, result) => {
    if (err) throw err;
    console.log('Tabla event creada con éxito');
});

const llenarTablaEvent = 'INSERT INTO festgangs.event (title, artist, city, country, location, date) VALUES' +
                            "('Hombres G', 'Hombres G', 'Gijón', 'España', 'Palacio de Deportes Presidente Adolfo Suárez', '2023-06-03')," +
                            "('Skinyz', 'Skinyz', 'Gijón', 'España', 'Billy Bob', '2023-06-10')," +
                            "('Riverland 2023', 'Sticky M.A., Yung Beef, C.R.O, Delaossa, Cruz Cafuné, Kidd Keo', 'Arriondas', 'España', 'Valle de la Música', '2023-08-24')," +
                            "('Tsunami Xixón', 'Wolfmother, Dropkick Murphys, Descendents, Me First And TheGimme Gimmes, The Hellacopters, Toundra, Desakato', 'Gijón', 'España', 'Laboral Ciudad de la Cultura', '2023-07-27');";

conexionBD.query(llenarTablaEvent, (err, result) => {
    if (err) throw err;
    console.log('Tabla event rellenada con éxito');
});

const crearTablaEventGroup = 'CREATE TABLE festgangs.eventgroup (' +
                    'id INT AUTO_INCREMENT PRIMARY KEY, ' +
                    'event INT NOT NULL, ' +
                    'leader INT NOT NULL, ' +
                    'FOREIGN KEY (event) REFERENCES event(id), ' +
                    'FOREIGN KEY (leader) REFERENCES user(id)' +
                    ');';

conexionBD.query(crearTablaEventGroup, (err, result) => {
    if (err) throw err;
    console.log('Tabla eventgroup creada con éxito');
});

const crearTablaUserGroup = 'CREATE TABLE festgangs.usergroup (' +
                    'user_id INT, ' +
                    'group_id INT, ' +
                    'PRIMARY KEY (user_id, group_id), ' +
                    'FOREIGN KEY (user_id) REFERENCES user(id), ' +
                    'FOREIGN KEY (group_id) REFERENCES eventgroup(id)' +
                    ');';

conexionBD.query(crearTablaUserGroup, (err, result) => {
    if (err) throw err;
    console.log('Tabla usergroup creada con éxito');
});

const crearTablaGroupComment = 'CREATE TABLE festgangs.groupcomment (' +
                    'id INT AUTO_INCREMENT PRIMARY KEY, ' +
                    'user_id INT, ' +
                    'group_id INT, ' +
                    'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ' +
                    'FOREIGN KEY (user_id) REFERENCES user(id), ' +
                    'FOREIGN KEY (group_id) REFERENCES eventgroup(id)' +
                    ');';

conexionBD.query(crearTablaGroupComment, (err, result) => {
    if (err) throw err;
    console.log('Tabla groupcomment creada con éxito');
});
/* let userId = 2;
/*
conexionBD.query('SELECT * FROM festgangs.user WHERE id = ?;', [userId], (err, result, fields) => {
    if (err) throw err;
    console.log(result);
    console.log(fields);
}); 

conexionBD.query('SELECT * FROM festgangs.user WHERE id = ?;', [userId], (err, result, fields) => {
    if (err) throw err;
/*     console.log(result);
    console.log(result[0].id);
    console.log(result);
    let field = result[0];
    let user = userModel(field.id, field.email, field.name, field.password);
    console.log(user.saludo());
}); */