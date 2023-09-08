const { ticketModel } = require('../../models/ticket.model');


const getAllSalesController= async()=>{
    try {
        const allSales = await ticketModel.find();

        return allSales;
    } catch (error) {
       
        return ({error: "No se pude acceder a la BDD"});
    }
};


module.exports={
    getAllSalesController
};