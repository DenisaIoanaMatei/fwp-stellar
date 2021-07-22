import React from 'react'
import { Button } from 'react-bootstrap'
import AuthService from '../services/auth.service'
import { useHistory } from 'react-router-dom'
import '../stylesheets/logout.css'

export default function Logout () {
  const history = useHistory()

  async function handleClick (event) {
    await AuthService.logout()
    history.push('/login')
    window.location.reload()
  }

  return (
    <Button block size='lg' onClick={handleClick} className='logout-button'>
      Logout
    </Button>
  )
}
