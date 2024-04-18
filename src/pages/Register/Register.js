import React from 'react'
import Head from '../../layout/Head';
import './Register.scss';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

function Register() {
  return (
    <>
      <Head title="Register" />
      <RegisterForm />
    </>
  )
}

export default Register