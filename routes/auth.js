'use strict'
const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
  res.json({
    message: 'Sign up successful',
    user: req.user
  })
})

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error ('An error ocurred')
        return next(error)
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)
        const body = { _id: user.id, email: user.email }
        const token = jwt.sign({ user: body }, 'top_secret')

        return res.json({ token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})

module.exports = router
