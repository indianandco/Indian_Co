/* eslint-disable react/prop-types */
import "./Container.css"
import Cards from "../Card/Cards"
import { useContext, useEffect } from "react";
import { ProductContext } from '../../../services/ProductContext';
import SearchBar from "../../../components/SearchBar/SearchBar";

const Container = () => {

    const { allProducts, getAllProducts } = useContext(ProductContext);
    const limit = false

    useEffect(() => {
        getAllProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

    return (
        <div className="containerSearch">
            < SearchBar />
            <div className="products_container">
                {
                    allProducts.payload?.map(product => (
                        <Cards
                            key={product?.id}
                            product={product}
                        />
                    ))
                }
            </div>
        </div>

    )
}

export default Container;