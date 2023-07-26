const {userModel} = require("../../models/user.model");

const postUsersController = async ({first_name, last_name, gender, birthdate, address, zipcode, city, email}) => {
    return await userModel.create({first_name, last_name, gender, birthdate, address, zipcode, city, email});
};

module.exports = {
    postUsersController
}