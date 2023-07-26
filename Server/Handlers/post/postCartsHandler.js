const { postCartsController } = require("../../Controllers/post/postCartsController");

const postCartsHandler = async (req, res) =>{
    try {
        const { total_price, owner } = req.body;
        console.log(total_price, owner )


       const newCart = await postCartsController({total_price, owner});
       console.log(newCart)

        res.status(200).send({result: 'success', payload: newCart })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Error en 'postCartsHandler' ${error}`})
    }
}
module.exports = { postCartsHandler };