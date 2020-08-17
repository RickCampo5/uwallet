const router = require('express').Router()
const CreditCard = require('../models/CreditCard')

//Create 
router.post('/new', (req, res, next) => {
  req.body.user = req.user
  CreditCard.create(req.body)
    .then(creditCard => {
      return res.status(200).json(creditCard)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})

//Edit
router.put('/edit/:id', (req, res, next) => {
  CreditCard.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(creditCard => {
      return res.status(200).json(creditCard)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})

//Delete
router.delete('/delete/:id', (req, res, next) => {
  CreditCard.findByIdAndDelete(req.params.id)
    .then(creditCard => {
      return res.status(200).json(creditCard)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})

router.get('/userCreditCards', (req, res, next) => {
  const user = req.user
  CreditCard.find({user: user._id})
    .then(creditCards => {
      return res.status(200).json(creditCards)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})

module.exports = router