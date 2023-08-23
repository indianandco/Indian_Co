const mercadopago = require('mercadopago');
const { getCartByIdController } = require('../../Controllers/get/getCartByIdController');
require('dotenv').config();
const { MP_TOKEN } = process.env;

const paymentMP = async (req,res) =>{
    try {

//traer el ticket de compra:
    //Los datos a items en la linea 14.
    //  quantity = total de items
    // total_amount = todo el monto
    //Prueba con cart:
      const {total_amount} = await getCartByIdController('64d4eec3c81dc8e0cbcc8163')



        mercadopago.configure({
            access_token: MP_TOKEN
        });


        const preference = {
            items: [
              {
                title: 'Productos IndianCo',
                quantity: 1,
                currency_id: 'ARS',
                unit_price: total_amount
              }
            ],
            back_urls: {
              success: "https://mere-hands-production.up.railway.app/carts/purchase/success",
              failure: "https://mere-hands-production.up.railway.app/carts/purchase/failure",
              pending: "https://mere-hands-production.up.railway.app/carts/purchase/pending"
            },
            notification_url: "https://7b28-2803-9800-9016-aefa-5c23-8b7e-c4fb-a596.ngrok.io/carts/purchase/webhook",

        };
        
        await mercadopago.preferences.create(preference)
          .then(function (response) {
            res.json({
              id: response.body.id // esto se pasararia al boton en el front
            });
          }).catch(function (error) {
            console.log(error);
          });
        
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: 'error', error });
    }
};

module.exports = {
  paymentMP
};