const {getProductsController} = require("../../Controllers/get/getProductsController")

const getProductsHandler = async (req, res) => {
   
    const sort = req.query.sort;
    try {
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await getProductsController( sort);
   
        const products = docs;
     
        
        res.status(200).send({ result: 'success', payload: products});
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getProductsHandler
}