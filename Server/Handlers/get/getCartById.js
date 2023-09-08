const { getCartByIdController } = require('../../Controllers/get/getCartByIdController');


const getCartByIdHandler = async (req,res) =>{
    const id = req.params.cid;
    try {
        const cart = await getCartByIdController(id);

        if (!cart) {
            return res.status(404).send({ error: 'Carrito no encontrado' });
        }

        res.status(200).send({result: 'success', payload: cart});
        
    } catch (error) {
        res.status(500).send({ error });
    };
};

module.exports = {
    getCartByIdHandler
};