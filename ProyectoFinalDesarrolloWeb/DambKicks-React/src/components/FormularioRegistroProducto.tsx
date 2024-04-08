import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import Producto from '../models/Producto';
import RegistrarProductoTask from '../tasks/RegistrarProductoTask';


export default function FormularioRegistroProducto(){

    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [color, setColor] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [precio, setPrecio] = useState(0);
    const navigate = useNavigate();

    function handleFormControlChange(
        event: ChangeEvent<HTMLInputElement>){
            const valor = event.target.value;

            switch(event.target.name){
                case 'modelo':
                    setModelo(valor);
                    break;
                case 'marca':
                    setMarca(valor);
                    break;
                case 'color':
                    setColor(valor);
                    break;
                case 'cantidad':
                    setCantidad(parseInt(valor));
                    break;
                case 'precio':
                    setPrecio(parseFloat(valor));
            }
        }
    
    async function handleFormSubmit(event:FormEvent) {
        event.preventDefault();
        try{

            const productoPorRegistrar = new Producto(
                undefined,
                modelo,
                marca,
                color,
                cantidad,
                precio
            );

            const registrarProductoTask = new RegistrarProductoTask(
                productoPorRegistrar
            );

            await registrarProductoTask.execute();

            navigate('/productos');

        } catch (e) {

            const mensajeError = (e as Error).message;

            switch(mensajeError) 
            {
                case 'ErrorSesionExpiradaOInvalida':
                    localStorage.removeItem('tokenSesion');
                    navigate('/inicioSesion');
                    break;
                case 'ErrorFormularioIncompleto':
                    window.alert(
                        'Olvidate llenar todos los campos del formulario'
                    );
                    break;
                case 'ErrorModeloDuplicado':
                    window.alert(
                        'Ya existe un producto con el mismo nombre de modelo'
                    );
                    break;
                default:
                    window.alert('Ha ocurrido un error desconocido');

            }

        }
        
    }

    return (
        <>
        <Form onSubmit={handleFormSubmit}>
            <Form.Group>
                <Form.Label htmlFor="txtModelo">
                    Modelo</Form.Label>
                <Form.Control
                    id="txtModelo"
                    type="text"
                    name="modelo"
                    value={modelo}
                    onChange={handleFormControlChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtMarca">
                    Marca</Form.Label>
                <Form.Control
                    id="txtMarca"
                    type="text"
                    name="marca"
                    value={marca}
                    onChange={handleFormControlChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtColor">
                    Color</Form.Label>
                <Form.Control
                    id="txtColor"
                    type="text"
                    name="color"
                    value={color}
                    onChange={handleFormControlChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtCantidad">
                    Cantidad</Form.Label>
                <Form.Control
                    id="txtCantidad"
                    type="number"
                    name="cantidad"
                    value={cantidad}
                    onChange={handleFormControlChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtPrecio">
                    Precio</Form.Label>
                <Form.Control
                    id="txtPrecio"
                    type="number"
                    name="precio"
                    value={precio}
                    onChange={handleFormControlChange}
                />
            </Form.Group>
            <Button type="submit" variant="primary">
                Registrar
            </Button>
        </Form>
        </>
    );
}