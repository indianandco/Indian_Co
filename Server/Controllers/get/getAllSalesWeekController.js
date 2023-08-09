const moment = require('moment');
moment.locale('es');
const {ticketModel}= require('../../models/ticket.model'); // Asegúrate de actualizar la ruta a tu modelo

const getAllSalesWeekController = async () => {
    try {
        
        const startOfWeek = moment().startOf('week').toDate();
        const endOfWeek = moment().endOf('week').toDate();

        const salesThisWeek = await ticketModel.find({
            purchase_datetime: {
                $gte: startOfWeek,
                $lte: endOfWeek
            }
        }).exec();

        console.log(startOfWeek)
        console.log(endOfWeek)
console.log(salesThisWeek)
        return salesThisWeek;

    } catch (error) {
        console.log(error);
        return [];
    }
}

module.exports = { getAllSalesWeekController }
