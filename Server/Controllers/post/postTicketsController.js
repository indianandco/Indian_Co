const { ticketModel } = require('../../models/ticket.model');


const postTicketsController = async (total_amount, owner, products) =>{
    const newTicket = await ticketModel.create({total_amount, owner, products});

    return newTicket
};

module.exports = {
    postTicketsController
}
