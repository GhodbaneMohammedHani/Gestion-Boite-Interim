import React, { useEffect, useState } from 'react'
import InputField from '../components/InputField';
import Button from '../components/Button';
import { client } from '../App';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import Employe from './Employe';
import '../styles/CompteEmploye.css';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
export default function CompteEmploye() {
    const {numEmploye}=useParams();
    const [nomEmploye,setNomEmploye]=useState(null);
    const [prenomEmploye,setPrenomEmploye]=useState(null);
    const [emailEmploye,setEmailEmploye]=useState(null);
    const [passwordEmploye,setPasswordEmploye]=useState(null);
    const [telephoneEmploye,setTelephoneEmploye]=useState(null);
    const navigate=useNavigate();
    const nomRef=useRef();
    const prenomRef=useRef();
    const emailRef=useRef();
    const telephoneRef=useRef();
    const fetchEmploye=async()=>{
        try{
        const res=await client.get(`/employes/${numEmploye}`);
        const employe=res.data.employe;
        console.log(employe);
        setNomEmploye(employe.nom_employe);
        nomRef.current.value=employe.nom_employe;
        setPrenomEmploye(employe.prenom_employe);
        prenomRef.current.value=employe.prenom_employe;
        setEmailEmploye(employe.email_employe);
        emailRef.current.value=employe.email_employe;
        setTelephoneEmploye(employe.telephone_employe);
        telephoneRef.current.value=employe.telephone_employe;
        }catch(e){
            console.log(e);
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await client.patch(`/employes/${numEmploye}`,{
                nomEmploye,prenomEmploye,telephoneEmploye,emailEmploye
            });
            navigate(`/Employe/${numEmploye}`)
        }catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        fetchEmploye();
    },[]);
  return (
    <div>
        <NavBar />
    <div className='compte-employe'>
        <div className='info-employe'>
            <form>
            <h1>Modifier Compte</h1>
            <InputField id='nom-employe' label='Nom Employe' reference={nomRef} type='text' onChange={(value)=>setNomEmploye(value)} />
            <InputField id='prenom-employe' label='Prenom Employe' type='text' reference={prenomRef}  onChange={(value)=>setPrenomEmploye(value)} />
            <InputField id='email-employe' label='Email Employe' type='email' reference={emailRef}  onChange={(value)=>setEmailEmploye(value)}/>
            <InputField id='telephone-employe' label='Telephone Employe' type='text' reference={telephoneRef} onChange={(value)=>setTelephoneEmploye(value)} />
            <Button type='submit' id='modifier-compte' value='Modfier Compte' onClick={handleSubmit} />
            </form>
        </div>
    </div>
    </div>
  )
}
