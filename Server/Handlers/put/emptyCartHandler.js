const { emptyCartController } = require('../../Controllers/put/emptyCartController');

const emptyCartHandler = async (req, res) =>{
    const id = req.params.cid;
    try {
        const emptyCart = await emptyCartController(cid);

        if (!emptyCart) {
            return res.status(404).send({ error: 'Carrito no encontrado' });
        };

        res.status(200).send({result: 'success', payload: emptyCart});
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    };
};

module.exports = {
    emptyCartHandler
}