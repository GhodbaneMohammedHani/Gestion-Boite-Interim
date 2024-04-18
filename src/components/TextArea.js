import React from 'react'

export default function TextArea(props) {
  return (
    <div>
         <label htmlFor={props.id}>{props.label}<span className='error'>{props.error}</span></label>
        <textarea required id={props.id} onChange={(e)=>props.onChange(e.target.value)}  rows='5' cols='50' placeholder={props.placeholder} ></textarea>
    </div>
  )
}
