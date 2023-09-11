const callBackAuthenticate =  async (req,res)=>{
    try {
        req.session.user = req.user;
        return res.status(200).json(req.session.user)
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    };
};

module.exports = {
    callBackAuthenticate
};