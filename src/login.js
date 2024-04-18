import React, { useState } from 'react'
import InputField from './components/InputField'
import './styles/login.css'
import NavBar from './components/NavBar'
import Button from './components/Button'
import axios from 'axios'
import { Navigate,useNavigate } from 'react-router-dom'
import { client } from './App'
import { Link, useActionData } from 'react-router-dom'
import { useLogin } from './hooks/useLogin'
export default function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loginError,setLoginError]=useState('');
  const {login}=useLogin();
  const navigate=useNavigate();
  const handleLogin=async (e)=>{
    e.preventDefault();
    login(email,password).catch((e)=>{
      setLoginError(e.response.data.message);
    })
  }
  return (
    <div>
        <NavBar/>
      <form className='login-container'>
        <h1 className='connecter-compte' >Connectez-vous a votre compte</h1>
        <InputField label="Email" placeholder='Email'   id='email' type='email' error={loginError}   onChange={(value)=>setEmail(value)} />
        <InputField label='Password' placeholder='Password' id='password' type='password' onChange={(value)=>setPassword(value)} />
        <Button value='Login' id="Login" onClick={handleLogin} />
      </form>
      {/*
      <p>vous n'avez pas un compte ? </p>
      <div className='sign-ups'>
        <Link to='SignUpEmploye' className='link-style' ><Button value='Inscrire pour Employe' id='inscrire-emp' /></Link>
        <Link to='SignUpEnterprise' className='link-style'><Button value='Inscrire pour Enterprises' id='inscrire-en'></Button></Link>
      </div>
  */}
    </div>
  )
}

