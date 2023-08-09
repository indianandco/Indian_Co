/* eslint-disable react/prop-types */
import "./Container.css"
import Cards from "../Card/Cards"
import { useContext, useEffect } from "react";
import { ProductContext } from '../../../services/ProductContext';
import SearchBar from "../../../components/SearchBar/SearchBar";

const Container = () => {

    const { allProducts, getAllProducts } = useContext(ProductContext);

    useEffect(() => {
        getAllProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="containerSearch">
            < SearchBar />
            <div className="products_container">
                {
                    allProducts.payload?.map(({ id, title, price, offer_price, description, offer, size, fragance, image, category }) => {
                        return (
                            <Cards
                                key={id}
                                id={id}
                                title={title}
                                description={description}
                                image={image}
                                offer={offer}
                                offer_price={offer_price}
                                size={size}
                                price={price}
                                category={category}
                                fragance={fragance}
                            />
                        )
                    })
                }
            </div>
        </div>

    )
}

export default Container;