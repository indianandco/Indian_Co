const { putTicketController } = require('../../Controllers/put/putTicketController')


const putTicketHandler = async(req,res) =>{
    const { tid } = req.params;
    const status = req.body;
    try {

        await putTicketController(tid, status);

        res.status(200).send({ status: 'success', message: 'Ticket Modificado' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    };
};

module.exports = {
    putTicketHandler
};