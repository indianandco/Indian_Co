const { Router } = require('express');
const router = Router();

const { emptyCartHandler } = require('../Handlers/put/emptyCartHandler');
const { getCartByIdHandler } = require('../Handlers/get/getCartById');
const { postTicketsHandler } = require('../Handlers/post/postTicketsHandler');
const { paymentMP } = require('../Handlers/get/paymentMP');
const { postCartsHandler } = require('../Handlers/post/postCartsHandler');
const mercadopago = require('mercadopago');

router.post('/newcart', postCartsHandler);
router.put('/:cid', emptyCartHandler);
router.get('/:cid', getCartByIdHandler);

//Agregar o quitar un producto del carrito, tambien gestionaria la propiedad Quantity
// router.put('/:cid/products/:pid', putAddOrRemoveProductOfCart); //Ponernos de acuerdo.

//Finalizar venta + redireccion/cobro con mercadopago
router.post('/:cid/purchase', postTicketsHandler);
router.post('/purchase/mercadopago', paymentMP);
router.get('/purchase/success', (req,res) => res.send('success'));
router.get('/purchase/failure', (req,res) => res.send('failure'));
router.get('/purchase/pending', (req,res) => res.send('pending'));
router.post('/purchase/webhook', async (req,res) => {
    try {
        const payment = req.query;
        console.log(payment);
        if (payment.type === "payment") {
          const data = await mercadopago.payment.findById(payment["data.id"]);
          console.log('que es esto',data);
        }
    
        res.sendStatus(204);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
      }
});

module.exports = router;