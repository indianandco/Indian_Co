const { ticketModel } = require('../../models/ticket.model');

const putTicketController = async (preference, newStatus) =>{
    return await ticketModel.findOneAndUpdate({preferenceId: preference},{ status: newStatus },{ new: true });
};

const putTicketControllerMP = async (preference, newStatus, paymentId) =>{
    return await ticketModel.findOneAndUpdate({preferenceId: preference},{ status: newStatus, comprobanteMercadoPago: paymentId},{ new: true });
};

module.exports = {
    putTicketController,
    putTicketControllerMP
}