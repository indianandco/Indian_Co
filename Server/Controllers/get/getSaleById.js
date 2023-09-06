const { ticketModel } = require('../../models/ticket.model');

const getSaleById= async (id)=>{
        const sale = await ticketModel.findById({_id: id});
        return sale;
   
};


module.exports={
    getSaleById
};