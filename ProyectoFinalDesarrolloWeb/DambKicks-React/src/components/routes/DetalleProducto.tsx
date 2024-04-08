import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card } from 'react-bootstrap';
import Producto from "../../models/Producto";
import ProductosService from "../../services/ProductosService";
import FormularioActualizarProducto from "../FormularioActualizarProducto";
import { Link } from "react-router-dom";

export default function DetalleProducto() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [producto, setProducto] = useState<Producto | undefined>(undefined);
    const navigate = useNavigate();
    const { idProducto } = useParams();

    async function loadProducto() {
        //Llamamos el servicio de autos
        try{
            const tokenSesion = localStorage.getItem('tokenSesion');

            if(!tokenSesion) {
                throw new Error('ErrorSesionExpiradaOInvalida');
            }

            const id = parseInt(idProducto as string);

            if(isNaN(id)) {
                navigate('/productos');
                return;
            }

            const servicioProductos = new ProductosService(tokenSesion);
            const productoEncontrado = await servicioProductos.obtenerPorId(id);

            setProducto(productoEncontrado);
        } catch (e){
            if(e instanceof Error) {
                switch (e.message) {
                    case 'ErrorSesionExpiradaOInvalida':
                        //navegar a /inicioSesion
                        navigate('/inicioSesion')
                        return;
                    case 'ErrorProductoNoEncontrado':
                        window.alert('Producto no encontrado');
                        break;
                    default:
                        window.alert('Ha ocurrido un error desconocido');
                        //navegar a /autos
                        navigate('/productos')
                        return;
                }
            }

        }
        
        setIsLoaded(true);
    }

    useEffect(() => {
        if(!isLoaded){
            loadProducto();
        }
    });

    if(!isLoaded) {
        return <>Loading...</>;
    }

    if(!producto){
        return <h3>Error 404: Auto no encontrado.</h3>
    }
    
    return (
        <>
            <Row>
                <Col md={{span: 6, offset: 3}}>
                    <h3>{producto.modelo}</h3>
                    <Link to="/productos">&lt; Regresar</Link>
                    <Card>
                        <Card.Body>
                            <FormularioActualizarProducto producto={producto}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}