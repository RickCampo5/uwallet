'use strict'

const router = require('express').Router()
const Expenses = require('../models/Expenses')

//Create
router.post('/new/:id', (req, res, next) => {
  req.body.user = req.user
  req.body.card = req.params.id
  Expenses.create(req.body)
    .then(expense => {
      return res.status(200).json(expense)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})

//All user expenses
router.get('/userExpenses', (req, res, next) => {
  const user = req.user
  Expenses.find({ user: user._id })
    .then(expenses => {
      return res.status(200).json(expenses)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})

//All card Expenses
router.get('/cardExpenses/:id', (req, res, next) => {
  Expenses.find({ card: req.params.id })
    .then(expenses => {
      return res.status(200).json(expenses)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})

//Current Month Cards Expenses
router.get('/currentMonthExpenses/:id', (req, res, next) => {
  const date = new Date()
  const month = date.getMonth()
  const { id } = req.params
  Expenses.find({ card: id })
    .then(expenses => {

      const currentMonthExpenses = expenses.filter(expense => {
        const expenseMonth = expense.date.getMonth()
        if(expenseMonth === month) return expense
      })

      return res.status(200).json(currentMonthExpenses)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})

module.exports = router
