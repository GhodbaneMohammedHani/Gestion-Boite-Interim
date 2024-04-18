import React from 'react'
import { NavLink } from 'react-router-dom'
export default function AdminSideBar() {
  return (
    <div>
    <div className='side-bar'>
        <NavLink to='Recrutements' className='side-link'>Recrutements</NavLink>
        <NavLink to='Employes' className='side-link'>Employes</NavLink>
        <NavLink to='Enterprises' className='side-link '>Enterprises</NavLink>
    </div>
    </div>
  )
}
