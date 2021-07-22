import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useFormFields } from '../libs/hooksLib'
import AuthService from '../services/auth.service'
import '../stylesheets/signup.css'

export default function Signup () {
  const [fields, handleFieldChange] = useFormFields({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [newUser, setNewUser] = useState(true)
  const [message, setMessage] = useState('')

  function validateForm () {
    return (
      fields.email.length > 0 &&
      fields.email.includes('@') &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    )
  }

  async function handleSubmit (event) {
    event.preventDefault()

    AuthService.signup(fields.username, fields.email, fields.password)
      .then(
        (res) => {
          console.log(res.message)
          setNewUser(false)
          setMessage(res.message.toString())
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

  function renderSignupResult () {
    return (
      <div className='result'>
        {message}
        <br />
        <Link to='/login' className='App-link'>
          Go to Login.
        </Link>
      </div>
    )
  }

  function renderForm () {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='username' size='lg'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            value={fields.username}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId='email' size='lg'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type='email'
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId='password' size='lg'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId='confirmPassword' size='lg'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <Button
          block
          size='lg'
          type='submit'
          disabled={!validateForm()}
        >
          Signup
        </Button>
      </Form>
    )
  }

  return (
    <div className='Signup'>
      {newUser ? renderForm() : renderSignupResult()}
    </div>
  )
}
