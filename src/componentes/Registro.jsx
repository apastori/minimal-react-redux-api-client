/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loguearUsuario } from '../features/usuarioSlice';

const Registro = () => {

  const dispatch = useDispatch();
  
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);

  useEffect(() => {
    
    fetch('https://babytracker.develotion.com/departamentos.php')
      .then(response => response.json())
      .then(data => {
        setDepartamentos(data.departamentos);
      })
      .catch(error => {
        console.error('Error al obtener departamentos:', error);
      });
  }, []);

  useEffect(() => {
    // Obtener ciudades para el departamento seleccionado
    if (departamento) {
      fetch(`https://babytracker.develotion.com/ciudades.php?idDepartamento=${departamento}`)
        .then(response => response.json())
        .then(data => {
          setCiudades(data.ciudades);
        })
        .catch(error => {
          console.error('Error al obtener ciudades:', error);
        });
    }
  }, [departamento]);

  const manejarRegistro = (e) => {


    fetch('https://babytracker.develotion.com/usuarios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario: nombreUsuario,
        password: contraseña,
        idDepartamento: departamento,
        idCiudad: ciudad
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.codigo === 200) {
          const { usuario, apiKey } = data;
          localStorage.setItem('usuario', JSON.stringify(usuario));
          localStorage.setItem('token', apiKey);
          setExito('¡Registro exitoso!');
          dispatch(loguearUsuario());
          setError(null);
          // Redirigir:
          navigate("/");
        } else {
          setError('Fallo en el registro: ' + data.mensaje);
          setExito(null);
        }
      })
      .catch(error => {
        setError('Fallo en el registro: ' + error.message);
        setExito(null);
      });
  };

  useEffect(() => {
    // Verificar si el usuario ya está logueado
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      setExito('Usuario ya está logueado');
    }
  }, []);

  return (
    <div>
      <h2>Registro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {exito && <p style={{ color: 'green' }}>{exito}</p>}
      <form onSubmit={manejarRegistro}>
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Departamento:</label>
          <select
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            required
          >
            <option value="">Seleccione un Departamento</option>
            {departamentos.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.nombre}
              </option>
            ))}
          </select>
        </div>
        {departamento && (
          <div>
            <label>Ciudad:</label>
            <select
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              required
            >
              <option value="">Seleccione una Ciudad</option>
              {ciudades.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.nombre}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" disabled={!nombreUsuario || !contraseña || !departamento}> Registrarse </button>
      </form>
    </div>
  );
};

export default Registro;



