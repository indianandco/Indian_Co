const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productsCollection = 'products';

const productsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        offer_price: Number,
        description: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        sold_quantity: Number,
        category: {
            type: String,
            required: true
        },
        size: String,
        fragance: String,
        image: String,
        offer: Boolean,
        catalog_listing: Boolean,
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'reviews'
            }
        ]
    }
);

productsSchema.plugin(mongoosePaginate);

productsSchema.pre('find', function (){
    this.populate('reviews');
});


const productModel = mongoose.model(productsCollection, productsSchema);

module.exports = productModel;