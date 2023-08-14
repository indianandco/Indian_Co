const moment = require('moment');
moment.locale('es');
const { ticketModel } = require('../../models/ticket.model'); // Asegúrate de actualizar la ruta a tu modelo

const getAllSalesYearController = async () => {
    try {
        const startOfYear = moment().startOf('year').toDate();
        const endOfYear = moment().endOf('year').toDate();

        const salesThisYear = await ticketModel.find({
            purchase_datetime: {
                $gte: startOfYear,
                $lte: endOfYear
            }
        }).exec();

        const monthlySales = {
            "enero": 0,
            "febrero": 0,
            "marzo": 0,
            "abril": 0,
            "mayo": 0,
            "junio": 0,
            "julio": 0,
            "agosto": 0,
            "septiembre": 0,
            "octubre": 0,
            "noviembre": 0,
            "diciembre": 0
        };

        salesThisYear.forEach(sale => {
            const month = moment(sale.purchase_datetime).format('MMMM');
            monthlySales[month.toLowerCase()] += 1;
        });

        return monthlySales;
    } catch (error) {
        throw new Error("No se puede acceder a la BDD");
    }
}

module.exports = { getAllSalesYearController };
