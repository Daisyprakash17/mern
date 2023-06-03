const express =require('express');
const router=  express.Router();
const {verifyisloggedIn, verifyisAdmin}=require('../middleware/verifyAuthToken')
const orderController=require('../controllers/orderController')
 

// user routes
router.use(verifyisloggedIn);
router.get('/',orderController.getuserOrders);
router.get('/user/:id',orderController.getorder);
router.post('/',orderController.createorder);
router.put('/paid/:id',orderController.updateOrdertopaid);

// admin routes
router.use(verifyisAdmin);
router.put('/delivered/:id',orderController.updateOrdertodelivered);
router.get('/admin',orderController.getorders)
router.get("/analysis/:date", orderController.getOrderForAnalysis);

module.exports=router;