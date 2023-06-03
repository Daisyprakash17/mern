const express =require('express'); 
const router=  express.Router();
const productController=require('../controllers/productController')
const {verifyisloggedIn, verifyisAdmin}=require('../middleware/verifyAuthToken')
// user routes
router.get('/category/:categoryName/search/:searchQuery',productController.getproducts)
router.get('/category/:categoryName',productController.getproducts)
router.get('/search/:searchQuery',productController.getproducts)
router.get("/bestsellers",productController.getBestsellers)

router.get('/',productController.getproducts)
router.get('/get-one/:id',productController.getproductbyid) 

// here we will first have a middleware function which is use to verify 
// whether the user is logged in or not  before accessing the admin routes

// verifying middleware
router.use(verifyisloggedIn);
router.use(verifyisAdmin);
//admin routes
router.get('/admin',productController.adminGetProducts);
router.delete('/admin/:id',productController.adminDeleteProduct);
router.delete('/admin/image/:imagepath/:productid',productController.adminDeleteProductImage);
router.put('/admin/:id',productController.adminUpdateProduct);
router.post('/admin/upload',productController.adminUpload);
router.post('/admin',productController.adminCreateProduct);
module.exports=router;