const groupModel = require('../models/groupModel');
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

const getByEventAndLeader = async (event_id, leader) => {

    const sql = 'SELECT * FROM festgangs.eventgroup WHERE event_id = ? AND leader = ?';
    const args = [event_id, leader];

    try{
        const row = await query(sql, args);
        const fields = row[0];
        return fields;
    }catch(error){
        console.log('No such group');
        return null;
    }
}

const newGroup = async (event_id, leader, max_users) => {

    const sql = 'INSERT INTO festgangs.eventgroup (event_id, leader, max_users) VALUES (?, ?, ?)';
    const args = [event_id, leader, max_users];

    console.log('contenido de args');
    console.log(args);

    try{
        const row = await query(sql, args);
        const fields = row[0];
        return groupModel(fields.id, fields.event_id, fields.leader, fields.max_users);
    
    }catch(error){
        console.error(error);
    }
}

module.exports = {
    getByEventAndLeader,
    newGroup
};