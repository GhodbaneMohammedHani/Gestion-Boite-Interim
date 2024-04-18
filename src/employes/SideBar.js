import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import '../styles/SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
export default function SideBar() {
  return (
    <div className='side-bar'>
        <NavLink to='MonProfile' className='side-link'>Mon Profile</NavLink>
        <NavLink to='Competences' className='side-link '>Competences</NavLink>
        <NavLink to='Wiki' className={'side-link'}>Wiki</NavLink>
    </div>
  )
}
