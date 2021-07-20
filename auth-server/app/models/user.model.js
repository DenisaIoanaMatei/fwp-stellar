const mongoose = require('mongoose')

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    accounts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
      }
    ]
  })
)

module.exports = User
