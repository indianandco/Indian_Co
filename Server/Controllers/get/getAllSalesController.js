const { ticketModel } = require('../../models/ticket.model')


const getAllSalesController= async()=>{
try {
    const allSales = await ticketModel.find()

    return allSales
} catch (error) {
    console.log("este es el error",error)
    return ({error: "No se pude acceder a la BDD"});
}
}


module.exports={
    getAllSalesController
}