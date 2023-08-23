import "./SearchBar.css";
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../services/ProductContext";
import 'bootstrap-icons/font/bootstrap-icons.css';


const SearchBar = () => {
    const [title, setTitle] = useState("");
    const { findProduct, filterByCategory, error, clearError, sortProducts,offerProducts } = useContext(ProductContext);
    const [showOffCanvas, setShowOffCanvas] = useState(false)
    const handleOffCanvasOpen = () => setShowOffCanvas(true);
    const handleOffCanvasClose = () => setShowOffCanvas(false);

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

    const handlerCategory = async (event) => {
        const selectedCategory = event.target.value;
        if(selectedCategory=== "---"){
            null
        }else{
             await filterByCategory(selectedCategory);
        }
       
    };

    const handlerSort = async (event) => {
        const selectedOrder = event.target.value;
        if(selectedOrder=== "---"){
            null
        }else{
        await sortProducts(selectedOrder)
    }
}
    const handlerOffer=async(event)=>{
        const resp= event.target.value
        if(resp=== "---"){
            null
        }else{
        await offerProducts(resp)
    }
    }
    return (
        <div >
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
            <Button  className="filterButton" variant="dark" onClick={handleOffCanvasOpen}>
            <i className="bi bi-funnel-fill"></i>
            </Button>

            <Offcanvas style={{ width: "230px" }} className="canva"show={showOffCanvas} onHide={handleOffCanvasClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{ fontSize: "23px", fontWeight:"bold" }}>Filtrar por:</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body >
                    <div >
                        <h5>Categoria</h5>
                        <Form.Select className="filtros"onChange={handlerCategory}>
                        <option value="---">-------</option>
                            <option value="All">Todas</option>
                            <option value="Perfumes">Perfumes</option>
                            <option value="Velas">Velas</option>
                        </Form.Select>
                    </div>
                    <div>
                        <h5>Orden Asc/Des</h5>
                        <Form.Select className="filtros" onChange={handlerSort}>
                        <option value="---">-------</option>
                            <option value="nameAsc">Ascendente</option>
                            <option value="nameDesc">Descendente</option>
                        </Form.Select>
                    </div>
                    <div>
                        <h5>Por Precio</h5>
                        <Form.Select className="filtros" onChange={handlerSort}>
                        <option value="---">-------</option>
                            <option value="priceAsc">De menor a mayor</option>
                            <option value="priceDesc">De mayor a menor</option>
                        </Form.Select>
                    </div>
                    <div>
                        <h5>En Oferta</h5>
                        <Form.Select className="filtros" onChange={handlerOffer}>
                        <option value="---">-------</option>
                            <option value={false}>No</option>
                            <option value={true}>Si</option>
                        </Form.Select>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    );
}

export default SearchBar;
