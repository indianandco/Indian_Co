import "./Home.css"
import { NavLink } from "react-router-dom";


const Home = () => {

    const scrollToTop = () => {
        window.scrollTo(0, 0);
      };

    return (
        <div className="home_container">
            <div className="banners_container">
                <NavLink to="/products" className="Link">
                    <div className="BannerHome1">
                        <div className="PaddingTitleHome">
                            <div className="titleHome">
                                <h3 className="SubTitleHome">100% NATURAL</h3>
                                <h1 className="TitleHome">Armonización Decoración &Diseño</h1>
                                <p className="TextHome">¡Asegurá tu bienestar con nuestros únicos aromas 100% naturales!</p>
                            </div>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/products" className="Link" onClick={scrollToTop}>
                    <div className="BannerHome2">
                        <div className="ContainerBannerHome2">
                            <div className="ContainerImageHome1">
                                <img className="imageHome" src='../../../public/BannerHomeImage1.webp' alt=""></img>
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
                                <img className="imageHome" src="../../../public/BannerHomeImage2.webp" alt=""></img>
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
                                <img className="imageHome" src="../../../public/BannerHomeImage3.webp" alt=""></img>
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
        </div>
    )
}

export default Home;