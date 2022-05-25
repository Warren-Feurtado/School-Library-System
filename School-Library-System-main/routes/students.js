var express = require('express');
const { redirect } = require('express/lib/response');
var router = express.Router();
var conn = require('../lib/db');


/* GET Admin - Book List Page. */
router.get('/books', (req, res) => {

    if(req.session.loggedin == true){
        conn.query('SELECT * FROM books ORDER BY bk_cat', (err, results) => {
            if (err) {
              res.render('books', { title: 'S.H.P.S.Library | Books', data: ''});
            }else {
              res.render('books', { title: 'S.H.P.S.Library | Books', data: results});
            }
        });
    }else{
        res.redirect('/auth/student')
    }
    
});

  module.exports = router;