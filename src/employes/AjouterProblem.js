import React, { useEffect, useState } from 'react'
import { client } from '../App'
import { useParams } from 'react-router-dom';
import Select from '../components/Select';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import '../styles/AjouterProblem.css'
export default function AjouterProblem() {
    const [listCompetences,setListCompetences]=useState([]);
    const [competence,setCompetence]=useState(0);
    const [problem,setProblem]=useState('');
    const [solution,setSolution]=useState('');
    const {numProfile,numEmploye}=useParams();
    const getCompetences=async()=>{
        try{
            const res=await client.get(`/competences`);
            setListCompetences(res.data.competences);
        }catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        getCompetences();
    },[])
  return (
    <div className='ajouter-problem'>
        <form>
            <Select id={'list-competence'}  label={'Competence'} placeholder={'Choisir un Competence'}   options={listCompetences}  />
            <TextArea id='problem-competence' label={'Problem'}  placeholder="Ajouter un problem"   />
            <TextArea id='solution-problem' label={'Solution'}  placeholder="Ajouter un solution" />
            <Button type='submit' id='ajouter-problem' value='Ajouter Problem' />
        </form>
    </div>
  )
}
