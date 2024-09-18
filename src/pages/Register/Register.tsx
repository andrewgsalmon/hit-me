import React from 'react'
import Head from '../../layout/Head';
import './Register.scss';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

function Register() {
  return (
    <>
      <Head title="Register" description="Register to discover new music your way with Hit Me!" canonical="/register" />
      <RegisterForm />
    </>
  )
}

export default Register