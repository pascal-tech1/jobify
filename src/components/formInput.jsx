import React from 'react'
import styled from 'styled-components'

export const SelectOpt = ({name,value,optionsValue, onChange,id }) => {
 
  return (
    <div className='field-container' >
    <label htmlFor={name}>{name}</label>
    <Select value={value} name={name} id={id} onChange= {onChange} >
          {optionsValue.map((value,id)=>{
            return <option key={id} value={value}>{value}</option>
          })} 
     </Select>
     </div>
  )
 
}


export const Input = ({name,value,onChange}) => {
  return (
    <div className='field-container'>
    <label htmlFor={name}>{name}</label>
    <input type='text' name={name} id={name} value={value} onChange={onChange} />
  </div>

  )
}



const Select = styled.select`
  outline: none;
  padding: 0.7rem 1rem;
  border-radius: 5px;
  background-color: var(--grey-50);
  border: 1px solid var(--primary-200);
  font-size: 1.5rem;
  text-align: center;
  :focus {
    border: 1px solid var(--primary-500);
  }
  @media screen and (max-width: 400px) {
    padding: 0.5rem 6rem;
  }
`;
