const { ticketModel } = require('../../models/ticket.model');

const argentinaTime = new Date().toLocaleString()

const postTicketsController = async (info) => {
    const {
        preferenceId,
        first_name,
        last_name,
        email,
        phone,
        city,
        province,
        zipcode,
        address,
        addressDetail,
        notes,
        shippingOption,
        paymentMethod,
        shop: { cart, total}
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
        addressDetail,
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
