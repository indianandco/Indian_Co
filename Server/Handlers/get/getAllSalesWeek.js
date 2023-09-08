const { getAllSalesWeekController } = require("../../Controllers/get/getAllSalesWeekController");


const getAllSalesWeek = async (req, res) => {
    try {
        const response = await getAllSalesWeekController();
<<<<<<< HEAD
        console.log("esta es el response", response)
=======

>>>>>>> d11795c5b801c7b151a766cde4b79cb1fb4eec4a
        return res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {getAllSalesWeek}