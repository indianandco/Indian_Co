const failLogin = async (req,res)=>{
    try {
        res.status(404).json({error:"login-failure"});
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
};

module.exports = {
    failLogin
}