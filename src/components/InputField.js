import React from 'react'
import '../styles/InputField.css'
export default function InputField(props) {
  return (
    <div className='form-part'>
    <label htmlFor={props.id}> {props.label} <span className='error'>{props.error}</span> </label>
    <div className='input-control'>
    <input type={props.type} placeholder={props.placeholder} id={props.id} name={props.id} ref={props.reference} require onChange={(e)=>{
      props.onChange(e.target.value)}} required />
    </div>
    </div>
  )
}
