/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
      text: 'Eventos por Categoria',
    },
  },
};

export const GraficoCantCategoria = () => {
  const eventos = useSelector((state) => state.eventos.eventos);
  const [categorias, setCategorias] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Función para contar cuántos eventos pertenecen a cada categoría
  function cantEventosCategoria() {
    const categoriasCantt = {};

    eventos.forEach(evento => {
      const idCategoria = evento.idCategoria;
      if (categoriasCantt[idCategoria] !== undefined) {
        categoriasCantt[idCategoria]++;
      } else {
        categoriasCantt[idCategoria] = 1;
      }
    });

    console.log("Cantidad de eventos por categoría:", categoriasCantt);
    return categoriasCantt;
  }

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        try {
          const responseEventos = await fetch(`https://babytracker.develotion.com/eventos.php?idUsuario=${usuario}`, {
            headers: {
              'Content-Type': 'application/json',
              'apikey': localStorage.getItem('token'),
              'iduser': usuario,
            }
          });
          const jsonEventos = await responseEventos.json();
          if (jsonEventos.codigo === 200) {
            dispatch(guardarEventos(jsonEventos.eventos));

            const responseCategorias = await fetch('https://babytracker.develotion.com/categorias.php', {
              headers: {
                'apikey': localStorage.getItem('token'),
                'iduser': usuario,
              },
            });
            const jsonCategorias = await responseCategorias.json();
            if (jsonCategorias.codigo === 200) {
              setCategorias(jsonCategorias.categorias);
            } else {
              toast.error("Error al cargar categorías: " + jsonCategorias.mensaje);
            }
          } else {
            toast.error(jsonEventos.mensaje);
          }
        } catch (error) {
          console.error("Error en la solicitud:", error);
          toast.error('Error al cargar datos: ' + error.message);
        }
      };

      fetchData();
    }
  }, []);

  // Obtener la cantidad de eventos por categoría
  const categoriasCant = cantEventosCategoria();

  // Filtrar las categorías que tienen eventos y preparar los datos para el gráfico
  const data = {
    labels: categorias
      .filter(categoria => categoriasCant[categoria.id])
      .map(categoria => categoria.tipo),
    datasets: [
      {
        label: 'Cantidad de Eventos por Categoría',
        data: categorias
          .filter(categoria => categoriasCant[categoria.id])
          .map(categoria => categoriasCant[categoria.id]),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  console.log("Datos para el gráfico:", data);

  return (
    <div>
      { categorias.length > 0 && (
            <Bar options={options} data={data} />
        )
      }
    </div>
  );
};
