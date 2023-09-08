const { getAllSalesWeekController } = require("../../Controllers/get/getAllSalesWeekController");


const getAllSalesWeek = async (req, res) => {
    try {
        const response = await getAllSalesWeekController();
        console.log("esta es el response", response)
        return res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {getAllSalesWeek}