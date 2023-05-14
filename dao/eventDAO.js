const eventModel = require('../models/eventModel');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'festgangs'
  });

function query(sql){
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, rows) => {
        if (err){
            reject(err);
        }else{
            resolve(rows);
        }
        });
    });
}

const getAllEvents = async () => {

    const sql = 'SELECT * FROM festgangs.event';

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


module.exports = {getAllEvents};