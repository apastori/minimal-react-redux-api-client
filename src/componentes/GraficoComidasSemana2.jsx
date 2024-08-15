/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guardarEventos } from '../features/eventosSlice';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Comidas de la Última Semana',
    },
  },
};

const GraficoComidasSemana = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const eventos = useSelector((state) => state.eventos.eventos);
  const idCatComida = 31; 

  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const generarUltimos7Dias = () => {
    const hoy = new Date();
    const fechas = [];

    for (let i = 0; i < 7; i++) {
      const nuevaFecha = new Date(hoy);
      nuevaFecha.setDate(hoy.getDate() - i);
      const año = nuevaFecha.getFullYear();
      const mes = String(nuevaFecha.getMonth() + 1).padStart(2, '0');
      const dia = String(nuevaFecha.getDate()).padStart(2, '0');
      fechas.unshift(`${año}-${mes}-${dia}`);
    }

    return fechas;
  };

  useEffect(() => {
    const ultimos7Dias = generarUltimos7Dias();

    
    const comidasPorDia = ultimos7Dias.reduce((acc, fecha) => {
      acc[fecha] = 0;
      return acc;
    }, {});


    eventos.forEach(evento => {
      const fechaEvento = evento.fecha.split(' ')[0];
      if (evento.idCategoria === idCatComida && comidasPorDia[fechaEvento] !== undefined) {
        comidasPorDia[fechaEvento]++;
      }
    });

   // grafica
    const datosGrafico = {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      datasets: [
        {
          label: 'Comidas Última Semana',
          data: ultimos7Dias.map(fecha => comidasPorDia[fecha]),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
      ],
    };

    setData(datosGrafico);
  }, [eventos]);

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (usuario === null) {
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
    }, []);

  return (
    <div>
    
      {
        eventos.length > 0 &&
        <Bar options={options} data={data} />
      }
    </div>
  );
};

export default GraficoComidasSemana;