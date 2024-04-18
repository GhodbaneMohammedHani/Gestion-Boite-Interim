import React, { useState } from 'react'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'
import Button from './Button'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { client } from '../App'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
export default function NavBar() {
  const {logout}=useLogout();
  const {user}=useAuthContext();
  const [userId,setUserId]=useState('');
  const [userName,setUserName]=useState(null);
  const [userType,setUserType]=useState(null);
  const [userLoading,setUserLoading]=useState(true);
  const [currentlocation,setLocation]=useState('');
  const navigate=useNavigate();
  let id,role;
  const fetchUser=async()=>{
    try{
    ({id,role}=jwtDecode(user));
      setUserId(id);
      setUserType(role);
    if(role=='employe'){
        const res=await client.get(`/employes/${id}`);
        const employe=res.data.employe;
        setUserName(`${employe.nom_employe} ${employe.prenom_employe}`)
        setUserLoading(false);
    }else if(role=='enterprise'){
        const res=await client.get(`/enterprises/${id}`);
        const enterprise=res.data.enterprise;
        setUserName(`${enterprise.nom_enterprise}`);
        setUserLoading(false);
    }else{
      setUserName('Admin');
      setUserLoading(false);
    }
}catch(e){
    console.log(e);
}
}
useEffect(()=>{
    console.log(window.location.pathname);
    setLocation(window.location.pathname);
    if(user){
        fetchUser();
    }
  },[user]);
  return (
    <nav>
        <div className='logo-container'>
        <img src='/images/logo-no-background.png' onClick={()=>{
          if(userType=='employe'){
            navigate(`/Employe/${userId}`);
          }else if( userType=='enterprise'){
            navigate(`Enterprise/${userId}`);
          }
          else {
            navigate(`/Admin/${id}`);
          }
        }}  />
        </div>
        <div className='compte-options'>
        {
            (user && userId && userType) && (
              <div className='compte-info' onClick={()=>{
                if(userType=='employe'){
                  navigate(`/Employe/${userId}/Compte`);
                }
              }} >
              {  
                userType=='employe'  ? (  <span><FontAwesomeIcon icon={faUser} className='user-icon' /></span>)
                : userType=='enterprise'? (<span><FontAwesomeIcon className='user-icon' icon={faBuilding} /></span>) :
                (<span><FontAwesomeIcon className='user-icon' icon={faCrown} /></span>)
            } 
            {userName}
              </div>
            )
          }

        <ul className='nav-list'>
         { 
        user  && (
        <li><Button onClick={logout} id='Logout' value="Logout" /></li>
        )
         }
         {
        !user && ( 
           <div className='sign-ups'>
            {
              currentlocation!='/SignUpEmploye' && (<Link to='/SignUpEmploye' className='link-style' ><Button value='Inscrire pour Employe' id='inscrire-emp' /></Link>)
            }
            {
              currentlocation!='/SignUpEnterprise' && (  <Link to='/SignUpEnterprise' className='link-style'><Button value='Inscrire pour Enterprises' id='inscrire-en'/></Link>)
            }
            {
              (currentlocation=='/SignUpEmploye' || currentlocation=='/SignUpEnterprise') && 
              (<Link to='/' className='link-style'>
                <Button value='Se connecter' id='redirect-login' />
              </Link>)
            }
      </div>
      )
         }
        </ul>
        </div>
    </nav>
  )
}
