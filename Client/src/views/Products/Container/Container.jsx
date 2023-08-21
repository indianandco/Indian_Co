/* eslint-disable react/prop-types */
import "./Container.css"
import Cards from "../Card/Cards"
import { useContext, useEffect,useState } from "react";
import { ProductContext } from '../../../services/ProductContext';
import SearchBar from "../../../components/SearchBar/SearchBar";
import Spinner from 'react-bootstrap/Spinner';


const Container = () => {

    const { allProducts, getAllProducts } = useContext(ProductContext);
    const limit = false
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true);
      }, 1500);
    
        getAllProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit])

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