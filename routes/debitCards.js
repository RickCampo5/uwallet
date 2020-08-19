'use strict'

const router = require('express').Router()
const DebitCards = require('../models/DebitCard')

router.get('userDebitCards', (req, res, next) => {
  const user = req.user
  DebitCards.find({ _id: user._id })
    .then(debitcards => {
      return res.status(200).json(debitcards)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})

//Create
router.post('/new', (req, res, next) => {
  req.body.user = req.user
  DebitCards.create(req.body)
    .then(debitCards => {
      return res.status(200).json(debitCards)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})

//Edit
router.put('/edit/:id', (req, res, next) => {
  DebitCards.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(debitCard => {
      return res.status(200).json(debitCard)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})

//Delete
router.delete('/delete/:id', (req, res, next) => {
  DebitCards.findByIdAndDelete(req.params.id)
    .then(debitCard => {
      return res.status(200).json(debitCard)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})

module.exports = router