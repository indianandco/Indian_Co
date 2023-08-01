const { reviewModel } = require('../../models/review.model');
const { productModel } = require('../../models/product.model');
const { userModel } = require ('../../models/user.model')
const postReviewController = async ({ description, rate, user, product }) => {
  try {
    const newReview = await reviewModel.create({ description, rate, user: user, product: product });


      // Agrega la nueva reseña a la lista de reseñas del producto
      const foundProduct = await productModel.findById(product);
      if (!foundProduct) throw new Error('Producto no encontrado');
      foundProduct.reviews.push(newReview._id);
      await foundProduct.save();

      // Agrega la nueva reseña a la lista de reseñas del usuario
      const foundUser = await userModel.findById(user);
      if (!foundUser) throw new Error('Usuario no encontrado');
      foundUser.reviews.push(newReview._id);
      await foundUser.save();

      return newReview;
  } catch (error) {
      console.log(error)
      throw new Error('Error al crear la reseña');
  }
};

module.exports = {
  postReviewController,
};
