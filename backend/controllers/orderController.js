
const Order=require('../models/OrderModel')
const Product=require('../models/ProductModel')
const ObjectId = require("mongodb").ObjectId;

 exports.getuserOrders=async(req,res,nex)=>{

    try{
        const orders=await Order.find({user:req.user._id}).populate('user',"-password");
        res.send(orders);
    }catch(err) 
    {
        next(err);
    }
 }
 exports.getorder=async(req,res,next)=>{
    try{
        const orderdetail=await Order.findById(req.params.id).populate('user',"-password -idAdmin -_id -__v -createdAt -updatedAt").orFail();

        res.send(orderdetail);
    }catch(err)
    {
        next(err);
    }
 }

 exports.createorder=async(req,res,next)=>{
    try{
            const {cartItems,orderTotal,paymentMethod}=req.body;
            if(!cartItems || !orderTotal || !paymentMethod)
            res.status(400).send('ALl input field are required');


            let ids=cartItems.map((item)=>{
                return item.productId;
            })

            let qty=cartItems.map((item)=>{
                return item.quantity;
            })

            await Product.find({_id:{$in:ids}}).then((products)=>{
                products.forEach(function(product,idx){
                    product.sales+=qty[idx];
                    product.save();
                })
            })

            const order = new Order({
                user: ObjectId(req.user._id),
                orderTotal: orderTotal,
                cartItems: cartItems,
                paymentMethod: paymentMethod,
            })
            const createdOrder=await order.save();
            res.status(201).send(createdOrder);
    }catch(err)
    {
        next(err);
    }
 }
 exports.updateOrdertopaid=async(req,res,next)=>{

    try{
            const order=await Order.findById(req.params.id).orFail();
            order.isPaid=true;
            order.paidAt=Date.now();
            const updatedOrder= await order.save();
            res.send(updatedOrder);
    }catch(err)
    {
        next(err);
    }
 }
 exports.updateOrdertodelivered=async(req,res,next)=>{

    try{
        const order =await Order.findById(req.params.id);
        order.isDelivered=true;
        order.deliveredAt=Date.now();
        const updatedOrder=await order.save();
        res.send(updatedOrder);

    }catch(err)
    {
        next(err);
    }
 }

 exports.getorders=async(req,res,next)=>{
    try{
        const orders=await Order.find({}).populate("user","-password").sort({paymentMethod:"desc"});
        console.log(orders.length);
        res.json(orders);
    }catch(err)
    {
        next(err);
    }
 }

 exports.getOrderForAnalysis = async (req, res, next) => {
    try {
        const start = new Date(req.params.date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(req.params.date);
        end.setHours(23, 59, 59, 999);

        const order = await Order.find({
            createdAt: {
                $gte: start,
                $lte: end,
            }
        }).sort({ createdAt: "asc" });
        res.send(order);

    } catch (err) {
        next(err)
    }
}