import { createContext, useState } from "react";
import { fetcher } from "../utils/fetcherGet";

export const SearchContext = createContext();

// eslint-disable-next-line react/prop-types
export const SearchProvider = ({ children }) => {

  const [product, setProduct] = useState([]);
  const [error, setError] = useState("");

  const findProduct = async (title) => {
    let response = await fetcher(`products/search?title=${title}`)
    console.log(response);
    if (typeof response.error === "string") {
      setError(response.error)
      return error
    }

    setProduct(response)
    return product;
  }

  return (
    <SearchContext.Provider value={{ error, product, findProduct }}>
      {children}
    </SearchContext.Provider>
  )
}
