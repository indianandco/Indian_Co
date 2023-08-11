const { putUserController } = require('../../Controllers/put/putUserController');
const { getUserByEmailController } = require('../../Controllers/get/getUserByEmailController');

const putUserHandler = async (req,res) =>{
    const userData = req.body;
    try {                    
        const user = await getUserByEmailController( userData.email );
  
        if (!user) return res.status(404).send({ status: 'error', message: 'User not Found' });

        await putUserController(userData._id , userData);
  
        res.status(200).send({ status: 'success', message: 'Reset Success' });
  
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    };
};

module.exports = {
    putUserHandler
};