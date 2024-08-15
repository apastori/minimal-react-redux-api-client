/* eslint-disable */
import React from 'react'


const Tarjeta = ({id, title}) => {
  return (
    <div className="tarjeta"> 
      <input type="button" id={`list${id}`} class="a">
        Eliminar
      </input>
      <label htmlFor={`list${id}`}> {title} </label>
    </div>
  )
}

export default Tarjeta