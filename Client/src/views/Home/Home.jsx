import "./Home.css"
import Footer from "../../components/Footer/Footer";
import { useContext, useEffect } from "react";
import { ProductContext } from '../../services/ProductContext';
import Container from "../../components/Products/Container/Container";

const Home = () => {

    const { allProducts, getAllProducts } = useContext(ProductContext);

    useEffect(() => {
        getAllProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="home_container">
            <div>
                <Container allProducts={allProducts} />
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Home;