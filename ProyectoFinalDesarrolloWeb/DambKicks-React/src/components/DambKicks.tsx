import { Carousel, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Producto from '../models/Producto';
import AppNavbar from './AppNavbar';
import ProductosService from '../services/ProductosService';
import Footer from './Footer';
import Banner1 from './img/Banner1_GatoradeXJordan.jpg';
import Banner2 from './img/Banner2_Jordan3Gold.jpg';
import Banner3 from './img/Banner3_Jordan1Taxi.jpg';

export default function DambKicks() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [productos, setProductos] = useState<Producto[]>([]);
    const navigate = useNavigate();

    async function cargarProductos() {
        try {
            const tokenSesion = localStorage.getItem('tokenSesion');

            if (!tokenSesion) {
                navigate('/inicioSesion');
                return;
            }

            const servicioProductos = new ProductosService(tokenSesion);
            const listaProductos = await servicioProductos.obtenerLista();

            setProductos(listaProductos);
            setIsLoaded(true);
        } catch (e) {
            if (
                e instanceof Error
                && e.message === 'ErrorSesionExpiradaOInvalida'
            ) {
                navigate('/inicioSesion');
            }
        }
    }

    useEffect(() => {
        if (!isLoaded) {
            cargarProductos();
        }
    });

    if (!isLoaded) {
        return <>Loading...</>;
    }
    
    return (
        <>
            <AppNavbar/>
            <Container fluid>
                <h1 className="text-center">Noticias de próximos lanzamientos</h1>
            </Container>
                <Container fluid>
                    <Carousel>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={Banner1}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h3>Gatorade X Jordan</h3>
                            <p>Próximamente las nuevas zapatillas de Jordan en colaboración con Gatorade</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={Banner2}
                            alt="Second slide"
                            />

                            <Carousel.Caption>
                            <h3>Jordan 3 Gold</h3>
                            <p>Próximamente viste de lujo con los nuevos Jordan 3 Gold, ¿Fofo eres tú?</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                            className="d-block w-100"
                            src={Banner3}
                            alt="Third slide"
                            />

                            <Carousel.Caption>
                            <h3>Jordan 1 Taxi</h3>
                            <p>
                                Calles, smoke, metrópolis, ¿Acaso hablamos de Taxi?
                            </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>                    
                </Container>
                <br/>
                <br/>
                <br/>

<Container fluid className="container" id="contenedor">

            <Container className="row justify-content-center mb-5">
                <Container className="container-fluid py-0 px-5 px-md-3">
                    <p className="text-center">
                        ÍCONOS SON AQUELLOS QUE HAN TRASCENDIDO Y LOGRADO SUPERAR AL PASO DEL TIEMPO, ESTOS SON DE ESOS
                        TENIS QUE PUEDES USAR TODA LA VIDA, A CUALQUIER EDAD Y CON TODOS LOS LOOKS QUE TE PUEDAS IMAGINAR
                    </p>
                </Container>
            </Container>

            <Container className="row text-center mb-5">
                <Container className="col-12 col-md-4">
                    <img className="img-fluid" src="https://cdn.shopify.com/s/files/1/2636/5824/files/WhatsApp_Image_2022-11-03_at_4.08.37_PM_1_540x.jpg?v=1667514578" alt="STEVE MADDEN" />
                    <p>AIR MAX</p>
                </Container>
                <Container className="col-12 col-md-4">
                    <img className="img-fluid" src="https://cdn.shopify.com/s/files/1/2636/5824/files/WhatsApp_Image_2022-10-20_at_2.06.56_PM_540x.jpg?v=16662942" alt="..."/>
                    <p>FORUM</p>
                </Container>
                <Container className="col-12 col-md-4">
                    <img className="img-fluid" src="https://cdn.shopify.com/s/files/1/2636/5824/files/IMG_0389_540x.jpg?v=1666217326" alt="" />
                    <p>AIR FORCE 1</p>
                </Container>
            </Container>



            <Container className="row container-fluid text-center mx-0 mb-5">
                <Container className="col-12 col-md-4">
                    <img className="img-fluid" src="https://cdn.shopify.com/s/files/1/2636/5824/files/banner_Stan_Smith_2_540x.jpg?v=1666294311" alt="" />
                    <p>STAN SMITH</p>
                </Container>
                <Container className="col-12 col-md-4">
                    <img className="img-fluid" src="https://cdn.shopify.com/s/files/1/2636/5824/files/IMG_0366_540x.jpg?v=1666217211" alt="" />
                    <p>BLAZER</p>
                </Container>
                <Container className="col-12 col-md-4">
                    <img className="img-fluid" src="https://cdn.shopify.com/s/files/1/2636/5824/files/Banner_Super_Star_1_540x.jpg?v=1666294301" alt="" />
                    <p>SUPERSTAR</p>
                </Container>
            </Container>


</Container>

<Container fluid className="row justify-content-center mb-5">
                <Container className="container-fluid py-0 px-5 px-md-3">
                    <h2 className="text-center">
                        Productos
                    </h2>
                </Container>
</Container>

<Container fluid className="row mx-0 pb-4">
                    <Container className="col-12 col-md-6 text-end contenedor">
                        <Link to="/productos"><img className="img-fluid" src="https://cdn.shopify.com/s/files/1/2636/5824/files/CRIME_720x.jpg?v=1665501173" alt="" /></Link>
                    </Container>
                    <Container className="col-12 col-md-6 contenedor">
                        <Link to="/productos"><img className="img-fluid" src="https://cdn.shopify.com/s/files/1/2636/5824/files/MACHINA_copia_720x.jpg?v=1665501421" alt="" /></Link>
                    </Container>
</Container>
                <Footer/>
        </>
    );
}