// api.js - database queries api

var express = require('express')
var router = express.Router()
//
var check = require('../manager/check')
var access = require('../manager/access')
var query = require('../manager/query')
var udpate = require('../manager/update')

// GET
router.get('/ll', access.getLL)
router.get('/places', access.getPlaces)
router.get('/nextplaces', access.nextPlaces)
router.get('/storedsearch', query.getStoredSearch)
router.post('/rsvp', udpate.doRSVP)

// POST

// CHECK
router.get('/auth', check.isAuthenticated)

module.exports = router
