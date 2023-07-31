const { ticketModel } = require('../../models/ticket.model');
const { userModel } = require ('../../models/user.model')

const postTicketsController = async ({ amount, purchaser, products }) => {
        // Crear el nuevo ticket
        const newTicket = await ticketModel.create({ amount, purchaser, products });
      
        // Agregar la referencia del nuevo ticket al campo 'tickets' del usuario
        const user = await userModel.findById(purchaser);
        user.tickets.push(newTicket._id);
        await user.save();
      
        return newTicket;
      };
module.exports = {
        postTicketsController
};