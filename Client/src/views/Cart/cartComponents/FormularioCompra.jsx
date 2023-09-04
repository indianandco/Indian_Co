import Form from "react-bootstrap/Form";
import {Row,Col} from "react-bootstrap";
import styles from "./FormularioCompra.module.css"

const FormularioCompra = ({form, error, validated, handleSubmit, handleOnChange, showShippingInfo, selectedShippingOption}) => {


  return (
    <Form className={styles.formStyles} noValidate validated={validated} onSubmit={handleSubmit}>
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
          className={`form-control ${error?.first_name ? "is-invalid" : "is-valid"}`}
          feedback={error.first_name}
          autoFocus
        />
        <Form.Control.Feedback type="invalid">{error.first_name}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="6" controlId="validationCustom02">
        <Form.Label>Apellido/s</Form.Label>
        <Form.Control
        required
        onChange={handleOnChange}
        name="last_name"
        value={form.last_name}
        className={`form-control ${!error.last_name?.length ? "is-valid" : "is-invalid"}`}
        type="text"
        placeholder="Ingrese su apellido"
        feedback={error.last_name}
        autoFocus
        />
        <Form.Control.Feedback type="invalid">{error.last_name}</Form.Control.Feedback>
      </Form.Group>
    </Row>
    <Row className="mb-3">
      <Form.Group>
        <Form.Label>Dirección de correo electrónico</Form.Label>
        <Form.Control
           required
           onChange={handleOnChange}
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
          className={`form-control ${!error.phone?.length ? "is-valid" : "is-invalid"}`}
        />
        <Form.Control.Feedback type="invalid">{error.phone}</Form.Control.Feedback>
      </Form.Group>
    </Row>
    <hr />
    {showShippingInfo &&
      (selectedShippingOption === "envio" ? (
        <>
          <Row className="mb-3">
            <h3 className="text-center">DATOS DE ENVÍO</h3>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="ej: Lanus"
                required
                name="city"
                value={form.city}
                className={`form-control ${!error.city?.length ? "is-valid" : "is-invalid"}`}
                onChange={handleOnChange}
              />
              <Form.Control.Feedback type="invalid">
                {error.city}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                type="text"
                placeholder="provincia"
                required
                name="province"
                value={form.province}
                className={`form-control ${!error.province?.length ? "is-valid" : "is-invalid"}`}
                onChange={handleOnChange}
              />
              <Form.Control.Feedback type="invalid">
                {error.province}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>C.P</Form.Label>
              <Form.Control
                type="text"
                placeholder="codigo postal"
                required
                name="zipcode"
                value={form.zipcode}
                className={`form-control ${!error.zipcode?.length ? "is-valid" : "is-invalid"}`}
                onChange={handleOnChange}
              />
              <Form.Control.Feedback type="invalid">
                {error.zipcode}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom05"
            >
              <Form.Label>Dirección de entrega</Form.Label>
              <div className="">
                <Form.Control
                  type="text"
                  placeholder="ej: Av Mitre 5850 "
                  required
                  name="address"
                  value={form.address}
                  className={`form-control m-1 ${!error.address?.length ? "is-valid" : "is-invalid"}`}
                  onChange={handleOnChange}
                />
                <Form.Control
                  type="text"
                  placeholder="ej: depto n: 4a, habitacion, etc(OPCIONAL)"
                  name="addressDetail"
                  className={`form-control m-1 ${!error.address?.length ? "is-valid" : "is-invalid"}`}
                  value={form.addressDetail}
                  onChange={handleOnChange}
                />
            
              <Form.Control.Feedback type="invalid">
                {error.address}
              </Form.Control.Feedback>
              </div>
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
        <Form.Control as="textarea" placeholder="Deja tu comentario aca" style={{height: "100px"}} name="notes" value={form.notes} onChange={handleOnChange}/>
      </Form.Group>
    </Row>
  </Form>
  )
}

export default FormularioCompra