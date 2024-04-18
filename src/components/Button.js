import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Button.css'
export default function Button(props) {
  return (
  <button id={props.id} type={props.type} onClick={props.onClick}  name={props.id}>{props.value}</button>
  )
}
