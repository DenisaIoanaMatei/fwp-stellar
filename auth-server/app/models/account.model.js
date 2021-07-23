const mongoose = require('mongoose')

const Account = mongoose.model(
  'Account',
  new mongoose.Schema({
    accountId: String,
    email: String,
    pub_key: String,
    sec_key: String
  })
)

module.exports = Account
