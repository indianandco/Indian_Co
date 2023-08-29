const { Router } = require("express");
const router = Router();

const { emptyCartHandler } = require("../Handlers/put/emptyCartHandler");
const { getCartByIdHandler } = require("../Handlers/get/getCartById");
const { postTicketsHandler } = require("../Handlers/post/postTicketsHandler");
const { payment } = require("../Handlers/get/payment");
const { postCartsHandler } = require("../Handlers/post/postCartsHandler");

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


router.post("/purchase/notification", async (req, res) =>{
  try {
    const payment = req.query;
    console.log(payment);
    if (payment.type === "payment") {
      const data = await mercadopage.payment.findById(payment["data.id"]);
      console.log(data);
    }

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
})

module.exports = router;
