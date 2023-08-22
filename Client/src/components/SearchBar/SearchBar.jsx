import "./SearchBar.css";
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useContext, useState,useEffect } from "react";
import { ProductContext } from "../../services/ProductContext";

const SearchBar = () => {
    const [title, setTitle] = useState("");
    const { findProduct, filterByCategory, error,clearError } = useContext(ProductContext);

    useEffect(() => {
        if (error) {
            Swal.fire({
                width: '25em',
                icon: 'error',
                title: 'Oops...',
                text:'No se encontraron coincidencias con el valor ingresado.',
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

    const handlerCategory = async (event) => {
        const selectedCategory = event.target.value;
        await filterByCategory(selectedCategory);
    };

    return (
        <div>
            <div className="searchContainer">
                <InputGroup className="search_container m-5">
                    <Form.Control
                        value={title}
                        onChange={handleChange}
                        placeholder="¿Qué estás buscando?"
                        aria-label="¿Qué estás buscando?"
                        aria-describedby="basic-addon2"
                    />
                    <Button onClick={handleSearch} variant="dark" id="button-addon2">
                        Buscar
                    </Button>
                    <Button onClick={handleReset} variant="secondary" id="button-addon2">
                        Reset
                    </Button>
                </InputGroup>
            </div>
            <div>
                <h5>Categoria:</h5>
                <Form.Select onChange={handlerCategory}>
                    <option value="All">Todas</option>
                    <option value="Perfumes">Perfumes</option>
                    <option value="Velas">Velas</option>
                </Form.Select>
            </div>
        </div>
    );
}

export default SearchBar;
