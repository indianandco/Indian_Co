const mercadopago = require('mercadopago');

const pagarConMercadoPago = (req,res) =>{
    try {

    //traer la orden de compra:


        mercadopago.configure({
            access_token: 'YOUR_ACCESS_TOKEN'
        });
        
        var preference = {
          items: [
            {
              title: 'Productos IndianCo',
              quantity: quantity,
              currency_id: 'ARS',
              unit_price: total_aumont
            }
          ]
        };
        
        mercadopago.preferences.create(preference)

        
    } catch (error) {
        
    }
};

module.exports = {
    pagarConMercadoPago
};