const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  debitCards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DebitCard'
    }
  ],
  creditCards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CreditCard'
    }
  ],
  cash: Number,
  expenses: Number,
  income: Number
},{
  timestamps: {
    createdAt: 'created_at',
    updateAt: 'uptadet_at'
  }
})

UserSchema.pre('save', async function(next) {
  const user = this
  const hash = await bcrypt.hash(user.password, 10)

  this.password = hash

  next()
})

UserSchema.methods.isValidPassword = async function(password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)

  return compare
}

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel
