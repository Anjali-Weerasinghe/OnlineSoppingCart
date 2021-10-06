const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    oredrId:{
        type: String,
        trim: true,
        required: true
    },
    product_id:{
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("saved_item", cartSchema)