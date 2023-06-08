const eventModel = require('../models/eventModel');
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
  

const getAllEvents = async () => {

    const sql = 'SELECT * FROM festgangs.event ORDER BY date';

    try{
        const rows = await query(sql);
        let events = [];

        rows.forEach(row => {
            events.push(eventModel(row.id, row.title, row.artist, row.city,
                row.country, row.location, row.date));
        });

        return events;

    }catch(error){
        console.error(error);
        return null;
    }
}

const getById = async (id) => {

    const sql = 'SELECT * FROM festgangs.event WHERE id = ?';
    const args = [id];
    console.log("eventDAO getById() printing id");
    console.log(id)
    console.log("eventDAO getById() printing sql");
    console.log(sql);


    try{
        const rows = await query(sql, args);
        let fields = rows[0];
        console.log("eventDAO getById() printing event");
        console.log(fields);

        return eventModel(fields.id, fields.title, fields.artist, fields.city,
            fields.country, fields.location, fields.date);

    }catch(error){
        console.error(error);
        return null;
    }
}

const update = async (eventData) => {

  const fieldsName = await getFieldsName();

  if(fieldsName){

    let sql = 'UPDATE festgangs.event SET ';
    const args = [];
    let firstTime = true;

    for(let i = 0; i < fieldsName.length; i++){
      let field = fieldsName[i].Field;

      if(eventData[field]){

        if(firstTime){
          firstTime = false;
          sql += field + ' = ?';
        }else{
          sql += ', ' + field + ' = ?';
        }

        args.push(eventData[field]);
      }
    }

    sql += ' WHERE id = ?';
    args.push(eventData.id);

    return await queryUpdate(sql, args);
  }else{
    return null;
  }
}

async function getFieldsName(){

  const sql = 'DESCRIBE festgangs.event';

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
    return rows[0];

  }catch(error){
    console.log('Error en queryUpdate');
    console.error(error);
    return null;
  }
}

const deleteEvent = async (id) => {

  const sql = 'DELETE FROM festgangs.event WHERE id = ?';
  const args = [id];

  await query(sql, args);
}

module.exports = {
    getAllEvents,
    getById,
    update,
    deleteEvent
};