import React, { useEffect, useState } from 'react'
import InputField from '../components/InputField';
import Select from '../components/Select';
import NavBar from '../components/NavBar';
import { client } from '../App';
import { useNavigate } from 'react-router-dom';
import '../styles/AjouterProfile.css';
import {jwtDecode} from 'jwt-decode';
import Button from '../components/Button';
import { getUser } from '../getUser';
export default function AjouterProfile() {
    const [specialiteProfile,setSpecialiteProfile]=useState('');
    const [bioProfile,setBioProfile]=useState('');
    const [listSpecialites,setListSpecialites]=useState([]);
    const [nouveauSpecialite,setNouveauSpecialite]=useState('');
    const [errorNom,setErrorNom]=useState(null);
    const [errorBio,setErrorBio]=useState(null);
    const navigate=useNavigate();
    useEffect(()=>{
      client.get(`/profiles/specialites`).then((res)=>{
        setListSpecialites(res.data.specialites);
      }).catch((e)=>{
        console.log(e);
      })
    },[])
   async function onSubmit(e){
      e.preventDefault();
      let profileInfo;
      try{
        const {id,role}=getUser();
        if(specialiteProfile=='0'){
        const res=await client.post('/profiles/specialites',{nouveauSpecialite});
        profileInfo={
          specialiteProfile:res.data.nom_specialite,bioProfile:bioProfile,num_employe:id
        };
        }
        else{
        profileInfo={
          specialiteProfile:specialiteProfile,bioProfile:bioProfile,num_employe:id
        };
      }
      const response=await client.post('/profiles',profileInfo);
        navigate(`/Employe/${id}`);
      }catch(e){
        console.log(e);
      }
    }
  return (
    <div>
      <NavBar />
      <form className='ajouter-profile'>
      <h1>Ajouter Profile</h1>
      { 
      <Select id='specialite-profile' placeholder='Choisir un specialite'  label='Specialite Profile' ajouter={'Specialite'}  onChange={(value)=>{
      setSpecialiteProfile(value)} 
    } options={listSpecialites} />
      }
      { 
      specialiteProfile=='0' && <InputField id='nouveau-specialite' error={errorNom}  label='Nouveau Specialite'  placeholder='Nouveau Specialite' onChange={(value)=>setNouveauSpecialite(value)} />
      }
        <label htmlFor='bio-profile'>Bio Profile {errorBio && (<span className='error'>{errorBio}</span>)} </label>
        <textarea id='bio-profile' onChange={(e)=>setBioProfile(e.target.value)}  rows='5' cols='30' placeholder='Entrer bio' ></textarea>
        <Button id='ajouter-profile' onClick={onSubmit} type='submit' value='Ajouter' />
      </form>
    </div>
  )
}
