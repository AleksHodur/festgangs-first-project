const userModel = require('../models/userModel'); //carga el modelo usuario

const getUserByEmailAndPassword = (email, password) => {

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
              }else{
                let fields = result[0];
                let user = userModel(fields.id, fields.email, fields.name, fields.password);
                return user;
                  //request.session.user = userModel(fields.id, fields.email, fields.name, fields.password);
                //response.status(200).json({found: true, message: 'Usuario correcto!'}); 
              }
          });
  
      } catch (error) {
          console.error(error);
          return null;
      }
}
  

module.exports = {getUserByEmailAndPassword};