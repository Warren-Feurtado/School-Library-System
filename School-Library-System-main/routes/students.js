var express = require('express');
var router = express.Router();
var conn = require('../lib/db');
var dateTime = require('node-datetime');


/* GET Students' - Books Page. */
router.get('/books', (req, res) => {

    if(req.session.loggedin == true){
        conn.query('SELECT books.id, books.bk_ttl, books.bk_desc, authors.athr_nm, categories.cat_nm  FROM libraryapp1.books, libraryapp1.authors, libraryapp1.categories WHERE books.cat_id = categories.id AND books.athr_id = authors.id;', (err, results) => {
            if (err) {
              res.render('books', { title: 'S.H.P.S.Library | Books', data: ''});
            }else {
              res.render('books', { title: 'S.H.P.S.Library | Books', data: results, pg_heading: 'All Books'});
            }
        });
    }else{
        res.redirect('/auth/student')
    }
    
});

/*-------------------- BOOK DETAILS ------------------*/
/* GET Students - Book-Details Page. */
router.get('/book-details/:id', (req, res, next) => {

  var todayDate = dateTime.create();
  var todayDtFrmtd = todayDate.format('Y-m-d H:M:S');

  conn.query('SELECT books.id, books.bk_ttl, books.bk_desc, authors.athr_nm, categories.cat_nm  FROM libraryapp1.books, libraryapp1.authors, libraryapp1.categories WHERE books.cat_id = categories.id AND books.athr_id = authors.id AND books.id='+ req.params.id, (err, rows) => {
      if (err) {
        res.render('book_details', { title: 'S.H.P.S.Library | Book Details', data: ''});
      }else {
        res.render('book_details', { title: 'S.H.P.S.Library | Book Details', data: rows[0], my_session: req.session, req_date: todayDtFrmtd});
      }
  });
});

/* Post Book-Request Info to Database from New-Book-Registration page */
router.post('/send-request', function(req, res, next) {
       

  let newReqData = {
    // my_session: req.session,
    stu_id: req.body.stu_id,
    bk_id: req.body.bk_id,
    req_sts_id: req.body.sts_id,
    req_dt: req.body.req_dt,
  };
  
  let sqlQuery = "INSERT INTO libraryapp1.requests SET ?";

  conn.query(sqlQuery, newReqData, function(err,rows){
      if(err){
          throw err;
      }
      req.flash('success', 'Request Successful!'); 
      res.redirect('/students/books');   
      next();                
  });    
});

/*-------------------- BOOK CATEGORIES R0UTES ------------------*/
/* Get Mathematics Category Books page */
router.get('/books/Mathematics', (req, res) => {

  if(req.session.loggedin == true){
      conn.query('SELECT books.id, books.bk_ttl, books.bk_desc, authors.athr_nm, categories.cat_nm  FROM libraryapp1.books, libraryapp1.authors, libraryapp1.categories WHERE books.cat_id = categories.id AND categories.cat_nm = "Mathematics" AND books.athr_id = authors.id;', (err, results) => {
          if (err) {
            res.render('books', { title: 'S.H.P.S.Library | Math Books ', data: ''});
          }else {
            res.render('books', { title: 'S.H.P.S.Library | Books', data: results, pg_heading: 'Math Books'});
          }
      });
  }else{
      res.redirect('/auth/student')
  } 
});

/* Get English Category Books page */
router.get('/books/English', (req, res) => {

  if(req.session.loggedin == true){
      conn.query('SELECT books.id, books.bk_ttl, books.bk_desc, authors.athr_nm, categories.cat_nm  FROM libraryapp1.books, libraryapp1.authors, libraryapp1.categories WHERE books.cat_id = categories.id AND categories.cat_nm = "English" AND books.athr_id = authors.id;', (err, results) => {
          if (err) {
            res.render('books', { title: 'S.H.P.S.Library | Math Books ', data: ''});
          }else {
            res.render('books', { title: 'S.H.P.S.Library | Books', data: results, pg_heading: 'English Books'});
          }
      });
  }else{
      res.redirect('/auth/student')
  } 
});

