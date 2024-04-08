import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Producto from '../models/Producto';
import ProductosService from '../services/ProductosService';
import RenglonTablaProductos from './RenglonTablaProductos';

export default function TablaProductos() {
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
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>Color</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Fecha Actualizacion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map(producto => (
                            <RenglonTablaProductos
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    }
                </tbody>
            </Table>
        </>
    );
}
