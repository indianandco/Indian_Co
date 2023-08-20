import { useEffect, useState } from "react";
import { updateUserInfo } from "../../utils/fetcherPut";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import validation from "../../utils/registerValidation";


const UserProfile = () => {

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        zipcode: "",
        city: "",
        email: ""
    });

    const [error, setError] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        zipcode: "",
        city: "",
        email: ""
    })

    const userHardcode = {
        first_name: "Juan",
        last_name: "Osudar",
        phone: "",
        address: "",
        zipcode: "",
        city: "Lanús",
        email: "juampi.parzybal@gmail.com"
    }

    const [disabled, setDisabled] = useState(true);
    const [validated, setValidated] = useState(true);
    const [show, setShow] = useState(false);

    const handleSubmit = (updateUser) => {
        updateUserInfo("/edit", updateUser)
    }

    const handleClick = () => setDisabled(false)

    const handleChange = (event) => {

        const value = event.target.value
        const name = event.target.name

        setUser({
            ...user,
            [name]: value
        })

        setError((validation({ ...user, [name]: value })))

        if (!Object.keys((validation({ ...user, [name]: value }))).length) {
            setValidated(false)
        }
        else {
            setValidated(true)
        }
    }

    useEffect(() => {
        /* setUser(sessionStorage.getItem('user')); */ // Esto lo descomentamos cuando el usuario se este guardando en sessions
        setUser(userHardcode)
    }, [])

    return (
        <div className="profile_container">
            <Button variant="none" className="buttons d-flex justify-content-start" onClick={() => setShow(true)}>
                PERFIL
            </Button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                size="lg"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        {`${user?.first_name}  ${user.last_name}`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} >
                        <Form.Group className="d-flex flex-row align-items-center">
                            <Form.Group className="m-2" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    disabled={disabled}
                                    required
                                    onChange={handleChange}
                                    name="first_name"
                                    value={user?.first_name}
                                    type="text"
                                    placeholder="Ingrese su nombre"
                                    className={`form-control ${error?.first_name ? "is-invalid" : "is-valid"}`}
                                    feedback={error?.first_name}
                                    autoFocus
                                />
                                {/* <Form.Control.Feedback type="invalid">
                                {loginError.email}
                            </Form.Control.Feedback> */}
                            </Form.Group>
                            <Form.Group className="m-2" controlId="exampleForm.ControlInput1">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    disabled={disabled}
                                    required
                                    onChange={handleChange}
                                    name="last_name"
                                    value={user?.last_name}
                                    type="text"
                                    placeholder="Ingrese su apellido"
                                    className={`form-control ${error?.last_name ? "is-invalid" : "is-valid"}`}
                                    feedback={error?.last_name}
                                    autoFocus
                                />
                                {/* <Form.Control.Feedback type="invalid">
                                {loginError.email}
                            </Form.Control.Feedback> */}
                            </Form.Group>
                            <Form.Group className="m-2" controlId="exampleForm.ControlInput1">
                                <Form.Label>Télefono</Form.Label>
                                <Form.Control
                                    disabled={disabled}
                                    required
                                    onChange={handleChange}
                                    name="phone"
                                    value={user?.phone}
                                    type="text"
                                    placeholder="Ingrese su télefono"
                                    className={`form-control ${error?.phone ? "is-invalid" : "is-valid"}`}
                                    feedback={error?.phone}
                                    autoFocus
                                />
                                {/* <Form.Control.Feedback type="invalid">
                                {loginError.email}
                            </Form.Control.Feedback> */}
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className="d-flex flex-row align-items-center">
                            <Form.Group className="m-2" controlId="exampleForm.ControlInput1">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control
                                    disabled={disabled}
                                    required
                                    onChange={handleChange}
                                    name="address"
                                    value={user?.address}
                                    type="text"
                                    placeholder="Ingrese su email"
                                    className={`form-control ${error?.address ? "is-invalid" : "is-valid"}`}
                                    feedback={error?.address}
                                    autoFocus
                                />
                                {/* <Form.Control.Feedback type="invalid">
                                {loginError.email}
                            </Form.Control.Feedback> */}
                            </Form.Group>
                            <Form.Group className="m-2" controlId="exampleForm.ControlInput1">
                                <Form.Label>Código postal</Form.Label>
                                <Form.Control
                                    disabled={disabled}
                                    required
                                    onChange={handleChange}
                                    name="zipcode"
                                    value={user?.zipcode}
                                    type="text"
                                    placeholder="Ingrese su código postal"
                                    className={`form-control ${error?.zipcode ? "is-invalid" : "is-valid"}`}
                                    feedback={error?.zipcode}
                                    autoFocus
                                />
                                {/* <Form.Control.Feedback type="invalid">
                                {loginError.email}
                            </Form.Control.Feedback> */}
                            </Form.Group>
                            <Form.Group className="m-2" controlId="exampleForm.ControlInput1">
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control
                                    disabled={disabled}
                                    required
                                    onChange={handleChange}
                                    name="city"
                                    value={user?.city}
                                    type="text"
                                    placeholder="Ingrese su ciudad"
                                    className={`form-control ${error?.city ? "is-invalid" : "is-valid"}`}
                                    feedback={error?.city}
                                    autoFocus
                                />
                                {/* <Form.Control.Feedback type="invalid">
                                {loginError.email}
                            </Form.Control.Feedback> */}
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className="d-flex flex-row align-items-center">
                            <Form.Group className="m-2" controlId="exampleForm.ControlInput1">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control
                                    disabled={disabled}
                                    required
                                    onChange={handleChange}
                                    name="email"
                                    value={user?.email}
                                    type="email"
                                    placeholder="Ingrese su email"
                                    className={`form-control ${error?.email ? "is-invalid" : "is-valid"}`}
                                    feedback={error?.email}
                                    autoFocus
                                />
                                {/* <Form.Control.Feedback type="invalid">
                                {loginError.email}
                            </Form.Control.Feedback> */}
                            </Form.Group>
                        </Form.Group>
                        <Modal.Footer className='p-2 d-flex flex-row'>
                            <Button style={{ width: "100%" }} onClick={() => handleClick()} size='lg' variant="primary" type="submit">
                                Modificar
                            </Button>
                            <Button style={{ width: "100%" }} disabled={disabled && validated} size='lg' variant="success" type="submit">
                                Confirmar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default UserProfile;