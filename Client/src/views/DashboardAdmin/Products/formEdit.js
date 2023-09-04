import * as Yup from "yup"

const formEdit = Yup.object().shape({
    title: Yup.string()
        .min(3, "Deberia tener al menos 3 caracteres")
        .max(50, "No puede superar los 50 caracteres")
        .required("Titulo es requido"),
    price: Yup.number()
        .positive(0, "El precio no puede ser igual o menor a 0")
        .required("El precio es requerido"),
    offer: Yup.boolean()
        .required("Campo requerido"),
    catalog_listing: Yup.boolean()
        .required("Campo requerido"),
    offer_price: Yup.number()
        .positive(0, "El precio no puede ser igual o menor a 0"),
    description: Yup.string()
        .min(10, "Deberia tener al menos 10 caracteres")
        .max(200, "No puede superar los 200 caracteres")
        .required("Campo requerido"),
    stock: Yup.number()
        .positive("El stock no puede ser igual o menor a 0")
        .required("Campo requerido"),
    category: Yup.string()
        .required("Campo requerido"),
    fragance: Yup.string()
        .required("Campo requerido"),


});

export default formEdit;


