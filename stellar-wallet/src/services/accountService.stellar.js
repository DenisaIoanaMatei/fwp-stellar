const StellarSdk = require('stellar-sdk')
// const fetch = require('node-fetch')

// This is the test server
// StellarSdk.Network.useTestNetwork()

// And this is the productive server
// StellarSdk.Network.usePublicNetwork()

// Again…test server
// const server = new StellarSdk.Server('https://horizon-testnet.stellar.org')

// And productive server
// const server = new StellarSdk.Server('https://horizon.stellar.org')

// create a completely new and unique pair of keys
// see more about KeyPair objects: https://stellar.github.io/js-stellar-sdk/Keypair.html
const createKeypair = () => {
  const pair = StellarSdk.Keypair.random()
  const pubKey = pair.publicKey()
  const secKey = pair.secret()
  return {
    pub_key: pubKey,
    sec_key: secKey
  }
}

// the JS SDK uses promises for most actions, such as retrieving an account
// const account = await server.loadAccount(pair.publicKey());
// console.log("Balances for account: " + pair.publicKey());
// account.balances.forEach(function (balance) {
//   console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
// });

export default {
  createKeypair
}
