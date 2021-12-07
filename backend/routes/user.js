const express = require('express');
// const db_config = require('../config/database.js');
const db_config = require('../config/mysql2.js');
const pool = db_config.init();
const router = express.Router();

// isLogin, get timeTable
router.post('/isLogin', async function(req, res, next) {
    
    let msg = undefined

    if(req.body.sessionId === req.session.id){
        msg = undefined
    } else {
        msg = 'validation failed'
    }

    res.send({msg: msg});

});

// login
router.post('/login', async function(req, res, next) {
    const connection = await pool.getConnection(async conn => conn);
    const sql = 'SELECT userPw FROM user WHERE userEmail = ?';
    const params = [req.body.email]

    let msg = undefined
    try {
        const [rows] = await connection.query(sql, params);
        if (rows[0] === undefined || req.body.userPw !== rows[0].userPw){
            msg = 'Incorrect ID or password';
        } else {
            req.session.userEmail = req.body.email;
        }
    } catch(err) {
        msg = 'DB error'
        console.log(err)
    } finally { 
        connection.release(); 
    }
    res.send({msg: msg, userEmail: req.session.userEmail, sessionId: req.session.id});
});

// join
router.post('/join', async function(req, res, next) {
    const connection = await pool.getConnection(async conn => conn);
    const sql = 'INSERT INTO user VALUES(?, ?, ?)';
    const params = [req.body.email, req.body.passwd, req.body.name];

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


// save
router.post('/save', async function(req, res, next) {
    const connection = await pool.getConnection(async conn => conn);
    const sql = 'INSERT INTO book VALUES(?, ?, ?, ?, ?, ?, ?)';
    const params = [req.body.bookName, req.body.bookAuthor, parseFloat(req.body.bookStar), req.body.bookContent, req.body.bookImage, , ,];

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