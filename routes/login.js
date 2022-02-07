var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');


/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

//Display sign in page
router.get('/signin', function(req,res,next){
  res.render('login/signin', {title: 'Sign In'})
});

//Display Student Register Page
router.get('/studentregister', function(req,res,next){
      //render to add.ejs
      res.render('login/studentregister', {
        firstname: '',
        lastname: '',
        rccid: '',
        email: ''
    })
});

//Update Student User Data
router.post('/studentregister', function(req,res,next){
  let firstname = req.body.firstnamename;
  let lastname = req.body.lastname;
  let rccid = req.body.rccid;
  let email = req.body.email;
  let errors = false;
});

//Display Professor Register Page
router.get('/profregister', function(req,res,next){
  //render to add.ejs
  res.render('login/profregister', {
    firstname: '',
    lastname: '',
    email: ''
})
});

//Update Professor User Data
router.post('/profregister', function(req,res,next){
let firstname = req.body.firstnamename;
let lastname = req.body.lastname;
let email = req.body.email;
let errors = false;
});


module.exports = router;