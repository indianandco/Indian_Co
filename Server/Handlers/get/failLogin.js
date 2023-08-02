const failLogin = async (req,res)=>{
    try {
        res.status(404).send({status: 'error', message:'login-failed'});
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error });
    }
};

module.exports = {
    failLogin
}