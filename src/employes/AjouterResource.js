import React from 'react'
import Button from '../components/Button';
import { useState } from 'react';
import { client } from '../App';
import InputField from '../components/InputField';
import Select from '../components/Select';
import '../styles/AjouterResource.css'
import { faL } from '@fortawesome/free-solid-svg-icons';
export default function AjouterResource(props) {
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
    const [typeMoyen,setTypeMoyen]=useState(null);
    const [titreLivre,setTitreLivre]=useState('');
    const [auteurLivre,setAuteurLivre]=useState('');
    const [titreVideo,setTitreVideo]=useState('');
    const [lienVideo,setLienVideo]=useState('');
    const [titreFormation,setTitreFormation]=useState('');
    const [plateformeFormation,setPlatformeFormation]=useState('');
    const ajouterMoyen=async(competence)=>{
        try{
        if(typeMoyen==1){
          const video={titreVideo,lienVideo,numCompetence:competence,numProfile:props.numProfile}
          await client.post('/moyens/videos',video);
        }
        else if(typeMoyen==2){
          const livre={auteurLivre,titreLivre,numCompetence:competence,numProfile:props.numProfile};
          await client.post('/moyens/livres',livre);
        }
        else{
          const formationEnLigne={titreFormation,plateformeFormation,numCompetence:competence,numProfile:props.numProfile};
          console.log(formationEnLigne);
          await client.post('/moyens/formations',formationEnLigne);
        }
        return competence
        }catch(e){
          console.log(e);
        }
      }
  return (
    <div className='ajouter-resource'>
    <form>
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
    <div className='resource-buttons'>
    <Button type='submit' id='ajouter-resource' value='Ajouter Resource' onClick={(e)=>{ 
        e.preventDefault(); 
        ajouterMoyen(props.numCompetence).then(async()=>{
          try{
          if(typeMoyen==1){
            const res=await client.get(`/moyens/videos?numCompetence=${props.numCompetence}&numProfile=${props.numProfile}`);
            props.setVideos(res.data.videos);
          }else if(typeMoyen==2){
            const res=await client.get(`/moyens/livres?numCompetence=${props.numCompetence}&numProfile=${props.numProfile}`);
            props.setLivres(res.data.livres);
          }
          else{
            const res=await client.get(`/moyens/formations?numCompetence=${props.numCompetence}&numProfile=${props.numProfile}`);
          }
          }catch(e){
            console.log(e);
          }
        }).then(()=>{
          props.setShowForm(false);
        })
    }}    />
    <Button id='annuler' value='Annuler'  onClick={()=>{
        props.setShowForm(false)}} />
    </div>
    </form>
    </div>
  )
}
