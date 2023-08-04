const { ticketModel } = require('../../models/ticket.model');

const putTicketController = async (tid, status) =>{
    return await ticketModel.findByIdAndUpdate({_id: tid}, status);
};

module.exports = {
    putTicketController
}