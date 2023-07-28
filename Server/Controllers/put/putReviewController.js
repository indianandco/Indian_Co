const { reviewModel } = require('../../models/review.model');


//Revisar
const putReviewController = async (uid, reviewData) =>{
    return await reviewModel.findByIdAndUpdate({_id: uid}, reviewData);
};

module.exports = {
    putReviewController
}