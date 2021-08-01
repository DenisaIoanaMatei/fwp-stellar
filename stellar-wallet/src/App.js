import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from './logo.png'
import './App.css'

import AuthService from './services/auth.service'

import LoginAndSignupTabbedDisplay from './components/LoginAndSignupTabbedDisplay'
import Account from './components/Account'
import Logout from './components/Logout'
import Transactions from './components/Transactions'

class App extends Component {
  constructor (props) {
    super(props)
    this.logOut = this.logOut.bind(this)
    this.state = {
      currentUser: undefined
    }
  }

  componentDidMount () {
    const user = AuthService.getCurrentUser()

    if (user) {
      this.setState({
        currentUser: user
      })
    }
  }

  logOut () {
    AuthService.logout()
  }

  render () {
    const { currentUser } = this.state
    return (
      <div className='App'>
        <div className='App-header'>
          {currentUser
            ? (
              <Navbar fixed='top'>
                <Nav className='navbar-nav'>
                  <Nav.Link href='account'>Accounts</Nav.Link>
                  <Nav.Link href='transactions'>Transactions</Nav.Link>
                </Nav>
                <div>
                  <Logout />
                </div>
              </Navbar>
              )
            : (
              <div>
                <img src={logo} className='App-logo' alt='logo' />
                <h1>Welcome to the Social Stellar Wallet</h1>
              </div>
              )}
        </div>

        <body className='App-body'>
          <Switch>
            <Route exact path={['/']} component={LoginAndSignupTabbedDisplay} />
            <Redirect from='/login' to='/' />
            <Route exact path='/account' component={Account} />
            <Route exact path='/transactions' component={Transactions} />
          </Switch>
        </body>
      </div>
    )
  }
}

export default App
