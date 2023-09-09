import * as Yup from "yup"

const validation = Yup.object().shape({
    first_name: Yup.string()
        .min(3, "Deberia tener al menos 3 caracteres")
        .max(15, "No puede superar los 15 caracteres")
        .required("Nombre es requido"),
    last_name: Yup.string()
        .min(2, "Deberia tener al menos 2 caracteres")
        .max(20, "No puede superar los 20 caracteres")
        .required("Apellido es requido"),
    email: Yup.string()
        .email("Ingresa una dirección de correo electrónico válida")
        .required("Campo requerido"),
    phone: Yup.string()
        .min(8, "Deberia tener al menos 8 caracteres")
        .max(12, "No puede superar los 12 caracteres")
        .required("Telefono es requido"),
//Datos de Envio
    city: Yup.string().when('shippingOption', {
        is: 'envio',
        then: Yup.string()
            .min(4, "Debería tener al menos 4 caracteres")
            .max(15, "No puede superar los 15 caracteres")
            .required("Campo requerido"),
    }),
    province: Yup.string().when('shippingOption', {
        is: 'envio',
        then: Yup.string()
            .min(4, "Debería tener al menos 4 caracteres")
            .max(15, "No puede superar los 15 caracteres")
            .required("Campo requerido"),
    }),
    zipcode: Yup.string().when('shippingOption', {
        is: 'envio',
        then: Yup.string()
            .min(4, "Debería tener al menos 4 caracteres")
            .max(8, "No puede superar los 8 caracteres")
            .required("Campo requerido"),
    }),
    address: Yup.string().when('shippingOption', {
        is: 'envio',
        then: Yup.string()
            .min(4, "Debería tener al menos 4 caracteres")
            .max(15, "No puede superar los 15 caracteres")
            .required("Campo requerido"),
    }),
    notes:  Yup.string()
        .min(2, "Deberia tener al menos 2 caracteres")
        .max(200, "No puede superar los 200 caracteres"),
//Opciones de pago y envio:
    shippingOption: Yup.string()
        .required('Debes seleccionar una opción de envío'),
    paymentMethod: Yup.string()
       .required('Debes seleccionar una opción de pago'),

});

export default validation;


