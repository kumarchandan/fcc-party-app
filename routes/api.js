// api.js - database queries api

var express = require('express')
var router = express.Router()
//
var query = require('../manager/query')
var update = require('../manager/update')
var check = require('../manager/check')

// GET

// POST

// CHECK
router.get('/auth', check.isAuthenticated)

module.exports = router
