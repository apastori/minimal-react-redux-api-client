/* eslint-disable */
import { useId, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregarEvento } from "../features/eventosSlice";
import { guardarCategorias } from "../features/categoriasSlice";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Agregar = () => {
    const idCategoria = useId();
    const idFecha = useId();
    const idDetalles = useId();

    const categorias = useSelector((state) => state.categorias.categorias);

    const [error, setError] = useState(null);
    const [exito, setExito] = useState(null);

    const categoriaRef = useRef(null);
    const fechaRef = useRef(null);
    const detallesRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let id=0;

    // Obtener la fecha de hoy en formato YYYY-MM-DD
    const hoy = new Date().toISOString().slice(0, 10);

    // Cargar categorías desde la API
    useEffect(() => {
        if (localStorage.getItem("usuario") === null) {
            navigate("/login");
        } 
    }, []);

    const guardarEvento = () => {
        const usuario = localStorage.getItem('usuario');
        const fecha = fechaRef.current.value
        if (!fecha) {
            toast.error("fecha vacia");
            return ;
        }
        console.log(fecha);
        let fechaEvento = new Date(fecha).toISOString().slice(0, 10);
        if (fechaEvento > hoy) {
            toast.error("fecha es posterior actual");
            return ;
        }
        let evento = {
            idUsuario: Number(usuario),
            idCategoria: Number(categoriaRef.current.value),
            fecha: fecha.replace("T", " "),
            detalle: detallesRef.current.value
        }

        fetch('https://babytracker.develotion.com/eventos.php', {
            method: 'POST',
            body: JSON.stringify(evento),
            headers: {
                'Content-Type': 'application/json',
                'apikey': localStorage.getItem('token'),
                'iduser': localStorage.getItem('usuario'),
            },
        })
        .then(response => response.json())
        .then(json => {
            if (json.codigo === 200) {
                evento.id = json.idEvento;
                dispatch(agregarEvento(evento));
                setExito("Evento agregado exitosamente");
                setError(null);
            } else {
                toast.error(json.mensaje);
            }
        })
        .catch(error => {
            toast.error('Fallo en el registro: ' + error.message);
        });
    }

    return (
        <div className="agregar">

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {exito && <p style={{ color: 'green' }}>{exito}</p>}

            <label htmlFor={idCategoria}>Categoría:</label>  <></>
            <select ref={categoriaRef} id={idCategoria}>
                {categorias.length > 0 ? (
                    categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.tipo}
                        </option>
                    ))
                ) : (
                    <option>Cargando categorías...</option>
                )}
            </select><br/> 
            <br></br>

            <label htmlFor={idFecha}>Fecha:</label>
            <input type="datetime-local" ref={fechaRef} id={idFecha} /><br/>
            <br></br>
            <label htmlFor={idDetalles}>Detalles:</label>
            <input type="text" ref={detallesRef} id={idDetalles} /><br/>
            <br></br>
            <input type="button" value="Agregar Evento" onClick={guardarEvento} />
        </div>
    );
}

export default Agregar;
