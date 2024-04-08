import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import dambKicks from './img/logo DAMB.png';

export default function AppNavbar() {
    const navigate = useNavigate();

    function cerrarSesion() {
        localStorage.removeItem('tokenSesion');
        navigate('/inicioSesion');
    }

    function catalogo(){
        navigate('/catalogo');
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/home">
                        <img src={dambKicks} width="100"/>
                    </Navbar.Brand>
                    <Nav.Link>
                    <h5 className='vista-admin text-center' onClick={catalogo}>Catálogo</h5>
                    </Nav.Link>
                    <Container fluid className='text-center'>
                        <Nav.Item >
                        <h3 className='vista-admin text-center'>Vista administrador</h3>
                        </Nav.Item>
                    </Container>
                    <Nav>
                        <Nav.Link className="cerrar-sesion text-center"onClick={cerrarSesion}>Cerrar Sesion</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
