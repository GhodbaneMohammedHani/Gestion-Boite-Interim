import React from 'react'
import './components/InputField'
import { useState } from 'react'
import InputField from './components/InputField'
import NavBar from './components/NavBar'
import './styles/Form.css'
import Button from './components/Button'
import axios from 'axios'
import { client } from './App'
import { useNavigate} from 'react-router-dom'
export default function SignUpEmploye() {
  const [nom,setNom]=useState("");
  const [prenom,setPrenom]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [passwordError,setPasswordError]=useState(null);
  const [numTelError,setNumTelError]=useState(null);
  const [numTel,setNumTel]=useState('');
  const navigate=useNavigate();
  function handleSubmit(e){
    e.preventDefault();
    const info={
      nom:nom,
      prenom:prenom,
      email:email,
      password:password,
      confirmPassword:confirmPassword,
      numTel:numTel
    };
    client.post("/SignUpEmploye",info).then((res)=>{
      console.log('redirected');
      navigate('/');
    }).catch((e)=>{
      console.log('error');
      const error=e.response.data;
    setPasswordError(error.password);
    setNumTelError(error.numTel);
    })
  }
  return (
    <div>
      <NavBar/>
      <form className='sign-up-employe' onSubmit={handleSubmit}>
      <h1 className='cree-compte'>Cree Compte</h1>
        <InputField id='nom-employe' type='text' placeholder='Nom Employe' label='Nom' onChange={(value)=>setNom(value)}  />
        <InputField id='prenom-employe' type='text' label='Prenom' placeholder='Prenom' onChange={(value)=>setPrenom(value)}  />
        <InputField id='email-employe' type='email' label='Email' placeholder='Email'  onChange={(value)=>setEmail(value)}/>
        <InputField id='numero-employe' type='text' error={numTelError}  placeholder='Numero Telephone'   label='Numero Telephone' onChange={(value)=>setNumTel(value)}/>
        <InputField id='password-employe' type='password' placeholder='Password' label='Password' onChange={(value)=>setPassword(value)}/>
        <InputField id='confirm-password' type='password'  placeholder='Confirm Password' label='Confirm Password' error={passwordError}   onChange={(value)=>setConfirmPassword(value)} />
        <Button type='submit' id='signUpEmploye' onClick={handleSubmit} value='Inscrire'/>
      </form>
    </div>
  )
}
