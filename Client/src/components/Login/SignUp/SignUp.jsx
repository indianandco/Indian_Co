import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { fetcherCreateUser } from '../../../utils/fetcherPost';

function SignIn() {
    const [show, setShow] = useState(false);
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
        image: '',
        email: '',
    })

    console.log(form);

    const handleClose = () => setShow(false);
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
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit', form);
        fetcherCreateUser("/users", form)
    }

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
                                feedback="Debe ingresar un nombre"
                                feedbackType="invalid"
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                Debe ingresar un nombre.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="last_name"
                                value={form.last_name}
                                type="text"
                                placeholder="Ingrese su apellido"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Correo Electronico</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="email"
                                value={form.email}
                                type="email"
                                placeholder="ejemplo@ejemplo.com.ar"
                                autoFocus
                            />
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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="address"
                                value={form.address}
                                type="text"
                                placeholder="Ingrese una dirección"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                            <Form.Label>Codigo postal</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="zipcode"
                                value={form.zipcode}
                                type="text"
                                placeholder="Ingrese un código postal"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="city"
                                value={form.city}
                                type="text"
                                placeholder="Ingrese su ciudad"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput9">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                name="image"
                                value={form.image}
                                type="file"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput10">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="phone"
                                value={form.phone}
                                type="number"
                                placeholder="Ingrese un número de telefono o celular"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput11">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                name="password"
                                value={form.password}
                                type="password"
                                placeholder="Ingrese una contraseña"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type="submit">
                        Registrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SignIn;