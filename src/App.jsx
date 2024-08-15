/* eslint-disable */
import './estilos.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../src/componentes/Login"
import Registro from "../src/componentes/Registro"
import Contenedor from './componentes/Contenedor'
import NoEncontrado from './componentes/NoEncontrado'
import Logout from './componentes/Logout'
import Agregar from './componentes/Agregar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './componentes/Dashboard'
import ListadoEventos from './componentes/ListadoEventos'
import InformeEventos from './componentes/InformeEventos'
import TiempoProximoBiberon from './componentes/TiempoProximoBiberon'
import { GraficoCantCategoria } from './componentes/GraficoCantCategoria'
import GraficoComidasSemana from './componentes/GraficoComidasSemana2';

//import Menu from './componentes/Menu'   falta crearla

function App() {
  

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Contenedor/> }>
             <Route path="/login" element={ <Login/> } />
             <Route path="/registro" element={ <Registro/> } />
             <Route path="/logout" element={ <Logout/> } />
             <Route path="/agregar" element={ <Agregar/> } />
           
             <Route path="/listar" element={ <ListadoEventos/> } />
             <Route path="/informe" element={ <InformeEventos/> } />
             <Route path="/tiempoprox" element={ <TiempoProximoBiberon/> } />
             <Route path="/categoriacant" element={ <GraficoCantCategoria /> } />
             <Route path="/comidasemanaant" element={ <GraficoComidasSemana /> } /> 
             <Route path="/" element={ <Dashboard/> } />
             <Route path="*" element={ <NoEncontrado/> } />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={3000}>
      
      </ToastContainer>
    </Provider>
    </>
  )
}

export default App
