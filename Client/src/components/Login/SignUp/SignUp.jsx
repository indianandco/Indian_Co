import { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { fetcherUserPost } from '../../../utils/fetcherPost';
import validation from '../../../utils/registerValidation';
import { fetcher } from '../../../utils/fetcherGet';

// eslint-disable-next-line react/prop-types
function SignUp() {

    const [validated, setValidated] = useState(true);
    const [show, setShow] = useState(false)
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        password: '',
        email: '',
    })
    const [error, setError] = useState({
        first_name: 'El campo Nombre es requerido',
        last_name: 'El campo Apellido es requerido',
        password: 'El campo Contraseña es requerido',
        email: 'El campo Email es requerido',
    })

    const handleShow = () => setShow(true)

    const handleClose = () => {
        setShow(false);
        setForm({
            first_name: '',
            last_name: '',
            password: '',
            email: '',
        })
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

    const handleSubmit = () => {
        fetcherUserPost("/users/register", form)
        setShow(false);
    }

    const handleAuth = (event) => {
        const data = event.target.dataset.social
        fetcher(`/users/auth/${data}`)
    }

    useEffect(() => {
        validation({ ...form })
    }, [form])

    return (
        <>
            <Button variant="none" className="buttons d-flex justify-content-start" onClick={handleShow}>
                REGISTRARSE
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="pb-0" closeButton>
                    <Modal.Title className='pb-1 m-1' style={{ color: "black" }}>Registrarse como usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="first_name"
                                value={form.first_name}
                                type="text"
                                placeholder="Ingrese su nombre completo"
                                className={`form-control ${error?.first_name ? "is-invalid" : "is-valid"}`}
                                feedback={error.first_name}
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {error.first_name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="last_name"
                                value={form.last_name}
                                className={`form-control ${!error.last_name?.length ? "is-valid" : "is-invalid"}`}
                                type="text"
                                placeholder="Ingrese su apellido"
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {error.last_name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Correo Electronico</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="email"
                                value={form.email}
                                className={`form-control ${!error.email?.length ? "is-valid" : "is-invalid"}`}
                                type="email"
                                placeholder="ejemplo@ejemplo.com.ar"
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {error.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput11">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="password"
                                value={form.password}
                                className={`form-control ${!error.password?.length ? "is-valid" : "is-invalid"}`}
                                type="password"
                                placeholder="Ingrese una contraseña"
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {error.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Modal.Footer className='p-1'>
                            <Button style={{ width: "100%" }} disabled={validated} size='lg' variant="success" type="submit">
                                Registrarse con correo
                            </Button>
                        </Modal.Footer>
                    </Form>
                    <Modal.Footer className='p-1'>
                        <Button style={{ width: "100%" }} data-social="google" onClick={handleAuth} size='lg' variant="danger" type="submit">
                            <i className="bi bi-google"></i> Registrarse con Google
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SignUp;