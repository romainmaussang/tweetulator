var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tweetulator' });
});

/* GET resultats page. */
router.get('/results', function(req, res, next) {

    res.render('results', { title: 'Tweetulator' });
});


module.exports = router;
