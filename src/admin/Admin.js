import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar';
import AdminSideBar from './AdminSideBar';
export default function Admin() {
  return (
    <div>
        <NavBar/>
        <AdminSideBar/>
        <Outlet/>
    </div>
  )
}
