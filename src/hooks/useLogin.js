import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { client } from "../App";
import {jwtDecode} from 'jwt-decode';
export const useLogin=()=>{
    const { dispatch }=useAuthContext();
    const navigate=useNavigate();
    const [loginError,setLoginError]=useState('');
    const login=async(email,password)=>{
        const loginInfo={
           email:email,
           password:password
          }
          const response=await client.post('/login',loginInfo);
            localStorage.setItem('user',response.data.token);
            dispatch({type:'LOGIN',payload:response.data.token});
           const tokenString=JSON.stringify(jwtDecode(response.data.token));
           const token=JSON.parse(tokenString);
           const accountType=token.role;
            if(accountType==='employe'){
            console.log('redirected to employe');
              navigate(`/Employe/${token.id}`);
            }
            else if(accountType==='enterprise'){
              navigate(`/Enterprise/${token.id}/profiles`);
              console.log('redirected to enterprise');
            }
            else if(accountType==='admin'){
              navigate(`/Admin/${token.id}/Recrutements`);
              console.log('redirected to admin');
            }
            else{
              navigate('/');
            }
    }
    return {login}
}
