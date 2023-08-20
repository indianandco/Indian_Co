import { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { fetcherCreateUser } from '../../../utils/fetcherPost';
import validation from '../../../utils/registerValidation';
import { fetcher } from '../../../utils/fetcherGet';

// eslint-disable-next-line react/prop-types
function SignIn() {

    const [validated, setValidated] = useState(true);
    const [showLogin, setShowLogin] = useState(false)

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const [loginError, setLoginError] = useState({
        email: 'El campo Email es requerido',
        password: 'El campo Contraseña es requerido',
    })

    const handleShow = () => setShowLogin(true)

    const handleClose = () => {
        setShowLogin(false);
        setLoginForm({
            email: '',
            password: ''
        })
    }

    const handleChange = (event) => {

        const value = event.target.value
        const name = event.target.name

        setLoginForm({
            ...loginForm,
            [name]: value
        })

        setLoginError((validation({ ...loginForm, [name]: value })))

        if (!Object.keys((validation({ ...loginForm, [name]: value }))).length) {
            setValidated(false)
        }
        else {
            setValidated(true)
        }
    }

    const handleSubmit = () => {
        fetcherCreateUser("/users/login", loginForm)
        setShowLogin(false);
    }

    const handleAuth = (event) => {
        const data = event.target.dataset.social
        fetcher(`/users/auth/${data}`)
    }

    useEffect(() => {
        validation({ ...loginForm })
    }, [loginForm])

    return (
        <>
            <Button variant="none" className="buttons d-flex justify-content-start" onClick={handleShow}>
                INGRESAR
            </Button>

            <Modal show={showLogin} onHide={handleClose}>
                <Modal.Header className="pb-0" closeButton>
                    <Modal.Title className='pb-1 m-1' style={{ color: "black" }}>Ingresar como usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="email"
                                value={loginForm.email}
                                type="text"
                                placeholder="Ingrese su email"
                                className={`form-control ${loginError?.email ? "is-invalid" : "is-valid"}`}
                                feedback={loginError.email}
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {loginError.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="password"
                                value={loginForm.password}
                                className={`form-control ${!loginError.password?.length ? "is-valid" : "is-invalid"}`}
                                type="password"
                                placeholder="Ingrese su contraseña"
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {loginError.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Modal.Footer className='p-1'>
                            <Button style={{ width: "100%" }} disabled={validated} size='lg' variant="success" type="submit">
                                Ingresar con tu cuenta
                            </Button>
                        </Modal.Footer>
                    </Form>
                    <Modal.Footer className='p-1'>
                        <Button style={{ width: "100%" }} data-social="google" onClick={handleAuth} size='lg' variant="danger" type="submit">
                            Ingresar con <i className="bi bi-google"></i> Google
                        </Button>
                    </Modal.Footer>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default SignIn;