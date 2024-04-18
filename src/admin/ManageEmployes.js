import React from 'react'
import '../styles/manageemployes.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Employe from '../employes/Employe'
import { client } from '../App'
import Button from '../components/Button'
export default function ManageEmployes() {
  const [employesList,setEmployesList]=useState([]);
  const fetchEmployes=async()=>{
    const res=await client.get('/employes');
    setEmployesList(res.data.employes);
  }
  useEffect(()=>{
    fetchEmployes();
  },[]);
  return (
    <div className='manage-employes'>
      <h1>Employes</h1>
         <table className='table-container'>
            <tr>
                <th>Nom Employe</th>
                <th>Prenom Employe</th>
                <th>Email Employe</th>
                <th>Telephone Employe</th>
            </tr>
            {
              employesList.map((employe)=>(
                <tr>
                  <td>{employe.nom_employe}</td>
                  <td>{employe.prenom_employe}</td>
                  <td>{employe.email_employe}</td>
                  <td>{employe.telephone_employe}</td>
                  <td><Button id={employe.num_employe} value="Supprimer" onClick={()=>{
                  client.delete(`/employes/${employe.num_employe}`).then(()=>{
                    fetchEmployes();
                  }).catch((e)=>{
                    console.log(e);
                  })
                  }} /></td>
                </tr>
              ))
            }
        </table>
    </div>
  )
}
