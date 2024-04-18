import React from 'react'
import '../styles/DetailsProfile.css'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../App'
export default function DetailsProfile() {
  const {numProfile,numEnterprise}=useParams();
  const navigate=useNavigate();
  const [profile,setProfile]=useState(null);
  const [listCompetence,setListCompetence]=useState([]);
  const [loadCompetence,setLoadCompetence]=useState(true);
  const getCompetence=async(numCompetence)=>{
    try{
   const res=await client.get(`/competences/${numCompetence}`)
   const competence=res.data.competence;
   return competence;
    }catch(e){
      console.log(e);
    }
  }
  const fetchProfile=async()=>{
    try{
    const res=await client.get(`/profiles/${numProfile}`);
    setProfile(res.data.profile);
    }catch(e){
      console.log(e);
    }
  }
  const ajouterDemande=async()=>{
    try{
    const res=await client.post('/demandes',{numEnterprise,numProfile});
    console.log(res.data);
    console.log('added demande');
    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    fetchProfile();
    client.get(`/profiles/${numProfile}/profilecompetences`).then((res)=>{
      let promises=[];
      res.data.profileCompetences.map((profileCompetence)=>{
        promises.push(getCompetence(profileCompetence.num_competence));
      });
      Promise.allSettled(promises).then((results)=>{
        let competences=[];
        results.filter((e)=>e.status==='fulfilled').map((e)=>{
          competences.push(e.value);
        });
        setListCompetence(competences);
        setLoadCompetence(false);
      })
    }).catch((e)=>{
      console.log(e);
    })
  },[]);
  return (
    <div className='details-profile'>
      {!profile && <h1>Loading...</h1>}
      {profile && (
        <div className='profile-pic' >
        <img src='/images/blankprofile.png'  />
        <h1>{profile['Employe.nom_employe']} {profile['Employe.prenom_employe']}</h1>
      </div>
      )}
      {profile && (
         <div className='titre-profile'>
         <p ><span className='bold'>Email: </span>{profile['Employe.email_employe']}</p>
         <p><span className='bold'>Telephone: </span>{profile['Employe.telephone_employe']}</p>
         <p><span className='bold'>Specialite: </span>{profile['specialiteprofile.nom_specialite']}</p>
         </div>)
         }
      <h1>Competences</h1>
      <div className='list-competences'>
      {
        loadCompetence? (<div className='Loading'>Loading...</div>):
          listCompetence.length==0?(<p>Aucun Comptence</p>):
          (
            <div className='list-competences'>
              {
                listCompetence.map((competence)=>(<div className='competence' onClick={()=>{
                  navigate(`${competence.num_competence}`)
                }}   >{competence.nom_competence}</div>))
              }
            </div>
          )
        }
      </div>
      <div className='employer-container'>
      <Button id='employer' value='Employer' onClick={()=>{
          ajouterDemande();
          navigate(`/Enterprise/${numEnterprise}/demandes`);
        }}   />
      </div>
    </div>
  )
}
