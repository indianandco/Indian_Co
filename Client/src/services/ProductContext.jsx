import { createContext, useState } from "react";
import { postProductFunction } from "../utils/fetcherPost"
import { fetcher } from "../utils/fetcherGet";

export const ProductContext = createContext()

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
    const [response, setResponse] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [detailProducts, setDetailProducts] = useState([]);
    const [product, setProduct] = useState([]);

    const postProduct = async (product) => {
        const responseBack = await postProductFunction('/adminDashboard/products/create', product)
        setResponse(responseBack)
        return responseBack;
    }

    const getAllProducts = async () => {
        const response = await fetcher(`/products`)
        setAllProducts(response);
        return allProducts
    }

    const getDetailProducts = async (id) => {
        const response = await fetcher(`/products/${id}`)
        setDetailProducts(response);
        return detailProducts
    }


    const findProduct = async (title) => {
        let response = await fetcher(`/products/search?title=${title}`)

        if (typeof response.error === "string") {
            return response.error
        }

        setProduct(response)
        return product;
    }

    return (
        <ProductContext.Provider value={{ product, findProduct, response, allProducts, detailProducts, getDetailProducts, postProduct, getAllProducts }}>
            {children}
        </ ProductContext.Provider >
    )
}

