import axios from "axios";

const BASE_URL = "https://mere-hands-production.up.railway.app";

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
    console.log("response", response);
    console.log("hola");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetcherPaymentMethod = async (endpoint, data) => {
  try {
    if (data.paymentMethod === "MercadoPago") {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data).then((res) => {
          window.location.href = res.data.response.body.init_point;
        });
    }
  } catch (error) {}
};
