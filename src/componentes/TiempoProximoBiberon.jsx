/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { guardarEventos } from '../features/eventosSlice';

const TiempoProximoBiberon = () => {
  const eventos = useSelector((state) => state.eventos.eventos);
  const hoy = new Date().toISOString().slice(0, 10);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() =>{
    const usuario = localStorage.getItem('usuario');
    if(usuario===null) {
        navigate("/login");
    } else {
        fetch(`https://babytracker.develotion.com/eventos.php?idUsuario=${usuario}`, {
          headers: {
              'Content-Type': 'application/json',
              'apikey': localStorage.getItem('token'),
              'iduser': localStorage.getItem('usuario'),
            }
        })
        .then(response => response.json())
        .then(json => {
            if (json.codigo === 200) {
                dispatch(guardarEventos(json.eventos));
            } else {
                toast.error(json.mensaje);
            }
        });
    }
  },[])

  let idBiberon= 35;

  const ultimoBiberon = eventos
    .filter((evento) => evento.idCategoria == idBiberon && evento.fecha.split(' ')[0] === hoy)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];

  const tiempoTranscurrido = ultimoBiberon ? new Date() - new Date(ultimoBiberon.fecha) : 0;
  const tiempoRestante = 4 * 60 * 60 * 1000 - tiempoTranscurrido;

  return (
    <div style={{ color: (tiempoRestante > 0 && tiempoTranscurrido > 0) ? 'green' : 'red' }}>
      {(tiempoRestante > 0 && tiempoTranscurrido > 0)
        ? `Tiempo restante para el próximo biberón: ${Math.floor(tiempoRestante / (60 * 1000))} minutos`
        : 'Ya debería haberse dado el próximo biberón.'}
    </div>
  );
};

export default TiempoProximoBiberon