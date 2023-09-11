import axios from "axios";

<<<<<<< HEAD
const BASE_URL = "http://localhost:3001";
//const BASE_URL= "mere-hands-production.up.railway.app"
=======
 const BASE_URL = "http://localhost:3001"; 

// const BASE_URL= "mere-hands-production.up.railway.app"
>>>>>>> 7e812f9619a34143db3511f62188ab28812a4ef8

export const postProductFunction = async (endpoint, product) => {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, product);
    return response.data;
  } catch (error) {
    throw error.response?.data.error;
  }
};

export const fetcherUserPost = async (endpoint, form) => {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, form);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return error
    }
  }
};

export const fetcherPaymentMethod = async (endpoint, data) => {
  // console.log("axios:", data)
  try {
    if (data.paymentMethod === 'MercadoPago') {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data).then((res) => {
          window.location.href = res.data.response.body.init_point;
        });
    }

    if (data.paymentMethod === 'TransferenciaBancaria') {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data);
      console.log(response)
      return response.data;
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
