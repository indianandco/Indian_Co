const { postTicketsController } = require("../../Controllers/post/postTicketsController");


const postTicketsHandler = async (req, res) => {
    try {
        const {amount, purchaser} = req.body;
        console.log(amount, purchaser)


       const newTicket = await postTicketsController({amount, purchaser});
       console.log(newTicket)

        res.status(200).send({result: 'success', payload: newTicket })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Error en 'postTicketsHandler' ${error}`})
    }
}

module.exports = {
    postTicketsHandler
}