import React from 'react'
import Button from '../components/Button'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import '../styles/Wiki.css'
export default function Wiki() {
    const {numEmploye,numProfile}=useParams();
    const navigate=useNavigate();
  return (
    <div className='wiki-container'>
       <Button id='ajouter-problem' value='Ajouter Problem' onClick={()=>{
        navigate(`Ajouter-Problem`);
       }} />
    </div>
  )
}
