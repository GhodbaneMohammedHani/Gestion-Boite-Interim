import React from 'react'
import SideBar from './SideBar'
import { BrowserRouter,Routes,Route, Router, Outlet } from "react-router-dom";
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
export default function Profile() {
  const {numProfile}=useParams();
  return (
    <div>
      <NavBar/>
      <SideBar/>
    <Outlet/>
    </div>
  )
}
