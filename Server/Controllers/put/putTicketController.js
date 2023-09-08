const { ticketModel } = require('../../models/ticket.model');

const putTicketController = async (tid, status) =>{
    return await ticketModel.findOneAndUpdate({_id: tid},{ status: status },{ new: true });
};

module.exports = {
    putTicketController
}