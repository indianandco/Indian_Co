import { createContext, useState } from "react";
import { fetcher } from "../utils/fetcher";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {

  const [product, setProduct] = useState([]);

  const findProduct = async (id) => {
    let response = await fetcher(`/products/${id}`)
    setProduct(response)
    return product;
  }

  return (
    <SearchContext.Provider value={{ product, findProduct }}>
      {children}
    </SearchContext.Provider>
  )
}
