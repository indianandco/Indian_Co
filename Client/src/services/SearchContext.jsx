import { createContext, useState } from "react";
import { fetcher } from "../utils/fetcher";

export const SearchContext = createContext();

// eslint-disable-next-line react/prop-types
export const SearchProvider = ({ children }) => {

  const [product, setProduct] = useState([]);

  const findProduct = async (title) => {
    let response = await fetcher(`products/search?title=${title}`)
    setProduct(response)
    return product;
  }

  return (
    <SearchContext.Provider value={{ product, findProduct }}>
      {children}
    </SearchContext.Provider>
  )
}
