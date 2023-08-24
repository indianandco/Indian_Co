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
router.get("/purchase/success", (req, res) =>
  res.send(
    `<div>
    <ol>
      <li>Comprobante de Mercado Pago: ${req.query.payment_id}</li>
      <li>Status: ${req.query.status}</li>
      <li>MerchantOrder: ${req.query.merchant_order_id}</li>
    </ol>
    <button><a href="http://localhost:5173"> Volver al sitio</></button>
  </div>`
  )
);
router.get("/purchase/failure", (req, res) =>
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  })
);

module.exports = router;
