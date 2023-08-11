const { ticketModel } = require('../../models/ticket.model');
const { userModel } = require ('../../models/user.model')

const postTicketsController = async ({ total_amount, owner, products }) => {


        //La info puede venir de dos maneeras. Si el comprador esta registrado o sino desde local storage.



        // Crear el nuevo ticket
        const newTicket = await ticketModel.create({ total_amount, owner, products });
      
        // Agregar la referencia del nuevo ticket al campo 'tickets' del usuario
        const user = await userModel.findById(purchaser);
        console.log(user)
        user.tickets.push(newTicket._id);
        await user.save();
      
        return newTicket;
};

module.exports = {
        postTicketsController
};