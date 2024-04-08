import { useNavigate } from 'react-router-dom';
import Producto from '../models/Producto';
import './scss/RenglonTablaProductos.scss';

interface RenglonTablaProductosProps {
    producto: Producto
}

export default function RenglonTablaProductos(
    { producto }: RenglonTablaProductosProps
) {

    const navigate = useNavigate();

    function navegarADetalleDeProducto() {
        navigate(`/productos/${producto.id}`);
    }

    return (
        <>
            <tr className='renglon-tabla-productos' onClick={navegarADetalleDeProducto}>
                <td>{producto.modelo}</td>
                <td>{producto.marca}</td>
                <td>{producto.color}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.precio}</td>
                <td>{producto.fechaActualizacion.toDateString()}</td>
            </tr>
        </>
    );
}