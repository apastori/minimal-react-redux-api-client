/* eslint-disable */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { desloguearUsuario } from '../features/usuarioSlice';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();

  const manejarLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    console.log("deslogueado");
    dispatch(desloguearUsuario());
    navigate("/login");
  };

  return (
    <div>

      <button onClick={manejarLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Logout;
