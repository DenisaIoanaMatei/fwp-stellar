import React, { Component } from 'react'
import { Table, Card, Button } from 'react-bootstrap'
import AuthService from '../services/auth.service'
import AccountService from '../services/accountService.stellar.js'
import '../stylesheets/page-content.css'

export default class Account extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentUser: AuthService.getCurrentUser()
    }
  }

  render () {
    const { currentUser } = this.state

    async function addExistingStellarAcoount (event) {
      // await AuthService.logout()
      window.location.reload()
    }

    async function createNewStellarAccount (event) {
      event.preventDefault()
      try {
        const res = await AccountService.createKeypair()
        console.log('SUCCESS! You have a new account :)\n', res)
      } catch (error) {
        console.error('ERROR!', console.error())
      }
    }

    const accountDetails = (
      (currentUser.accounts.length === 0)
        ? (
          <>
            <Card id='alert'>
              <Card.Body>
                You don't have any Stellar Account connected to your wallet, yet.
                There's the choice between:
              </Card.Body>
            </Card>
            <Button block size='lg' onClick={addExistingStellarAcoount} className='create-stellar-account-button'>
              Adding Stellar Account
            </Button>
            <p>or</p>
            <Button block size='lg' onClick={createNewStellarAccount} className='create-stellar-account-button'>
              Creating Stellar Account
            </Button>
          </>
          )
        : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan='2'>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
          )
    )

    return (
      <div className='container'>
        <h3>
          <strong>Hi {currentUser.username}</strong> 👋🏼
          <br />
          These are your account details:
        </h3>
        <br />
        <br />
        {accountDetails}
      </div>
    )
  }
}