/* Get Science Category Books page */
router.get('/books/Science', (req, res) => {

  if(req.session.loggedin == true){
      conn.query('SELECT books.id, books.bk_ttl, books.bk_desc, authors.athr_nm, categories.cat_nm  FROM libraryapp1.books, libraryapp1.authors, libraryapp1.categories WHERE books.cat_id = categories.id AND categories.cat_nm = "Science" AND books.athr_id = authors.id;', (err, results) => {
          if (err) {
            res.render('books', { title: 'S.H.P.S.Library | Math Books ', data: ''});
          }else {
            res.render('books', { title: 'S.H.P.S.Library | Books', data: results, pg_heading: 'Science Books'});
          }
      });
  }else{
      res.redirect('/auth/student')
  } 
});

/* Get Phonics Category Books page */
router.get('/books/Phonics', (req, res) => {

  if(req.session.loggedin == true){
      conn.query('SELECT books.id, books.bk_ttl, books.bk_desc, authors.athr_nm, categories.cat_nm  FROM libraryapp1.books, libraryapp1.authors, libraryapp1.categories WHERE books.cat_id = categories.id AND categories.cat_nm = "Phonics" AND books.athr_id = authors.id;', (err, results) => {
          if (err) {
            res.render('books', { title: 'S.H.P.S.Library | Math Books ', data: ''});
          }else {
            res.render('books', { title: 'S.H.P.S.Library | Books', data: results, pg_heading: 'Phonics Books'});
          }
      });
  }else{
      res.redirect('/auth/student')
  } 
});

/* Get Art Category Books page */
router.get('/books/Art', (req, res) => {

  if(req.session.loggedin == true){
      conn.query('SELECT books.id, books.bk_ttl, books.bk_desc, authors.athr_nm, categories.cat_nm  FROM libraryapp1.books, libraryapp1.authors, libraryapp1.categories WHERE books.cat_id = categories.id AND categories.cat_nm = "Art" AND books.athr_id = authors.id;', (err, results) => {
          if (err) {
            res.render('books', { title: 'S.H.P.S.Library | Math Books ', data: ''});
          }else {
            res.render('books', { title: 'S.H.P.S.Library | Books', data: results, pg_heading: 'Art Books'});
          }
      });
  }else{
      res.redirect('/auth/student')
  } 
});

/* Get Social Studies Category Books page */
router.get('/books/Social Studies', (req, res) => {

  if(req.session.loggedin == true){
      conn.query('SELECT books.id, books.bk_ttl, books.bk_desc, authors.athr_nm, categories.cat_nm  FROM libraryapp1.books, libraryapp1.authors, libraryapp1.categories WHERE books.cat_id = categories.id AND categories.cat_nm = "Social Studies" AND books.athr_id = authors.id;', (err, results) => {
          if (err) {
            res.render('books', { title: 'S.H.P.S.Library | Math Books ', data: ''});
          }else {
            res.render('books', { title: 'S.H.P.S.Library | Books', data: results, pg_heading: 'Social Studies Books'});
          }
      });
  }else{
      res.redirect('/auth/student')
  } 
});

/* Get Geography Category Books page */
router.get('/books/Geography', (req, res) => {

  if(req.session.loggedin == true){
      conn.query('SELECT books.id, books.bk_ttl, books.bk_desc, authors.athr_nm, categories.cat_nm  FROM libraryapp1.books, libraryapp1.authors, libraryapp1.categories WHERE books.cat_id = categories.id AND categories.cat_nm = "Geography" AND books.athr_id = authors.id;', (err, results) => {
          if (err) {
            res.render('books', { title: 'S.H.P.S.Library | Math Books ', data: ''});
          }else {
            res.render('books', { title: 'S.H.P.S.Library | Books', data: results, pg_heading: 'Geography Books'});
          }
      });
  }else{
      res.redirect('/auth/student')
  } 
});

/* Get Fantasy Category Books page */
router.get('/books/Fantasy', (req, res) => {

  if(req.session.loggedin == true){
      conn.query('SELECT books.id, books.bk_ttl, books.bk_desc, authors.athr_nm, categories.cat_nm  FROM libraryapp1.books, libraryapp1.authors, libraryapp1.categories WHERE books.cat_id = categories.id AND categories.cat_nm = "Fantasy" AND books.athr_id = authors.id;', (err, results) => {
          if (err) {
            res.render('books', { title: 'S.H.P.S.Library | Math Books ', data: ''});
          }else {
            res.render('books', { title: 'S.H.P.S.Library | Books', data: results, pg_heading: 'Fantasy Books'});
          }
      });
  }else{
      res.redirect('/auth/student')
  } 
});




  module.exports = router;