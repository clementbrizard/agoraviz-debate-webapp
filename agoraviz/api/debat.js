const express = require('express')
    , router = express.Router()
    , Debat = require('../models/debat')

// Get all debates
router.get('/', (req, res) => {
    Debat.all(req.db, (err, debates) => {
        res.json(debates)
    })
})

module.exports = router
