import "./SearchBar.css";
import Swal from 'sweetalert2';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../services/ProductContext";
import 'bootstrap-icons/font/bootstrap-icons.css';


const SearchBar = () => {
    const [title, setTitle] = useState("");
    const { findProduct,  error, clearError } = useContext(ProductContext);
    
    useEffect(() => {
        if (error) {
            Swal.fire({
                width: '25em',
                icon: 'error',
                title: 'Oops...',
                text: 'No se encontraron coincidencias con el valor ingresado.',
            });
            clearError();
        }
    }, [error]);
    const handleSearch = async () => {
        if (title.length === 0) {
            Swal.fire({
                width: '25em',
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor ingrese un valor en la barra de búsqueda.',
            });
            return;
        }

        await findProduct(title);
        setTitle('');
    };

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleReset = () => {
        setTitle('');
        findProduct('');
    };

    return (
        <div >
            <div >
                <InputGroup className="search_container m-5">
                    <Form.Control
                        value={title}
                        onChange={handleChange}
                        placeholder="¿Qué estás buscando?"
                        aria-label="¿Qué estás buscando?"
                        aria-describedby="basic-addon2"
                    />
                    <Button onClick={handleSearch}className="buscarBoton" variant="dark" id="button-addon2">
                        Buscar
                    </Button>
                    <Button onClick={handleReset}className="resetBoton" variant="secondary" id="button-addon2">
                        Reset
                    </Button>
                </InputGroup>
                
            </div>
           

        </div>
    );
}

export default SearchBar;
