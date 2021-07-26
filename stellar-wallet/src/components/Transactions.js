import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import AuthService from '../services/auth.service'
import '../stylesheets/page-content.css'

export default class Transactions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: AuthService.getCurrentUser()
    }
  }

  render() {
    const { currentUser } = this.state

    const accountDetails = (
      <>
        <Card id='alert'>
          <Card.Body>
            Work in progress…
          </Card.Body>
        </Card>
      </>

    )

    return (
      <div className='container'>
        <h3>
          <strong>Hi {currentUser.username}</strong> 👋🏼
          <br />
          On this page you can make your transactions:
        </h3>
        <br />
        <br />
        {accountDetails}
      </div>
    )
  }
}
