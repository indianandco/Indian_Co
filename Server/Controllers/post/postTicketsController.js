const { ticketModel } = require('../../models/ticket.model');

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
        shippingOption
    });

    return newTicket;
};

module.exports = {
    postTicketsController
}
