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
    console.log('Log fields')
    console.log(fields);
    return userModel(fields.id, fields.type, fields.email, fields.name,
      fields.password, fields.profile_photo, fields.bio, fields.artists,
      fields.genres);

  }catch(error){
    console.error(error);
    return null;
  }
}

const getById = async (id) => {

  const sql = 'SELECT * FROM festgangs.user WHERE id = ?';
  const args = [id];

  try{
    const rows = await query(sql, args);
    const fields = rows[0];
    console.log('Log fields');
    console.log(fields);
    return userModel(fields.id, fields.type, fields.email, fields.name,
      fields.password, fields.profile_photo, fields.bio, fields.atists,
      fields.genres);

  }catch(error){
    console.error(error);
    return null;
  }
}

const update = async (user) => {

  console.log('en useer update dao');

    const fieldsName = await getFieldsName();

    if(fieldsName){

      let sql = 'UPDATE festgangs.user SET ';
      const args = [];
      let firstTime = true;

      for(let i = 0; i < fieldsName.length; i++){
        let field = fieldsName[i].Field;
        console.log('field: ' + field);

        if(user[field]){

          if(firstTime){
            firstTime = false;
            sql += field + ' = ?';
          }else{
            sql += ', ' + field + ' = ?';
          }

          args.push(user[field]);

        }
      }

      sql += ' WHERE id = ?';
      args.push(user.id);

      console.log(sql);
      console.log('args');
      console.log(args);

      return await queryUpdate(sql, args);

    }else{
      return false;
    }
};

async function getFieldsName(){

  const sql = 'DESCRIBE festgangs.user';

  try{
    const rows = await query(sql);
    console.log('Fields name: ');
    console.log(rows);
    return rows;

  }catch(error){
    console.log('Error fields name');
    console.error(error);
    return null;

  }
}

async function queryUpdate(sql, args){

  try{
    const rows = await query(sql, args);
    console.log(rows);
    return true;

  }catch(error){
    console.log('Error en queryUpdate');
    console.error(error);
    return false;
  }
}

module.exports = {
  getUserByEmailAndPassword,
  getById,
  update
};