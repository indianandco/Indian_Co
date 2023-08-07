import axios from "axios";

const BASE_URL= "http://localhost:3001";


export const postProductFunction = async (endpoint, product)=>{
    try {
        const response = await axios.post(`${BASE_URL}${endpoint}`, product)
        console.log(response.data)
        return response.data

    } catch (error) {
       throw error.response?.data.error
    }
}

export const fetcherCreateUser = async (endpoint, form)=>{
    try {
        const response = await axios.post(`${BASE_URL}${endpoint}`, form)
        console.log(response);
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
    throw error;
    }
}