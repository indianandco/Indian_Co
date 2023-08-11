const axios = require("axios");
const Airtable = require("airtable");
require("dotenv").config();

const ACCESS_TOKEN_AT = process.env.AT_TOKEN;
const base = new Airtable({ apiKey: ACCESS_TOKEN_AT }).base("appjesygtmjvYVqj2");

const completadoPago = async (req, res) => {
  try {
    const { leadId } = req.query;

    const updatedRecord = await base("Leads").update(leadId, {
      statusExternalPayment: "Completado",
    });

    res.json(updatedRecord);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = completadoPago;
