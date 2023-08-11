const { getProductByIdHandler } = require('../../Controllers/get/getProductByIdController');
 
const getReviewsByProductIdHandler = async (req, res) => {
  const { pid } = req.params;
  try {
      const product = await getProductByIdHandler(pid);

      if(!product) {
        return res.status(404).json({ message: 'Todavia no hay reviews sobre este producto' });
      } else {
        return res.status(200).json({payload: product.reviews});
      };

  } catch (error) {
    console.log("este es el error",error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getReviewsByProductIdHandler
};
