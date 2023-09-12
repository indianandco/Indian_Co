import {Button, InputGroup, Form } from 'react-bootstrap';
import styles from './Shipping.module.css';
import {useEffect, useState} from 'react'
import {fetcherShippingCostPUT} from '../../../utils/fetcherPut';
import { fetcher } from '../../../utils/fetcherGet'
import Swal from 'sweetalert2'

const Shipping = () => {
    const [priceShip, setPriceShip] = useState('');
    const [newPrice, setNewPrice] = useState('');

    const getPrice = async () =>{
        const price = await fetcher("/admindashboard/shipping/getprice");
        console.log(price)
        setPriceShip(price.payload)
    };
     

    const handleApplyButtonClick = () => {
        fetcherShippingCostPUT(`/admindashboard/shipping/setnewprice?price=${newPrice}`).then(
           async (response) =>{
            try {
                // console.log(response)
                await Swal.fire({
                    title: 'Success!',
                    text: response.message,
                    icon: 'success'
                    
                });
                
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo salio mal, volvé a intentarlo!'
                });
            } finally {
                setPriceShip(newPrice)
            }
           
           } 
        );
      };

    useEffect(  ()=>{
        getPrice()

    },[priceShip])

  return (
   <div className={styles.contenedor}>
        <div className={styles.card}>
            <h1>Costos de Envio</h1>

            <div>
                <h2>Precio ACTUAL: $ <b>{priceShip && priceShip}</b></h2> 
            </div>

            <Button><a className={styles.link} href="https://www.correoargentino.com.ar/servicios/paqueteria/encomienda-correo-clasica">Costos Correo Argentino</a></Button>

            <div>
                <h2>Definir Nuevo precio de envio:</h2>

                <InputGroup className="mb-3">
                    <Button variant="outline-primary" id="button-addon1"  onClick={handleApplyButtonClick}>
                    Aplicar
                    </Button>
                    <Form.Control
                      aria-label="Nuevo Precio"
                      aria-describedby="basic-addon1"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                    />
                </InputGroup>

            </div>
        </div>
   </div>
  );
}

export default Shipping;