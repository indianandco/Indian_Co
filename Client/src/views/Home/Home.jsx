import "./Home.css"
import { NavLink } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

const Home = () => {

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="home_container">
            <div className="banners_container">
                <Carousel>
                    <Carousel.Item interval={5000}>
                        <NavLink to="/products" className="Link">
                            <Image src="carrousel1.png" fluid />
                        </NavLink>
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <Image src="carrousel2.png" fluid />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <Image src="carrousel3.png" fluid />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div className="titleHome">
                    <h3 className="SubTitleHome">100% NATURAL</h3>
                    <h1 className="TitleHome">Armonización Decoración & Diseño</h1>
                    <p className="TextHome">¡Asegurá tu bienestar con nuestros únicos aromas 100% naturales!</p>
                </div>
                <NavLink to="/products" className="Link" onClick={scrollToTop}>
                    <div className="BannerHome2">
                        <div className="ContainerBannerHome2">
                            <div className="ContainerImageHome1">
                                <img className="imageHome" src='BannerHomeImage1.webp' alt=""></img>
                            </div>
                            <div className="ContainerBoxHome">
                                <h3 className="SubTitleHome2">NUESTROS PRODUCTOS</h3>
                                <h1 className="TitleHome2">DESCUBRE NUEVOS AROMAS</h1>
                                <p className="TextHome2">Nuestro laboratorio de esencias se mantiene en constante movimiento intentando despertar todos los sentidos mediante los diferentes aromas logrados a través de la mezcla de aceites esenciales de pura calidad. De esta manera lanzamos aromas propios con la intensidad justa para armonizar tus espacios.</p>
                            </div>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/About" className="Link" onClick={scrollToTop}>
                    <div className="BannerHome3">
                        <div className="ContainerBannerHome2">
                            <div className="ContainerBoxHome">
                                <h3 className="SubTitleHome2">SOBRE NOSOTROS</h3>
                                <h1 className="TitleHome2">LO QUE NOS HACE ÚNICOS</h1>
                                <p className="TextHome2">La calidad de los productos, su presentación, el toque delicado y decorativo son parte fundamental de la marca y nos distinguen en el mercado de la aromaterapia, la decoración y la distinción de los espacios.</p>
                            </div>
                            <div className="ContainerImageHome1">
                                <img className="imageHome" src="BannerHomeImage2.webp" alt=""></img>
                            </div>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/products" className="Link" onClick={scrollToTop}>
                    <div className="BannerHome4">
                        <div className="PaddingTitleHome">
                            <div>
                                <h1 className="titleHome">Esencias de Calidad 100% BIO</h1>
                            </div>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/contact" className="Link" onClick={scrollToTop}>
                    <div className="BannerHome3">
                        <div className="ContainerBannerHome2">
                            <div className="ContainerImageHome1">
                                <img className="imageHome" src="BannerHomeImage3.webp" alt=""></img>
                            </div>
                            <div className="ContainerBoxHome">
                                <h3 className="SubTitleHome2">PONTE EN CONTACTO</h3>
                                <h1 className="TitleHome2">DÓNDE COMPRAR LOS PRODUCTOS</h1>
                                <p className="TextHome2">Visita nuestra tienda online; encontraras el link en el menu de nuestra web, contáctanos por Instagram o Facebook</p>
                            </div>
                        </div>
                    </div>
                </NavLink>
            </div>
        </div >
    )
}

export default Home;