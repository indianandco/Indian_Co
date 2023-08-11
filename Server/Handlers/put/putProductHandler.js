const { putProductController } = require('../../Controllers/put/putProductController');

const putProductHandler = async (req, res) =>{
    let id = req.params.pid;
    const updateProduct = req.body;
    try {

        const result = await putProductController(id, updateProduct);

        res.status(200).send({status:"success", payload: result})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ error });
    };
};

module.exports = {
    putProductHandler
}