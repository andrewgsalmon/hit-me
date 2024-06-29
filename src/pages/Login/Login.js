import React from 'react'
import Head from '../../layout/Head'
import './Login.scss'
import LoginForm from '../../components/LoginForm/LoginForm'

function Login() {

  return (
    <>
      <Head title="Login" description="Login to discover amazing new music with Hit Me!" canonical="/login"/>
      <LoginForm />
    </>
  )
}

export default Login