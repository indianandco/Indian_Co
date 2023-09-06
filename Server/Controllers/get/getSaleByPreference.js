const { ticketModel } = require('../../models/ticket.model');

const getSaleByPreference= async (preference)=>{
        const sale = await ticketModel.findOne({preferenceId: preference});
        return sale;
   
};


module.exports={
    getSaleByPreference
};