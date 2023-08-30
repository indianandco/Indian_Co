import axios from "axios";

const BASE_URL = "https://www.indianandco.com.ar";

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
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetcherPaymentMethod = async (endpoint, data) => {
  try {
    if (data.paymentMethod === "MercadoPago") {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(`${BASE_URL}${endpoint}`, data).then((res) => {
          window.location.href = res.data.response.body.init_point;
        });
    }

    if (data.paymentMethod === "TransferenciaBancaria") {
      await axios.post(`${BASE_URL}${endpoint}`, data)
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
