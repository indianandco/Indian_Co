const {productModel} = require('../../models/product.model');

const getProductsController = async (limit, page, sort) => {  
    
    try {
      if (sort) {
        let sortOption = {};
        switch(sort) {
            case 'priceAsc':
                sortOption = { price: 1 }; // 1 para ascendente en MongoDB
                break;
            case 'priceDesc':
                sortOption = { price: -1 }; // -1 para descendente en MongoDB
                break;
            case 'nameAsc':
                sortOption = { title: 1 };
                break;
            case 'nameDesc':
                sortOption = { title: -1 };
                break;
        }
        sort = sortOption;
    }
    
      const allProducts = await productModel.paginate({}, { limit, page, sort, lean: true });

      return allProducts;
    } catch(error) {
      console.error('Error in getProductsController:', error.message);
      throw error;
    };
};

module.exports = { 
  getProductsController 
};
