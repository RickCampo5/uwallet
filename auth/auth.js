'use strict'

const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const UserModel = require('../models/User')

//MiddleWares
passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, name, done) => {
  try {
    const user = await UserModel.create({email, password, name})

    return done(null, user)
  } catch (error) {
    done(error)
  }
}))

password.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, name, done) => {
  try {
    const user = await UserModel.findOne({ email })
    if(!user) {
      return done(null, false, { message: 'User not found' })
    }

    const validate = await user.isValidPassword(password);
    if(!validate) {
      return done(null, false, { message: 'Wrong password' })
    }

    return done(null, user, { message: 'Logged in succesfully' })
  } catch (error) {
    done(error)
  }
}))
