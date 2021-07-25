import React from 'react'
import AuthService from '../services/auth.service'
import ContentTable from './ContentTable'
import ContentCard from './ContentCard'
import '../stylesheets/page-content.css'

export default function Account () {
  const currentUser = AuthService.getCurrentUser()
  // remove hack just for testing

  const accountDetails = (
    (currentUser.accounts.length === 0)
      ? (
        <ContentCard user={currentUser}/>
        )
      : (
        <ContentTable user={currentUser}/>
        )
  )

  return (
    <div className='container'>
      <div id='welcome'>
        <h3>
          <strong>Hi {currentUser.username}</strong> 👋🏼
          <br />
          These are your account details:
        </h3>
      </div>
      <br />
      <br />
      {accountDetails}
    </div>
  )
}
