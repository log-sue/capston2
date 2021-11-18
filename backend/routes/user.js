const express = require('express');
// const db_config = require('../config/database.js');
const db_config = require('../config/mysql2.js');
const pool = db_config.init();
const router = express.Router();

// isLogin, get timeTable
router.post('/isLogin', async function(req, res, next) {
    const connection = await pool.getConnection(async conn => conn);
    const sql = 'SELECT timeTable FROM user WHERE id = ?';
    const params = [req.body.userId]
    let timeTable = null
    let msg = undefined

    if(req.body.sessionId === req.session.id){
        try {
            const [rows] = await connection.query(sql, params);
            timeTable = rows[0].timeTable;
        } catch(err) {
            msg = 'DB error'
        } finally { 
            connection.release(); 
        }
    } else {
        msg = 'validation failed'
    }

    console.log(req.body.userId)
    console.log(req.body.sessionId)
    console.log(req.session.id)
    console.log(msg)
    console.log(timeTable)

    res.send({msg: msg, timeTable: timeTable});

});

// login
router.post('/login', async function(req, res, next) {
    const connection = await pool.getConnection(async conn => conn);
    const sql = 'SELECT passwd FROM user WHERE id = ?';
    const params = [req.body.id]

    let msg = undefined
    try {
        const [rows] = await connection.query(sql, params);
        if (rows[0] === undefined || req.body.passwd !== rows[0].passwd){
            msg = 'Incorrect ID or password';
        } else {
            req.session.userId = req.body.id
        }
    } catch(err) {
        msg = 'DB error'
        console.log(err)
    } finally { 
        connection.release(); 
    }
    res.send({msg: msg, userId: req.session.userId, sessionId: req.session.id});
});

// join
router.post('/join', async function(req, res, next) {
    const connection = await pool.getConnection(async conn => conn);
    const sql = 'INSERT INTO user VALUES(?, ?, ?)';
    const params = [req.body.id, req.body.passwd, JSON.stringify({"data":"it is init time table data"})]

    // inserted data's id(auto_increment)
    // let insertId = results.insertId;

    let msg = undefined
    try {
        const [results] = await connection.query(sql, params);
    } catch(err) {
        msg = 'DB error'
        console.log(err)
    } finally { 
        connection.release(); 
    }
    res.send({msg: msg});
});


// logout
// router.get("/logout", function(req,res){
//     req.session.destroy(function(err) {
//         res.redirect('/');
//     })
// });


module.exports = router;