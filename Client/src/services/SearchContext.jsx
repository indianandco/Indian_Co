import { createContext, useState } from "react";
import { fetcher } from "../utils/fetcherGet";

export const SearchContext = createContext();

// eslint-disable-next-line react/prop-types
export const SearchProvider = ({ children }) => {

  const [product, setProduct] = useState([]);

  const findProduct = async (title) => {
    let response = await fetcher(`/products/search?title=${title}`)

    if (typeof response.error === "string") {
      return response.error
    }

    setProduct(response)
    return product;
  }

  return (
    <SearchContext.Provider value={{ product, findProduct }}>
      {children}
    </SearchContext.Provider>
  )
}
