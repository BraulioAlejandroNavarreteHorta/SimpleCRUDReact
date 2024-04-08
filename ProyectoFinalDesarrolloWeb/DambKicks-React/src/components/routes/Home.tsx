import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppNavbar from '../AppNavbar';

export default function Home() {
    return (
        <>
        
        <br/>
        <br/>
            <Container fluid>
                <Outlet />
            </Container>
        </>
    );
}
