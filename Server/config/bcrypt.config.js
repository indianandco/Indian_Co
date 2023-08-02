const bcrypt = require('bcrypt');

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};

module.exports = {
    createHash,
    isValidPassword
};