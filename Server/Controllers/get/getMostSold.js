const { ticketModel } = require('../../models/ticket.model');
const { productModel } = require('../../models/product.model'); // Importa el modelo de producto

const getMostSoldProduct = async (req, res) => {
  try {
    const mostSoldProduct = await ticketModel.aggregate([
      {
        $unwind: "$products", // Divide los elementos de la lista de productos en documentos separados
      },
      {
        $group: {
          _id: "$products.id", // Agrupa por el identificador del producto
          totalSales: { $sum: "$products.quantity" }, // Suma la cantidad de ventas para cada producto
        },
      },
      {
        $sort: { totalSales: -1 }, // Ordena en orden descendente por cantidad vendida
      },
      {
        $limit: 1, // Obtiene solo el producto más vendido
      },
    ]);

    if (mostSoldProduct.length > 0) {
      const productInfo = await productModel.findOne({ _id: mostSoldProduct[0]._id });
      res.status(200).json(productInfo)
    } else {
      res.status(404).send(error) // No se encontraron ventas
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMostSoldProduct,
};
