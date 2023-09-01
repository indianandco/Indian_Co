const { Router } = require("express");
const router = Router();

const { getProductByIdController } = require('../Controllers/get/getProductByIdController');
const { putProductController } = require('../Controllers/put/putProductController')
const { getSaleById } = require("../Controllers/get/getSaleById");
const { postTicketsController } = require('../Controllers/post/postTicketsController')

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
    const {body, query} = req;
    
    const topic = query.topic; 

    let merchantOrder;

    switch (topic) {
      // case "payment":
      //   const paymentId = query.id;
      //   console.log(paymentId)
      //   let payment = await mercadopago.payment.findById(paymentId);
      //   console.log("payment:", payment)
      //   merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id);
      //   console.log("merchantOrder:", merchantOrder )
      //   break;
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

    if (paidAmount >= merchantOrder.body.total_amount) {
      
      const compra = merchantOrder.body.id.toString() ;
      const ticket = await getSaleById(compra);

        if (ticket){
          console.log("el pago ya fue registrado")

          res.status(201).send({payload: "success", message: "La compra ya fue registrada en la BD"});
  
        }else{
            const products = merchantOrder.body.items;
    
            let totalAmount = 0;
            for (const product of products) {
              const { id, quantity } = product;
              const productData = await getProductByIdController(id);
    
    
              totalAmount += ( productData.offer ? productData.offer_price : productData.price ) * quantity;
    
              // Restar del stock del producto
              productData.stock -= quantity;
              await putProductController(id, productData);
            }
            
            //Creacion del ticket
            await postTicketsController(totalAmount, compra ,products);
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


