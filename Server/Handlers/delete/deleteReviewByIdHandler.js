const { deleteReviewByIdController } = require('../../Controllers/delete/deleteReviewByIdController')

const deleteReviewByIdHandler = async (req, res)=>{
try {
    const { id }= req.params
    const deleteReview = await deleteReviewByIdController(id)
    return res.status(200).json({result: 'success', payload: deleteReview})
} catch (error) {
    req.status(500).json({error:error.message})
}
}

module.exports={
    deleteReviewByIdHandler
}