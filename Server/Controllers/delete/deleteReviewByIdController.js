const { reviewModel }= require ('../../models/review.model')

const deleteReviewByIdController = async (id)=>{
try {
    const deleteReview = await reviewModel.deleteOne({_id:id})
    if(deleteReview.deletedCount === 0){
        throw new Error("No se pudo encontrar el producto en la BDD");

    }
   return deleteReview
} catch (error) {
    return ("Este es el error",error)
}
}


module.exports={
    deleteReviewByIdController
}