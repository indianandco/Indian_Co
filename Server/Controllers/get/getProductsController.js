const {productModel} = require('../../models/product.model');
const getProductsController = async (sort) => {  
  try {
      let sortOption = {};
      if (sort) {
          switch(sort) {
              case 'priceAsc':
                  sortOption = { price: 1 };
                  break;
              case 'priceDesc':
                  sortOption = { price: -1 };
                  break;
              case 'nameAsc':
                  sortOption = { title: 1 };
                  break;
              case 'nameDesc':
                  sortOption = { title: -1 };
                  break;
          }
      }
  
      const allProducts = await productModel.find({}).sort(sortOption).lean();
      return allProducts;
  } catch(error) {
      console.error('Error in getProductsController:', error.message);
      throw error;
  };
};

module.exports = { 
  getProductsController 
};