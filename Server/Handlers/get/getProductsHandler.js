const getProductsController = require("../../Controllers/get/getProductsController")

const getProductsHandler = async (req, res) => {
    try {
        const criptos = await getProductsController();
        res.status(200).json(criptos)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getProductsHandler
}