var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');

//Get Log In Home Page
router.get('/', function(req, res, next) {
    res.render('login', { 
      title: 'Log In',
      email: '', 
      errors: ''
    })
  });

//Authenticate
router.post('/auth', function(res, req, next){
  email = req.body.email;
  errors = false;
  
  //Check if form is empty
  if(email === 0){
    errors = true;
    req.flash('error', "Please complete all fields");
  }
  if(!errors){
    dbConn.query('SELECT * FROM users WHERE user_email = ?', email, function(err, data, fields){
      if(err) throw err
      if(data.length>0){
        console.log('success');
        req.session.loggedinUser = true;
        req.session.email = email;
        res.redirect('/dashboard');
      }
      else{
        console.log('error');
        res.render('/login', {altertMsg: 'Incorrect Email!'});
      }
    })
  }
})

module.exports = router;