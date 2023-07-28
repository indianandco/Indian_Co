const { reviewModel } = require('../../models/review.model');
const { productModel } = require('../../models/product.model');

const postReviewController = async ({ description, rate, user, product }) => {
  try {
    // Crear la nueva reseña en la colección de reviews
    const newReview = await reviewModel.create({ description, rate, user, product });

    // Buscar el producto al que pertenece la reseña por su ID
    const foundProduct = await productModel.findById(product);

    // Verificar si el producto existe
    if (!foundProduct) {
      throw new Error('Producto no encontrado');
    }

    // Agregar la nueva reseña al campo "reviews" del producto
    foundProduct.reviews.push(newReview._id);
    await foundProduct.save();

    // Devolver la nueva reseña creada
    return newReview;
  } catch (error) {
    throw new Error('Error al crear la reseña');
  }
};

module.exports = {
  postReviewController,
};