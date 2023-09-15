const { postCartsController } = require("../../Controllers/post/postCartsController");

const postCartsHandler = async (req, res) =>{
    try {
        const { total_amount, owner, products } = req.body;
        //console.log(total_amount, owner, products )


       const newCart = await postCartsController({total_amount, owner, products});
       //console.log(newCart)

        res.status(200).send({result: 'success', payload: newCart })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Error en 'postCartsHandler' ${error}`})
    }
}
module.exports = { postCartsHandler };