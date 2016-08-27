// api.js - database queries api

var express = require('express')
var router = express.Router()
//
var check = require('../manager/check')
var access = require('../manager/access')

// GET
router.get('/ll', access.getLL)
router.get('/places', access.getPlaces)
router.get('/nextplaces', access.nextPlaces)

// POST

// CHECK
router.get('/auth', check.isAuthenticated)

module.exports = router
