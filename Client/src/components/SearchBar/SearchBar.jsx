import "./SearchBar.css"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const SearchBar = () => {
    return (
        <InputGroup size="sm" className="mb-1">
            <InputGroup.Text id="inputGroup-sizing-sm">Buscar</InputGroup.Text>
            <Form.Control
                placeholder="¿Qué estás buscando?"
                aria-label="small"
                aria-describedby="inputGroup-sizing-sm"
            />
        </InputGroup>
    );
}

export default SearchBar;