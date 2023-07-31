import { createContext, useState} from "react";
import { postProductFunction } from "../utils/fetcherPost"

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const [response, setResponse] = useState([])

    const postProduct = async (product) => {
        const response = await postProductFunction('/products', product)
        console.log(response)
        return response
    }

    return (
        <ProductContext.Provider value={{ response, postProduct }}>
            {children}
        </ ProductContext.Provider >
    )
}

