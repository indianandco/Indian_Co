const { putReviewController } = require('../../Controllers/put/putReviewController');

const putReviewHandler = async (req,res) =>{
    let pid = req.params.pid;
    const updateReview = req.body;
    try {

        const result = await putReviewController(pid, updateReview);

        res.status(200).send({status:"success", payload: result})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    };
};

module.exports = {
    putReviewHandler
}