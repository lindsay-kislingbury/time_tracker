var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');



//Get Log In Page
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

//Display Sign In page
router.get('/signin', function(req,res,next){
  res.render('login/signin', {title: 'Sign In'})
});




//Get Student Register Page
router.get('/studentregister', function(req,res,next){
      //render to studentregister.ejs
      res.render('login/studentregister', {
        firstname: '',
        lastname: '',
        email: '',
        rccid: '',
        errors: ''

    })
});

// Add User
router.post('/studentregister', function(req, res, next) {    
  firstname = req.body.firstname;
  lastname = req.body.lastname;
  email = req.body.email;
  rccid = req.body.rccid;
  errors = false;

  //If form is empty
  if(firstname.length === 0 || lastname.length === 0|| email.length === 0) {
      errors = true;
      // set flash message
      req.flash('error', "Please complete all fields");
      // render flash message
      res.render('login/studentregister', {
          user_firstname: firstname,
          user_lastname: lastname,
          user_email: email,
      })
  }
  if(!errors) {
      //Set form data for new user
      var form_data = {
          user_firstname: firstname,
          user_lastname: lastname,
          user_email: email,
      }
      //Create new user
      dbConn.query('INSERT INTO users SET ?', form_data, function(err, result) {
        //if(err) throw err
        if (err) {
            req.flash('error', err)
        } else {                
            //Create new student
            //Set form data for new student
            var form_data2 = {
              rcc_id: rccid,
              student_user_id: result.insertId
            }
            dbConn.query('INSERT INTO students SET ?', form_data2, function(err, result) {
              //if(err) throw err
              if (err) {
                  req.flash('error', err)
                  //render to login/studentregister
                  res.render('./login/studentregister', {
                    user_rccid: rccid
                  })
              } else {                
                  req.flash('success', 'Data successfully added');
                  res.redirect('/login');
              }
          })
        }
    })
  }
})


//Display Professor Register Page
router.get('/profregister', function(req,res,next){
  //render to add.ejs
  res.render('login/profregister', {
    firstname: '',
    lastname: '',
    email: ''
  })
});











//Create 
router.post('/profregister', function(req,res,next){
let firstname = req.body.firstnamename;
let lastname = req.body.lastname;
let email = req.body.email;
let errors = false;
});


module.exports = router;