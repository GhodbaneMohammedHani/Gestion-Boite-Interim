import React from 'react'
import '../styles/MonProfile.css'
import InputField from '../components/InputField'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef } from 'react';
import { client } from '../App';
import Button from '../components/Button';
export default function MonProfile() {
  const [profile,setProfile]=useState(null);
  const [specialiteProfile,setSpecialiteProfile]=useState('');
  const [bioProfile,setBioProfile]=useState('');
  const [errorNom,setErrorNom]=useState(null);
  const [errorBio,setErrorBio]=useState(null);
  const bioRef=useRef();
  const specialiteProfileRef=useRef();
  const {numEmploye,numProfile}=useParams();
  
    useEffect(()=>{
      client.get(`/profiles/${numProfile}?numEmploye=${numEmploye}`).then((res)=>{
        const profile=res.data.profile;        
        setProfile(profile);
        console.log(profile);
        setBioProfile(profile.bio_profile);
        bioRef.current.value=profile.bio_profile;
        client.get(`/profiles/specialites/${profile.num_specialite}`).then((res)=>{
          const specialite=res.data.specialite;
          specialiteProfileRef.current.value=specialite.nom_specialite;
        }).catch((e)=>{
          console.log(e);
        })
      }).catch((e)=>{
        console.log(e);
      })
    },[])
    const modifierProfile=async (e)=>{
      e.preventDefault();
      const profileModifier={specialiteProfile,bioProfile};
      try{
      const res=await client.patch(`/profiles/${numProfile}?numEmploye=${numEmploye}`,profileModifier);
       if(res.status===200){
        console.log('profile Modified');
        alert('profile modified');
       }
      }catch(e){
        console.log('failed to modify profile : '+e);
      }
    }
  return (
 <div className='MonProfile'>
  <div className='profile-pic'>
    <img src={'/images/blankprofile.png'} />
    <h1>{ profile && profile['Employe.nom_employe'] } {profile && profile['Employe.prenom_employe']}</h1>
  </div>
  <form className='modifier-profile'>
  <div className='info-personnel'>
  {
        profile && (
          <div className='titre-profile'>
          <p ><span className='bold'>Email:</span> {profile["Employe.email_employe"]}</p>
          <p><span className='bold'>Telephone:</span> {profile["Employe.telephone_employe"]}</p>
          </div>
        )
      }
  </div>
      <div className='name-container'>
        <InputField id='specialite-profile' reference={specialiteProfileRef}  label='Specialite Profile'  onChange={(e)=>setSpecialiteProfile(e)} />
      </div>
      <div className='description'>
      <h1>Bio</h1>
      <textarea id='bio-profile' ref={bioRef} onChange={(e)=>setBioProfile(e.target.value)}  rows='5' cols='30'  ></textarea>
      </div>
    <Button id='modifier-button' type='submit'  value='Modifier' onClick={modifierProfile} />
  </form>
    </div>
  )
}
