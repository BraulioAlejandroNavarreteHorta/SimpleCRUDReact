import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, ListGroup, Container, Row, Col } from 'react-bootstrap';
import Producto from '../models/Producto';
import ProductosService from '../services/ProductosService';
import RenglonTablaProductos from './RenglonTablaProductos';
import CardProductos from './CardProductos';
import AppNavbar from './AppNavbar';
import Footer from './Footer';

export default function CatalogoProductos() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [productos, setProductos] = useState<Producto[]>([]);
    const navigate = useNavigate();

    async function cargarProductos() {
        try {
            const tokenSesion = localStorage.getItem('tokenSesion');

            if (!tokenSesion) {
                navigate('/inicioSesion');
                return;
            }

            const servicioProductos = new ProductosService(tokenSesion);
            const listaProductos = await servicioProductos.obtenerLista();

            setProductos(listaProductos);
            setIsLoaded(true);
        } catch (e) {
            if (
                e instanceof Error
                && e.message === 'ErrorSesionExpiradaOInvalida'
            ) {
                navigate('/inicioSesion');
            }
        }
    }

    useEffect(() => {
        if (!isLoaded) {
            cargarProductos();
        }
    });

    if (!isLoaded) {
        return <>Loading...</>;
    }

    return (
        <>
            <AppNavbar/>
            <br/>
            <br/>
            <Container className="text-center">
                <h2>Catálogo</h2>
                <br/>
            </Container>
            <Container >
            <Container className="row container-fluid text-center mx-0 mb-5">
            
            
                
            {
                        productos.map(producto => (
                            <CardProductos
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                        
                    }
            
            </Container>
            </Container>

            <Footer/>
            
        </>

    
  
    );
}
