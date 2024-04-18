import React, { useState } from 'react'
import InputField from './components/InputField';
import Select from './components/Select';
import Button from './components/Button';
import { useEffect } from 'react';
import axios from 'axios';
import { client } from './App';
import { isRouteErrorResponse, useNavigate } from 'react-router-dom';
import MultiSelect from './components/MultiSelect';
import NavBar from './components/NavBar';
export default function SignUpEnterprise() {
  const [nomEnterprise,setNomEnterprise]=useState('');
  const [emailEnterprise,setEmailEnterprise]=useState('');
  const [rueEnterprise,setRueEnterprise]=useState('');
  const [wilayaEnterprise,setWilayaEnterprise]=useState('');
  const [telephoneEnterprise,setTelephone]=useState('');
  const [passwordEnterprise,setPasswordEnterprise]=useState('');
  const [confirmPasswordEnterprise,setConfirmPasswordEnterprise]=useState('');
  const [listWilaya,setListWilaya]=useState([]);
  const [listDomaine,setListDomaine]=useState([]);
  const [selectedDomaines,setSelectedDomaines]=useState([]);
  const [passwordError,setPasswordError]=useState(null);
  const [telephoneError,setTelephoneError]=useState(null);
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const infoEnterprise={
      nom:nomEnterprise,
      domaines:selectedDomaines,
      email:emailEnterprise,
      password:passwordEnterprise,
      confirmPassword:confirmPasswordEnterprise
    }
    console.log(infoEnterprise);
    try{
    const response= await client.post('/SignUpEnterprise',infoEnterprise);
    if(response.status==200){
    console.log('sign up success');
    navigate('/');
    }
    else{
    console.log('sign up failure');
    }
    }catch(e){
      const error=e.response.data;
      setPasswordError(error.password);
      setTelephoneError(error.telephone);
    }
  }
  useEffect(()=>{
    client.get('/wilayas').then((response)=>{
      console.log(response.data);
      setListWilaya(response.data);
    }).catch((e)=>console.log(e));
    client.get('/domaines')
    .then((response)=>{
      setListDomaine(response.data);
    }).catch((e)=>console.log(e));
  },[])
  const onSelectDomaine=(value)=>{
    const isSelected=selectedDomaines.includes(value);
    if(!isSelected){
      setSelectedDomaines([...selectedDomaines,value]);
    }
    else{
      setSelectedDomaines(selectedDomaines.filter((e)=>e!==value));
    }
  }
  return (
    <div>
      <NavBar/>
        <form className='sign-up-enterprise' >
          <h1>Cree Compte Enterprise :</h1>
          <InputField  id='nom-enterprise' label='Nom Enterprise'  placeholder='Nom Enterprise' type='text' onChange={(e)=>setNomEnterprise(e)} />
          <MultiSelect id='domaine-enterprise' label='Domaine Enterprise' options={listDomaine} placeholder='Choisir un Domaine' onSelect={onSelectDomaine}  />
          <InputField id='email-enterprise' label='Email Enterprise' placeholder='Email Enterprise'  type='email' onChange={(e)=>setEmailEnterprise(e)} />
          <InputField id='password-enterprise' label='Password' type='password' placeholder='Password Enterprise' error={passwordError}  onChange={(value)=>setPasswordEnterprise(value)} />
          <InputField id='confirm-password-enterprise' label='Confirm password' placeholder='Confirm Password' type='password' onChange={(value)=>setConfirmPasswordEnterprise(value)} />
          <Button id='inscrire-enterprise' type='submit' onClick={handleSubmit}   value="Inscrire"/>
        </form>
    </div>
  )
}
