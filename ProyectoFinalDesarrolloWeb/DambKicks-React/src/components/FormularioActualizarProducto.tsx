import { Form, Button, Modal } from "react-bootstrap";
import { useState, ChangeEvent, FormEvent } from "react";
import Producto from "../models/Producto";
import { useNavigate } from "react-router-dom";
import ActualizarProductoTask from "../tasks/ActualizarProductoTask";
import ProductosService from "../services/ProductosService";

interface FormularioActualizarProductoProps {
    producto: Producto;
}

export default function FormularioActualizarProducto(
    { producto }: FormularioActualizarProductoProps
) {

    const [modelo, setModelo] = useState(producto.modelo);
    const [marca, setMarca] = useState(producto.marca);
    const [color, setColor] = useState(producto.color);
    const [cantidad, setCantidad] = useState(producto.cantidad)
    const [precio, setPrecio] = useState(producto.precio);

    const navigate = useNavigate();

    const borrar = () => {
        try {
            const tokenSesion = localStorage.getItem('tokenSesion');
            if(!tokenSesion){
                throw new Error('ErrorSesionExpiradaOInvalida');
            }
    
            const servicioProductos = new ProductosService(tokenSesion);
            servicioProductos.eliminar(producto);
            navigate('/productos');
        } catch (e) {
            if(e instanceof Error){
                switch(e.message){
                    case 'ErrorSesionExpiradaOInvalida':
                        //navegar a inicio sesion
                        navigate('/inicioSesion');
                        return;
                    case 'ErrorProductoNoEncontrado':
                        window.alert('Producto no encontrado');
                        //navegar a /autos
                        navigate('/productos');
                        return;
                    default:
                        window.alert('Ha ocurrido un error desconocido');
                        //navegar a /autos
                        navigate('/productos');
                        return;
                }
            }
        }
    } 

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
                    setCantidad(parseFloat(valor));
                    break
                case 'precio':
                    setPrecio(parseFloat(valor));
            }
        }

        async function handleFormSubmit(event: FormEvent){
            event.preventDefault();
            try{
                const productoPorActualizar = producto
                productoPorActualizar.modelo = modelo
                productoPorActualizar.marca = marca
                productoPorActualizar.color = color
                productoPorActualizar.cantidad = cantidad
                productoPorActualizar.precio = precio
                
                const actualizarProductoTask = new ActualizarProductoTask(
                    productoPorActualizar
                );
    
                await actualizarProductoTask.execute();
                navigate(`/productos/:${producto.id}`);
                window.alert('El producto se ha actualizado');
            }catch(e){
                switch((e as Error).message){
                    case'ErrorSesionExpiradaOInvalida': 
                        localStorage.removeItem('tokenSesion');
                        navigate('/inicioSesion');
                    break;
    
                    case'ErrorFormularioIncompleto': 
                        window.alert('Olvidaste completar todos los campos del formulario');
                    break;
    
                    case'ErrorModeloDuplicado': 
                        window.alert('Ya existe un producto con el mismo modelo');
                    break;
    
                    default: window.alert('Ha ocurrido un error desconocido');
                }
            }
        }

        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

    return(
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
                    id="txtSubmarca"
                    type="text"
                    name="submarca"
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
                Actualizar
            </Button>
            <Button variant="danger" onClick={handleShow}>
            Eliminar
            </Button>
        </Form>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Desea eliminar este auto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={borrar}>Si, eliminar</Button>
        </Modal.Footer>
      </Modal>
        </>
    );
}