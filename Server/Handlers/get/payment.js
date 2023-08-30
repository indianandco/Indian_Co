const mercadopago = require("mercadopago");

require("dotenv").config();

const { MP_TOKEN } = process.env;

const payment = async (req, res) => {
  const info = req.body;

  console.log(info);
  try {
    if (info.paymentMethod === "MercadoPago") {
      mercadopago.configure({access_token: MP_TOKEN});

      const preference = {
        items: [
          {
            title: "Productos IndianCo",
            quantity: 1,
            currency_id: "ARS",
            unit_price: info.shop.total,
          },
          {
            title: "test2",
            quantity: 2,
            currency_id: "ARS",
            unit_price: "250",
          },
          {
            title: "test3",
            quantity: 3,
            currency_id: "ARS",
            unit_price: "150",
          },
        ],
        notification_url: "https://www.indianandco.com.ar/carts/purchase/notification",
        back_urls: {
          success: "https://www.indianandco.com.ar/carts/purchase/success",
          failure: "https://www.indianandco.com.ar/carts/purchase/failure",
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
    //     .then(async () => {
    //       if (info.shippingOption === "envio") {
    //         await shopOrderMailMPwShipping(
    //           info.user.userInfo.email,
    //           `${info.user.userInfo.first_name} ${info.user.userInfo.last_name}`,
    //           "test",
    //           info.shop.total,
    //           info.shop.cart,
    //           info.user.deliverInfo
    //         );
    //       }
    //       if (info.shippingOption === "punto_encuentro") {
    //         await shopOrderMailMPpoint(
    //           info.user.userInfo.email,
    //           `${info.user.userInfo.first_name} ${info.user.userInfo.last_name}`,
    //           "test",
    //           info.shop.total,
    //           info.shop.cart
    //         );
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
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
