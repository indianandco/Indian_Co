import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { fetcherCreateUser } from '../../../utils/fetcherPost';
import validation from '../../../utils/registerValidation';

function SignIn() {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(true);
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        password: '',
        phone: '',
        gender: "otros",
        birthdate: "",
        address: "",
        zipcode: '',
        city: '',
        email: '',
    })
    const [error, setError] = useState({
        first_name: '',
        last_name: '',
        password: '',
        phone: '',
        address: "",
        zipcode: '',
        city: '',
        email: '',
    })

    const handleClose = () => {
        setShow(false);
        setForm({
            first_name: '',
            last_name: '',
            password: '',
            phone: '',
            gender: "otros",
            birthdate: "",
            address: "",
            zipcode: '',
            city: '',
            email: '',
        })
    }
    const handleShow = () => setShow(true);

    const handleChange = (event) => {
        const checked = event.target.checked
        const value = event.target.value
        const name = event.target.name

        if (checked) {
            setForm({
                ...form,
                [name]: checked
            })
        }

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

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('submit', form);

        fetcherCreateUser("/users/register", form)
    }

    console.log(error, validated);
    return (
        <>
            <Button variant="none" className="buttons" onClick={handleShow}>
                Registrarse
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrarse como usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="first_name"
                                value={form.first_name}
                                type="text"
                                placeholder="Ingrese su nombre completo"
                                class={`form-control ${!error.first_name?.length ? "is-valid" : "is-invalid"}`}
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
                                class={`form-control ${!error.last_name?.length ? "is-valid" : "is-invalid"}`}
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
                                class={`form-control ${!error.email?.length ? "is-valid" : "is-invalid"}`}
                                type="email"
                                placeholder="ejemplo@ejemplo.com.ar"
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {error.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>Elija un sexo</Form.Label>
                            <Form.Check
                                onChange={handleChange}
                                name="gender"
                                value="masculino"
                                key="1"
                                type="radio"
                                id="1"
                                label="Masculino"
                            />
                            <Form.Check
                                onChange={handleChange}
                                name="gender"
                                value="femenino"
                                key="2"
                                type="radio"
                                id="2"
                                label="Femenino"
                            />
                            <Form.Check
                                onChange={handleChange}
                                name="gender"
                                value="otros"
                                key="3"
                                type="radio"
                                id="3"
                                label="Otros"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                            <Form.Label>Nacimiento</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                name="birthdate"
                                value={form.birthdate}
                                type="date"
                                autoFocus
                            />
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="address"
                                value={form.address}
                                class={`form-control ${!error.address?.length ? "is-valid" : "is-invalid"}`}
                                type="text"
                                placeholder="Ingrese una dirección"
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {error.address}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                            <Form.Label>Codigo postal</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="zipcode"
                                value={form.zipcode}
                                class={`form-control ${!error.zipcode?.length ? "is-valid" : "is-invalid"}`}
                                type="text"
                                placeholder="Ingrese un código postal"
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {error.zipcode}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="city"
                                value={form.city}
                                class={`form-control ${!error.city?.length ? "is-valid" : "is-invalid"}`}
                                type="text"
                                placeholder="Ingrese su ciudad"
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {error.city}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput10">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="phone"
                                value={form.phone}
                                class={`form-control ${!error.phone?.length ? "is-valid" : "is-invalid"}`}
                                type="tel"
                                placeholder="Ingrese un número de teléfono o celular"
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {error.phone}
                            </Form.Control.Feedback>
                        </Form.Group> */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput11">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="password"
                                value={form.password}
                                class={`form-control ${!error.password?.length ? "is-valid" : "is-invalid"}`}
                                type="password"
                                placeholder="Ingrese una contraseña"
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {error.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                            <Button disabled={validated} variant="primary" type="submit">
                                Registrar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default SignIn;