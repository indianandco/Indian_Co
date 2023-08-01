const { userModel } = require('../../models/user.model');

const getAllUserController = async () => {
    try {
        const findAll = await userModel.find();
        console.log('findAll:', findAll);
        return findAll;
    } catch (error) {
        console.log('Error en getAllUserController:', error);
        throw new Error("No se puede acceder a la BDD");
    }
};

module.exports = {
    getAllUserController
};
