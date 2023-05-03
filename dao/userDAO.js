/* const userDAO = {
  mysql: require('mysql'), //driver de mysql

  conexionBD: mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
  }),
}

 */

/* let userModel = require('../models/userModel'); //carga el modelo usuario
let mysql = require('mysql'); */

/*class userDAO{
  constructor(){
    this.userModel = userModel;
    this.mysql =  mysql;
    this.host = 'localhost';
    this.user = 'root';
    this.password = 'root';
/*     this.conexionBD = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root'
    }); 
  }

/*   conectarBD(){
    let conexionBD = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root'
    });

    conexionBD.connect((err) => {
      if(err) throw err;
      console.log('Connected to db! :)');
    });

    return conexionBD;
  } */

/*   getUserByMailAndPassword(email, password){

/*     let conexionBD = this.conectarBD(); 

    let conexionBD = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root'
    });

    conexionBD.connect((err) => {
      if(err) throw err;
      console.log('Connected to db! :)');
    });

    try {
        conexionBD.query("SELECT * FROM festgangs.user WHERE email = ? AND password = ?", [email, password], (err, result, fields) => {

            if(err || result.length < 1){
              return null;
              //response.status(200).json({found: false, message: 'El usuario o la contraseña son incorrectos'});
            }else{
              let fields = result[0];
              let user = userModel(fields.id, fields.email, fields.name, fields.password);
              return user;
    /*             request.session.user = userModel(fields.id, fields.email, fields.name, fields.password);
              response.status(200).json({found: true, message: 'Usuario correcto!'}); 
            }
        });

    } catch (error) {
        console.error(error);
        return null;
        //response.status(500).json({error: 'Internal server error'});
    }
  }

} */
//conexión base de datos
/* const conexionBD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
  }); */
  
/*   conexionBD.connect((err) => {
    if(err) throw err;
    console.log('Connected to db! :)');
  }); */

/* function login_check(email, password){
  
    try {
        conexionBD.query("SELECT * FROM festgangs.user WHERE email = ? AND password = ?", [email, password], (err, result, fields) => {
  
          if(err || result.length < 1){
            return null;
            //response.status(200).json({found: false, message: 'El usuario o la contraseña son incorrectos'});
          }else{
            let fields = result[0];
            let user = userModel(fields.id, fields.email, fields.name, fields.password);
            return user;
/*             request.session.user = userModel(fields.id, fields.email, fields.name, fields.password);
            response.status(200).json({found: true, message: 'Usuario correcto!'}); 
          }
        });
  
    } catch (error) {
        console.error(error);
        //response.status(500).json({error: 'Internal server error'});
    }
}
 */
//module.exports = new userDAO();

const userModel = require('../models/userModel'); //carga el modelo usuario
const mysql = require('mysql');

/* const conexionBD = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root'
}); */

const getUserByEmailAndPassword = (email, password) => {

  /*     const conexionBD = this.conectarBD(); */
  
      /* const conexionBD = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root'
      }); */

      const mysql = require('mysql');

      const conexionBD = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root'
      });
  
      conexionBD.connect((err) => {
        if(err) throw err;
        console.log('Connected to db! :)');
      });
  
      try {
          conexionBD.query("SELECT * FROM festgangs.user WHERE email = ? AND password = ?", [email, password], (err, result, fields) => {
  
              if(err || result.length < 1){
                return null;
                //response.status(200).json({found: false, message: 'El usuario o la contraseña son incorrectos'});
              }else{
                let fields = result[0];
                let user = userModel(fields.id, fields.email, fields.name, fields.password);
                return user;
      /*             request.session.user = userModel(fields.id, fields.email, fields.name, fields.password);
                response.status(200).json({found: true, message: 'Usuario correcto!'}); */
              }
          });
  
      } catch (error) {
          console.error(error);
          return null;
          //response.status(500).json({error: 'Internal server error'});
      }
    }
  

module.exports = {getUserByEmailAndPassword};