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
        notification_url: "https://eed1-2803-9800-9016-4e03-147c-e8ef-532f-7104.ngrok.io/carts/purchase/notification",
        auto_return: "approved",
        binary_mode: true
      };

      await mercadopago.preferences.create(preference)
        .then(async  (response) => {
          res.status(200).send({ response });
          // console.log("1er RESPUESTA DEL BACK de ML (Solo genera el link de pago):", response)
          const identificador = response.response.id;
          info.preferenceId = identificador

         
  
          // // response.id coincide con el response del cobro (response.preference_id )
          await postTicketsController(info);
        })

    } else {

      // if (info.shippingOption === "envio") {
      //   await shopOrderMailTransferWShipping(
      //     info.user.userInfo.email,
      //     `${info.user.userInfo.first_name} ${info.user.userInfo.last_name}`,
      //     "test",
      //     info.shop.total,
      //     info.shop.cart,
      //     info.user.deliverInfo
      //     );
      //   }
        
      //   if (info.shippingOption === "punto_encuentro") {
      //     await shopOrderMailTransferMeetPoint(
      //       info.user.userInfo.email,
      //       `${info.user.userInfo.first_name} ${info.user.userInfo.last_name}`,
      //       "test",
      //       info.shop.total,
      //       info.shop.cart
      //       );
      //     }
          
        await postTicketsController(info);
      res.status(200).send("todo ok");

    }
  } catch (error) {
    
    res.status(500).send({ status: "error", error });
  }
};

module.exports = {
  payment
};
