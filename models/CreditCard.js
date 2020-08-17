const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CreditCardSchema = new Schema({
  cardNumber: String,
  limitPayDay: Number,
  creditLimit: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  expenses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Expenses'
    }
  ]
})

const CreditCardModel = mongoose.model('CreditCard', CreditCardSchema)
module.exports = CreditCardModel
