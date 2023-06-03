const express =require('express');
const router=  express.Router();
const categoryController=require('../controllers/categoryController')
const {verifyisloggedIn, verifyisAdmin}=require('../middleware/verifyAuthToken')


router.get('/',categoryController.getcategories)


// category routes should only be accessible by the admin only and before that admin have to log in
router.use(verifyisloggedIn);
router.use(verifyisAdmin);

router.post('/',categoryController.newcategory)
router.delete('/:category',categoryController.deleteCategory)
router.post('/attr',categoryController.saveAttr);
module.exports=router;