const { putProductController } = require('../../Controllers/put/putProductController');
const { cloudinary } = require("../../cloudinaryConfig")
const putProductHandler = async (req, res) =>{
   let id = req.params.pid;
    try {
        const { title, price, description, stock, category, offer, size, fragance, image, offer_price } = req.body;
        let imageUrl = null
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                upload_preset: "ml_default"
            })
            if (uploadResponse) {
                imageUrl = uploadResponse.secure_url;
            } else {
                throw new Error("Failed to upload image to Cloudinary");
            }
        }
        const updateProduct ={title, price, description, stock, category, offer, size, fragance, image: imageUrl, offer_price }
      
        const result = await putProductController(id, updateProduct);
        res.status(200).json({status:"success", payload: result})    
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    };
};

module.exports = {
    putProductHandler
}