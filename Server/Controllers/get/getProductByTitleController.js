const productModel = require('../../models/product.model')

const getProductByTitleController = async (title)=>{
try {
    const productFound = await productModel.find({
        title: { $regex: new RegExp(title, 'i') },
    })
    return productFound
} catch (error) {
    return ({error: "No se encontro un producto con ese nombre"})
}
}

module.exports={
    getProductByTitleController
}

