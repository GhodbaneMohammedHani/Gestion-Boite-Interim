import React from 'react'
import { useState } from 'react';
import InputField from '../components/InputField'
import Select from '../components/Select';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../App';
import Button from '../components/Button';
import TextArea from '../components/TextArea';
export default function AjouterCompetence() { 
    const [listCompetence,setListCompetence]=useState([]);
    const [listTypeMoyens,setListTypeMoyens]=useState([{
      numero:1,
      nom:'Video'
    },{
      numero:2,
      nom:'Livre'
    },
    {
      numero:3,
      nom:'Formation En ligne'
    }
  ]);
    const [nouveauCompetence,setNouveauCompetence]=useState('');
    const [descriptionCompetence,setDescriptionCompetence]=useState('');
    const [competence,setCompetence]=useState(null);
    const [typeMoyen,setTypeMoyen]=useState(null);
    const [titreLivre,setTitreLivre]=useState('');
    const [auteurLivre,setAuteurLivre]=useState('');
    const [titreVideo,setTitreVideo]=useState('');
    const [lienVideo,setLienVideo]=useState('');
    const [titreFormation,setTitreFormation]=useState('');
    const [plateformeFormation,setPlatformeFormation]=useState('');
    const navigate=useNavigate();
    const {numEmploye,numProfile}=useParams();
    useEffect(()=>{
      const fetchCompetences=async()=>{
        try{
          const response=await client.get('/competences');
          console.log(response.data.competences);
          setListCompetence(response.data.competences);
        }catch(e){
          console.log(e);
        }
      }
      fetchCompetences();
    },[])
    const ajouterCompetence=async()=>{
      try{
        if(competence==='0' || listCompetence.length===0){
          console.log('ajouter competence executed');
          console.log(`this is the description ${descriptionCompetence}`);
     const competenceInfo={nomCompetence:nouveauCompetence,descriptionCompetence:descriptionCompetence};
     const res=await client.post('/competences',competenceInfo);
    return res.data.num_competence;
        }
        else return competence;
      }catch(e){
        console.log(e);
      }
    }
    const ajouterMoyen=async(competence)=>{
      try{
      if(typeMoyen==1){
        const video={titreVideo,lienVideo,numCompetence:competence,numProfile}
        await client.post('/moyens/videos',video);
      }
      else if(typeMoyen==2){
        const livre={auteurLivre,titreLivre,numCompetence:competence,numProfile};
        await client.post('/moyens/livres',livre);
      }
      else{
        const formationEnLigne={titreFormation,plateformeFormation,numCompetence:competence,numProfile};
        await client.post('/moyens/formations',formationEnLigne);
      }
      return competence;
      }catch(e){
        console.log(e);
      }
    }
    const ajouterProfileCompetence=async(competence)=>{
      try{
        console.log('profile competence executed')
      await client.post(`/profiles/${numProfile}/profileCompetences/`,{numCompetence:competence});
      console.log('added profile competence successfully')
      }catch(e){
        console.log(e);
      }
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
      ajouterCompetence().then((res)=>ajouterMoyen(res))
      .then((res)=>ajouterProfileCompetence(res)).then(()=>{
        navigate(`/Employe/${numEmploye}/Profile/${numProfile}/Competences`);
      }).catch((e)=>{
        console.log(e);
      })
    }
  return (
    <div className='ajouter-competence'>
      <form>
      <h1>Ajouter Competence</h1>
     { listCompetence.length!=0 &&  <Select id='list-competences' label={'Competence'} placeholder={'Choisir competence'}  options={listCompetence} ajouter={'Competence'} onChange={(value)=>setCompetence(value)} /> }
     { (competence==='0' || listCompetence.length==0) && ( 
      <div>
    <InputField id='nouveau-competence' label='Nouveau Competence' placeholder='Nouveau Competence'   onChange={(value)=>setNouveauCompetence(value)} />
    <TextArea id='description-competence' label='Description Competence' placeholder='Entrer description' onChange={(value)=>setDescriptionCompetence(value)} />
    </div>
    )
    }
    { <Select id='type-moyen'   label={'Type Moyen'} placeholder={'Choisir type de moyen'}  options={listTypeMoyens} onChange={(value)=>setTypeMoyen(value)} />}
    {
      typeMoyen==1 && (
    <div>
      <InputField id='titre-video' label='Titre Video' placeholder='Titre Video' onChange={(value)=>setTitreVideo(value)}   />
      <InputField id='lien-video' label='Lien Video' placeholder='URL (www.example.com)'  onChange={(value)=>setLienVideo(value)}  />
    </div>
      )
    }
    { 
    typeMoyen==2 && (
    <div>
    <InputField id='auteur-livre' label='Auteur Livre' placeholder='Auteur Livre' onChange={(value)=>setAuteurLivre(value)}  />
    <InputField id='titre-livre' label={'Titre Livre'} placeholder='Titre Livre'  onChange={(value)=>setTitreLivre(value)}  /> 
    </div>
    )
    }
    {
      typeMoyen==3 && (
      <div>
      <InputField id='titre-formation' label='Titre Formation' placeholder='Titre Formation' onChange={(value)=>setTitreFormation(value)}  />
      <InputField id='plateforme-formation' label='Platforme Formation' placeholder='Moodle,Coursera,Udemy etc..' onChange={(value)=>setPlatformeFormation(value)}   />
      </div>
      )
    }
     <Button type='submit' value='Ajouter' onClick={handleSubmit}  />
      </form>
    </div>
  )
}
