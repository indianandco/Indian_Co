import "./SearchBar.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Form, InputGroup } from 'react-bootstrap';
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../services/ProductContext";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const { findProductStorage, resetPagination } = useContext(ProductContext);

    useEffect(() => {
        if (searchQuery === "") {
            findProductStorage("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    const handleChange = (event) => {
        const inputValue = event.target.value.slice(0, 30);
        setSearchQuery(inputValue);
        findProductStorage(inputValue);

        resetPagination();
    };

    return (
        <div>
            <div>
                <InputGroup className="search_container">
                    <Form.Control
                        maxLength={30}
                        onChange={handleChange}
                        value={searchQuery}
                        placeholder="¿Qué estás buscando?"
                        aria-label="¿Qué estás buscando?"
                        aria-describedby="basic-addon2"
                        className="formControl"
                    />
                </InputGroup>
            </div>
        </div>
    );
}

export default SearchBar;
