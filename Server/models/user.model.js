const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userCollection = 'users';

const userSchema = new mongoose.Schema(
    {
        first_name: {
            required: true,
            type: String
        },
        last_name: {
            required: true,
            type: String
        },
        gender: {
            type: String,
            required: true
        },
        birthdate: {
            type: Date,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        cp: {
            type: String,
            required: true
        },
        city: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        reviews: {
            type: [
                {   
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'products'
                    },
                    review: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'reviews'
                    }
                }
            ]
        },
        FirebaseId: String,
        image: {
            type: Text
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
        },
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'carts',
            default: []
            },
        role: {
            type: String,
            default: "user"
        },
        tickets: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'tickets',
                    default: []
                }
            ]
        },
        lastConnection: {
            type: Date,
            default: Date.now
        }
    }
);
userSchema.plugin(mongoosePaginate);

userSchema.pre('find', function (){
    this.populate('products', '_id');
});

userSchema.pre('find', function (){
    this.populate('reviews', '_id');
});

userSchema.pre('find', function (){
    this.populate('tickets', '_id');
});

userSchema.pre('find', function (){
    this.populate('carts', '_id');
});


const userModel = model(userCollection, userSchema);

export default userModel;