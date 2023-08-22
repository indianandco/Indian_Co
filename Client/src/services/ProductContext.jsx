import { createContext, useState } from "react";
import { postProductFunction } from "../utils/fetcherPost"
import { updateProductFunction } from "../utils/fetcherPut"
import { fetcher } from "../utils/fetcherGet";

export const ProductContext = createContext()

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
    const [response, setResponse] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [detailProducts, setDetailProducts] = useState([]);
    const [foundProduct, setFoundProduct] = useState([]);

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
        if (response && typeof response.error === "string") {
            return response.error;
        }
        if (response && response.length > 0) {
            setFoundProduct(response);
        } else {
            setFoundProduct([]);
        }
        return response;
    }

    const clearSearch = () => {
        setFoundProduct([]);
    }


    const updateProduct = async (updateProduct, id) => {
        const response = await updateProductFunction(`/adminDashboard/products/update/${id}`, updateProduct)
        return response

    }

    return (
        <ProductContext.Provider value={{ clearSearch, foundProduct, setFoundProduct, findProduct, response, allProducts, detailProducts, getDetailProducts, postProduct, getAllProducts, updateProduct }}>
            {children}
        </ ProductContext.Provider >
    )
}

