const commentModel = require('../models/commentModel');
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

const getByGroup = async (group_id) => {

    const sql = 'SELECT * FROM festgangs.groupcomment WHERE group_id = ? ORDER BY created_at';
    args = [group_id];

    try{
        const rows = await query(sql, args);
        let comments = [];

        rows.forEach(row => {
            comments.push(commentModel(row.id, row.user_id, row.group_id,
                row.created_at));
        });

        return comments;

    }catch(error){
        console.error(error);
        return null;
    }
}

module.exports = {
    getByGroup
}