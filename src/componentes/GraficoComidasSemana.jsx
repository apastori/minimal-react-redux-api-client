/* eslint-disable */
import React from 'react';

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
      text: 'Comidas Ultima Semana',
    },
  },
};

const GraficoComidasSemana = () => {

  const eventosCategoria = useSelector((state) => {
    const idCatComida = 31;
    state.eventos.eventos.map((evento) => {
      if (evento.idCategoria === idCatComida) return evento
    })
  });

  function fechaSemanaAnterior(datep) {
    return new Date().setDate(date.getDate() - 7);
  }

  function eventosSemanaAnt() {
    eventosCategoria.filter((eventoCat) => {
      if (evento.fecha) {

      }
    })
  }

  return (
    <div>
        <h2>GraficoComidasSemana</h2>
        <Bar options={options} data={{
            labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
            datasets: [
                {
                    label: 'Comidas Ultima Semana',
                    data: tempMaximas,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        }} />
    </div>
  )
}

export default GraficoComidasSemana