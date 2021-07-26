import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import AccountService from '../services/accountService.stellar.js'
import AuthService from '../services/auth.service'

export default function ContentCard (props) {
  const user = props.user
  const history = useHistory()
  const [ buttonPushed, setButtonPushed ] = useState(false)
  const [ newAccountAdded, setAccountAdded ] = useState(false)
  const [ accountId, setAccountId ] = useState()
  const [ publicKey, setPublicKey ] = useState()
  const [ secretKey, setSecretKey ] = useState()

  async function addExistingStellarAcount (event) {
    event.preventDefault()
    setButtonPushed(true)
    setAccountAdded(true)
    // const reqBody = {
    //   email: user.email,
    //   pub_key: pubKey,
    //   email: secKey,
    // }
    // const res = await AccountService.saveKeypair(reqBody)
    }
  

  async function fundNewStellarAccount (event) {
    event.preventDefault()
    AccountService.fundNewAccount(publicKey)
      .then(
        (result) => {
          console.log('SUCCESS')
          history.push('/account')
        }
      )
      .catch(
        (error) => {
          alert(error)
        }
      )
    }
  
  async function createNewStellarAccount (event) {
    event.preventDefault()
    setButtonPushed(true)
    let res
    try {
      res = await AccountService.createKeypair(user.email)
    } catch (error) {
      alert(error)
    }
    setSecretKey(res.sec_key)
    AccountService.saveKeypair(res.email, res.pub_key, res.sec_key)
      .then(
        (result) => {
          setAccountId(JSON.stringify(result.data.accountId).replaceAll('"', ''))
          setPublicKey(JSON.stringify(result.data.pub_key).replaceAll('"', ''))
          user['accounts'].push(
            {
              accountId: JSON.stringify(result.data.accountId).replaceAll('"', ''),
              pub_key: JSON.stringify(result.data.pub_key).replaceAll('"', '')
            })
          AuthService.updateCurrentUser(user)
        }
      )
      .catch(
        (error) => {
          alert(error)
        }
      )
  }

  const content = (
    (buttonPushed)
    ? (
      (newAccountAdded)
      ? (
        <div>Hier muss ein Container rein mit zwei Inputfeldern.</div>
        )
      : (
        <Card id='success'>
          <Card.Body>
            <Card.Title><b>🎉 Congratulations 🎉</b></Card.Title>
            <br/>
            <Card.Text>
              You've successfully created a new Account with the following data:
            </Card.Text>
            <br/>
            <b>Account Id: </b>
            <p>{accountId}</p>
            <b>Public Key: </b>
            <p>{publicKey}</p>
            <b>Secret Key: </b>
            <p>{secretKey}</p>
            <br/>
            <br/>
            <b id='info'>Please copy and save your Secret Key before you leave this page!</b>
            <br/>
            <b id='info'>In order to complete your account creation you have to fund your account.</b>
            <Button block size='lg' onClick={fundNewStellarAccount} className='create-stellar-account-button'>
              Fund Stellar Account with Friendbot
            </Button>
          </Card.Body>
         </Card>
        )
      )
    : (
      <>
        <Card id='alert'>
          <Card.Body>
             You don't have any Stellar Account connected to your wallet, yet.
             There's the choice between:
          </Card.Body>
         </Card>
         <Button block size='lg' onClick={addExistingStellarAcount} className='create-stellar-account-button'>
           Adding Stellar Account
         </Button>
         <p>or</p>
         <Button block size='lg' onClick={createNewStellarAccount} className='create-stellar-account-button'>
           Creating Stellar Account
         </Button>
       </>
      )

  )

  return (
    <div>{content}</div>
  )
}