import React, { useState } from 'react'
import Button from '../components/Button'
import { useEffect } from 'react';
import "../styles/Enterprise.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleDown, faL, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/NavBar';
import { client } from '../App';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
export default function EnterpriseProfiles() {
    const [profileList,setProfileList]=useState([]);
    const navigate=useNavigate();
    const {numEnterprise}=useParams();
    const [isLoading,setIsLoading]=useState(true);
    const fetchCompetence=async(num_competence)=>{
        const res=await client.get(`/competences/${num_competence}`);
        return res.data.competence;
    }
    const fetchProfiles=async()=>{
        const res=await client.get(`/profiles`);
        return res.data.profiles;
    }
    const fetchProfileCompetences=async(num_profile)=>{
        const res=await client.get(`/profiles/${num_profile}/profilecompetences`);
        console.log('competences fetched');
        return res.data.profileCompetences;
    }
    useEffect(()=>{
            fetchProfiles().then((profiles)=>{
                let fetchPromises=[];
                profiles.map((profile)=>{
                    fetchPromises.push(fetchProfileCompetences(profile.num_profile));
                });
                Promise.allSettled(fetchPromises).then((results)=>{
                results.map((result,index)=>{
                    profiles[index].competences=result.value;
                });
                return profiles;
                }).then((profiles)=>{
                    console.log('profiles added');
                    console.log(profiles);
                    setProfileList(profiles);
                    setIsLoading(false);
                })
            });
},[])
  return (
    <div className='en-container'>
        <h1>Profiles</h1>
        <div className='search-bar'>
        <FontAwesomeIcon className='search-font' icon={faMagnifyingGlass} />
        <input type='search'  onChange={(e)=>{
            setIsLoading(true);
            const input=e.target.value;
            client.get(`/search?input=${input}`).then((res)=>{
                const profiles=res.data.profiles;
                let fetchPromises=[];
                profiles.map((profile)=>{
                    fetchPromises.push(fetchProfileCompetences(profile.num_profile));
                });
                Promise.allSettled(fetchPromises).then((results)=>{
                    results.map((result,index)=>{
                        profiles[index].competences=result.value;
                    });
                    return profiles;
                    }).then((profiles)=>{
                        console.log('profiles added');
                        console.log(profiles);
                        setProfileList(profiles);
                        setIsLoading(false)
                    })
            }).catch((e)=>{
                console.log(e);
            })
        }
    }  placeholder='chercher competences ou specialites..'  />
        </div>
        <div>
        <table className='table-container'>
            <tr>
                <th>Nom</th>
                <th>Specialite</th>
                <th>Competences</th>
            </tr>
            {
                isLoading ? (<div>Loading ...</div>) :profileList.length==0?
                (<div align='center'>Aucun Resultat</div>) :
                  profileList.map((profile)=>(
                    <tr>
                        <td className='fullname'>{profile['Employe.nom_employe']} {profile['Employe.prenom_employe']}</td>
                        <td>{profile['specialiteprofile.nom_specialite']}</td>
                        <td>{profile.competences.map((competence,index)=>(
                            <span id={competence["num_competence"]}>
                            {competence['competence.nom_competence']}{index<profile.competences.length-1?',':''}</span>
                        ))}</td>
                        <td className='voir-profiles' ><Button id={profile.num_profile} value='Voir Profile' onClick={()=>{
                           navigate(`/Enterprise/${numEnterprise}/profiles/${profile.num_profile}`);
                        }} /></td>
                    </tr>
                ))
            }
        </table>
        </div>
    </div>
  )
}
