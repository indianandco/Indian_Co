const mongoose = require('mongoose');

const reviewsCollection = 'reviews';

const reviewsSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
          },
        rate: {
            type: Number,
            required: true,
          },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'users'
          },
       
    },
    {
        timestamps: {
            createdAt: "purchase_datetime",
          },
        versionKey: false
    }
);

reviewsSchema.pre('find', function (){
  this.populate('user');

});
reviewsSchema.post('remove', async function (doc) {
  try {
    // Get the user associated with the review
    const foundUser = await userModel.findById(doc.users);
    if (foundUser) {
      // Remove the review ID from the user's reviews array
      foundUser.reviews = foundUser.reviews.filter((r) => r.toString() !== doc._id.toString());
      await foundUser.save();
    }
  } catch (error) {
    console.log("Error updating user's reviews array:", error);
  }
});
const reviewModel = mongoose.model(reviewsCollection, reviewsSchema);

module.exports = {
  reviewModel
};