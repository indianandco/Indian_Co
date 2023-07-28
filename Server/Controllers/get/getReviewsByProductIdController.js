const { reviewModel } = require('../../models/review.model');

const getReviewsByProductIdController = async (productId) => {
  try {
    const reviews = await reviewModel.find({ product: productId })

    return reviews;
  } catch (error) {
    throw new Error('Error al obtener las reseñas del producto');
  }
};

module.exports = {
  getReviewsByProductIdController,
};
