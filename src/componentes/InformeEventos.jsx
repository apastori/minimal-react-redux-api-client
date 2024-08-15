/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guardarEventos } from '../features/eventosSlice';
import { useNavigate } from 'react-router-dom';

const InformeEventos = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const eventos = useSelector((state) => state.eventos.eventos);
    const hoy = new Date().toISOString().slice(0, 10);
    const [eventosHoy, setEventosHoy] = useState([]);
    const [totalBiberones, setTotalBiberones] = useState(0);
    const [ultimoBiberon, setUltimoBiberon] = useState(null);
    const [totalPanales, setTotalPanales] = useState(0);
    const [ultimoPanal, setUltimoPanal] = useState(null);
    useEffect(() => {
        const usuario = localStorage.getItem('usuario');
        if (usuario === null) {
            navigate("/login");
        } else {
          const eventosHoy = eventos.filter((evento) => evento.fecha.split(' ')[0] === hoy);
          const totalBiberones = eventosHoy.filter((evento) => evento.idCategoria == idBiberon).length;
          const ultimoBiberon = eventosHoy.filter((evento) => evento.idCategoria == idBiberon).sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
          const totalPanales = eventosHoy.filter((evento) => evento.idCategoria == idPanal).length;
          const ultimoPanal = eventosHoy.filter((evento) => evento.idCategoria == idPanal).sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
          setUltimoBiberon(ultimoBiberon);
          setTotalBiberones(totalBiberones);
          setTotalPanales(totalPanales);
          setUltimoPanal(ultimoPanal);
        }
    }, [eventos]);

  let idBiberon= 35;
  let idPanal= 33;

  return (
    <div>
  
      <div>
        <h3>Biberones</h3>
        <p>Total de biberones hoy: {totalBiberones}</p>
        <p>
          Tiempo transcurrido desde el último biberón:{' '}
          {ultimoBiberon ? (
            <>
                {Math.floor((new Date() - new Date(ultimoBiberon.fecha)) / 3600000)} horas y{' '}
                {Math.floor(((new Date() - new Date(ultimoBiberon.fecha)) % 3600000) / 60000)} minutos
            </>
            ) : (
            'No hay registros hoy'
            )
        }
        </p>
      </div>
      <br></br>
      <div>
        <h3>Pañales</h3>
        <p>Total de pañales cambiados hoy: {totalPanales}</p>
        <p>
          Tiempo transcurrido desde el último cambio de pañal:{' '}
          {ultimoPanal ? (
            <>
                {Math.floor((new Date() - new Date(ultimoPanal.fecha)) / 3600000)} horas y{' '}
                {Math.floor(((new Date() - new Date(ultimoPanal.fecha)) % 3600000) / 60000)} minutos
            </>
            ) : (
            'No hay registros hoy'
            )}
        </p>
      </div>
    </div>
  );
};

export default InformeEventos;