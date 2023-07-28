const { userModel } = require('../../models/user.model');

const putUserController =  async (uid, userData) =>{
    
    return await userModel.findByIdAndUpdate({_id: uid}, userData);
};

module.exports = {
    putUserController
}