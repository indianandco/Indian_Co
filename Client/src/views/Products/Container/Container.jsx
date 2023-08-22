/* eslint-disable react/prop-types */
import "./Container.css"
import Cards from "../Card/Cards"
import { useContext, useEffect, useState } from "react";
import { ProductContext } from '../../../services/ProductContext';
import SearchBar from "../../../components/SearchBar/SearchBar";
import Spinner from 'react-bootstrap/Spinner';


const Container = () => {

    const { allProducts, getAllProducts, foundProduct } = useContext(ProductContext);
    const limit = false
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
        }, 1500);

        getAllProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])
    console.log("allProducts", allProducts)
    console.log("foundProduct en el container", foundProduct)

    return (
        !isLoading ? (
            <div className="loading-spinner">
                <Spinner animation="border" role="status" aria-hidden="true">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </div>
        ) : (
            <div className="containerSearch">
                < SearchBar />
                <div className="products_container">
                    {
                        foundProduct.length > 0 ? foundProduct?.map(product => (
                            <Cards
                                key={product?._id}
                                product={product}

                            />))
                            :
                            allProducts.payload?.map(product => (
                                <Cards
                                    key={product?.id}
                                    product={product}
                                />
                            ))
                    }

                </div>
            </div>

        ))
}

export default Container;