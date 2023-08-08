import './CardCart.css'

const CardCart = () => {//image, title, description, price) => {
    return(
        <div className='tarjeta'>
            <img src='imagen' alt={'titulo'} className='tarjeta-imagen' />
            <div className='tarjeta-contenido'>
                <h3 className='tarjeta-titulo'>{'title'}</h3>
                <p className='tarjeta-descripcion'>{'description'}</p>
                <p className='tarjeta-precio'>{'price'}</p>
            </div>

        </div>
    )
}


export default CardCart;