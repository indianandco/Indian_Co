import Form from "react-bootstrap/Form";
import {Tab,Tabs,Row,Col,Container,Button} from "react-bootstrap";

const FormularioCompra = ({form, validated, handleSubmit, handleOnChange, showShippingInfo, selectedShippingOption}) => {

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <Row className="mb-3">
      <h2 className="text-center">DETALLES DE FACTURACIÓN</h2>
      <Form.Group as={Col} md="6" controlId="validationCustom01">
        <Form.Label>Nombre/s</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="nombre"
          name="first_name"
          value={form.first_name}
          onChange={handleOnChange}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="6" controlId="validationCustom02">
        <Form.Label>Apellido/s</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="apellido"
          name="last_name"
          value={form.last_name}
          onChange={handleOnChange}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
    </Row>
    <Row className="mb-3">
      <Form.Group>
        <Form.Label>Dirección de correo electrónico</Form.Label>
        <Form.Control
          required
          name="email"
          type="email"
          placeholder="ejemplo@ejemplo.com.ar"
          autoFocus
          value={form.email}
          onChange={handleOnChange}
        />
      </Form.Group>
    </Row>
    <Row className="mb-3">
      <Form.Group as={Col} md="6" controlId="validationCustom02">
        <Form.Label>Teléfono Personal</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="ej: 1122334455"
          name="phone"
          value={form.phone}
          onChange={handleOnChange}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
    </Row>
    <hr />
    {showShippingInfo &&
      (selectedShippingOption === "envio" ? (
        <>
          <Row className="mb-3">
            <h3 className="text-center">DATOS DE ENVÍO</h3>
            <Form.Group
              as={Col}
              md="6"
              controlId="validationCustom03"
            >
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="ciudad"
                required
                name="city"
                value={form.city}
                onChange={handleOnChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="3"
              controlId="validationCustom04"
            >
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                type="text"
                placeholder="provincia"
                required
                name="province"
                value={form.province}
                onChange={handleOnChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="3"
              controlId="validationCustom05"
            >
              <Form.Label>C.P</Form.Label>
              <Form.Control
                type="text"
                placeholder="codigo postal"
                required
                name="zipcode"
                value={form.zipcode}
                onChange={handleOnChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="12"
              controlId="validationCustom05"
            >
              <Form.Label>Dirección de entrega</Form.Label>
              <div className="d-flex justify-content-evenly">
                <Form.Control
                  className="me-1"
                  type="text"
                  placeholder="Av Mitre 5850 "
                  required
                  name="address"
                  value={form.address}
                  onChange={handleOnChange}
                />
                <Form.Control
                  className="ms-1"
                  type="text"
                  placeholder="Apartamento, habitacion, etc(OPCIONAL)"
                  name="address"
                  value={form.address}
                  onChange={handleOnChange}
                />
              </div>
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <hr />
        </>
      ) : (
        <></>
      ))}
    <Row className="mb-3">
      <Form.Group>
        <Form.Label>Notas del pedido (opcional)</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Deja tu comentario aca"
          style={{height: "100px"}}
          name="notes"
          value={form.notes}
          onChange={handleOnChange}
        />
      </Form.Group>
    </Row>
  </Form>
  )
}

export default FormularioCompra