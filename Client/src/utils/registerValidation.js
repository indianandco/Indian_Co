const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //solo admite si tiene un @ un .com y algunos caracteres especiales.
const numberRegex = /^\d+$/; //solo admite numeros enteros positivos.
const wordRegex =/^[A-Za-z ]+$/; //solo admite letras minusculas o mayusculas


const validation = (form) =>{
    const errors = {};

    if (form?.first_name?.trim() === '') {
      errors.first_name = 'El campo Nombre es requerido';
    }
    else if (!wordRegex.test(form.first_name)) {
        errors.first_name = "Solo se permiten Letras";
    }
  
    if (form?.last_name?.trim() === '') {
      errors.last_name = 'El campo Apellido es requerido';
    }
    else if (!wordRegex.test(form.last_name)) {
        errors.last_name = "Solo se permiten Letras";
    }
 
    if (form?.email?.trim() === '') {
      errors.email = 'El campo Email es requerido';
    } else if (!emailRegex.test(form.email)) {
      errors.email = 'Ingrese un Email válido';
    }
  
    if (form?.password?.trim() === '') {
        errors.password = 'El campo Contraseña es requerido';
      } else if (form?.password?.length < 6) {
        errors.password = 'La Contraseña debe tener al menos 6 caracteres';
      } else if (numberRegex.test(form.password) || wordRegex.test(form?.password)) {
        errors.password = 'La Contraseña debe contener al menos una letra y un número';
      }

    if (form?.address?.trim() === '') {
      errors.address = 'El campo Dirección es requerido';
    }
    
    if (form?.province?.trim() === '') {
      errors.province = 'El campo Provincia es requerido';
    }

    if (form?.city?.trim() === '') {
      errors.city = 'El campo Ciudad es requerido';
    }

    if (form?.zipcode?.trim() === '') {
      errors.zipcode = 'El campo Código postal es requerido';
    }

    if (form?.phone?.trim() === '') {
        errors.phone = 'El campo Télefono es requerido';
    }
    else if (form?.phone && !numberRegex.test(form?.phone?.trim())) {
        errors.phone = "Solo se permiten números";
    }
  
    return errors;
}

export default validation;