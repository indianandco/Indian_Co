const { getReviewsByProductIdController } = require('../../Controllers/get/getReviewsByProductIdController');

const getReviewsByProductIdHandler = async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await getReviewsByProductIdController(productId);
    if (!reviews || reviews.length === 0) {
      throw new Error("No hay reviews");
    }

    return res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getReviewsByProductIdHandler,
};
