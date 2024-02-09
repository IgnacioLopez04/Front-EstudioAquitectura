import { BrowserRouter, Routes, Route, Navigate, HashRouter} from 'react-router-dom';
import { HomePage} from './pages/Homes/HomePage';
import { AdminPage} from './pages/Homes/AdminPage';
import { NewProjectPage } from './pages/Proyectos/NewProjectPage';
import { ArquitectosPage } from './pages/Arquitectos/ArquitectosPage';
import { NewArquitectoPage } from './pages/Arquitectos/NewArquitectoPage';
import { ClientsPage } from './pages/Clientes/ClientsPage';
import { Toaster } from 'react-hot-toast'
import './App.css';
import { OneClient } from './pages/Clientes/OneClient';
import { OneProjectPage } from './pages/Proyectos/OneProjectPage';

export function App(){
  return(
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio"/>}/>
        <Route path="/inicio" element={<HomePage />}></Route>
        <Route path="/estudio" element={<AdminPage />}></Route>
        {/* Proyectos */}
        <Route path='/estudio/proyectos/nuevo' element={<NewProjectPage />}></Route>
        <Route path="/estudio/proyectos/:id" element={<NewProjectPage />}></Route>
        <Route path="/estudio/proyecto/:id" element={<OneProjectPage />}></Route>
        <Route path="/inicio/:id" element={<OneProjectPage />}></Route>
        {/* Arquitectos */}
        <Route path="/estudio/arquitectos" element={<ArquitectosPage />}></Route>
        <Route path="/estudio/arquitectos/nuevo" element={<NewArquitectoPage />}></Route>
        <Route path="/estudio/arquitectos/:id" element={<NewArquitectoPage />}></Route>
        {/* Clientes */}
        <Route path='/estudio/clientes' element={<ClientsPage />}></Route>
        <Route path='/estudio/clientes/:id' element={<OneClient />}></Route>
      </Routes>
    </HashRouter>

    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Navigate to="/inicio"/>}/>
    //     <Route path="/inicio" element={<HomePage />}></Route>
    //     <Route path="/estudio" element={<AdminPage />}></Route>
    //     {/* Proyectos */}
    //     <Route path='/estudio/proyectos/nuevo' element={<NewProjectPage />}></Route>
    //     <Route path="/estudio/proyectos/:id" element={<NewProjectPage />}></Route>
    //     <Route path="/estudio/proyecto/:id" element={<OneProjectPage />}></Route>
    //     <Route path="/inicio/:id" element={<OneProjectPage />}></Route>
    //     {/* Arquitectos */}
    //     <Route path="/estudio/arquitectos" element={<ArquitectosPage />}></Route>
    //     <Route path="/estudio/arquitectos/nuevo" element={<NewArquitectoPage />}></Route>
    //     <Route path="/estudio/arquitectos/:id" element={<NewArquitectoPage />}></Route>
    //     {/* Clientes */}
    //     <Route path='/estudio/clientes' element={<ClientsPage />}></Route>
    //     <Route path='/estudio/clientes/:id' element={<OneClient />}></Route>
    //   </Routes>
    //   <Toaster />
    // </BrowserRouter>
  );
} 