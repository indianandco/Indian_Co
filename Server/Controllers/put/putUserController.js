const { userModel } = require('../../models/user.model');

const putUserController =  async (uid, newUserInfo) =>{
    
    return await userModel.findByIdAndUpdate({_id: uid}, newUserInfo);
};

module.exports = {
    putUserController
}