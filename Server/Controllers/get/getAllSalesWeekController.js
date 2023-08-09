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

        const dailySales = {
            "lunes": 0,
            "martes": 0,
            "miércoles": 0,
            "jueves": 0,
            "viernes": 0,
            "sábado": 0,
            "domingo": 0
        };

        salesThisWeek.forEach(sale => {
            const day = moment(sale.purchase_datetime).format('dddd');
            dailySales[day] += 1; 
        });

        return dailySales;
    } catch (error) {
        throw new Error("No se puede acceder a la BDD");
    }
}

module.exports = { getAllSalesWeekController }

