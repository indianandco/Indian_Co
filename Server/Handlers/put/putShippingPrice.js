const { putShippingPriceController } = require('../../Controllers/put/putShippingPrice')

const putShippingPrice = async (req, res) =>{
    try {
        const { price } = req.query;
            await putShippingPriceController(price);
            
        res.status(200).json({ message: 'Precio del envío actualizado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error al actualizar el precio del envío: ${error.message}` });
    }
};


module.exports = {
    putShippingPrice
}