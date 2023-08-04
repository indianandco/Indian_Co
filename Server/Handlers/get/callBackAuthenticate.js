const callBackAuthenticate =  async (req,res)=>{
    try {
        req.session.user = req.user;
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    };
};

module.exports = {
    callBackAuthenticate
};