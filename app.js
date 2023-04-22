const express = require('express');
const { render } = require('ejs');

//express app
const app = express();

//registro del motor de vista: ejs
app.set('view engine', 'ejs');

//servidor web en el puerto 3000 en localhost
app.listen(3000);

//para parsear url request en objetos
app.use(express.urlencoded({extended: true}));

app.get('/', (request, response) => {
    response.render('index');
});