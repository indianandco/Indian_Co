const { reviewModel } = require('../../models/review.model');
const mongoose = require('mongoose');

const getReviewsByProductIdController = async (productId) => {
  try {
    console.log(productId)
    const id =new mongoose.Types.ObjectId(productId);
    const reviews = await reviewModel.find({ product: id })
    console.log(reviews)

    return reviews;
  } catch (error) {
    console.log("Excepción real: ", error);
    throw new Error('Error al obtener las reseñas del producto');
}
}

module.exports = {
  getReviewsByProductIdController,
};
