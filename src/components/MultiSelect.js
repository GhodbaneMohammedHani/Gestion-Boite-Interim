import React from 'react'
import '../styles/MultiSelect.css';
import { useRef } from 'react';
export default function MultiSelect({id,label,placeholder,options,onSelect}) {
    const listRef=useRef(null);
  return (
    <div>
         <label >{label}</label>
          <button id={id} onClick={()=>{
           if(listRef.current.style.display=='none'){
            listRef.current.style.display='block';
           }
           else{
            listRef.current.style.display='none';
           }
            }}  className='select-button'>{placeholder}</button>
        <div ref={listRef}  className='option-list'>
            {
                options.map((option)=>(
                        <label key={Object.values(option)[0]}  className='select-option'>{Object.values(option)[1]}
                        <input type='checkbox' value={Object.values(option)[0]} onChange={(e)=>onSelect(e.target.value)}/>
                        </label>
                ))
            }
        </div>
          
    </div>
  )
}
