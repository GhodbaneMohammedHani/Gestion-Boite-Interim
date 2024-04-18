import React, { useEffect, useState } from 'react'
import { client } from '../App'
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
export default function Recruitements() {
  const [demandes,setDemandes]=useState([]);
  const [loadingDemandes,setLoadingDemandes]=useState(true);
  const navigate=useNavigate();
  const fetchDemandes=async()=>{
    try{
    const res=await client.get(`/demandes`);
    const demandesResult=res.data.demandes.filter((demande)=>demande.etat_demande==='en attente')
    setDemandes(demandesResult);
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
        <h1>Recruitements</h1>
        { loadingDemandes?(<h1>Loading...</h1>):
        demandes.length==0?(<h1>Vous n'avez pas des demandes</h1>):
        demandes.map((demande)=>(
            <div className='demande'>
            <p><span className='bold'>Enterprise: </span>{demande['Enterprise.nom_enterprise']}</p> 
            <p><span className='bold'>Nom Candidat: </span>{demande['Profile.Employe.nom_employe']} {demande['Profile.Employe.prenom_employe']}</p>
            <p><span className='bold'>Position: </span>{demande['Profile.specialiteprofile.nom_specialite']}</p>
            <div className='buttons'>
            <Button id='accepter-demande' value='Accept' onClick={async()=>{
              const numEnterprise=demande['num_enterprise'];
              const numProfile=demande['num_profile'];
               try{
                const res=await client.patch(`/demandes/${numEnterprise}/${numProfile}?etatDemande=Accepte`);
                fetchDemandes();
              }catch(e){
                console.log(e);
              }
            }}  />
            <Button id='refuser-demande'  value='Refuser'  onClick={async()=>{
              const numEnterprise=demande['num_enterprise'];
              const numProfile=demande['num_profile'];
             try{
              const res=await client.patch(`/demandes/${numEnterprise}/${numProfile}?etatDemande=Refuse`);
              fetchDemandes();
            }catch(e){
              console.log(e);
            }
            }}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
