const { checkForAccounts } = require('../middlewares')
const { authJwt } = require("../middlewares")
const controller = require('../controllers/user.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.post('/api/data/accounts', [authJwt.verifyToken ], controller.saveAccount)
  
  app.get('/api/data/accounts', [authJwt.verifyToken, checkForAccounts.checkForExistingAccounts], controller.getAccounts)
}
