const mongoose = require("mongoose")
const User = require("./UserModel")

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User,
    },
    orderTotal: {
        itemsCount: {type: Number, required: true},
        cartSubtotal: {type: Number, required: true}
    },
    cartItems: [
        {
            name: {type: String, required: true},
            price: {type: Number,   required: true},
            image: {path: {type: String,  required: true}},
            quantity: {type: Number, required: true},
            count: {type: Number,   required: true}
        }
    ],
    transactionResult: {
        status: {type: String},
        createTime: {type: String},
        amount: {type: Number}
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    paymentMethod:{
        type:String,
        required:true
    }
}, {
    timestamps: true,
})

const Order = mongoose.model("Order", orderSchema)
// this is the functions which will be as soon collection changes
Order.watch().on("change",(data)=>{
        // console.log('this is change in orders collections',data);
        if(data.operationType==='insert'){
            io.emit("newOrder",data.fullDocument);
        }
})
module.exports = Order
