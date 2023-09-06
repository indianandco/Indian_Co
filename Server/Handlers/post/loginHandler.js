const { generateToken } = require('../../config/jwt.config');

const loginHandler = async (req, res) => {
    try {
        if(!req.user) return res.status(400).send(error)
        console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        const accessToken = await generateToken(req.user);
        const user = req.user

        res.cookie('cookieToken', accessToken, {
            maxAge: 2 * 60 * 60 * 1000, // 2hs
            httpOnly: true
        });
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
};

module.exports = {
    loginHandler
};