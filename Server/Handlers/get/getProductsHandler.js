const {getProductsController} = require("../../Controllers/get/getProductsController")

const getProductsHandler = async (req, res) => {
    const { limit = 10 } = req.query;
    const { page = 1 } = req.query;
    const sort = req.query.sort;
    try {
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await getProductsController(limit, page, sort);
        console.log(docs)
        const products = docs;
        console.log(products)
        
        res.status(200).send({ result: 'success', payload: products});
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getProductsHandler
}