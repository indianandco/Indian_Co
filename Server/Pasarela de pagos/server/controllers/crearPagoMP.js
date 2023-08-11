const axios = require("axios");
const Airtable = require("airtable");
require("dotenv").config();

const ACCESS_TOKEN_MP = process.env.MP_TOKEN;
const ACCESS_TOKEN_AT = process.env.AT_TOKEN;
const URL = "https://api.mercadopago.com/";
const base = new Airtable({ apiKey: ACCESS_TOKEN_AT }).base("appjesygtmjvYVqj2");

const crearPagoMP = async (req, res) => {
  try {
    const { title, description, precio_final, name, email, num, leadId, cuotas } = req.body;
    const [area, numero] = [num.slice(0, 3), num.substring(3)];

    if (cuotas === 2) {
      const responseCuota1 = await axios.post(
        `${URL}checkout/preferences`,
        {
          items: [
            {
              title,
              description,
              unit_price: precio_final / 2,
              currency_id: "ARS",
              quantity: 1,
            },
          ],
          back_urls: {
            success: `http://localhost:3001/completado?leadId=${leadId}&cuota=1`,
            failure: "http://localhost:3001/error",
          },
          payer: {
            name,
            email,
            phone: {
              number: numero,
              area,
            },
          },
          payment_methods: {
            excluded_payment_types: [{ id: "ticket" }],
          },
          auto_return: "approved",
          binary_mode: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN_MP}`,
          },
        }
      );

      const responseCuota2 = await axios.post(
        `${URL}checkout/preferences`,
        {
          items: [
            {
              title,
              description,
              unit_price: precio_final / 2,
              currency_id: "ARS",
              quantity: 1,
            },
          ],
          back_urls: {
            success: `http://localhost:3001/completado?leadId=${leadId}`,
            failure: "http://localhost:3001/error",
          },
          payer: {
            name,
            email,
            phone: {
              number: numero,
              area,
            },
          },
          payment_methods: {
            excluded_payment_types: [{ id: "ticket" }],
          },
          auto_return: "approved",
          binary_mode: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN_MP}`,
          },
        }
      );

      const updatedRecord = await base("Leads").update(leadId, {
        urlExternalPaymentCuota1: responseCuota1.data.init_point,
        idExternalPaymentCuota1: responseCuota1.data.id,
        urlExternalPaymentCuota2: responseCuota2.data.init_point,
        idExternalPaymentCuota2: responseCuota2.data.id,
        statusExternalPayment: "Pendiente",
      });

      res.json({
        urlExternalPaymentCuota1: responseCuota1.data.init_point,
        urlExternalPaymentCuota2: responseCuota2.data.init_point,
      });
    } else {
      const responseTicket = await axios.post(
        `${URL}checkout/preferences`,
        {
          items: [
            {
              title,
              description,
              unit_price: precio_final,
              currency_id: "ARS",
              quantity: 1,
            },
          ],
          back_urls: {
            success: `http://localhost:3001/completado?leadId=${leadId}`,
            failure: "http://localhost:3001/error",
          },
          payer: {
            name,
            email,
            phone: {
              number: numero,
              area,
            },
          },
          payment_methods: {
            excluded_payment_types: [{ id: "ticket" }],
          },
          auto_return: "approved",
          binary_mode: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN_MP}`,
          },
        }
      );

      const updatedRecord = await base("Leads").update(leadId, {
        urlExternalPayment: responseTicket.data.init_point,
        idExternalPayment: responseTicket.data.id,
        statusExternalPayment: "Pendiente",
      });

      res.json(responseTicket.data.init_point);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = crearPagoMP;
