const { ticketModel } = require('../../models/ticket.model');
const { ProductsDto } = require('../../DTOs/products.dto'); 

const argentinaTime = new Date().toLocaleString()

console.log(argentinaTime);

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

      const filteredCart = cart.map( prod => new ProductsDto(prod))

    const newTicket = await ticketModel.create({
        preferenceId,
        paymentMethod,
        total_amount: total.toString(),
        owner: `${first_name} ${last_name}`,
        products: filteredCart,
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
