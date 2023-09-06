const { ticketModel } = require('../../models/ticket.model');

const putTicketController = async (preference, newStatus) =>{
    return await ticketModel.findOneAndUpdate({preferenceId: preference},{ status: newStatus },{ new: true });
};

module.exports = {
    putTicketController
}