import { useNavigate } from 'react-router-dom';
import Producto from '../models/Producto';
import { Table, Card, ListGroup, Container, Col, Row } from 'react-bootstrap';
import './scss/RenglonTablaProductos.scss';

interface CardProductosProps {
    producto: Producto
}

export default function CardProductos(
    { producto }: CardProductosProps
) {

    const navigate = useNavigate();

    function navegarADetalleDeProducto() {
        navigate(`/productos/${producto.id}`);
    }

    return (
        <>
        <Col md={4}>
            <ListGroup variant="dark" onClick={navegarADetalleDeProducto}>
                <ListGroup.Item><h4>{producto.modelo}</h4></ListGroup.Item>
                <ListGroup.Item>{'Marca : ' + producto.marca}</ListGroup.Item>
                <ListGroup.Item>{'Color : ' + producto.color}</ListGroup.Item>
                <ListGroup.Item>{'Precio : ' + '$' + producto.precio}</ListGroup.Item>
            </ListGroup>
            <br/>  
            </Col>
            
            
        </>
        
    );
}