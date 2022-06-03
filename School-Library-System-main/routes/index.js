var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

/* GET home page. */
router.get('/', (req, res) => {
  conn.query('SELECT ct.cat_nm, st.stu_fnm FROM libraryapp1.categories ct, libraryapp1.students st;', (err, results) => {
    if (err) {
      res.render('admin_books_list', { title: 'S.H.P.S.Library | Admin-Book-List', cat_data: ''});
    }else {
      res.render('index', { title: 'Home', cat_data: results, my_session: req.session});
    }
  });
});

module.exports = router;
