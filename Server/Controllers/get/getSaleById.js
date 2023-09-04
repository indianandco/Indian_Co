const { ticketModel } = require('../../models/ticket.model');

const getSaleById= async (compra)=>{
        const sale = await ticketModel.findOne({owner: compra});
        return sale;
   
};


module.exports={
    getSaleById
};