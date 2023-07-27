const { postProductsController } = require('../../Controllers/post/postProductsController')


const postProductsHandler = async (req,res) =>{
    try {
        const { title, price, description, stock, category } = req.body;
        console.log(title, price, description, stock, category )


       const newProduct = await postProductsController({title, price, description, stock, category });
       console.log(newProduct)

        res.status(200).json({result: 'success', payload: newProduct })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Error en 'postProductsHandler' ${error}`})
    }
}
module.exports = { postProductsHandler };