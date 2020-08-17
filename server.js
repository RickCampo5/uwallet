'use strict'
require('dotenv').config()

const http = require('http')
const chalk = require('chalk')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const debug = require('debug')('uwallet:api')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

mongoose.connect(`${process.env.DB}`, {useNewUrlParser: true})
	.then(() => {
			console.log('Connected to Mongo!')
	}).catch(err => {
			console.error('Error connecting to mongo', err)
	})

server.listen(port, () => {
    console.log(`${chalk.green('[uwallet-api]')} server listening on port ${port}`)
} )

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
const users = require('./routes/users')
const auth = require('./routes/auth')

app.use('/users', users)
app.use('/auth', auth)

//Error Handler
app.user((error, req, res, next) => {
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
