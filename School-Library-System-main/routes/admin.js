var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

/* GET Admin - Dashboard. */
router.get('/', (req, res) => {
  if(req.session.loggedin == true){
    
    res.render('admin_dash', { title: 'S.H.P.S.Library | Admin-Dashboard', my_session: req.session});
  }else{
    res.redirect('/auth/admin')
  }
});



/*-------------------- Admin Books Routes ------------------*/

/* GET Admin - Book List Page. */
router.get('/books', (req, res) => {
    conn.query('SELECT * FROM books ORDER BY id', (err, results) => {
        if (err) {
          res.render('admin_books_list', { title: 'S.H.P.S.Library | Admin-Book-List', data: ''});
        }else {
          res.render('admin_books_list', { title: 'S.H.P.S.Library | Admin-Book-List', data: results, my_session: req.session});
        }
    });
});

/* GET Admin - New-Book-Registration Page. */
router.get('/add-book', (req, res) => {
    conn.query('SELECT * FROM books ORDER BY id', (err, results) => {
        if (err) {
          res.render('book_add', { title: 'S.H.P.S.Library | Book Registration', data: ''});
        }else {
          res.render('book_add', { title: 'S.H.P.S.Library | Book Registration', data: results, my_session: req.session});
        }
    });
});

/* Post New Book Info to Database from New-Book-Registration page */
router.post('/save-book', function(req, res, next) {
      
  let newBookData = {
      bk_ttl: req.body.bk_ttl,
      bk_desc: req.body.bk_desc,
      bk_athr: req.body.bk_athr,
      bk_cat: req.body.bk_cat,
  };
  
  let sqlQuery = "INSERT INTO books SET ?";

  conn.query(sqlQuery, newBookData, function(err,rows){
      if(err){
          throw err;
      }
      //req.flash('error', err); 
      res.redirect('/admin/books');   
      next();                
  });    
});

  module.exports = router;