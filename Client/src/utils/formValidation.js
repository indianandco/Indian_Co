const validation = (prop, value, errors, setErrors) => {

    const maxSize = 8 * 1024 * 1024; // 8 MB

    if (prop === "title") {
        if(!value.length) {
            setErrors({
                ...errors,
                [prop]: "Debe ingresar un titulo para el producto"
            })
        }
        if (value.length < 3 || value.length > 90) {
            setErrors({
                ...errors,
                [prop]: "Debe tener entre 3 y 90 caracteres"
            })
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }
    
//----------------------------------------------------------------------
    if (prop === "price") {
        if(isNaN(value)) {
            setErrors({
                ...errors,
                [prop]: "Solo pueden ingresarse números"
            })
        }
        if(value <= 0) {
            setErrors({
                ...errors,
                [prop]: "el precio mínimo no puede ser menor o igual a 0",
            });
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }
    
    
//-------------------------------------------------------------------
    if (prop === "offer_price") {
        if(isNaN(value)) {
            setErrors({
                ...errors,
                [prop]: "Solo pueden ingresarse números",
            });
        }
        if(value <= 0) {
            setErrors({
                ...errors,
                [prop]: "el precio mínimo no puede ser menor o igual a 0",
            })
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }
    

//-------------------------------------------------------------------
    
    if (prop === "stock") {
        if(isNaN(value)) {
            setErrors({
                ...errors,
                [prop]: "Solo pueden ingresarse números",
            })
        }
    
        if(value <= 0) {
            setErrors({
                ...errors,
                [prop]: "La cantidad mínima no puede ser menor o igual a 0",
            })
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }
    
//-------------------------------------------------------------------------------
    if (prop === "category") {
        if (!value) {
            setErrors({
                ...errors,
                [prop]: "Debe elegir una categoría para el producto",
            })
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }
    

//------------------------------------------------------------------------
    if (prop === "image") {

        if (!value) {
            setErrors({
                ...errors,
                [prop]: "Debe seleccionar una imagen",
              });
        }
        if (value?.size > maxSize) {
            setErrors({
                ...errors,
                [prop]: "La imagen excede el limite, seleccione una imagen de 8MB o menor",
              });
        } else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }


    if (prop === "description") {
        if (!value.length) {
            setErrors({
                ...errors,
                [prop]: "La descripción no puede estar vacia",
            })
        }
        if (value.length < 20) {
            setErrors({
                ...errors,
                [prop]: "La descripción del producto debe tener al menos 20 caracteres",
            })
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }

    if (prop === "offer_boolean") {
        if (!value) {
            setErrors({
                ...errors,
                [prop]: "Debe elejir una opción",
            })
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }

    return errors;
}

export default validation;