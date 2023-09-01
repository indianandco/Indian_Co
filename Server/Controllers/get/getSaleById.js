const { ticketModel } = require('../../models/ticket.model');

const getSaleById= async (compra)=>{
        const sale = await ticketModel.findOne({owner: compra});
        console.log(sale)
        return sale;
   
};


module.exports={
    getSaleById
};