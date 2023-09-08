const { ticketModel } = require ('../../models/ticket.model');

const deleteTicketController = async (id) => {
    try {
        const deleteTicket = await ticketModel.deleteOne({ id: id })
        if (deleteTicket.deletedCount === 0) {
            throw error
        } else {
            return deleteTicket
        }
    } catch (error) {
        throw new Error("No se pudo encontrar el ticket en la BDD");

    }

}

module.exports = {
    deleteTicketController
}