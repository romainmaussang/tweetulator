var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tweetulator' });
});

/* GET stats page. */
router.get('/stats', function(req, res, next) {
    res.render('stats', { title: 'Tweetulator' });
});

module.exports = router;
