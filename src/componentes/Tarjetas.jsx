/* eslint-disable */
import React, { useEffect } from 'react'
import Tarjeta from "./Tarjeta"
import { useDispatch } from 'react-redux'
import { guardarEventos } from '../features/eventosSlice'

const Tarjetas = () => {

  const dispatch = useDispatch()

  useEffect(() => {

    fetch("https://babytracker.develotion.com//eventos.php")
    .then(r => r.json())
    .then(datos => {
      dispatch(guardarEventos(datos))
    })

  }, [])




  return (
    <>   
    <div className="tarjetas">
      { /*eventos.map(evento => <Tarjeta key={evento.idCategoria}user={evento.idUsuario}detalle={evento.detalle} fecha={evento.fecha}/>)*/ }
    </div>

    </>
  )
}

export default Tarjetas