import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { fetcher } from '../../../utils/fetcherGet';
import { Container, Row, Col, Button,Pagination } from 'react-bootstrap';

const Users = () => {

    const [modal, setModal] = useState(false)
    const [usersCount, setUsersCount] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null)
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [pagActive, setPagActive] = useState(1)
    const usersPerPage = 4;

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
    let items = []
    for (let i = 1; i <= totalPages; i++) {
        items.push(
            <Pagination.Item key={i} active={i === pagActive} onClick={() => setPagActive(i)}>
                {i}
            </Pagination.Item>
        )
    }
    const paginatedUsers = filteredUsers.slice((pagActive - 1) * usersPerPage, pagActive * usersPerPage)

    const handleModalClose = () => {
        setModal(false);
    };


    const handleModalShow = (user) => {
        setSelectedUser(user)
        setModal(true);
    };

    const getInfo = async () => {
        const users = await fetcher(`/admindashboard/users`);
        setFilteredUsers(users)
        setUsersCount(users);
    };

    useEffect(() => {
        getInfo();
    }, []);


    return (

        <Container className='container'>
            <Row className='sale_title'>
                <Col><h3>Usuarios registrados</h3></Col>
            </Row>
            <Row className='sales'>
                <Col className='columna' xs={2}>Nombre </Col>
                <Col className='columna' xs={2}>Apellido </Col>
                <Col className='columna' xs={2}>Télefono </Col>
                <Col className='columna' xs={2}>Detalle</Col>
            </Row>
            {
                paginatedUsers?.map((user, index) => {
                    return (
                        <Row className='sales' key={index}>
                            <Col xs={2}>{user ? user.first_name : 'Nombre no disponible'}</Col>
                            <Col xs={2}>{user ? user.last_name : 'Apellido no disponible'}</Col>
                            <Col xs={2}>{user.phone ? user.phone : 'No disponible'}</Col>
                            <Col xs={2}>
                                <Button className='editButton' onClick={() => handleModalShow(user)}>
                                    <i className='icon_detail bi bi-clipboard-check'></i>
                                </Button>
                            </Col>
                        </Row>
                    )
                })
            }

            <Modal centered show={modal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="d-flex flex-column" style={{ color: "black" }}> Detalle del Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <p>Nombre: {selectedUser?.first_name}</p>
                        </div>
                        <div>
                            <p>Apellido:  {selectedUser?.last_name}</p>
                        </div>
                        <div>
                            <p>Télefono:  {selectedUser?.phone}</p>
                        </div>
                        <div>
                            <p>Género:  {selectedUser?.gender}</p>
                        </div>
                        <div>
                            <p>Día de nacimiento:  {selectedUser?.birthdate}</p>
                        </div>
                        <div>
                            <p>Dirección:  {selectedUser?.address}</p>
                        </div>
                        <div>
                            <p>Código Postal:  {selectedUser?.zipcode}</p>
                        </div>
                        <div>
                            <p>Ciudad:  {selectedUser?.city}</p>
                        </div>
                        <div>
                            <p>Email:  {selectedUser?.email}</p>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
            <div className='pagination'>
                <Pagination >
                    <Pagination.First onClick={() => setPagActive(1)} />
                    <Pagination.Prev onClick={() => setPagActive(prev => Math.max(prev - 1, 1))} />
                    {items}
                    <Pagination.Next onClick={() => setPagActive(prev => Math.min(prev + 1, totalPages))} />
                    <Pagination.Last onClick={() => setPagActive(totalPages)} />

                </Pagination>

            </div>

        </Container >

    )
}

export default Users;

{/* <div className="users_container">
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
}  */}

{/* <Modal centered show={modal} onHide={handleModalClose}>
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
</div> */}