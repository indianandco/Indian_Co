import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { fetcher } from '../../../utils/fetcherGet';
import Pagination from 'react-bootstrap/Pagination';

const Sales = () => {
    
    const [modal, setModal] = useState(false)
    const handleModalClose = () => setModal(false);
    const handleModalShow = () => setModal(true);
    
    const [salesCount, setSalesCount ] = useState([]);

    const getInfo = async () => {
        const ventas = await fetcher(`/admindashboard/tickets`);
        setSalesCount(ventas);
    };

    useEffect(() => {
        getInfo();
    }, []);


    return (
        <div className='recent_sales_container'>


          
            <div className='sale_title'><h1>Ordenes de compra</h1></div>
            <div className='sales'>
                <span className='size'>Nombre</span>
                <span className='size'>Fecha</span>
                <span className='size' >Télefono</span>
                <span className='size'>Registrado</span>
                <span className='size'>Detalle</span>
            </div>

            {
                salesCount?.map( (sale, index) => {
                    return(
                        <div className='sales_in' key={index}>
                            <p className='size' >{sale.amount}</p>
                            <p className='size'>{sale.purchase_datetime}</p>
                            <p className='size'>1134240778</p>
                            <p className='size'>{sale.status}</p>
                            <button className='detail' onClick={handleModalShow}><i className="icon_detail bi bi-clipboard-check"></i></button>
                        </div>
                        )
                })
            }  
          
            <div className='pagination'>
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>

                    <Pagination.Item>{10}</Pagination.Item>
                    <Pagination.Item>{11}</Pagination.Item>
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Item>{13}</Pagination.Item>
                    <Pagination.Item>{14}</Pagination.Item>

                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
                <Modal centered show={modal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className='d-flex flex-column' style={{ color: "black" }}>Orden de compra</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div>
                                <p>Nro de orden:</p>
                            </div>
                            <div>
                                <p>Dirección:</p>
                            </div>
                            <div>
                                <p>total:</p>
                            </div>
                            <div>
                                <p>productos:</p>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default Sales;