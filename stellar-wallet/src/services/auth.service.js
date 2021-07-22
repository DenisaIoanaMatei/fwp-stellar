import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth/'

const signup = (username, email, password) => {
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

const login = (email, password) => {
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

const logout = () => {
  localStorage.removeItem('user')
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export default {
  signup,
  login,
  logout,
  getCurrentUser
}
