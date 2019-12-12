const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        description: {
            type: String,
            trim: true,
            maxlength: 3000
        },
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32
        },
        category: {
            type: ObjectId,
            ref:"Category",
            required: true
        },
        quantity: {
            type: Number,
        },
        photos: {
            data: Buffer,
            contentType:String
        },
        shipping: {
            required: true,
            type:Boolean
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model('Prod', userSchema);