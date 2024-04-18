import React from 'react'
import Button from '../components/Button'
import '../styles/Demandes.css'
import { client } from '../App'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { faL } from '@fortawesome/free-solid-svg-icons'
export default function Demandes() {
  const {numEnterprise}=useParams();
  const [demandes,setDemandes]=useState([]);
  const [loadingDemandes,setLoadingDemandes]=useState(true);
  const navigate=useNavigate();
  const fetchDemandes=async()=>{
    try{
    const res=await client.get(`/demandes?numEnterprise=${numEnterprise}`);
    setDemandes(res.data.demandes);
    setLoadingDemandes(false);
    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    fetchDemandes();
  },[])
  return (
    <div className='demandes-container'>
      <div className='demandes-list'>
        { loadingDemandes?(<h1>Loading...</h1>):
        demandes.length==0?(<h1>Vous n'avez pas des demandes</h1>):
        demandes.map((demande)=>(
            <div className='demande'>
            <p><span className='bold'>Nom Candidat: </span>{demande['Profile.Employe.nom_employe']} {demande['Profile.Employe.prenom_employe']}</p>
            <p><span className='bold'>Position: </span>{demande['Profile.specialiteprofile.nom_specialite']}</p>
            <p><span className='bold'>Etat: </span>{demande['etat_demande']}</p>
            <Button   id='annuler-demande'  value='Annuler'  onClick={async()=>{
            const res=await client.delete(`/demandes/${demande['num_enterprise']}/${demande['num_profile']}`);
            if(res.status===200){
              fetchDemandes();
            }
            }}   />
          </div>
        ))}
      </div>
    </div>
  )
}
