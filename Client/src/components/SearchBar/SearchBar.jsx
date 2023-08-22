import "./SearchBar.css"
import Swal from 'sweetalert2'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from "react";
import { ProductContext } from "../../services/ProductContext";

const SearchBar = () => {

    const [title, setTitle] = useState("");

    const { findProduct, setFoundProduct } = useContext(ProductContext);

    const handleSearch = async (title) => {
        if (title.length === 0) {
            setFoundProduct([]);
            Swal.fire({
                width: '25em',
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor ingrese un valor en la barra de búsqueda.',
            });
            return;
        }

        const response = await findProduct(title);

        if (typeof response === "string") {
            setFoundProduct([]);
            Swal.fire({
                width: '25em',
                icon: 'error',
                title: 'Oops...',
                text: 'No se encontraron coincidencias con el valor ingresado.Por favor ingrese otro valor',
            });
        }
        setTitle('');

    }
    const handleChange = (event) => {
        setTitle(event.target.value)

    }
    const handleReset = () => {
        setFoundProduct([]);
        setTitle('');
    }

    return (
        <div className="searchContainer">
            <InputGroup className="search_container m-5">
                <Form.Control
                    value={title}
                    onChange={handleChange}
                    placeholder="¿Qué estás buscando?"
                    aria-label="¿Qué estás buscando?"
                    aria-describedby="basic-addon2"
                />
                <Button onClick={() => handleSearch(title)} variant="dark" id="button-addon2">
                    Buscar
                </Button>
                <Button onClick={() => handleReset()} variant="secondary" id="button-addon2">
                    Reset
                </Button>
            </InputGroup >
        </div>
    );
}

export default SearchBar;