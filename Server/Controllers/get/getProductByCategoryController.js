const {productModel} = require ('../../models/product.model')

const getProductByCategoryController = async(category)=>{
try {
    if(category==="All"){
       const allCategory= await productModel.find()
       return allCategory
    }
    else{
     const  byCategory= await productModel.find({category: category})
    return byCategory
    }

   
} catch (error) {
   return ({error: "No se encontro esa categoria"})
}
}

module.exports={
    getProductByCategoryController
}