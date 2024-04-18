import React from 'react'
import { NavLink } from 'react-router-dom'
export default function EnterpriseSideBar() {
  return (
    <div>
        <div className='side-bar'>
        <NavLink to='Profiles' className='side-link'>Profiles</NavLink>
        <NavLink to='Demandes' className='side-link'>Demandes</NavLink>
    </div>
    </div>
  )
}
