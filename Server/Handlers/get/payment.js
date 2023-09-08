const mercadopago = require("mercadopago");
require("dotenv").config();
const { shopOrderMailTransferWShipping, shopOrderMailTransferMeetPoint } = require('../../config/nodeMailer.config');
const { postTicketsController } = require('../../Controllers/post/postTicketsController')

const { MP_TOKEN } = process.env;

const payment = async (req, res) => {
  let info = req.body;
  // console.log(info);
  
  try {
    if (info.paymentMethod === "MercadoPago") {
      mercadopago.configure({access_token: MP_TOKEN});
      
      const generateProductList = () =>{
        const products = info.shop.cart.map( ( product ) =>  (
          {
            id: product._id,
            title: product.title,
            description: (product.fragance ? product.fragance : "none"),
            quantity: product.quantity,
            currency_id: "ARS",
            unit_price: product.offer === true ? product.offer_price : product.price
          }
        ));
  
        return products
      };

      const preference = {
        items: generateProductList(),
        back_urls: {
          success: "http://localhost:5173/cart",
          // failure: "http://localhost:3001/carts/purchase/failure",
          //pending: "https://mere-hands-production.up.railway.app/carts/purchase/pending"
        },
        notification_url: "https://1f35-2803-9800-9016-4e03-8cf0-6f63-bb9e-6fa3.ngrok.io/carts/purchase/notification",
        auto_return: "approved",
        binary_mode: true
      };

      await mercadopago.preferences.create(preference)
        .then(async  (response) => {
          res.status(200).send({ response });
          // console.log("1er RESPUESTA DEL BACK de ML (Solo genera el link de pago):", response)
          const identificador = response.response.id;
          info.preferenceId = identificador

        // response.id coincide con el response del cobro (response.preference_id )
          await postTicketsController(info);
        })

    } else {
      const ticket = await postTicketsController(info);
      // console.log("este es el Ticket:" ,ticket)
      if (info.shippingOption === "envio") {
        await shopOrderMailTransferWShipping(ticket);
        }
        
        if (info.shippingOption === "punto_encuentro") {
          await shopOrderMailTransferMeetPoint(ticket);
        }
          
      res.status(200).send("todo ok");

    }
  } catch (error) {
    
    res.status(500).send({ status: "error", error });
  }
};

module.exports = {
  payment
};
