import "./SearchBar.css"
import Swal from 'sweetalert2'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from "react";
import { ProductContext } from "../../services/ProductContext";

const SearchBar = () => {

    const [title, setTitle] = useState("");

    const { findProduct } = useContext(ProductContext);

    const handleSearch = async (title) => {
        if (title.length === 0) {
            Swal.fire({
                width: '25em',
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor ingrese un valor en la barra de búsqueda.',
            })
        }

        const response = await findProduct(title);
console.log(response)
        if (typeof response === "string") {
            Swal.fire({
                width: '25em',
                icon: 'error',
                title: 'Oops...',
                text: 'No se encontraron coincidencias con el valor ingresado.Por favor ingrese otro valor',
            })
        }
    }

    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    return (
        <div className="searchContainer">
            <InputGroup className="search_container m-5">
                <Form.Control
                    onChange={handleChange}
                    placeholder="¿Qué estás buscando?"
                    aria-label="¿Qué estás buscando?"
                    aria-describedby="basic-addon2"
                />
                <Button onClick={() => handleSearch(title)} variant="dark" id="button-addon2">
                    Buscar
                </Button>
            </InputGroup >
        </div>
    );
}

export default SearchBar;