const { ticketModel } = require('../../models/ticket.model');
const moment = require('moment-timezone');

// Formatear la fecha en el formato ISO estándar
const argentinaTime = moment().tz('America/Argentina/Buenos_Aires').toISOString();



const postTicketsController = async (info) => {
    const {
        preferenceId,
        paymentMethod,
        shop: { cart, total },
        user: {
            userInfo: { first_name, last_name, email, phone },
            deliverInfo: { address, city, province, zipcode },
            notes
        },
        shippingOption
    } = info;

    const newTicket = await ticketModel.create({
        preferenceId,
        paymentMethod,
        total_amount: total.toString(),
        owner: `${first_name} ${last_name}`,
        products: cart,
        phone,
        email,
        address,
        city,
        province,
        zipcode,
        notes,
        shippingOption,
        fecha: argentinaTime
    });

    return newTicket;
};

module.exports = {
    postTicketsController
}
