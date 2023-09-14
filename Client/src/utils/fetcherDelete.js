import axios from "axios";

//const BASE_URL="http://localhost:3001"
const BASE_URL= "https://mere-hands-production.up.railway.app"

export const deleteProduct = async(endpoint)=>{
    try {
        const response = await axios.delete(`${BASE_URL}${endpoint}`)
        return response.data
    } catch (error) {
        throw error.response?.data.error
        
    }
}

export const deleteTicket = async (endpoint)=>{
    try {
        const response = await axios.delete(`${BASE_URL}${endpoint}`)
        return response.data
    } catch (error) {
        throw error.response?.data.error
        
    }
}