/* eslint-disable react/prop-types */
import "./Container.css"
import Cards from "../Card/Cards"
import { useContext, useEffect } from "react";
import { ProductContext } from '../../../services/ProductContext';
import SearchBar from "../../../components/SearchBar/SearchBar";
import { CartContext } from "../../../services/CartContext";

const Container = () => {

    const { allProducts, getAllProducts } = useContext(ProductContext);
    const { clickAdd, clickRemove/* , removeQuantity, addQuantity */ } = useContext(CartContext);

    const handleAdd = (buy) => {
        clickAdd(buy)
    }

    const handleRemove = (id) => {
        clickRemove(id)
    }

/*     const handleIncrease = (id) => {

    }

    const handleDecrease= (id) => {

    }
 */
    useEffect(() => {
        getAllProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="containerSearch">
            < SearchBar />
            <div className="products_container">
                {
                    allProducts.payload?.map(item => (
                        <Cards
                            key={item?.id}
                            id={item?.id}
                            title={item?.title}
                            description={item?.description}
                            image={item?.image}
                            offer={item?.offer}
                            offer_price={item?.offer_price}
                            size={item?.size}
                            price={item?.price}
                            category={item?.category}
                            fragance={item?.fragance}
                            handleAdd={() => handleAdd(item)}
                            handleRemove={() => handleRemove(item.id)}
                        />
                    ))
                }
            </div>
        </div>

    )
}

export default Container;