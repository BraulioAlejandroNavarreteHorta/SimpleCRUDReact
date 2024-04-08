import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './components/routes/Home';
import Productos from './components/routes/Productos';
import RegistroUsuario from './components/routes/RegistroUsuario';
import InicioSesion from './components/routes/InicioSesion';
import ListaProductos from './components/routes/ListaProductos';
import RegistroProducto from './components/routes/RegistroProducto';
import DetalleProducto from './components/routes/DetalleProducto';
import DambKicks from './components/DambKicks';
import CardProductos from './components/CardProductos';
import CatalogoProductos from './components/CatalogoProductos';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        index: true,
        element: <Navigate to="/registro" />
      },
      {
        path: '/registro',
        element: <RegistroUsuario />
      },
      {
        path: '/inicioSesion',
        element: <InicioSesion />
      }
    ]
  },
  {
    path: '/home',
    element: <DambKicks/>
  },
  {
    path: '/catalogo',
    element: <CatalogoProductos/>
  },
  {
    path: '/productos',
    element: <Productos />,
    children: [
      {
        path: '/productos',
        index: true,
        element: <ListaProductos />
      },
      {
        path: '/productos/registrar',
        element: <RegistroProducto/>
      },
      {
        path:'/productos/:idProducto',
        element: <DetalleProducto/>
      }
    ]
  }
]);

export default function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}
