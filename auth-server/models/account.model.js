const mongoose = require('mongoose')

const Account = mongoose.model(
  'Account',
  new mongoose.Schema({
    pub_key: String,
    sec_key: String
  })
)

module.exports = Account
