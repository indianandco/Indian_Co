const { postTicketsController } = require("../../Controllers/post/postTicketsController");


const postTicketsHandler = async (req, res) => {
    try {
        const {total_amount, owner, products} = req.body;
        
        const newTicket = await postTicketsController({total_amount, owner, products});
       console.log(newTicket)

        res.status(200).send({result: 'success', payload: newTicket })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Error en 'postTicketsHandler' ${error}`})
    }
}

module.exports = {
    postTicketsHandler
};
