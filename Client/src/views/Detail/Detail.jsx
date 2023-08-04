import './Detail.css'
import { useContext, useEffect, useState } from "react";
import { ProductContext } from '../../services/ProductContext';
import { NavLink, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Detail = () => {

    const {id} = useParams()
    
    const { detailProducts, getDetailProducts } = useContext(ProductContext);

    const [counter, setCounter] = useState(1);

    const incrementar = () => {
        if(counter < detailProducts?.stock){
            setCounter(counter + 1);
        }
    };
  
    const restar = () => {
        if(counter > 1){
            setCounter(counter - 1);
        }
    };
    
    useEffect(() => {
        getDetailProducts(id);
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
    }

    return (
        <div className='container'>
            <div className='imageDetail'>
                <img className='imageDetails' alt="" src='/frascos.jpeg'></img>
            </div>
            <div className='containerDesc'>
                <div className='firstButtons'>
                    <NavLink className='firstButtonResponsive' to='/home'>
                        <button className='firstButton' >Inicio</button >
                    </NavLink>
                    <span className='p'>|</span>
                    <NavLink className='firstButtonResponsive' to='/products'>
                        <button className='firstButton' >Productos</button >
                    </NavLink>
                </div>
                <div className='boxTilte'>
                    <h1 className='productTitle'>
                    {detailProducts?.title}
                    </h1>
                </div>
                <div className='boxPrice'>
                    {detailProducts?.offer === true ? (
                        <h1 className='price'>${detailProducts?.offer?.price}</h1>
                    ) : ( 
                        <h1 className='price'>${detailProducts?.price}</h1>
                    )}
                </div>
                <div className='boxAromas'>
                    <h3 className='h3Aromas'>Aromas</h3>
                    <Form.Select className='option' >
                        <option className='option' value="1">I</option>
                        <option className='option' value="2">II</option>
                        <option className='option' value="3">III</option>
                        <option className='option' value="4">IV</option>
                        <option className='option' value="5">V</option>
                    </Form.Select>
                </div>
                <div className='containCart'>
                    <div className="counter">
                        <Button className='buttonCounter' variant="light" onClick={restar}>-</Button>
                        <span className='span'>{counter}</span>
                        <Button className='buttonCounter' variant="light" onClick={incrementar}>+</Button>
                    </div>
                    <div className='boxCart'>
                        <Button onClick={(e) => handleSubmit(e)} className='buttonCart' variant="warning">Agregar al carrito</Button>
                    </div>
                </div>
                    <div className='boxFooter'>
                        <div className='boxSize'>
                            <span className='span'>Tamaño: {detailProducts?.size}</span>
                        </div>
                        <div className='boxDesc'>
                            <span>{detailProducts?.description}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;