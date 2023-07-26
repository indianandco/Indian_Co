const axios = require('axios');
require('dotenv').config();

const getProductsController = async () => {  
    const URL_COINMARKET_KEY = process.env;
    
    try {
        const response = await axios.get(`${URL}`);
        if (response) {
            console.log(response.data);
        } 
      } catch(error) {
        // error
        console.log(error);
        throw error;
      }
    };

module.exports = getProductsController;
