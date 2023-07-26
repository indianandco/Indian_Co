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
            type: mongoose.Schema.Types.ObjectId,
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
});

reviewsSchema.pre('find', function (){
    this.populate('products');
  });

const reviewModel = model(reviewsCollection, reviewsSchema);

export default reviewModel;