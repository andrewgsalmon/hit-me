import React from 'react'
import './Login.scss'
import LoginForm from '../../components/LoginForm/LoginForm'

function Login({userToken}) {

  // if (userToken) {
  //   window.location.href = './home'
  // }

  return (
    <>
      <LoginForm />
    </>
  )
}

export default Login