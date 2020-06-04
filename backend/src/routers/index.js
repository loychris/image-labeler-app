var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// can be deleted; just a test
router.get('/', (req, res, next) => {
  res.json({message: "Test api is working"})
})

module.exports = router;
