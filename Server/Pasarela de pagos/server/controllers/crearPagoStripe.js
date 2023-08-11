const Stripe = require("stripe");
const Airtable = require("airtable");
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_TOKEN);
const ACCESS_TOKEN_AT = process.env.AT_TOKEN;
const base = new Airtable({ apiKey: ACCESS_TOKEN_AT }).base("appjesygtmjvYVqj2");

const crearPagoStripe = async (req, res) => {
  try {
    const { title, description, precio_final, email, leadId, country } = req.body;

    const responseTicket = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: title,
              description
            },
            unit_amount: precio_final * 100,
            currency: 'usd'
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `http://localhost:3001/completado?leadId=${leadId}`,
      cancel_url: 'http://localhost:3001/error',
      customer_email: email
    });

    const updatedRecord = await base("Leads").update(leadId, {
      urlExternalPayment: responseTicket.url,
      idExternalPayment: responseTicket.id,
      statusExternalPayment: "Pendiente",
    });
    
    res.json(responseTicket.url);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = crearPagoStripe;