var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

/* GET Admin - Dashboard. */
router.get('/', (req, res) => {
    res.render('admin_dash', { title: 'S.H.P.S.Library | Admin-Dashboard'});
  });


/* GET Admin - Book List Page. */
router.get('/books', (req, res) => {
    conn.query('SELECT * FROM books ORDER BY id', (err, results) => {
        if (err) {
          res.render('admin_books_list', { title: 'S.H.P.S.Library | Admin-Book-List', data: ''});
        }else {
          res.render('admin_books_list', { title: 'S.H.P.S.Library | Admin-Book-List', data: results});
        }
    });
});

  module.exports = router;