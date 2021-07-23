const db = require('../models')
const Account = db.account

const checkForExistingAccounts = (req, res, next) => {
  Account.find({
    email: req.body.email
  }).exec((err, accounts) => {
    if (err) {
      return res.status(500).send({ message: err })
    }

    if (!accounts) {
      return res.status(404).send({ message: 'No Account(s) found for User.' })
    }

    next()
  })
}

const checkForAccounts = {
  checkForExistingAccounts: checkForExistingAccounts
}

module.exports = checkForAccounts
