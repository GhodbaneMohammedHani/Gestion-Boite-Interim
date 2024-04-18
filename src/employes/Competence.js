import React, { useState } from 'react'
import '../styles/Competence.css'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { client } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import AjouterResource from './AjouterResource';
export default function Competence() {
    const {numProfile,numCompetence}=useParams();
    const [Videos,setVideos]=useState([]);
    const [livres,setLivres]=useState([]);
    const [showForm,setShowForm]=useState(false);
    const [competence,setCompetence]=useState({});
    const [formationLigne,setFormationLigne]=useState([]);
    const fetchCompetence=async()=>{
        const res=await client.get(`/competences/${numCompetence}`);
        setCompetence(res.data.competence);
        console.log('competences set');
    }
    const fetchVideos=async()=>{
        const res=await client.get(`/moyens/videos?numCompetence=${numCompetence}&numProfile=${numProfile}`);;
        setVideos(res.data.videos);
        console.log('videos set');
    }
    const fetchLivres=async()=>{
        const res=await client.get(`/moyens/livres?numCompetence=${numCompetence}&numProfile=${numProfile}`);
        setLivres(res.data.livres);
        console.log('livres set');
    }
    const fetchFormationLigne=async()=>{
        const res=await client.get(`/moyens/formations?numCompetence=${numCompetence}&numProfile=${numProfile}`);
        setFormationLigne(res.data.formations);
        console.log('formation en ligne set');
    }
    useEffect(()=>{
        fetchCompetence();
        fetchVideos();
        fetchFormationLigne();
        fetchLivres();
    },[showForm])
  return (
    <div className='competence-container'>
        <h1>{competence.nom_competence} </h1>
            <fieldset className='description-competence'>
                <legend>Description</legend>
                <p>{competence.description_competence}</p>
            </fieldset>
        <div className='moyens-competences'>
            <h1>Resources</h1>
            { livres.length!=0 && 
            (
                <div>
                <h2 className='type-moyen'>Livres</h2>
                {
                    livres.map((livre)=>(
                    <div className='moyen-container'>
                        <FontAwesomeIcon icon={faBook} className='moyen-icon' />
                        <div className='moyen-description'>
                        <p><span className='bold'>Titre Livre: </span>{livre.titre_livre}</p>
                        <p><span className='bold'>Auteur Livre: </span>{livre.auteur_livre}</p>
                        </div>
                    </div>))
                }
            </div>
            )
            }
            {Videos.length!=0 && (
                <div>
                     <h2 className='type-moyen'>Videos</h2>
                {
                    Videos.map((video)=>
                    (
                        <div className='moyen-container'>               
                      <FontAwesomeIcon icon={faCirclePlay} className='moyen-icon'  />
                        <div className='moyen-description'>
                        <p><span className='bold'>Titre Video: </span>{video.titre_video}</p>
                        <p><span className='bold'>Lien Video: </span><a href={video.lien_video} target='_blank'>{video.lien_video}</a></p>
                        </div>
                        </div>
                    )
              )
                }
                </div>
            )}
            {formationLigne.length!=0 && (
                <div>
                    <h2 className='type-moyen'>Formations en ligne</h2>
                    
                {
                    formationLigne.map((formation)=>(
                        <div className='moyen-container'>
                            <FontAwesomeIcon icon={faGraduationCap} className='moyen-icon' />
                            <div className='moyen-description'>
                        <p><span className='bold'>Titre Formation: </span>{formation.titre_formation}</p>
                        <p><span className='bold'>Platforme Formation: </span>{formation.platforme_formation}</p>
                            </div>
                        </div>
                    ))
                }
                </div>
            )}
            { !showForm && <Button id='ajouter-resource' value='Ajouter Resource'  onClick={()=>setShowForm(true)} /> }
        { showForm && <AjouterResource numCompetence={numCompetence} numProfile={numProfile} setShowForm={setShowForm}  setVideos={setVideos} setLivres={setLivres}     setFormationLigne={setFormationLigne} /> }
        </div>
    </div>
  )
}
