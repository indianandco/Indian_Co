const { Router } = require('express');
const router = Router();

const { getAllUserHandler } = require ('../Handlers/get/getAllUserHandler');
const { getUserByNameHandler } = require ('../Handlers/get/getUserByNameHandler');
const { deleteUserByIdHandler } = require ('../Handlers/delete/deleteUserByIdHandler')

const { getProductsHandler } = require("../Handlers/get/getProductsHandler");
const { getProductByTitleHandler } = require("../Handlers/get/getProductByTitleHandler");
const { postProductsHandler } = require("../Handlers/post/postProductsHandler");
const { deleteProductByIdHandler} = require("../Handlers/delete/deleteProductByIdHandler");
const { putProductHandler } = require("../Handlers/put/putProductHandler");

const { getShippingPrice} = require('../Handlers/get/getShippingPrice');
const { postShippingPrice} = require('../Handlers/post/postShippingPrice');
const { putShippingPrice } = require('../Handlers/put/putShippingPrice')

const { getAllSalesHandler } = require ('../Handlers/get/getAllSalesHandler');
const { putTicketHandler } = require('../Handlers/put/putTicketHandler');
const { getAllSalesWeek } = require('../Handlers/get/getAllSalesWeek');
const { getAllSalesYear } = require('../Handlers/get/getAllSalesYear');


//Gestion de Usuarios
router.get('/users', getAllUserHandler); //ver usuarios
router.get('/users/search', getUserByNameHandler); //buscar por nombre
router.delete('/users/delete/:uid', deleteUserByIdHandler); //Por el momento elimina el usuario, habria que ver si decidimos que sea solo un bloqueo

//Gestion de productos
router.get('/products', getProductsHandler); //Todos los productos 'PAGINADOS'
router.get('/products/search', getProductByTitleHandler); //Buscar por titulo
router.delete('/products/delete/:pid', deleteProductByIdHandler); //Eliminar
router.post('/products/create', postProductsHandler); //Crear
router.put('/products/update/:pid', putProductHandler ); //Modificar

//Gestion Precio de envio:
router.post("/shipping/setprice", postShippingPrice);
router.get("/shipping/getprice",getShippingPrice);
router.put("/shipping/setnewprice", putShippingPrice)

//Gestion Pedidos
router.get('/tickets', getAllSalesHandler); //Todos los tickets
router.get('/tickets/week', getAllSalesWeek); //Ventas de la semana
router.get('/tickets/year', getAllSalesYear); //Ventas del año
router.put('/tickets/:tid/state', putTicketHandler); //Cambiar el estado

module.exports = router;