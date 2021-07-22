import React, { Component } from 'react'
import { TabContainer, Tabs, Tab } from 'react-bootstrap'
import Login from './Login'
import Signup from './Signup'
import '../stylesheets/loginAndSignupTabbedDisplay.css'

class LoginAndSignupTabbedDisplay extends Component {
  render () {
    return (
      <div className='tab-container'>
        <TabContainer>
          <Tabs defaultActiveKey='login' id='login-signup-tab'>
            <Tab eventKey='login' title='Login' href='#login'>
              <Login />
            </Tab>
            <Tab eventKey='signup' title='Signup' href='#signup'>
              <Signup />
            </Tab>
          </Tabs>
        </TabContainer>
      </div>
    )
  }
}

export default LoginAndSignupTabbedDisplay
