const { ticketModel } = require('../../models/ticket.model');

const getMostSoldProduct = async () => {
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
      // Puedes buscar más detalles del producto en tu base de datos si es necesario
      return mostSoldProduct[0];
    } else {
      return null; // No se encontraron ventas
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getMostSoldProduct,
};

