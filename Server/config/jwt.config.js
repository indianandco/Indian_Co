const jwt = require('jsonwebtoken');
require('dotenv').config();

const { PRIVATE_KEY } = process.env;

const generateToken = async (user) => {
    const token = jwt.sign({
        user
    }, PRIVATE_KEY, {
        expiresIn: '24h'
    });
    return token;
};


const authenticateToken = async (req, res, next) => {
    const token = req.cookies['cookieToken'];

    if (token == null) {

        return res.status(401).send('unauthorized, Wrong Token');
    };
    
    jwt.verify(token, PRIVATE_KEY, (err, user) => {
        if (err) {
            return res.status(403).send('forbbiden');
        }
        req.user = user;
        next();
    });
};

module.exports = {
    generateToken,
    authenticateToken
}