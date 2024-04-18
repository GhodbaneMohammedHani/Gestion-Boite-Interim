import React from 'react'
import EnterpriseSideBar from './EnterpriseSideBar'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
export default function Enterprise() {
  return (
    <div>
        <NavBar/>
        <EnterpriseSideBar/>
        <Outlet/>
    </div>
  )
}
