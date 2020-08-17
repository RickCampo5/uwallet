'use strict'
const debug = require('debug')('uwallet:api:routes')
const express = require('express')
const router = express.Router()
const UserModel = require('../models/User')

// router.get('/cards', (req,res, next) => {
// 	res.json({
// 		message: 'Secure Route',
// 		user: req.user, 
// 		token: req.query.secret_token
// 	})
// })

//Update user
router.put('/update', (req, res, next) => {
	const user = req.user
	UserModel.findByIdAndUpdate(user._id, req.body, { new: true })
		.then(user => {
			return res.status(202).json(user)
		})
		.catch(err => {
			return res.status(404).json(err)
		})
})

module.exports = router