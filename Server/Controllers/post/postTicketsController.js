const { ticketModel } = require('../../models/ticket.model');

const postTicketsController = async ({amount, purchaser}) =>{
        return await ticketModel.create({amount, purchaser});
};

module.exports = {
        postTicketsController
};