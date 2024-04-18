import React from 'react'
import Head from '../../layout/Head'
import './Login.scss'
import LoginForm from '../../components/LoginForm/LoginForm'

function Login({userToken}) {

  return (
    <>
      <Head title="Login"/>
      <LoginForm />
    </>
  )
}

export default Login