import { FormEvent, ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import RegistrarUsuarioTask from '../tasks/RegistrarUsuarioTask';

export default function FormularioRegistro() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState(0);
    const [password, setPassword] = useState('');
    const [verificarPassword, setVerificarPassword] = useState('');
    const navigate = useNavigate();

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            const registrarUsuarioTask = new RegistrarUsuarioTask({
                nombreUsuario,
                nombre,
                apellidos,
                correo,
                telefono,
                password,
                verificarPassword
            });

            await registrarUsuarioTask.execute();

            navigate('/home');
        } catch (e) {
            switch ((e as Error).message) {
                case 'ErrorFormularioIncompleto':
                    window.alert('Olvidaste completar todos los campos del formulario');
                    break;
                case 'ErrorPasswordsNoCoinciden':
                    window.alert('Las passwords no coinciden');
                    break;
                case 'ErrorNombreUsuarioDuplicado':
                    window.alert('El nombre de usuario que seleccionaste ya existe');
                    break;
                default:
                    window.alert('Ha ocurrido un error desconocido');
            }
        }
    }

    function handleNombreUsuarioChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorNombreUsuario = event.target.value;
        setNombreUsuario(valorNombreUsuario);
    }

    function handleNombreChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorNombre = event.target.value;
        setNombre(valorNombre);
    }

    function handleApellidosChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorApellidos = event.target.value;
        setApellidos(valorApellidos);
    }

    function handleCorreoChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorCorreo = event.target.value;
        setCorreo(valorCorreo);
    }

    function handleTelefonoChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorTelefono = event.target.value;
        setTelefono(parseInt(valorTelefono));
    }

    function handlePasswordChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorPassword = event.target.value;
        setPassword(valorPassword);
    }

    function handleVerificarPasswordChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valorVerificarPassword = event.target.value;
        setVerificarPassword(valorVerificarPassword);
    }

    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="txtNombreUsuario">
                        Nombre Usuario:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="nombreUsuario"
                        id="txtNombreUsuario"
                        value={nombreUsuario}
                        onChange={handleNombreUsuarioChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="txtNombre">
                        Nombre:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        id="txtNombre"
                        value={nombre}
                        onChange={handleNombreChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="txtApellidos">
                        Apellidos:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="apellidos"
                        id="txtApellidos"
                        value={apellidos}
                        onChange={handleApellidosChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="txtCorreo">
                        Correo:
                    </Form.Label>
                    <Form.Control
                        type="email"
                        name="correo"
                        id="txtCorreo"
                        value={correo}
                        onChange={handleCorreoChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="txtTelefono">
                        Telefono:
                    </Form.Label>
                    <Form.Control
                        type="number"
                        name="telefono"
                        id="txtTelefono"
                        value={telefono}
                        onChange={handleTelefonoChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="txtPassword">
                        Password:
                    </Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        id="txtPassword"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="txtVerificarPassword">
                        Verificar Password:
                    </Form.Label>
                    <Form.Control
                        type="password"
                        name="verificarPassword"
                        id="txtVerificarPassword"
                        value={verificarPassword}
                        onChange={handleVerificarPasswordChange}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Registrar
                </Button>
            </Form>
        </>
    );
}
