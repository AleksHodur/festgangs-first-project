const express = require('express'); //framework express
const { render } = require('ejs'); //framework ejs para incrustar código de servidor en html
const session = require('express-session'); //módulo de sesiones de express

const loginRoutes = require('./routes/loginRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes.js');

//express app
const app = express();

//registro del motor de vista: ejs
app.set('view engine', 'ejs');

//definir ruta archivos estáticos
/* Para usar archivos estáticos en el front (js, css, ...) */
app.use(express.static('public'));

//servidor web en el puerto 3000 en localhost
app.listen(3000, 'localhost', () => {
    console.log('server is listening on port 3000');
});

app.use(express.json()); // This line is to parse JSON request bodies

//para parsear url request en objetos
app.use(express.urlencoded({extended: true}));

app.use(function (req, res, next) {
    console.log('Request received: ', req.url);
    next();
  });

/**
 * Iniciando la sesión
 */
app.use(session({
  
  // It holds the secret key for session
  secret: 'secreto',

  // Forces the session to be saved
  // back to the session store
  resave: true,

  // Forces a session that is "uninitialized"
  // to be saved to the store
  saveUninitialized: true
}))

app.get('/', (request, response) => {
    if(request.session.user){
      response.render('home', {title: 'Inicio', user: request.session.user});
    }else{
      response.redirect('/login');
    }
});

/* app.get('/prueba', (request, response) => {
    response.status(200).json({ message: 'Success!' });
    console.log('éxito');
    //response.send('Success!');
}); */

app.put('/prueba', (request, response) => {
  response.status(200).json({ message: 'Success!' });
});

app.use('/login', loginRoutes);

app.use('/event', eventRoutes);

app.use('/user', userRoutes);