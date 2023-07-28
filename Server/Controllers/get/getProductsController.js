const {productModel} = require('../../models/product.model');

const getProductsController = async (limit, page, sort) => {  
    
    try {
        if (sort) {
          let sortOption = {};
          if (sort === "asc") {
              sortOption = { price: 'asc' };
          } else if (sort === "desc") {
              sortOption = { price: 'desc' };
          }
          sort = sortOption;
        };

      const allProducts = await productModel.paginate({}, { limit, page, sort, lean: true });

      return allProducts;
    } catch(error) {
      
    };
};

module.exports = { 
  getProductsController 
};
