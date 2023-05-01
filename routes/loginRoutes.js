const express = require('express');
const router = express.Router(); //router object
const mysql = require('mysql'); //driver de mysql

const userModel = require('../models/userModel'); //carga el modelo usuario

//conexión base de datos
const conexionBD = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root'
});

conexionBD.connect((err) => {
  if(err) throw err;
  console.log('Connected to db! :)');
});


router.get('/login', (request, response) => {
    response.render('sesion', {title: 'Login'});
});

/**Para cerrar la sesión */
router.get('/login/close', (request, response) => {
    request.session.destroy();
    response.redirect('/login');
});

router.post('/login', (request, response) => {

  const { email, password } = request.body;

  if (!email || !password) {
      response.status(400).json({error: 'Missing email or password'});
      return;
  }

 try {
      conexionBD.query("SELECT * FROM festgangs.user WHERE email = ? AND password = ?", [email, password], (err, result, fields) => {

        if(err || result.length < 1){
          response.status(200).json({found: false, message: 'El usuario o la contraseña son incorrectos'});
        }else{
          let fields = result[0];
          request.session.user = userModel(fields.id, fields.email, fields.name, fields.password);
          response.status(200).json({found: true, message: 'Usuario correcto!'});
        }
      });

  } catch (error) {
      console.error(error);
      response.status(500).json({error: 'Internal server error'});
  }

});

module.exports = router;