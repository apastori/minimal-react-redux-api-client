/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { guardarEventos, eliminarEvento } from '../features/eventosSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ListadoEventos = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const eventos = useSelector((state) => state.eventos.eventos);
    const categorias = useSelector((state) => state.categorias.categorias);
    const [eventosHoy, setEventosHoy] = useState([]);
    const [eventosAnteriores, setEventosAnteriores] = useState([]);
    
    useEffect(() => {
        const obtenerDatos = async () => {
            const usuario = localStorage.getItem('usuario');
            if (usuario === null) {
                navigate("/login");
            } 
        };
        obtenerDatos();
    }, []);

    const hoy = new Date().toISOString().slice(0, 10);

    useEffect(() => {
        const eventosHoy = eventos.filter(evento => {
            const fechaEvento = new Date(evento.fecha).toISOString().slice(0, 10);
            return fechaEvento === hoy;
        });
        const eventosAnteriores = eventos.filter(evento => {
            const fechaEvento = new Date(evento.fecha).toISOString().slice(0, 10);
            return fechaEvento < hoy;
        });
        setEventosHoy(eventosHoy);
        setEventosAnteriores(eventosAnteriores);
    }, [eventos]);

    const eliminar = async (id) => {
        try {
            const response = await fetch(`https://babytracker.develotion.com/eventos.php?idEvento=${id}`, {
                method: 'DELETE',
                body: JSON.stringify({ idEvento: id }),
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': localStorage.getItem('token'),
                    'iduser': localStorage.getItem('usuario'),
                },
            });

            const json = await response.json();
            
            if (json.codigo === 200) {
                dispatch(eliminarEvento(id));
                toast.success("Evento eliminado exitosamente");
            } else {
                toast.error(json.mensaje);
            }
        } catch (error) {
            console.error("Error al eliminar evento:", error);
            toast.error('Error al eliminar evento: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Hoy</h2>
            {eventosHoy.map(evento => {
                let categoria = categorias.find(cat => cat.id === evento.idCategoria);
                return categoria && (
                    <div key={evento.id} style={{ marginTop: '20px', marginBottom: '20px'}}>
                        <img src={`https://babytracker.develotion.com/imgs/${categoria.imagen}.png`} alt={categoria.tipo} />
                        <span>Detalles: {evento.detalle}</span>
                        <p>Tipo: {categoria.tipo}</p>
                        <p>Fecha: {evento.fecha}</p>
                        <p>EventoId: {evento.id}</p>
                        <button onClick={() => eliminar(evento.id)}>Eliminar</button>
                    </div>
                );
            })}
            <br />
            <h2>Anteriores</h2>
            {eventosAnteriores.map(evento => {
                let categoria = categorias.find(cat => cat.id === evento.idCategoria);
                return categoria && (
                    <div key={evento.id} style={{ marginTop: '20px', marginBottom: '20px'}}>
                        <img src={`https://babytracker.develotion.com/imgs/${categoria.imagen}.png`} alt={categoria.tipo} />
                        <span>Detalles: {evento.detalle}</span>
                        <p>Tipo: {categoria.tipo}</p>
                        <p>Fecha: {evento.fecha}</p>
                        <p>EventoId: {evento.id}</p>
                        <button onClick={() => eliminar(evento.id)}>Eliminar</button>
                    </div>
                );
            })}
        </div>
    );
};

export default ListadoEventos;

