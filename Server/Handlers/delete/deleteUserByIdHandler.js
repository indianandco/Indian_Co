const { deleteUserByIdController } = require('../../Controllers/delete/deleteUserByIdController');

const deleteUserByIdHandler = async (req, res)=>{
    try {
        const { id } = req.params;
        const deleteUser= await deleteUserByIdController(id);
        
        return res.status(200).json({result:'success', payload:deleteUser});

    } catch (error) {
        res.status(400).json({error:error.message});
    };
};

module.exports={
    deleteUserByIdHandler
}