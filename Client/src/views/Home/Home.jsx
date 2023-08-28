import "./Home.css"
import { NavLink } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

const Home = () => {

    return (
        <main className="home_container">
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
                    <h1 className="TitleHome">Armonización, Decoración & Diseño</h1>
                    <p className="TextHome">¡Asegurá tu bienestar con nuestros únicos aromas 100% naturales!</p>
                </div>
                <div className="BannerHome2">
                    <div className="iconsContainer">
                        <i className="bi bi-tree iconStyle"></i>
                        <i className="bi bi-heart iconStyle"></i>
                        <i className="bi bi-award iconStyle"></i>
                    </div>
                    <div className="text_container">
                        <div className="ContainerBoxHome border-bottom">
                            <h1 className="TitleHome2">Hecho a mano</h1>
                            <p className="TextHome2">En nuestra empresa, nos enorgullece crear productos hechos a mano con amor y dedicación. Cada artículo es elaborado minuciosamente, desde la selección de los materiales hasta el acabado final, garantizando así productos únicos y de alta calidad.</p>
                        </div>
                        <div className="ContainerBoxHome border-bottom">
                            <h1 className="TitleHome2">Calidad</h1>
                            <p className="TextHome2">La calidad es primordial en nuestros productos. Nos dedicamos a brindar artículos atractivos y resistentes, sometidos a rigurosas pruebas para asegurar que cumplan nuestros estándares. Nuestra confianza en la calidad nos permite satisfacer incluso a los clientes más exigentes.</p>
                        </div>
                        <div className="ContainerBoxHome">
                            <h1 className="TitleHome2">Sustentable</h1>
                            <p className="TextHome2">Nuestro laboratorio de esencias se mantiene en constante movimiento intentando despertar todos los sentidos mediante los diferentes aromas logrados a través de la mezcla de aceites esenciales de pura calidad. De esta manera lanzamos aromas propios con la intensidad justa para armonizar tus espacios.</p>
                        </div>
                    </div>
                </div>
                <div className="our_products_container">

                </div>
            </div>
        </main >
    )
}

export default Home;