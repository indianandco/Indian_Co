import axios from "axios";

const BASE_URL= "http://localhost:3001"
//const BASE_URL= "https://mere-hands-production.up.railway.app"


export const updateProductFunction= async (endpoint, updateProduct)=>{
    try {
        const response = await axios.put(`${BASE_URL}${endpoint}`, updateProduct)
        return response.data
    } catch (error) {
        throw error.response?.data.error       
    }
}

export const updateUserInfo = async (endpoint, updateUser) => {
    try {
        const response = await axios.put(`${BASE_URL}${endpoint}`, updateUser)
        return response.data
    } catch (error) {
        throw error.response?.data.error
    }
}

export const updateTicketFunction = async(endpoint, status)=>{
    try {
    
        const response = await axios.put(`${BASE_URL}${endpoint}`,status)
        return response.data
    } catch (error) {
        throw error.response?.data.error
    }
}

export const fetcherShippingCostPUT = async(endpoint) =>{
    try {
      const response = await axios.put(`${BASE_URL}${endpoint}`);
      return response.data;
      
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
}