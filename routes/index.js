var express = require('express');
var router = express.Router();
//
var googleData = require('../config/auth').googleData

// Get Home Page
router.get('/', function(req, res, next) {
  res.render('index', { key: googleData.mapAPIKey });
});

module.exports = router;
