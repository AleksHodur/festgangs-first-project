const groupModel = require('../models/groupModel');
const mysql = require('mysql');
//const eventDAO = require('./eventDAO'); y esto???

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

    const sql2 = 'SELECT * FROM festgangs.eventgroup ORDER BY id DESC LIMIT 1';

    console.log('contenido de args');
    console.log(args);

    try{
        await query(sql, args);
        const row = await query(sql2);

        const fields = row[0];
        return groupModel(fields.id, fields.event_id, fields.leader, fields.max_users);
    
    }catch(error){
        console.error(error);
    }
}

const getByEvent = async (event_id) => {

    const sql = 'SELECT * FROM festgangs.eventgroup WHERE event_id = ?';
    const args = [event_id];

    try{
        const rows = await query(sql, args);
        let groups = [];

        rows.forEach(row => {
            groups.push(groupModel(row.id, row.event_id, row.leader,
                row.max_users));
        });

        return groups;

    }catch(error){
        console.log(error);
    }
}

const getById = async (id) => {

    const sql = 'SELECT * FROM festgangs.eventgroup WHERE id = ?';
    const args = [id];

    try{
        const rows = await query(sql, args);
        const fields = rows[0];

        let group = groupModel(fields.id, fields.event_id, fields.leader,
                fields.max_users);

        return group;

    }catch(error){
        console.log(error);
    }
}

const getByLeader = async (id) => {

    const sql = 'SELECT * FROM festgangs.eventgroup WHERE leader = ?';
    const args = [id];

    try{
        const rows = await query(sql, args);
        let groups = [];

        rows.forEach(row => {
            groups.push(groupModel(row.id, row.event_id, row.leader,
                row.max_users));
        });

        return groups;

    }catch(error){
        console.log(error);
        return null;
    }
}

const getByParticipant = async (id) => {

    let sql = 'SELECT group_id FROM festgangs.usergroup WHERE user_id = ?';
    let args = [id];

    try{
        let rows = await query(sql, args);
        let groups = [];

        rows.forEach(async row => {
            let group = await getById();
            groups.push(group);
        });

        return groups;

    }catch(error){
        console.log(error);
        return null;
    }
}

module.exports = {
    getByEventAndLeader,
    newGroup,
    getByEvent,
    getById,
    getByLeader,
    getByParticipant
};