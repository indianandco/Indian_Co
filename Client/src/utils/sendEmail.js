/* import axios from "axios";

const BASE_URL = "https://www.indianandco.com.ar";

export const sendEmail = async (endpoint, info) => {
    try {
        if (info.hasOwnProperty("email")) {
          const response = await axios.post(`${BASE_URL}${endpoint}`);
        }
      
      
      return response.data
  
    } catch (error) {
      console.error('Error fetching data:', error);
      return error.response.data
    }
  }; */