import { useEffect, useState } from "react";
import { updateUserInfo } from "../../utils/fetcherPut";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import validation from "../../utils/registerValidation";


const UserProfile = () => {

    const [user, setUser] = useState({
        first_name: "Juan",
        last_name: "Osudar",
        password: "123asd@",
        phone: "1134240778",
        address: "La rioja 457",
        zipcode: "1824",
        city: "Lanús",
        email: "juampi.parzybal@gmail.com"
    });

    const [validated, setValidated] = useState(true);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState({
        email: 'El campo Email es requerido',
        password: 'El campo Contraseña es requerido',
    })

    const handleSubmit = (updateUser) => {
        updateUserInfo("/edit", updateUser)
    }

    const handleChange = (event) => {

        const value = event.target.value
        const name = event.target.name

        setForm({
            ...form,
            [name]: value
        })

        setError((validation({ ...form, [name]: value })))

        if (!Object.keys((validation({ ...form, [name]: value }))).length) {
            setValidated(false)
        }
        else {
            setValidated(true)
        }
    }

    useEffect(() => {
        setUser(sessionStorage.getItem('user'));
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
                        {user?.first_name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} >
                        <Form.Group className="d-flex flex-row align-items-center">
                            <Form.Group className="m-2" controlId="exampleForm.ControlInput1">
                                <Form.Label>{user?.first_name}</Form.Label>
                                <Form.Control
                                    required
                                    onChange={handleChange}
                                    name="email"
                                    value={user?.first_name}
                                    type="text"
                                    placeholder="Ingrese su email"
                                    className={`form-control ${error?.first_name ? "is-invalid" : "is-valid"}`}
                                    feedback={error?.first_name}
                                    autoFocus
                                />
                                {/* <Form.Control.Feedback type="invalid">
                                {loginError.email}
                            </Form.Control.Feedback> */}
                            </Form.Group>
                            <Form.Group className="m-2" controlId="exampleForm.ControlInput1">
                                <Form.Label>{user?.last_name}</Form.Label>
                                <Form.Control
                                    required
                                    onChange={handleChange}
                                    name="email"
                                    value={user?.last_name}
                                    type="text"
                                    placeholder="Ingrese su email"
                                    className={`form-control ${error?.last_name ? "is-invalid" : "is-valid"}`}
                                    feedback={error?.last_name}
                                    autoFocus
                                />
                                {/* <Form.Control.Feedback type="invalid">
                                {loginError.email}
                            </Form.Control.Feedback> */}
                            </Form.Group>
                        </Form.Group>
                        <Modal.Footer className='p-2 d-flex flex-row'>
                            <Button style={{ width: "100%" }} size='lg' variant="primary" type="submit">
                                Modificar
                            </Button>
                            <Button style={{ width: "100%" }} disabled={validated} size='lg' variant="success" type="submit">
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