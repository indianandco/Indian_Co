const { getAllSalesWeekController } = require("../../Controllers/get/getAllSalesWeekController");


const getAllSalesWeek = async () => {
    try {
        const response = await getAllSalesWeekController();
        return response.data 
        
    } catch (error) {
        
    }
}

module.exports = {getAllSalesWeek}