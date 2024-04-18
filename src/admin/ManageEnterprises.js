import React, { useEffect, useState } from 'react'
import { client } from '../App';
import Button from '../components/Button';

export default function ManageEnterprises() {
  const [enterprisesList,setEnterprisesList]=useState([]);
  const fetchEnterprises=async()=>{
    const res=await client.get('/enterprises');
    return res.data.enterprises;
  }
  const fetchDomaines=async(numEnterprise)=>{
    const res=await client.get(`/domaines/${numEnterprise}`);
    return res.data.domainesEnterprise;
  }
  const fetchEnterprisesDomaines=()=>{
    fetchEnterprises().then((enterprises)=>{
      let promises=[];
      enterprises.map((enterprise)=>{
        promises.push(fetchDomaines(enterprise.num_enterprise));
      });
      Promise.all(promises).then((results)=>{
        results.map((result,index)=>{
          enterprises[index].domaines=result;
        });
      }).then(()=>{
        setEnterprisesList(enterprises);
        console.log(enterprises);
      }).catch((e)=>{
        console.log(e);
      })
    }).catch((e)=>{
      console.log(e);
    });
  }
  useEffect(()=>{
    fetchEnterprisesDomaines();
  },[]);
  return (
    <div className='manage-employes'>
      <h1>Enterprises</h1>
      <table className='table-container'>
        <tr>
          <th>Nom Enterprise</th>
          <th>Email Enterprise</th>
          <th>Domaines Enterprise</th>
        </tr>
        {
          enterprisesList.map((enterprise)=>(
            <tr>
              <td>{enterprise.nom_enterprise}</td>
              <td>{enterprise.email_enterprise}</td>
              <td>{
                enterprise.domaines.map((domaine,index)=>(
                  <span>{domaine['Domaine'].nom_domaine}{index<enterprise.domaines.length-1?',':''}  </span>
                ))
                }</td>
              <td><Button id={enterprise.num_enterprise}  value='supprimer' onClick={()=>{
                client.delete(`/enterprises/${enterprise.num_enterprise}`).then(()=>{
                  fetchEnterprisesDomaines();
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
