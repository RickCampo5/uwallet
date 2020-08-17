'use strict'
require('dotenv').config()

const http = require('http')
const chalk = require('chalk')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

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

app.use('/users', users)
