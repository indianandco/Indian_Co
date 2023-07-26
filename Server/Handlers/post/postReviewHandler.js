const { postReviewController } = require("../../Controllers/post/postReviewController");

const postReviewHandler = async (req, res) =>{
    try {
        const { description, rate, user, product } = req.body;
        console.log(description, rate, user, product )


       const newReview = await postReviewController({ description, rate, user, product });
       console.log(newReview)

        res.status(200).send({result: 'success', payload: newReview })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Error en 'postReviewHandler' ${error}`})
    }
}
module.exports = { postReviewHandler };