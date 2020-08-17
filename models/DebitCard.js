const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DebitCardSchema = new Schema({
  cardNumber: String,
  balance: Number,
  expenses: {
    type: Schema.Types.ObjectId,
    ref: 'Expenses'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const DebitCardModel = mongoose.model('DebitCard', DebitCardSchema) 

module.exports = DebitCardModel
