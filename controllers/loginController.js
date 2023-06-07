//const mysql = require('mysql'); //driver de mysql

//const userModel = require('../models/userModel'); //carga el modelo usuario
const userDAO = require('../dao/userDAO');
//conexión base de datos
/* const conexionBD = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root'
}); */

/* conexionBD.connect((err) => {
  if(err) throw err;
  console.log('Connected to db! :)');
}); */

const login_index = (request, response) => {
  if(request.session.user){
    response.redirect('/');
  }else{
    response.render('login', {title: 'Login'});
  }
};

const login_close = (request, response) => {
    request.session.destroy();
    response.redirect('/login');
}

const login_check = async (request, response) => {
    
    const { email, password } = request.body;

    try{
      console.log(userDAO);
      const user = await userDAO.getUserByEmailAndPassword(email, password);

      if(user){
        console.log(user);
        request.session.user = user;
        response.status(200).json({found: true, message: 'Usuario correcto!'});
      }else{
        response.status(200).json({found: false, message: 'El usuario o la contraseña son incorrectos'});
      }

    }catch(error){
      console.error(error);
      response.status(500).json({error: 'Internal server error'});
    }
      
      
}

module.exports = {login_index, login_close, login_check}
