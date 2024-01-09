const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderItemSchema = new Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    quantity: {
        type: Number,
        required: true,
    }
},
);



    
const OrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        
        type: orderItemSchema,
        required: true,
    }],
    total: {
        type: Number,
    },
    status: {
        type: String,
        default: "Pending"
    }
},
{
    timestamps: true
});


const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
