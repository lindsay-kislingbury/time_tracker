var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');



//Get Register Home Page
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});


//Get Student Register Page
router.get('/studentregister', function(req,res,next){
      //render to studentregister.ejs
      res.render('register/studentregister', {
        firstname: '',
        lastname: '',
        rccid: '',
        email: '',
        password: '',
        errors: ''
    })
});


//funtion to add student
function addstudent(rccid, result, req, res, next) {
  //Set form data for new student
  var form_data2 = {
    rcc_id: rccid,
    student_user_id: result.insertId
  }
  dbConn.query('INSERT INTO students SET ?', form_data2, function(err, result) {
    //if(err) throw err
    if (err) {
        req.flash('error', err)
        //render to register/studentregister
        res.render('./register/studentregister', {
          user_rccid: rccid
        })
    } else {                
        req.flash('success', 'Data successfully added');
        res.redirect('/register');
    }
  })
} 

//function to add professor
function addprof(result, req, res, next) {
  //Set form data for new professor
  var form_data2 = {
    teacher_user_id: result.insertId
  }
  dbConn.query('INSERT INTO teachers SET ?', form_data2, function(err, result) {
    //if(err) throw err
    if (err) {
        req.flash('error', err)
    } else {                
        req.flash('success', 'Data successfully added');
        res.redirect('/register');
    }
  })
} 

// Add User
router.post('/studentregister', function(req, res, next) {    
  firstname = req.body.firstname;
  lastname = req.body.lastname;
  rccid = req.body.rccid; 
  email = req.body.email;
  password = req.body.password;
  errors = false;

  //If form is empty
  if(firstname.length === 0 || lastname.length === 0|| email.length === 0) {
      errors = true;
      // set flash message
      req.flash('error', "Please complete all fields");
      // render flash message
      res.render('register/studentregister', {
          user_firstname: firstname,
          user_lastname: lastname,
          user_email: email,
          user_password: password
      })
  }
  if(!errors) {
      //Set form data for new user
      var form_data = {
          user_firstname: firstname,
          user_lastname: lastname,
          user_email: email,
          user_password: password
      }
      //Create new user
      dbConn.query('INSERT INTO users SET ?', form_data, function(err, result) {
        //if(err) throw err
        if (err) {
            req.flash('error', err)
        } else {                
            //Create new student
            addstudent(rccid, result, req, res, next);
        }
    })
  }
})


// Add Prof
router.post('/profregister', function(req, res, next) {    
  firstname = req.body.firstname;
  lastname = req.body.lastname;
  rccid = req.body.rccid;  
  email = req.body.email;
  password = req.body.password;
  errors = false;

  //If form is empty
  if(firstname.length === 0 || lastname.length === 0|| email.length === 0) {
      errors = true;
      // set flash message
      req.flash('error', "Please complete all fields");
      // render flash message
      res.render('register/studentregister', {
          user_firstname: firstname,
          user_lastname: lastname,
          user_email: email,
          user_password: password
      })
  }
  if(!errors) {
      //Set form data for new user
      var form_data = {
          user_firstname: firstname,
          user_lastname: lastname,
          user_email: email,
          user_password: password
      }
      //Create new user
      dbConn.query('INSERT INTO users SET ?', form_data, function(err, result) {
        //if(err) throw err
        if (err) {
            req.flash('error', err)
        } else {                
            //Create new professor
            addprof(result, req, res, next);
        }
    })
  }
})

//Display Professor Register Page
router.get('/profregister', function(req,res,next){
  //render to add.ejs
  res.render('register/profregister', {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  })
});

module.exports = router;