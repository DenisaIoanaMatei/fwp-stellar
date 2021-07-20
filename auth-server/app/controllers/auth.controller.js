const config = require('../configs/auth.config')
const db = require('../models')
const User = db.user
// const Account = db.account

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    res.send({ message: 'User was registered successfully!' })
  })
}

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }

      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!'
        })
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      })

      // hier muss wahrscheinlich das mit den Accounts rein
      // mal testen
      const accountsForAuthenticatedUser = []

      for (let i = 0; i < user.accounts.length; i++) {
        accountsForAuthenticatedUser.push('Account_' + user.accounts[i].pub_key.toUpperCase())
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accounts: accountsForAuthenticatedUser,
        accessToken: token
      })
    })
}