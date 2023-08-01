import "./SearchBar.css"
import Swal from 'sweetalert2'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { SearchContext } from "../../services/SearchContext";
import { useContext, useState } from "react";

const SearchBar = () => {

    const [title, setTitle] = useState("");

    const { error, findProduct } = useContext(SearchContext);

    const handleSearch = async (title) => {
        if (title.length === 0) {
            Swal.fire({
                width: '25em',
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor ingrese un valor en la barra de búsqueda.',
            })
        }

        findProduct(title);

        if (error.length) {
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
    );
}

export default SearchBar;