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

    try{
        const rows = await query(sql, args);
        let fields = rows[0];

        return eventModel(fields.id, fields.title, fields.artist, fields.city,
            fields.country, fields.location, fields.data);

    }catch(error){
        console.error(error);
        return null;
    }
}


module.exports = {
    getAllEvents,
    getById
};