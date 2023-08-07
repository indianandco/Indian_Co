const { postProductsController } = require('../../Controllers/post/postProductsController')
const { cloudinary } = require("../../cloudinaryConfig")


const postProductsHandler = async (req, res) => {
    try {
        const { title, price, description, stock, category, offer_boolean, size, fragance, image } = req.body;
        let imageUrl = null
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                upload_preset: "ml_default"
            })
            if (uploadResponse) {
                imageUrl = uploadResponse.url
            }
        }
        newProduct = await postProductsController({ title, price, description, stock, category, offer_boolean, size, fragance, image: imageUrl });
        res.status(200).json({ result: 'success', payload: newProduct })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}
module.exports = { postProductsHandler };