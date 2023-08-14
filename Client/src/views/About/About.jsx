import './About.css'

const About = () => {
    return (
        <div className='allAbout'>
            <div className='headerAbout'>
                <div className='title'>
                    <h3 className='h3About'>DESCUBRE NUESTRA HISTORIA</h3>
                    <h1 className='h1About'>CÓMO COMENZO TÓDO</h1>
                </div>
            </div>
            <div className='footerAbout'>
                <div className='desc'>
                    <div className='box'>
                        <div className='box-1'>
                            <div className='smallBox'>
                                <h4 className='h4About'>CONOCE A INDIAN & Co.</h4>
                                <h2 className='textTitle'>Patricia Lahitou & Pablo Tenutto</h2>
                            </div>
                            <img className='img' style={{ borderRadius: "6px", border:"1px solid black" }} src='https://e7cd32bc42.cbaul-cdnwnd.com/23b7a5417eeb451f0e9a0b7164536dc8/200000034-4a2464a249/pexels-photo-5760907-2.webp?ph=e7cd32bc42' alt=""></img>
                            <div className='smallBox'>
                                <p className='pAbout'>Nuestro proyecto comienza con la fabricación de velas de soja 100% artesanales, sin parafina ni grasa animal.</p>
                                <p className='pAbout'>Con envases totalmente reciclables, de manera que al consumirse pueden ser rellenados con los mismos o distintos aromas disponibles al momento de su refill.</p>
                            </div>
                            <div className='smallBox'>
                                <h4 className='h4About'><strong>Seguimos trabajando...</strong></h4>
                            <p className='pAbout'>Incorporamos nuestros difusores aromáticos en envases de vidrio, con esencias puras que nos garantizan un mayor perfume y sin residuos.</p>
                            <p className='pAbout'>... y así decidimos seguir con nuestra producción de Spray textiles creando nuestras propias fragancias garantizando de esta manera un producto original y de máxima calidad.</p>
                            <p className='pAbout'>Nos dedicamos personalmente en la elección de aromas que nos ayudan a brindar productos únicos.</p>
                            </div>
                        </div>
                        <div className='box-3'>
                            <div className='smallBox'>
                                <h2 className='textTitle'>DATOS IMPORTANTES</h2>
                            </div>
                            <div className='smallBox'>
                                <p className='pAbout'>Nuestro emprendimiento 2021</p>
                            </div>
                            <div className='smallBox'>
                                <p className='pAbout'>Siempre nos han gustado las velas. La limpieza de la casa no parece haber terminado hasta que las almohadas del sofá se esponjan y se enciende una vela.</p>
                                <p className='pAbout'>Vienen invitados? Asegúrate de que un par de velas colocadas estratégicamente estén encendidas para ambientar y refrescar tu espacio.</p>
                                <p className='pAbout'>Una cita romantica? Velas</p>
                                <p className='pAbout'>Nos encanta la forma en que se ven y huelen, y es por eso que nos decidimos a comenzar con este nuevo proyecto para compartir con ustedes lo que nos gusta.</p>
                                <p className='pAbout'>Lo hacemos con mucho amor, dedicación y sobre todo perfeccionismo para llevar a sus hogares los mejores productos que no solo embellecen sus espacios si no que con sus aromas otorgan una armonía al ambiente y permiten sensaciones placenteras.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;