import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import '../styles/Employe.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { client } from '../App'
import { useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
export default function Employe() {
    const [profiles,setProfiles]=useState([]);
    const [loadingProfiles,setLoadingProfiles]=useState(true);
    const context=useAuthContext();
    const navigate=useNavigate();
    const {numEmploye}=useParams();
    useEffect(()=>{
    const fetchProfiles=async()=>{
            try{
                const response=await client.get(`/profiles?numEmploye=${numEmploye}`);
                return response.data.profiles;
            }catch(e){
                console.log(e)
            }
        }
      fetchProfiles().then((profilesData)=>{
        let promises=[];
        const getSpecialite=async(profile)=>{
            const res= await client.get(`/profiles/specialites/${profile.num_specialite}`);
            profile.specialite=res.data.specialite.nom_specialite;
            return profile;
        }
        profilesData.map((profile,index)=>{
            promises.push(getSpecialite(profile));
        });
        Promise.allSettled(promises).then((results)=>{
            let newProfiles=[];
            results.map((result,index)=>{
                if(result.status==='fulfilled'){
                    newProfiles.push(result.value);
                }
            });
                setProfiles(newProfiles);
                setLoadingProfiles(false);
        })
      })
    },[]);
  return (
    <div>
        <NavBar/>
        <div className='list-profiles'>
        <h1>Vos profils professionnels</h1>
        {
            profiles.length==0? (<h1>{ loadingProfiles ? (<span className='loading'>Loading...</span>) : (<span>Il n'existe pas des profiles</span>)  }</h1>):
            profiles.map((profile,index)=>
            (
            <div className='profile-element' onClick={()=>navigate(`/Employe/${numEmploye}/Profile/${profile.num_profile}/MonProfile`)}  id={profile.num_profile}>
                <div className='profile-info'>
                    <h1>Profile {index+1}</h1>
                    <p className='profile-specialite'>{profile.specialite}</p>
                </div>
            </div>      
             )
            )
        }
            <div className='ajouter-profile'>
         <Link to={`/Employe/${numEmploye}/Ajouter-Profile`}  > <button><FontAwesomeIcon icon={faPlus} /> Ajouter un nouveau Profile</button></Link>
        </div>
        </div>
    </div>
  )
}
