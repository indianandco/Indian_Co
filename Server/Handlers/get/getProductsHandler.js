const {getProductsController} = require("../../Controllers/get/getProductsController")

const getProductsHandler = async (req, res) => {
    const sort = req.query.sort;
    try {
        const products = await getProductsController(sort);
        res.status(200).send({ result: 'success', payload: products });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getProductsHandler
}
