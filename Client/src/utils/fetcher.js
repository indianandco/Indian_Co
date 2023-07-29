import axios from "axios";

const BASE_URL = "http://localhost:3001/"; // Reemplaza esto con la URL de tu API

export const fetcher = async (endpoint) => {
  try {
    const response = await axios(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};