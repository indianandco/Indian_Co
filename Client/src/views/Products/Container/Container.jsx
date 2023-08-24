/* eslint-disable react/prop-types */
import "./Container.css"
import Cards from "../Card/Cards"
import { useContext, useEffect, useState } from "react";
import { ProductContext } from '../../../services/ProductContext';
import SearchBar from "../../../components/SearchBar/SearchBar";
import { Spinner, Dropdown } from 'react-bootstrap';


const Container = () => {

    const limit = false
    const [isLoading, setIsLoading] = useState(false);
    const { filterByCategory, sortProducts, offerProducts, displayedProducts, getAllProducts } = useContext(ProductContext);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        }, 1500);

        getAllProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

    const handlerCategory = async (prop) => {
        if (prop === "---") {
            null
        } else {
            await filterByCategory(prop);
        }

    };
    const handlerSort = async (prop) => {
        prop
        console.log(prop)
        if (prop === "true") {
            await offerProducts(prop)
        }
        if (prop === "false") {
            await offerProducts(prop)
        }
        if (prop === "priceAsc") {
            await sortProducts(prop)
        }
        if (prop === "priceDesc") {
            await sortProducts(prop)
        }
    }



    return (
        !isLoading ? (
            <div className="loading-spinner">
                <Spinner animation="border" role="status" aria-hidden="true">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
        ) : (
            <div>
                <div className="containerSearch">
                    <div className="SearchProducts">
                        < SearchBar className='SearchBar' />
                    </div>
                    <div className="categoriaFiltro">
                        <Dropdown >
                            <Dropdown.Toggle id="dropdown-categoria" className="botonCategoria">
                                Categoría
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handlerCategory('All')}> - Todas</Dropdown.Item>
                                <Dropdown.Item onClick={() => handlerCategory('Perfumes')}>- Perfumes</Dropdown.Item>
                                <Dropdown.Item onClick={() => handlerCategory('Velas')}>- Velas</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown >
                            <Dropdown.Toggle id="dropdown-filtro" className="botonFiltro">
                                Filtrar por:
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handlerSort("priceAsc")}> De menor a mayor</Dropdown.Item>
                                <Dropdown.Item onClick={() => handlerSort("priceDesc")}>De mayor a menor</Dropdown.Item>
                                {/* <Dropdown.Item onClick={() => handlerSort("false")}>En Oferta - No</Dropdown.Item> */}
                                <Dropdown.Item onClick={() => handlerSort("true")}>Con descuento</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                </div>
                <div>

                    <div className="products_container">
                        {displayedProducts?.map(product => (
                            <Cards key={product?._id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        ))
}

export default Container;