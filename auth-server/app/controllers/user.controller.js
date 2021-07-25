const db = require('../models')
const User = db.user
const Account = db.account

const bcrypt = require('bcryptjs')

exports.getAccounts = (req, res) => {
  if (req.body.accountId) {
    Account.findById(req.body.accountId).exec((err, acc) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }

      if (!acc) {
        return res.status(404).send({ message: 'Account Not found.' })
      }

      res.status(200).send({
        id: acc._id,
        pub_key: acc.pub_key,
        sec_key: acc.sub_key
      })
    })
  }

  Account.find({
    email: req.body.email
  })
    .exec((err, docs) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }

      if (!docs) {
        return res.status(404).send({ message: 'No Accounts found.' })
      }

      let result = docs.map(x => {
        accountId = x._id,
        pub_key = x.pub_key,
        sub_key = x.sec_key
      })
    })
}
  
exports.saveAccount = (req, res) => {
  const account = new Account({
    email: req.body.email,
    pub_key: req.body.pub_key,
    sec_key: req.body.sec_key,
  })

  account.save((err, acc) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    User.findOne({
      email: req.body.email
    })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }
  
        if (!user) {
          return res.status(404).send({ message: 'No User found. Could not update accounts[] for UserNo.' })
        }

        user.accounts.push({accountId: acc._id, pub_key: acc.pub_key})
        user.save()
      })

    res.send({ message: 'Account was saved and User updated successfully!', accountId: acc._id, pub_key: acc.pub_key })
  })
}
  