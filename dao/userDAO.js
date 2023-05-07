const userModel = require('../models/userModel'); //carga el modelo usuario
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'festgangs'
});

function query(sql, args){
  return new Promise((resolve, reject) => {
    pool.query(sql, args, (err, rows) => {
      if (err){
        reject(err);
      }else{
        resolve(rows);
      }
    });
  });
}

const getUserByEmailAndPassword = async (email, password) => {

  const sql = 'SELECT * FROM festgangs.user WHERE email = ? AND password = ?';
  const args = [email, password];

  try{
    const rows = await query(sql, args);
    const fields = rows[0];
    return userModel(fields.id, fields.type, fields.email, fields.name, fields.password);

  }catch(error){
    console.error(error);
    return null;
  }
}
  

module.exports = {getUserByEmailAndPassword};