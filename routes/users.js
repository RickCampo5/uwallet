'use strict'
const debug = require('debug')('uwallet:api:routes')
const express = require('express')
const router = express.Router()

router.get('/cards', (req,res, next) => {
    res.json({
        message: 'Secure Route',
        user: req.user, 
        token: req.query.secret_token
    })
})

router.get('/:id', (req,res) => {
    const { id } = req.params

    res.send(id)
})

module.exports = router