const { Router } = require("express");
const router = Router();

const { getProductsHandler } = require("../Handlers/get/getProductsHandler");
const { getProductByIdHandler } = require("../Handlers/get/getProductByIdHandler");
const { getProductByCategoryHandler } = require("../Handlers/get/getProductByCategoryHandler");
const { getProductByTitleHandler } = require("../Handlers/get/getProductByTitleHandler");

router.get("/:products", getProductsHandler);
router.get("/category/:category", getProductByCategoryHandler);
router.get("/search", getProductByTitleHandler);
router.get("/:id", getProductByIdHandler);

module.exports = router;
