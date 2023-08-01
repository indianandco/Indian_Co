import axios from "axios";

const BASE_URL = "http://localhost:3001"; // Reemplaza esto con la URL de tu API

export const fetcher = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    console.log(response);

    if (!response.statusText === "OK") {
      throw new Error('Error en la petición');
    }
    
    return response.data

  } catch (error) {
    console.error('Error fetching data:', error);
    return error.response.data
  }
};