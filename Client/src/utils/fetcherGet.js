import axios from "axios";

const BASE_URL = "https://www.indianandco.com.ar"; 

export const fetcher = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    
    if (!response.statusText === "OK") {
      throw new Error('Error en la petición');
    }
    
    console.log(response.data);
    return response.data

  } catch (error) {
    console.error('Error fetching data:', error);
    return error.response?.data
  }
};