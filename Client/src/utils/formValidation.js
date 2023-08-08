import * as Yup from "yup"

const validation = Yup.object().shape({
    title: Yup.string()
        .min(3, "Deberia tener al menos 3 caracteres")
        .max(25, "No puede superar los 25 caracteres")
        .required("Titulo es requido"),
    price: Yup.number()
        .min(0, "El precio no puede ser menor a 0")
        .required("El precio es requerido"),
    offer_boolean: Yup.boolean()
        .required("Campo requerido"),
    offer_price: Yup.number()
        .min(0, "El precio no puede ser menor a 0"),
    description: Yup.string()
        .min(10, "Deberia tener al menos 10 caracteres")
        .max(200, "No puede superar los 200 caracteres")
        .required("Campo requerido"),
    stock: Yup.number()
        .positive("El precio no puede ser menor a 0")
        .required("Campo requerido"),
    category: Yup.string()
        .required("Campo requerido"),
    fragance: Yup.string()
        .required("Campo requerido"),


});

export default validation;


