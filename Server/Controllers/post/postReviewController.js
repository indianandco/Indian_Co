const { reviewModel } = require('../../models/review.model');

const postReviewController = async ({ description, rate, user, product } ) =>{
        return await reviewModel.create( { description, rate, user, product } );
};

module.exports = {
        postReviewController
};