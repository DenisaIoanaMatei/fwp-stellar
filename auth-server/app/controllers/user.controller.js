const db = require('../models')
const User = db.user
const Account = db.account

const bcrypt = require('bcryptjs')

exports.updateAccount = (req, res) => {
  Account.findOne({
    email: req.body.email
  })
    .exec((err, acc) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }

      if (!acc) {
        const account = new Account({
          email: req.body.email,
          pub_key: req.body.pub_key,
          sec_key: bcrypt.hashSync(req.body.sec_key, 8)
        })

        account.save((err, user) => {
          if (err) {
            res.status(500).send({ message: err })
            return
          }

          res.send({ message: 'Account was added successfully!' })
        })
      }
    })
}
