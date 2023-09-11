const { postShippingPriceController } = require('../../Controllers/post/postShippingPriceController')

const postShippingPrice = async (req, res) =>{
    try {
        const { price } = req.query;
        console.log(price)
        const response = await postShippingPriceController(price);

        res.status(200).send(response);

    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Error en 'postShippingPrice' ${error}`})
    }
}

module.exports = {
    postShippingPrice
}