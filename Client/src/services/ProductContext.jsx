import { createContext, useState } from "react";
import { postProductFunction } from "../utils/fetcherPost"
import { fetcher } from "../utils/fetcherGet";

export const ProductContext = createContext()

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
    const [response, setResponse] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const postProduct = async (product) => {
        const responseBack = await postProductFunction('/products', product)
        setResponse(responseBack)
        return response;
    }

    const getAllProducts = async () => {
        const response = await fetcher(`/products`)
        setAllProducts(response);
        return allProducts
    }

    return (
        <ProductContext.Provider value={{ response, allProducts, postProduct, getAllProducts }}>
            {children}
        </ ProductContext.Provider >
    )
}

