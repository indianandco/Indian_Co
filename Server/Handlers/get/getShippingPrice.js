const { getShippingPriceControlller } = require('../../Controllers/get/getShippingPriceControlller')

const getShippingPrice = async(req, res) =>{
    try {
        const {price} = await getShippingPriceControlller();
        // console.log(price)
        res.status(200).json({status: 'success', payload: price})
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Error en 'getShippingPrice' ${error}`})
    }
};

module.exports = {
    getShippingPrice
};