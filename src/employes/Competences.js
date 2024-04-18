import React from 'react'
import '../styles/Competences.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { client } from '../App'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
export default function Competences(){
  const [listCompetence,setListCompetence]=useState([]);
  const navigate=useNavigate();
  const {numProfile,numEmploye}=useParams();
  const getCompetence=async(numCompetence)=>{
    try{
   const res=await client.get(`/competences/${numCompetence}`)
   const competence=res.data.competence;
   return competence;
    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
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
      })
    }).catch((e)=>{
      console.log(e);
    })
  },[]);
  return (
    <div className='container'>
        <h1>Competences et Developement</h1>
        <h3>Competences Actuelle</h3>
        {
          // 
          listCompetence.length==0?(<p>Vous n'avez pas des competences actuellment</p>):
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
        <h3>Ajouter un nouvelle competence</h3>
        <div className='ajouter-competence'>
        <Link to='Ajouter-Competence'><button><FontAwesomeIcon icon={faPlus} /> Ajouter un nouveau Competence</button></Link>
        </div>
    </div>
  )
}
