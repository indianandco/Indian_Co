import "./Home.css"
import Footer from "../../components/Footer/Footer";
import { useContext } from "react";
import { SearchContext } from '../../services/SearchContext';

const Home = () => {

    const { product } = useContext(SearchContext);
    console.log("product", product);
    return (
        <div className="products_container">
            <h1>HOLA!</h1>
            {product?.map(product => {
                return (

                    <div key={product.id}>
                        <h1>{product.title}</h1>
                        <span>{product.price}</span>
                        <p>{product.description}</p>
                        <p>{product.stock}</p>
                        <p>{product.category}</p>
                    </div>

                )
            })}
            <div>
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Home;