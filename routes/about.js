var express = require('express');
var router = express.Router();

/*Get About Page */
router.get('/', function(req, res, next){
    res.render('about', {title: 'About'});
  });

  module.exports = router;