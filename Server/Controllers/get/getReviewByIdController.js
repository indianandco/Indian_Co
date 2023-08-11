const { reviewModel } = require('../../models/review.model')

const getReviewByIdController= async (id)=>{
 try {
       const findReview = await reviewModel.findById (id)
    if(!findReview){
        throw new Error
    }
    return findReview
} catch (error) {
 return({error: "No se encontro ese review en la BDD"})   
}
}

module.exports={
    getReviewByIdController
}