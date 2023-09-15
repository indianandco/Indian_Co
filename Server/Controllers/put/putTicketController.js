const { ticketModel } = require('../../models/ticket.model');

const putTicketController = async (tid, status) =>{
    return await ticketModel.findOneAndUpdate({_id: tid},{ status: status },{ new: true });
};

const putTicketControllerMP = async (preference, newStatus, paymentId) =>{

    //console.log('controller', paymentId)
    return await ticketModel.findOneAndUpdate(
        { preferenceId: preference },
        { $set: { comprobanteMercadoPago: paymentId, status: newStatus } },
        { new: true });
};

module.exports = {
    putTicketController,
    putTicketControllerMP
}