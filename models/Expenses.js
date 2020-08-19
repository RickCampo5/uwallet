const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExpensesSchema = new Schema({
  name: String,
  amount: Number,
  expenseType: String,
  date: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  card: {
    type: Schema.Types.ObjectId,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    enum: ['CreditCard', 'DebitCard']
  },
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const ExpensesModel = mongoose.model('Expenses', ExpensesSchema)

module.exports = ExpensesModel
