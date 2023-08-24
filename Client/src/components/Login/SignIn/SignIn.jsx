import { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { fetcherUserPost } from '../../../utils/fetcherPost';
import validation from '../../../utils/registerValidation';
import { fetcher } from '../../../utils/fetcherGet';

// eslint-disable-next-line react/prop-types
function SignIn() {

    const [validated, setValidated] = useState(true);
    const [showLogin, setShowLogin] = useState(false);
    const [showRecover, setShowRecover] = useState(false);

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const [email, setEmail] = useState({
        email: ''
    })

    const [loginError, setLoginError] = useState({
        email: 'El campo Email es requerido',
        password: 'El campo Contraseña es requerido',
    })

    //----------FUNCIONES DE RECUPERAR CONTRASEÑA
    const handleRecoverShow = () => {
        setShowLogin(false)
        setShowRecover(true)
    }

    const handleChangeRecover = (event) => {

        const value = event.target.value
        const name = event.target.name

        setEmail({
            ...email,
            [name]: value
        })
    }

    const handleRecoverClose = () => {
        setShowRecover(false);
        setEmail({
            email: ''
        })
    }

    const handleRecoverPassword = () => {
        console.log("hola");
    }


    //-----------------FUNCIONES DE LOGIN
    const handleShow = () => setShowLogin(true)
    const handleChange = (event) => {

        const value = event.target.value
        const name = event.target.name

        setLoginForm({
            ...loginForm,
            [name]: value
        })

        setLoginError((validation({ ...loginForm, [name]: value })))

        if (!Object.keys((validation({ ...loginForm, [name]: value })))?.length) {
            setValidated(false)
        }
        else {
            setValidated(true)
        }
    }

    const handleClose = () => {
        setShowLogin(false);
        setLoginForm({
            email: '',
            password: ''
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await fetcherUserPost("/users/login", loginForm)
        sessionStorage.setItem('sessions', JSON.stringify(response));
        sessionStorage.setItem('role', response.role)
        setShowLogin(false);
    }

    const handleAuth = (event) => {
        const data = event.target.dataset.social
        const auth = fetcher(`/users/auth/${data}`)
        sessionStorage.setItem('sessions', JSON.stringify(auth));

    }

    useEffect(() => {
        validation({ ...loginForm })
    }, [loginForm])

    return (
        <>
            <Button variant="none" className="buttons d-flex justify-content-start" onClick={handleShow}>
                INGRESAR
            </Button>
            {//-------------------------MODAL DE LOGIN
            }
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
                        <Modal.Footer className='p-1'>
                            <Button style={{ width: "100%" }} data-social="google" onClick={handleAuth} size='lg' variant="danger" type="submit">
                                Ingresar con <i className="bi bi-google"></i> Google
                            </Button>
                        </Modal.Footer>
                    </Form>
                    <Modal.Footer className='p-1 text-decoration-underline'>
                        <Button style={{ width: "100%" }} data-social="google" onClick={handleRecoverShow} size='lg' variant="none">
                            Recuperar <strong>contraseña</strong>
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal >
            {//-------------------------MODAL DE RECUPERAR CONTRASEÑA
            }
            <Modal show={showRecover} onHide={handleRecoverClose}>
                <Modal.Header className="pb-0" closeButton>
                    <Modal.Title className='pb-1 m-1' style={{ color: "black" }}>Recuperar contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleRecoverPassword}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChangeRecover}
                                name="email"
                                value={email.email}
                                type="text"
                                placeholder="Ingrese el email con el que se registro"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                    <Modal.Footer className='p-1'>
                        <Button style={{ width: "100%" }} type='submit' size='lg' variant="success">
                            Enviar email para recuperar contraseña
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal >
        </>
    );
}

export default SignIn;