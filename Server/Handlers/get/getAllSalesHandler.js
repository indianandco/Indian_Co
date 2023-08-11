const { getAllSalesController } = require('../../Controllers/get/getAllSalesController');

const getAllSalesHandler = async (req, res) => {
    try {
        const allSales = await getAllSalesController();
        return res.status(200).json(allSales)
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

module.exports = {
    getAllSalesHandler
};