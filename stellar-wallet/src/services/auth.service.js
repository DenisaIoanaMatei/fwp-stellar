import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth/'

class AuthService {
  signup = (username, email, password) => {
    return axios
      .post(API_URL + 'signup', {
        username,
        email,
        password
      })
      .then((response) => {
        return response
      })
      .catch((err) => {
        return(err.response)
      })
  }

  login = (email, password) => {
    return axios
      .post(API_URL + 'signin', {
        email: email,
        password: password
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        
        return response
      })
      .catch((err) => {
        return(err.response)
      })
  }

  logout = () => {
    localStorage.removeItem('user')
  }

  updateCurrentUser = (user) => {
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(user))
  }

  getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default new AuthService()
