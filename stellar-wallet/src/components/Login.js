import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AuthService from '../services/auth.service'
import { useHistory } from 'react-router-dom'
import '../stylesheets/login.css'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  function validateForm () {
    return email.length > 0 && email.includes('@') > 0 && password.length > 0
  }

  async function handleSubmit (event) {
    event.preventDefault()
    AuthService.login(email, password)
      .then(
        (res) => {
          history.push('/account')
          window.location.reload()
        }
      )
      .catch(
        (error) => {
          const resMessage = error.toString()
          setMessage(resMessage)
          alert(message)
        }
      )
  }

  return (
    <div className='Login'>
      <Form onSubmit={handleSubmit}>
        <Form.Group size='lg' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size='lg' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size='lg' type='submit' disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  )
}
