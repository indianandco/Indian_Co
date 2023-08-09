const axios = require("axios");
require("dotenv").config();

const ACCESS_TOKEN = process.env.MP_TOKEN;
const URL = 'https://api.mercadopago.com/';

const errorPago = (req, res) => {
  res.send("Error");
};

module.exports = errorPago;