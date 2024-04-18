import React from 'react'
import '../styles/Select.css'
export default function Select({id,label,placeholder,options,onChange,ajouter}) {
  return (
    <div>
    <label htmlFor={id}>{label}</label>
    <select id={id} required name={id} onChange={(e)=>onChange(e.target.value)}>
      <option selected  disabled value=''>{placeholder}</option>
    {   
    options.map((option) => (
        <option  key={Object.values(option)[0]}  value={Object.values(option)[0]}>
          {Object.values(option)[1]}
        </option>
      )) 
    }
    {ajouter && ( <option value={'0'} >Ajouter nouveau {ajouter}  </option>)  }
    </select>
    </div>
  )
}
