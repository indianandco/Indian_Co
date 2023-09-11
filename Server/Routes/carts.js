const { Router } = require("express");
const router = Router();

const { getProductByIdController } = require('../Controllers/get/getProductByIdController');
const { putProductController } = require('../Controllers/put/putProductController')
const { getSaleByPreference } = require("../Controllers/get/getSaleByPreference");
const { putTicketControllerMP } = require('../Controllers/put/putTicketController')
const { emptyCartHandler } = require("../Handlers/put/emptyCartHandler");
const { getCartByIdHandler } = require("../Handlers/get/getCartById");
const { postTicketsHandler } = require("../Handlers/post/postTicketsHandler");
const { payment } = require("../Handlers/get/payment");
const { postCartsHandler } = require("../Handlers/post/postCartsHandler");
const { shopOrderMailMPMeetPoint, shopOrderMailMPShipping } = require('../config/nodeMailer.config');
const mercadopago = require("mercadopago");

router.post("/newcart", postCartsHandler);
router.put("/:cid", emptyCartHandler);
router.get("/:cid", getCartByIdHandler);

//Agregar o quitar un producto del carrito, tambien gestionaria la propiedad Quantity
// router.put('/:cid/products/:pid', putAddOrRemoveProductOfCart); //Ponernos de acuerdo.

//Finalizar venta + redireccion/cobro con mercadopago
router.post("/:cid/purchase", postTicketsHandler);
router.post("/purchase", payment);
router.get("/purchase/success", (req, res) =>{

  const infoPagoAprobado = {
    comprobanteMp: req.query.payment_id,
    estado: req.query.status
  }

  res.status(204).send(infoPagoAprobado);
});
router.get("/purchase/failure", (req, res) =>
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  })
);

router.post("/purchase/notification", async (req, res) =>{
  try {    
    const {query} = req;
    
    const topic = query.topic; 

    let merchantOrder;
    let paymentId;
    switch (topic) {
      case "payment":
        paymentId = query.id || data.id;
         console.log(paymentId) //Numero del comprobante MERCADOPAGO
        let payment = await mercadopago.payment.findById(paymentId);
      
        merchantOrder = await mercadopago.merchant_orders.findById(payment?.body.order.id);
        //  console.log("merchantOrder:", merchantOrder )
        break;
      case "merchant_order":
        const orderId = query.id;
        merchantOrder = await mercadopago.merchant_orders.findById(orderId);
        break; 
    };

    let paidAmount = 0;
    merchantOrder.body?.payments.forEach( payment => {
      if(payment.status === "approved") {
        paidAmount += payment.transaction_amount; 
      }
    });


    //Si la condicion se cumple significa que el pago se concreto
    if (paidAmount >= merchantOrder.body.total_amount) {
      
      const preference = merchantOrder.body.preference_id.toString() ;
      const ticket = await getSaleByPreference(preference);

        //Este if sirve para que los pagos no se registren duplicados en nuestra BD
        if (ticket.status === true){
          console.log("el pago ya fue registrado")

          res.status(201).send({payload: "success", message: "La compra ya fue registrada en la BD"});
  
        }else{
            const products = merchantOrder.body.items;
    
            // Itera los productos que compro y Resta el stock en la BD:
            for (const product of products) {
              const { id, quantity } = product;
              const productData = await getProductByIdController(id);
    
              productData.stock -= quantity;
              await putProductController(id, productData);
            }
            
            //Modifica el ticket a status TRUE => Esta pago listo para entregar
            if(paymentId){
              const updatedTicket = await putTicketControllerMP(preference, true, paymentId);
              // console.log(updatedTicket)

              if (updatedTicket.shippingOption === "punto_encuentro") {
                await shopOrderMailMPMeetPoint(updatedTicket);
              } else {
                await shopOrderMailMPShipping(updatedTicket);
              }
            }
            console.log("el pago se completo");
            res.status(201).send({payload: "success", message: "Compra exitosa"});
          }
      
    } else {
      console.log("el pago NO se completo")
    }
    
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something goes wrong" });
  }
})

module.exports = router;


