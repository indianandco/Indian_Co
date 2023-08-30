const mercadopago = require("mercadopago");
require("dotenv").config();
const { shopOrderMailTransferWShipping, shopOrderMailTransferMeetPoint } = require('../../config/nodeMailer.config');

const { MP_TOKEN } = process.env;

const payment = async (req, res) => {
  const info = req.body;

  console.log(info);
  
  const generateProductList = () =>{
    const products = info.shop.cart.map( ( product ) =>  (
      {
        id: product._id,
        title: product.title,
        fragance: product.fragance,
        quantity: product.quantity,
        currency_id: "ARS",
        unit_price: product.offer === true ? product.offer_price : product.price
      }
    ));
    return products
  };

    console.log(generateProductList);

  try {
    if (info.paymentMethod === "MercadoPago") {
      mercadopago.configure({access_token: MP_TOKEN});

      const preference = {
        items: generateProductList(),
        notification_url: "https://www.indianandco.com.ar/carts/purchase/notification",
        back_urls: {
          success: "https://www.indianandco.com.ar/carts/purchase/success",
          failure: "https://www.indianandco.com.ar/carts/purchase/failure",
          //pending: "https://mere-hands-production.up.railway.app/carts/purchase/pending"
        },
        auto_return: "approved",
        binary_mode: true,
      };

      await mercadopago.preferences.create(preference)
        .then(function (response) {
          res.status(200).send({ response });
        })

    } else {
      if (info.shippingOption === "envio") {
        await shopOrderMailTransferWShipping(
          info.user.userInfo.email,
          `${info.user.userInfo.first_name} ${info.user.userInfo.last_name}`,
          "test",
          info.shop.total,
          info.shop.cart,
          info.user.deliverInfo
        );
      }

      if (info.shippingOption === "punto_encuentro") {
        await shopOrderMailTransferMeetPoint(
          info.user.userInfo.email,
          `${info.user.userInfo.first_name} ${info.user.userInfo.last_name}`,
          "test",
          info.shop.total,
          info.shop.cart
        );
      }

      res.status(200).send("todo ok");

    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error });
  }
};

module.exports = {
  payment,
};
