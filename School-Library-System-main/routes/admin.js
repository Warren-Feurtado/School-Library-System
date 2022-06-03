var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

/* GET Admin - Dashboard/Home page. */
router.get('/', (req, res) => {
  if(req.session.loggedin == true && req.session.pos == 'admin'){
  conn.query('SELECT ct.cat_nm FROM libraryapp1.categories ct;', (err, results) => {
    if (err) {
      res.render('admin_dash', { title: 'S.H.P.S.Library | Admin-Dashboard', data: ''});
    }else {
      res.render('admin_dash', { title: 'S.H.P.S.Library | Admin-Dashboard', my_session: req.session, data: results});
    }
  });
  }else{
    res.redirect('/auth/admin')
  }
});



/*-------------------- ADMIN BOOKS-LIST, ADD, EDIT, DELETE ROUTES ------------------*/

/* GET Admin - Book List Page. */
router.get('/books', (req, res) => {
  if(req.session.loggedin == true && req.session.pos == 'admin'){
    conn.query('SELECT books.id, books.bk_ttl, books.bk_desc, authors.athr_nm, categories.cat_nm  FROM libraryapp1.books, libraryapp1.authors, libraryapp1.categories WHERE books.cat_id = categories.id AND books.athr_id = authors.id;', (err, results) => {
        if (err) {
          res.render('admin_books_list', { title: 'S.H.P.S.Library | Admin-Book-List', data: ''});
        }else {
          res.render('admin_books_list', { title: 'S.H.P.S.Library | Admin-Book-List', cat_data: results.cat_nm, data: results, my_session: req.session, pg_heading: 'All Books'});
        }
    });
  }else{
    res.redirect('/auth/admin')
  }
});

/*-------------------- ADD BOOK ------------------*/
/* GET Admin - New-Book-Registration Page. */
router.get('/add-book', (req, res) => {
    // conn.query('SELECT * FROM books ORDER BY id', (err, results) => {
    conn.query('SELECT books.id, books.bk_ttl, books.bk_desc, authors.athr_nm, categories.cat_nm  FROM libraryapp1.books, libraryapp1.authors, libraryapp1.categories WHERE books.cat_id = categories.id AND books.athr_id = authors.id;', (err, results) => {
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

/*-------------------- EDIT BOOK ------------------*/
/* GET Admin - Edit Book Page. */
router.get('/edit-book/:id', (req, res, next) => {
  // conn.query('SELECT books.id AS id, books.bk_ttl AS bk_ttl, books.bk_desc AS bk_desc, books.bk_athr AS bk_athr, books.bk_cat FROM books WHERE id='+ req.params.id, (err, rows) => {
  conn.query('SELECT books.id, books.bk_ttl, books.bk_desc, authors.athr_nm, categories.cat_nm  FROM libraryapp1.books, libraryapp1.authors, libraryapp1.categories WHERE books.cat_id = categories.id AND books.athr_id = authors.id AND books.id='+ req.params.id, (err, rows) => {
      if (err) {
        res.render('book_edit', { title: 'S.H.P.S.Library | Book Edit', data: ''});
      }else {
        res.render('book_edit', { title: 'S.H.P.S.Library | Book Edit', data: rows[0], my_session: req.session});
      }
  });
});

/*--- POST EDITED BOOK DATA to the Database ----*/
router.post('/update-book/', function(req, res, next) {
      
  let sqlQuery = "UPDATE books SET bk_ttl ='" + req.body.bk_ttl + 
                                        "', bk_desc ='" + req.body.bk_desc + 
                                        "', athr_id = authors.id, cat_id = categories.id WHERE authors.auth_nm = '" + req.body.athr_nm +"', categories.cat_nm = '" + req.body.athr_nm +"' AND  books.id = " + req.body.id;

  conn.query(sqlQuery, function(err,rows){
    //req.flash('error', err); 
    res.redirect('/admin/books');   
    next();                
  });         
});

/*-------------------- DELETE BOOK ------------------*/
/* Delete Selected Book. */
router.get('/delete-book/:id', function(req, res, next) {
 
  conn.query("DELETE FROM books WHERE id="+ req.params.id, function(err,row){
    if(err){
      //req.flash('error', err); 
      throw err   
    }else{
      res.redirect('/admin/books');
    }                         
  });      
});

/*-------------------- ADMIN REQUESTS-LIST, APROVE ROUTES ------------------*/
/* GET Admin - Book List Page. */
router.get('/book-requests', (req, res) => {
  if(req.session.loggedin == true && req.session.pos == 'admin'){
    conn.query('SELECT req.id, stus.stu_fnm, stus.stu_lnm, bks.bk_ttl, athrs.athr_nm, sts.sts, req.req_dt, cats.cat_nm From libraryapp1.requests req, libraryapp1.students stus, libraryapp1.books bks, libraryapp1.authors athrs, libraryapp1.stats sts, libraryapp1.categories cats WHERE req.stu_id = stus.id AND req.bk_id = bks.id AND bks.athr_id = athrs.id AND req.req_sts_id = sts.id AND bks.cat_id = cats.id ORDER BY id;', (err, results) => {
        if (err) {
          res.render('admin_requests', { title: 'S.H.P.S.Library | Admin-Book-Requests', data: ''});
        }else {
          res.render('admin_requests', { title: 'S.H.P.S.Library | Admin-Book-Requests', data: results, my_session: req.session});
        }
    });
  }else{
    res.redirect('/auth/admin')
  }
});




module.exports = router;