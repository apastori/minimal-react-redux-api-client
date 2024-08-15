/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { loguearUsuario } from '../features/usuarioSlice';

const  Contenedor = () => {

  const usuarioLogueado = useSelector((state) => state.usuario.usuarioLogueado)

  const dispatch = useDispatch();

  useEffect(() => {
    // Verificar si el usuario ya está logueado
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      dispatch(loguearUsuario());
    }
  }, []);

  return (
    <div>
         <header>
            <h1>Aplicacion</h1>
            <nav>

                {
                  usuarioLogueado ?
                  (
                    <>
                      <NavLink to="/logout">Logout</NavLink>
                    </>
                  ) :                  
                  (
                    <>
                      <NavLink to="/registro">Registro</NavLink> |
                      <NavLink to="/login">Login</NavLink> 
                    </>
                  )
              }
            </nav>
         </header>
         <main>
            <Outlet/>
         </main>
    </div>
  )
}

export default  Contenedor