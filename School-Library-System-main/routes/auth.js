var express = require('express');
var router = express.Router();
var conn = require('../lib/db');


/*-------------------- Admin Authentication --------------------*/
/* GET admin login page. */
router.get('/admin', (req, res) => {
  res.render('admin_auth', { title: 'S.H.P.S.Library | Admin Login'});
});

// Admin Login Authentication
router.post('/adminlog', function(req, res, next) {
       
    var email = req.body.email;
    var password = req.body.password;
   
    conn.query('SELECT * FROM admin WHERE email_adrs = ? AND BINARY pss_wrd = ?', [email, password], function(err, results, fields) {
         
      // if login is incorrect or not found
      // console.log(results.length);
      if (results.length <= 0) {
          req.flash('error', 'Invalid credentials Please try again!')
          res.redirect('/auth/admin')
      }
      else { // if login found
          //Assign session variables based on login credentials                
          req.session.loggedin = true;
          req.session.tid = results[0].id,
          req.session.frst_nm = results[0].frst_nm;
          req.session.lst_nm = results[0].lst_nm;
          res.redirect('/admin');
          console.log(req.session.frst_nm)
      }            
    });
  });
/*----------------------------------------------------------------------------------------------------*/


/*-------------------- Student Authentication --------------------*/
  /* GET student login page. */
router.get('/student', (req, res) => {
  res.render('student_auth', { title: 'S.H.P.S.Library | Student Login'});
});

// Student Login Authentication
router.post('/studentlog', function(req, res, next) {
       
    var email = req.body.email;
    var password = req.body.password;
   
    conn.query('SELECT * FROM students WHERE email_adrs = ? AND BINARY pss_wrd = ?', [email, password], function(err, results, fields) {
         
      // if login is incorrect or not found
      // console.log(results.length);
      if (results.length <= 0) {
          req.flash('error', 'Invalid credentials Please try again!')
          res.redirect('/auth/student')
      }
      else { // if login found
          //Assign session variables based on login credentials                
          req.session.loggedin = true;
          req.session.tid = results[0].id,
          req.session.frst_nm = results[0].frst_nm;
          req.session.lst_nm = results[0].lst_nm;
          res.redirect('/');
          console.log(req.session.frst_nm)
      }            
    });
  });
/*----------------------------------------------------------------------------------------------------*/

// Logout user
router.get('/logout', function (req, res) {
  req.session.destroy();
//   req.flash('success', 'Enter Your Login Credentials');
  res.redirect('/');
});


module.exports = router;
