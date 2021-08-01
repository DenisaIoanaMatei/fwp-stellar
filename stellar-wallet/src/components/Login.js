import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import AuthService from '../services/auth.service'
import { useHistory } from 'react-router-dom'
import '../stylesheets/login.css'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [statusCode, setStatusCode] = useState('')
  const [msg, setMsg] = useState('')
  const history = useHistory()

  function validateForm () {
    return email.length > 0 && email.includes('@') > 0 && password.length > 0
  }

  async function handleSubmit (event) {
    event.preventDefault()
    AuthService.login(email, password)
      .then(
        (res) => {
          if (res.status !== 200) {
            alert(res.data.message)
            window.location.reload()
          } else {
            history.push('/account')
            window.location.reload()
          }
        }
      )
      .catch(
        (error) => {
          alert(error)
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
