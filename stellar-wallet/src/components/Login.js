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
            setShow(true)
            setStatusCode(res.status)
            setMsg(res.data.message)
          } else {
            history.push('/account')
            window.location.reload()
          }
        }
      )
      .catch(
        (error) => {
          setShow(true)
          setStatusCode(error.status)
          setMsg(error.data.message)
        }
      )
  }

  function VerticallyCenteredModal (props) {
    return (
      <Modal
        {...props}
        size='sm'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Modal.Title id='contained-modal-title-vcenter'>
            {statusCode}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{msg}</h4>
          <p>
            Please check again if you provided the correct email address
            and password.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
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
      <div>
        {show
          ? <VerticallyCenteredModal
              show={show}
              onHide={() => setShow(false)}
            />
          : <br />}
      </div>
    </div>
  )
}
