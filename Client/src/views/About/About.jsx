import Image from 'react-bootstrap/esm/Image';
import { NavLink } from 'react-router-dom';
import './About.css'

const About = () => {
    return (
        <>
            <NavLink to="/products" className="LinkAbout">
                <Image className='imageAbout' src="carrousel3.jpg" fluid />
            </NavLink>
            <div className='BoxAboutAll'>
                <div className='BoxAbout1'>
                    <Image alt='' className='imageAbout1' fluid src='/MezclaAbout.jpg' />
                    <div className='BoxAboutDesc1'>
                        <h1 className='h1TitleAboutDesc'>Hecho a mano</h1>
                        <p>¡En nuestra empresa, nos enorgullece decir que nuestros productos son hechos a mano con amor y dedicación! Cada artículo que creamos es cuidadosamente elaborado por nosotros, desde la selección de los mejores materiales hasta el detallado acabado final. Esta atención meticulosa al detalle asegura que cada uno de nuestros productos sea único y de calidad inigualable.</p>
                    </div>
                </div>
                <div className='BoxAbout2'>
                    <Image alt='' className='imageAbout1' fluid src='/carousel1.webp' />
                    <div className='BoxAboutDesc2'>
                        <h1 className='h1TitleAboutDesc'>Calidad</h1>
                        <p>La calidad de nuestros productos es una prioridad fundamental. Nos esforzamos por ofrecer a nuestros clientes productos que no solo sean bonitos de ver, sino también duraderos y funcionales para garantizar la resistencia y longevidad de nuestros artículos. Realizamos rigurosas pruebas y evaluaciones para asegurarnos de cumplir con nuestros estándares antes de que lleguen a manos de nuestros clientes. Por eso, podemos afirmar con confianza que la calidad de nuestros productos está garantizada y satisfacerá  incluso a los clientes más exigentes.</p>
                    </div>
                </div>
                <div className='BoxAbout1'>
                    <Image alt='' className='imageAbout1' fluid src='/carrousel2.jpg' />
                    <div className='BoxAboutDesc1'>
                        <h1 className='h1TitleAboutDesc'>Sustentable</h1>
                        <p>Nuestros productos se destacan por su enfoque en la sostenibilidad ofreciendo soluciones que sean respetuosas con el medio ambiente. Desde el diseño hasta la producción, utilizamos materiales reciclables. Nuestro compromiso es proporcionar productos de alta calidad que no solo cumplan con las expectativas de nuestros clientes, sino que también sean amigables con el planeta.</p>
                    </div>
                </div>
                <div className='BoxAbout2'>
                    <Image alt='' className='imageAbout1' fluid src='/AboutAbout.jpg' />
                    <div className='BoxAboutDesc2'>
                        <h1 className='h1TitleAboutDesc'>Sobre nosotros</h1>
                        <p>Somos Pato y Pablo, ambos trabajadores en salud, pero aficionados a los aromas. Comenzamos nuestro proyecto realizando velas de cera de soja, pero fuimos perfeccionando nuestros conocimientos en fragancias y así surgieron muchos de los productos que hoy comercializamos. Toda la elaboración es hecha a mano por nosotros, desde la elección de las materias primas hasta el diseño de los etiquetados. Es x eso que creemos que el resultado de nuestro trabajo, es de alta calidad ya que esta basado en nuestra dedicación y esfuerzo por ofrecer lo mejor en nuestros productos.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;