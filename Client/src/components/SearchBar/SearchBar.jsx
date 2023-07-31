import "./SearchBar.css"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { SearchContext } from "../../services/SearchContext";
import { useContext, useState } from "react";

const SearchBar = () => {

    const [search, setSearch] = useState();
    const { findProduct } = useContext(SearchContext);

    const handleSearch = (search) => {
        findProduct(search)
    }

    const handleChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <InputGroup className="search_container m-5">
            <Form.Control
                onChange={handleChange}
                placeholder="¿Qué estás buscando?"
                aria-label="¿Qué estás buscando?"
                aria-describedby="basic-addon2"
            />
            <Button onClick={() => handleSearch(search)} variant="dark" id="button-addon2">
                Buscar
            </Button>
        </InputGroup >
    );
}

export default SearchBar;