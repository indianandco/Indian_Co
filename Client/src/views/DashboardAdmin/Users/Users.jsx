import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { fetcher } from '../../../utils/fetcherGet';

const Users = () => {
     
    const [modal, setModal] = useState(false)
    const handleModalClose = () => setModal(false);
    const handleModalShow = () => setModal(true);

    const [usersCount, setUsersCount ] = useState([]);

    const getInfo = async () => {
        const users = await fetcher(`/admindashboard/users`);
        console.log(users)
        setUsersCount(users);
    };

    useEffect(() => {
        getInfo();
    }, []);


    return (
        <div className="users_container">
            <h1>Usuarios</h1>

            <div className='sales'>
                <span className='size'>Nombre</span>
                <span className='size' >Télefono</span>
                <span className='size'>Registrado</span>
                <span className='size'>Detalle</span>
            </div>

            {
                usersCount?.map( (user, index) => {
                    return(
                        <div className='sales_in' key={index}>
                            <p className='size' >{user.first_name} {user.last_name}</p>
                            <p className='size'>{user.phone}</p>
                            <p className='size'>{user.address}</p>
                            <button className='detail' onClick={handleModalShow}><i className="icon_detail bi bi-clipboard-check"></i></button>
                        </div>
                        )
                })
            } 

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
    )
}

export default Users;