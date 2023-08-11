const failRegister = async  (req,res)=>{
    try {
        res.status(404).send({status: 'error', message:'register-failed'});
    } catch (error) {
       console.log(error);
        res.status(500).send({ status: 'error', error });
    }
};

module.exports = {
    failRegister
}