import { Routes, Route, Navigate, HashRouter} from 'react-router-dom';
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
import { Login } from './pages/Login';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import { MenuSlide } from './components/MenuSlide';

export function App(){

  return(
    <>
      <MenuSlide></MenuSlide>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/inicio"/>}/>
          <Route path="/inicio" element={<HomePage />}></Route>
          <Route path="/inicio/:id" element={<OneProjectPage />}></Route>
          <Route path="/estudio/proyecto/:id" element={<OneProjectPage />}></Route>
        </Routes>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route element={<PrivateRoutes />}>
              <Route path="/estudio" element={<AdminPage />}></Route>
              {/* Proyectos */}
              <Route path='/estudio/proyectos/nuevo' element={<NewProjectPage />}></Route>
              <Route path="/estudio/proyectos/:id" element={<NewProjectPage />}></Route>
              {/* Arquitectos */}
              <Route path="/estudio/arquitectos" element={<ArquitectosPage />}></Route>
              <Route path="/estudio/arquitectos/nuevo" element={<NewArquitectoPage />}></Route>
              <Route path="/estudio/arquitectos/:id" element={<NewArquitectoPage />}></Route>
              {/* Clientes */}
              <Route path='/estudio/clientes' element={<ClientsPage />}></Route>
              <Route path='/estudio/clientes/:id' element={<OneClient />}></Route>
            </Route>
          </Routes>
        </AuthProvider>
        <Toaster />
      </HashRouter>
    </>
  );
} 