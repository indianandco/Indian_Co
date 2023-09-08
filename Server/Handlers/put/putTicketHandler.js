const { putTicketController } = require('../../Controllers/put/putTicketController')


const putTicketHandler = async (req, res) => {
    const tid = req.query.tid;
    const prev = req.body;
    const status = Object.keys(prev)[0]
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