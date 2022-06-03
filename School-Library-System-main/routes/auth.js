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
      res.redirect('/auth/admin')
      req.flash('error', 'Invalid credentials Please try again!')
    }
    else { // if login found
      //Assign session variables based on login credentials       
      req.flash('success', 'Welcome Admin!')         
      req.session.loggedin = true;
      req.session.tid = results[0].id,
      req.session.admin_ttl = results[0].admin_ttl;
      req.session.adm_fnm = results[0].adm_fnm;
      req.session.adm_lnm = results[0].adm_lnm;
      req.session.pos = results[0].pos;
      res.redirect('/admin');
      console.log(req.session.adm_fnm)
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
          req.session.stu_fnm = results[0].stu_fnm;
          req.session.stu_lnm = results[0].stu_lnm;
          res.redirect('/');
          console.log(req.session.tid)
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
