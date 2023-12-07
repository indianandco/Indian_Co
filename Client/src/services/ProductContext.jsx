import { createContext, useState } from "react";
import { postProductFunction } from "../utils/fetcherPost"
import { updateProductFunction } from "../utils/fetcherPut"
import { fetcher } from "../utils/fetcherGet";
import { deleteProduct } from "../utils/fetcherDelete"

export const ProductContext = createContext()

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
    const [response, setResponse] = useState([]);
    const [detailProducts, setDetailProducts] = useState([]);
    const [/* foundProduct */, setFoundProduct] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [error, setError] = useState(null);
    const [productStorage, setProductStorage] = useState([])
    const [pagActive, setPagActive] = useState(1);

    const postProduct = async (product) => {
        const responseBack = await postProductFunction('/adminDashboard/products/create', product)
        setResponse(responseBack)
        return responseBack;
    }

    const getAllProducts = async () => {
        const response = await (fetcher(`/products`))
        setAllProducts(response.payload);
        setDisplayedProducts(response.payload);
        setProductStorage(response.payload)

    };

    const getDetailProducts = async (id) => {
        const response = await fetcher(`/products/${id}`)
        setDetailProducts(response);
        return detailProducts
    }

    const findProduct = async (title) => {
        if (title === "") {
            setDisplayedProducts(allProducts);
            return;
        }
        const response = await fetcher(`/products/search?title=${title}`);
        if (response.error) {
            setError(response.error);
        } else {
            setDisplayedProducts(response);
        }
    };

    const findProductStorage = (title) => {
        const newProducts = allProducts

        const filteredProducts = newProducts.filter(product =>
            product.title.toLowerCase().includes(title.toLowerCase())
        );

        setProductStorage(filteredProducts);
    };


    const filterByCategory = async (category) => {
        const response = await fetcher(`/products/category/${category}`);
        setProductStorage(response);
    };

    const sortProducts = async (prop) => {
        const response = await fetcher(`/products?sort=${prop}`)
        setProductStorage(response.payload)
    }

    const offerProducts = async (prop) => {
        if (prop === "true") {
            const filtered = allProducts.filter((product) => {
                return product.offer === true
            })
            setProductStorage(filtered)
        } else if (prop === "false") {
            const filtered = allProducts.filter((product) => {
                return product.offer === false
            })
            setProductStorage(filtered)
        }
    }

    const clearSearch = () => {
        setFoundProduct([]);
    }
    const clearError = () => {
        setError(null);
    }
    const updateProduct = async (updateProduct, id) => {
        const response = await updateProductFunction(`/adminDashboard/products/update/${id}`, updateProduct)
        return response
    }

    const resetPagination = () => {
        setPagActive(1);
    }

    const deleteProductFn = async (id) => {
        const response = await deleteProduct(`/adminDashboard/products/delete/${id}`)
        return response;
    }

    return (
        <ProductContext.Provider value={{ deleteProductFn, offerProducts, pagActive, setPagActive, resetPagination, sortProducts, clearSearch, error, clearError, displayedProducts, getAllProducts, findProduct, findProductStorage, productStorage, filterByCategory, response, allProducts, detailProducts, getDetailProducts, postProduct, updateProduct }}>
            {children}
        </ ProductContext.Provider >
    )
}

