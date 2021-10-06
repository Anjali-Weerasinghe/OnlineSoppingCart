const mongoose = require('mongoose')


const deliverySchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    orderID:{
        type: String,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    postalCode:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    contactNo:{
        type: String,
        required: true
    }
   
}, {
    timestamps: true
})


module.exports = mongoose.model("Delivery", deliverySchema)