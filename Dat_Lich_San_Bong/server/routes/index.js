var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Start',{ title: 'Home Page', message: 'Welcome to the Home Page!' });
});

module.exports = router;