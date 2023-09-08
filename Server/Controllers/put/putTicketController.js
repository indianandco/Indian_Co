const { ticketModel } = require('../../models/ticket.model');

const putTicketController = async (tid, status) =>{
    return await ticketModel.findOneAndUpdate({_id: tid},{ status: status },{ new: true });
};

const putTicketControllerMP = async (preference, newStatus, paymentId) =>{
    return await ticketModel.findOneAndUpdate({preferenceId: preference},{ status: newStatus, comprobanteMercadoPago: paymentId},{ new: true });
};

module.exports = {
    putTicketController,
    putTicketControllerMP
}