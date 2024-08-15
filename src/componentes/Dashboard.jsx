/* eslint-disable */
import React, { useEffect } from 'react';
import Agregar from './Agregar';
import ListadoEventos from './ListadoEventos';
import InformeEventos from './InformeEventos';
import TiempoProximoBiberon from './TiempoProximoBiberon';
import { GraficoCantCategoria } from './GraficoCantCategoria';
import GraficoComidasSemana from './GraficoComidasSemana2';
import { guardarEventos } from '../features/eventosSlice';
import { guardarCategorias } from '../features/categoriasSlice';

import './Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Dashboard = () => {

  const dispatch = useDispatch();
  const eventos = useSelector((state) => state.eventos.eventos);

  useEffect(() => {

    const obtenerDatos = async () => {
      const usuario = localStorage.getItem('usuario');
      if (usuario === null) {
        navigate("/login");
      } else {
        try {
          const responseEventos = await fetch(`https://babytracker.develotion.com/eventos.php?idUsuario=${usuario}`, {
            headers: {
              'Content-Type': 'application/json',
              'apikey': localStorage.getItem('token'),
              'iduser': localStorage.getItem('usuario'),
            }
          })
          const jsonEventos = await responseEventos.json();
          if (jsonEventos.codigo === 200) {
            dispatch(guardarEventos(jsonEventos.eventos));
            const responseCategorias = await fetch('https://babytracker.develotion.com/categorias.php', {
              headers: {
                'apikey': localStorage.getItem('token'),
                'iduser': localStorage.getItem('usuario'),
              },
            });

            const jsonCategorias = await responseCategorias.json();

            if (jsonCategorias.codigo === 200) {
              console.log("Categorías obtenidas:", jsonCategorias.categorias);
              dispatch(guardarCategorias(jsonCategorias.categorias));
            } else {
              toast.error("Error al cargar categorías: " + jsonCategorias.mensaje);
            }
          }
        } catch (error) {
          console.error("Error en la solicitud de eventos:", error);
          toast.error('Error al cargar datos: ' + error.message);
        }
      }
    }
    obtenerDatos();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-item">
          <h3>Agregar un nuevo evento</h3>
          <Agregar />
        </div>

        <div className="dashboard-item">
          <h3>Listado de eventos</h3>
          <ListadoEventos />
        </div>

        <div className="dashboard-item">
          <h3>Informe de eventos</h3>
          <InformeEventos />
        </div>

        <div className="dashboard-item">
          <h3>Tiempo hasta el proximo biberón</h3>
          <TiempoProximoBiberon />
        </div>

        <div className="dashboard-item">
          <h3>Cantidad de eventos por categoría</h3>
          <GraficoCantCategoria />
        </div>

        <div className="dashboard-item">
          <h3>Comidas de la ultima semana</h3>
          <GraficoComidasSemana />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;