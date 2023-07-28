const mongoose = require('mongoose');

const reviewsCollection = 'reviews';

const reviewsSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            require: true,
          },
        rate: {
            type: Number,
            require: true,
          },
        user: {
            type: mongoose.Schema.Types.String,
            require: true,
            ref: 'users'
          },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    },
    {
        timestamps: {
            createdAt: "purchase_datetime",
          },
        versionKey: false
    }
);

reviewsSchema.pre('find', function (){
  this.populate('users');
  this.populate('products');
});

const reviewModel = mongoose.model(reviewsCollection, reviewsSchema);

module.exports = {
  reviewModel
};