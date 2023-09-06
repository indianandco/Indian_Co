const { ticketModel } = require('../../models/ticket.model');


const postTicketsController = async (preferenceId, total_amount, owner, products) =>{
    const newTicket = await ticketModel.create({preferenceId, total_amount, owner, products});

    return newTicket
};

module.exports = {
    postTicketsController
}
