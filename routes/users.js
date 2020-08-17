'use strict'
const debug = require('debug')('uwallet:api:routes')
const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.send('connected')
})

router.get('/:id', (req,res) => {
    const { id } = req.params

    res.send(id)
})

module.exports = router