/* eslint-disable */

import React, { useEffect, useId, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { loguearUsuario } from '../features/usuarioSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = () => {

  const navigate= useNavigate();

  const dispatch = useDispatch()

  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);

 /* useEffect(() => {
    if (localStorage.getItem('usuario') != null && localStorage.getItem('token') != null) {
        navigate("/dashboard"); 
    }
}, []);
*/
useEffect(() => {
  // Verificar si el usuario ya está logueado
  const usuario = localStorage.getItem('usuario');
  if (usuario) {
    setExito('Usuario ya está logueado');
  }
}, []);

  const manejarLogin = (e) => {
    e.preventDefault();


    fetch('https://babytracker.develotion.com/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario: nombreUsuario,
        password: contraseña
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.codigo === 200) {
          const { id, apiKey } = data;
          localStorage.setItem('usuario', id);
          localStorage.setItem('token', apiKey);
          setError(null);
          toast("Exito en el login");
          dispatch(loguearUsuario());
          // Redirigir:
          navigate("/");
        } else {
          setError('Fallo en el login: ' + data.mensaje);
        }
      })
      .catch(error => {
        setError('Fallo en el login: ' + error.message);
      });



    }
  return (
    <div>

<h2>Login</h2>
{error && <p style={{ color: 'red' }}>{error}</p>}
{exito && <p style={{ color: 'green' }}>{exito}</p>}
<form onSubmit={manejarLogin}>
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
  <button type="submit" disabled={!nombreUsuario || !contraseña}>
    Ingresar
  </button>
</form>

    </div>
  )
}
export default Login




