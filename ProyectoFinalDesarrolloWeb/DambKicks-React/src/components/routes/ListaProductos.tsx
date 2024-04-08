import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TablaProductos from '../TablaProductos';
import './scss/ListaProductos.scss';

export default function ListaProductos() {
    const navigate = useNavigate();

    function navegarARegistroProducto() {
        navigate('/productos/registrar');
    }

    return (
        <>
            <div className="lista-productos">
                <div className="encabezado">
                <h3>Productos Disponibles</h3>
                <div className="boton text-end">
                    <Button 
                        variant="primary"
                        onClick={navegarARegistroProducto}
                        className="text-end"
                    >
                        Registar Producto
                    </Button>
                    </div>
                </div>
                <TablaProductos />
            </div>
        </>
    );
}
