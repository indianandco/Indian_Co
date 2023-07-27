const { getProductByIdController }= require ('../../Controllers/get/getProductByIdController')


const getProductByIdHandler= async(req,res)=>{
   const{id}=req.params
   try {
    const product = await getProductByIdController(id);
    return res.status(200).json(product)
   } catch (error) {
    res.status(400).json({error:error.message})
   }
}

module.exports={
    getProductByIdHandler
}