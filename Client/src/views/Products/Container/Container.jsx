/* eslint-disable react/prop-types */
import "./Container.css"
import Cards from "../Card/Cards"
import { useContext, useEffect, useState } from "react";
import { ProductContext } from '../../../services/ProductContext';
import SearchBar from "../../../components/SearchBar/SearchBar";
import { Spinner, Dropdown, Pagination } from 'react-bootstrap';
import { useParams } from "react-router-dom";


const Container = () => {

    let param = useParams();
    param = Object.values(param)
    console.log(param);
    const [isLoading, setIsLoading] = useState(false);
    const { filterByCategory, sortProducts, offerProducts, getAllProducts, productStorage, pagActive, setPagActive, resetPagination } = useContext(ProductContext);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [paginate, setPaginate] = useState([])
    const productsPerPage = 8;
    const totalPages = Math.ceil(paginate?.length / productsPerPage)
    let items = []
    for (let i = 1; i <= totalPages; i++) {
        items.push(
            <Pagination.Item key={i} active={i === pagActive} onClick={() => setPagActive(i)}>
                {i}
            </Pagination.Item>
        )
    }

    useEffect(() => {
        const catalog = productStorage?.filter(product =>
            product.catalog_listing === false

        )
        setPaginate(catalog)
        const productSubset = catalog.slice((pagActive - 1) * productsPerPage, pagActive * productsPerPage);
        setDisplayedProducts(productSubset);
    }, [pagActive, productStorage]);


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        }, 1500);
        if (param) {
            handlerCategory(param[0])
        }
        getAllProducts();
        resetPagination()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handlerCategory = async (prop) => {
        if (prop === "---") {
            null
        } else {
            await filterByCategory(prop);
        }
        resetPagination()
    };


    const handlerSort = async (prop) => {
        prop
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
        resetPagination()
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
                <div className="containerSearch mt-5">
                    <div className="SearchProducts">
                        < SearchBar className='SearchBar' />
                    </div>
                    <div className="categoriaFiltro">
                        <Dropdown >
                            <Dropdown.Toggle id="dropdown-categoria" className="botonCategoria">
                                Categoría
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handlerCategory('All')}> - Todos</Dropdown.Item>
                                <Dropdown.Item onClick={() => handlerCategory('aromas-ambientales')}>- Aromas ambientales</Dropdown.Item>
                                <Dropdown.Item onClick={() => handlerCategory('cosmetica')}>- Cosmética</Dropdown.Item>
                                <Dropdown.Item onClick={() => handlerCategory('deco')}>- Deco</Dropdown.Item>
                                <Dropdown.Item onClick={() => handlerCategory('perfumeria')}>- Perfumería</Dropdown.Item>
                                <Dropdown.Item onClick={() => handlerCategory('velas')}>- Velas</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown >
                            <Dropdown.Toggle id="dropdown-filtro" className="botonFiltro">
                                Filtrar por:
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handlerSort("priceAsc")}> De menor a mayor</Dropdown.Item>
                                <Dropdown.Item onClick={() => handlerSort("priceDesc")}>De mayor a menor</Dropdown.Item>
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
                <div className='pagination'>
                    <Pagination >
                        <Pagination.First onClick={() => setPagActive(1)} />
                        <Pagination.Prev onClick={() => setPagActive(prev => Math.max(prev - 1, 1))} />
                        {items}
                        <Pagination.Next onClick={() => setPagActive(prev => Math.min(prev + 1, totalPages))} />
                        <Pagination.Last onClick={() => setPagActive(totalPages)} />

                    </Pagination>

                </div>
            </div>
        ))
}

export default Container;