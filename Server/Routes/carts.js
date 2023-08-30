const { Router } = require("express");
const router = Router();

const { emptyCartHandler } = require("../Handlers/put/emptyCartHandler");
const { getCartByIdHandler } = require("../Handlers/get/getCartById");
const { postTicketsHandler } = require("../Handlers/post/postTicketsHandler");
const { payment } = require("../Handlers/get/payment");
const { postCartsHandler } = require("../Handlers/post/postCartsHandler");
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

  res.status(200).send(infoPagoAprobado);
});
router.get("/purchase/failure", (req, res) =>
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  })
);


router.use("/purchase/notification", async (req, res) =>{
  try {
    console.log("notificar");
    
    const {body, query} = req;
    console.log({body, query});
    
    const topic = query.topic; 

    let merchantOrder;

    switch (topic) {
      case "payment":
        const paymentId = query.id;

        let payment = await mercadopago.payment.findById(paymentId);
        merchantOrder = await mercadopago.merchant_orders.findById(payment?.body.order.id);
        break;
      case "merchant_order":
        const orderId = query.id;
        merchantOrder= await mercadopago.merchant_orders.findById(orderId);
        break; 
    };

    let paidAmount = 0;
    merchantOrder.body.payments.forEach( payment => {
      if(payment.status === "approved") {
        paidAmount += payment.transaction_amount; 
      }
    });

    if (paidAmount >= merchantOrder.body.total_amount) {
      console.log("el pago se completo")
      //Aca implementar la logica del mail y del stock
    } else {
      console.log("el pago NO se completo")
    }
 
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
})

module.exports = router;
