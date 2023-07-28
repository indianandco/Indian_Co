const {getReviewByIdController} = require ('../../Controllers/get/getReviewByIdController')

const getReviewByIdHandler= async (req,res)=>{
    const {id}= req.query
    try {
         const findReview= await getReviewByIdController(id)
    if (!findReview){
        throw new Error ("No se encontro el review con ese ID")
    }
    return res.status(200).json(findReview)
    } catch (error) {
        res.status(400).json({error:error,message})
    }
}

module.exports={
    getReviewByIdHandler
}