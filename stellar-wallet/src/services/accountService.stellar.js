import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api/data/'

const StellarSdk = require('stellar-sdk')
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org')
// const fetch = require('node-fetch')

// Again…test server

// And productive server
// const server = new StellarSdk.Server('https://horizon.stellar.org')

// create a completely new and unique pair of keys
// see more about KeyPair objects: https://stellar.github.io/js-stellar-sdk/Keypair.html

class AccountService {  
  saveKeypair = (email, pub_key, sec_key) => {
    return axios
      .post(API_URL + 'accounts', {
        email: email,
        pub_key: pub_key,
        sec_key: sec_key
      }, { headers: authHeader() })
      .then((response) => {
        return response
      })
      .catch((err) => {
        return (err.response)
      })
  }

  createKeypair = (email) => {
    const pair = StellarSdk.Keypair.random()
    const pubKey = pair.publicKey()
    const secKey = pair.secret()
    const account = { email: email, pub_key: pubKey, sec_key: secKey }
    return account
  }

  getKeypairByEmail = (email) => {
    return axios
      .get(API_URL + 'accounts', {
        email: email,
      }, { headers: authHeader() })
      .then((response) => {
        return response
      })
      .catch((err) => {
        return (err.response)
      })
  }

  getKeypairById = (accountId) => {
    return axios
      .get(API_URL + 'accounts', {
        accountId: accountId
      }, { headers: authHeader() })
      .then((response) => {
        return response
      })
      .catch((err) => {
        return (err.response)
      })
  }

  getBalance = (pub_key) => {
    return server.loadAccount(pub_key)
      .then((response) => {
        const res = [response.balances]
        return res
      })
      .catch((err) => {
        return (err)
      })
  }

  fundNewAccount = (pub_key) => {
    return axios
      .get(`https://friendbot.stellar.org?addr=${pub_key}`)
  }}

  export default new AccountService()
