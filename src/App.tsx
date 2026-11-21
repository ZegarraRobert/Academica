import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './Componentes/Menu'
import AlumnosAxios from './Componentes/AlumnosAxios'
import AlumnosAlova from './Componentes/AlumnosAlova'
import Cursos from './Componentes/Cursos'

function App() {

  return (
    <>
      <BrowserRouter>
        <h1>Gestion Academica</h1>
        <Menu />

        <Routes>
          <Route path='/AlumnosAxios' element={<AlumnosAxios />} />
          <Route path='/AlumnosAlova' element={<AlumnosAlova />} />
          <Route path='/Cursos' element={<Cursos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App