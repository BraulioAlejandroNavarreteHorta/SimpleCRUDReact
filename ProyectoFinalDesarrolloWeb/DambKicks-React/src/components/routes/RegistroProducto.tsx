import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import FormularioRegistroProducto from '../FormularioRegistroProducto';

export default function RegistroProducto() {
    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3}}>
                    <h3>Registrar Producto</h3>
                    <Link to="/productos">&lt; Regresar</Link>
                    <Card>
                        <Card.Body>
                            <FormularioRegistroProducto />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}