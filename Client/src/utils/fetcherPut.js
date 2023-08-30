import axios from "axios";

const BASE_URL= "https://www.indianandco.com.ar"


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

