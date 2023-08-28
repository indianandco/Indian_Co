const mercadopago = require("mercadopago");
const {
  shopOrderMailMPwShipping,
  shopOrderMailMPpoint,
  shopOrderMailTransferWShipping,
  shopOrderMailTransferPoint,
} = require("../../config/nodeMailer.config");
require("dotenv").config();

const { MP_TOKEN } = process.env;

const payment = async (req, res) => {
  const info = req.body;
  console.log(info);
  try {
    if (info.paymentMethod === "MercadoPago") {
      mercadopago.configure({
        access_token: MP_TOKEN,
      });

      const preference = {
        items: [
          {
            title: "Productos IndianCo",
            quantity: 1,
            currency_id: "ARS",
            unit_price: info.shop.total,
          },
        ],
        back_urls: {
          success: "https://mere-hands-production.up.railway.app/carts/purchase/success",
          failure: "https://mere-hands-production.up.railway.app/carts/purchase/failure",
          //pending: "https://mere-hands-production.up.railway.app/carts/purchase/pending"
        },
        auto_return: "approved",
        binary_mode: true,
      };

      await mercadopago.preferences
        .create(preference)
        .then(function (response) {
          console.log(response)
          res.status(200).send({ response });

        })
        .then(()=> console.log("Aca iria el manejo del stocl, y la creacion del ticket??"))
        //ACA iria el manejo del stock, y la creacion del ticket
        // .then( await crearTicket, restar stock)
        .then(async () => {
          if (info.shippingOption === "envio") {
            await shopOrderMailMPwShipping(
              info.user.userInfo.email,
              `${info.user.userInfo.first_name} ${info.user.userInfo.last_name}`,
              "test",
              info.shop.total,
              info.shop.cart,
              info.user.deliverInfo
            );
          }
          if (info.shippingOption === "punto_encuentro") {
            await shopOrderMailMPpoint(
              info.user.userInfo.email,
              `${info.user.userInfo.first_name} ${info.user.userInfo.last_name}`,
              "test",
              info.shop.total,
              info.shop.cart
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
        await shopOrderMailTransferPoint(
          info.user.userInfo.email,
          `${info.user.userInfo.first_name} ${info.user.userInfo.last_name}`,
          "test",
          info.shop.total,
          info.shop.cart
        );
      }

      res.send("todo ok");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error });
  }
};

module.exports = {
  payment,
};
