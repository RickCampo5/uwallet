'use strict'
require('dotenv').config()
require('./auth/auth');

const http = require('http')
const chalk = require('chalk')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const debug = require('debug')('uwallet:api')
const passport = require('passport')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

//Connect DB
mongoose.connect(`${process.env.DB}`, {useNewUrlParser: true})
	.then(() => {
			console.log('Connected to Mongo!')
	}).catch(err => {
			console.error('Error connecting to mongo', err)
	})

//Cors
app.use(require('cors')({
  origin: true,
  credentials: true
}))

//Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

//Routes
const auth = require('./routes/auth')
const users = require('./routes/users')
const creditCards = require('./routes/creditCards')
const expenses = require('./routes/expenses')

app.use('/auth', auth)
app.use('/users', passport.authenticate('jwt', { session : false }), users)
app.use('/creditCards', passport.authenticate('jwt', { session : false }), creditCards)
app.use('/expenses', passport.authenticate('jwt', { session : false }), expenses)

//Error Handler
app.use((error, req, res, next) => {
	debug(`Error: ${error.message}`)

	res.status(500)
})

function handleFatalError (err) {
	console.error(`${chalk.red('[fatal error]')} ${err.message}`)
	console.error(err.stack)
	process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

//Run server
server.listen(port, () => {
	console.log(`${chalk.green('[uwallet-api]')} server listening on port ${port}`)
} )