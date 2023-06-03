const express =require('express');
const router=  express.Router();
const {verifyisloggedIn, verifyisAdmin}=require('../middleware/verifyAuthToken');
const userController=require('../controllers/userController')
 


router.post('/register',userController.registeruser)
router.post('/login',userController.loginuser);

router.use(verifyisloggedIn);
router.put('/profile',userController.updateUserDetails)
router.get('/profile/:id',userController.getUserProfile)
router.post('/review/:productId',userController.writeReview);
// admin routes
router.use(verifyisAdmin)
router.get('/',userController.getusers)
router.get('/:id',userController.getuser);
router.put('/:id',userController.updateuser);
router.delete('/:id',userController.deleteuser);

module.exports=router;