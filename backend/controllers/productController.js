
const Product=require('../models/ProductModel')
let recordsPerPage=require('../config/pagination')
const imageValidate=require('../utils/imageValidate')
exports.getproducts=async(req,res,next)=>{
    // console.log(1)
    try{

         let query={};

         let pricecondition={};
         if(req.query.price)
         {
            pricecondition={price:{$lte:Number(req.query.price)}}
         }
        let ratingcondition={};
        if(req.query.rating)
        { 
            ratingcondition={rating:{$in:req.query.rating.split(',')}}
        }
        
        let categorycondition={};
        // below is when we are choosen category from the seach bar
        const categoryName=req.params.categoryName || ""; 
        // console.log("the category name is ",req.params.categoryName);
        if(categoryName)
        {
            let a =categoryName.replace(/,/g,'/');
            var regex=new RegExp("^"+a);
            // console.log(regex)
            categorycondition={category:regex}
            // or we can also use categorycondition={category:categoryName}
            
        }
        
        // below is when we select the category from the filters
        if(req.query.category)
        {
            let a =req.query.category.split(',').map((item)=>{
                if(item)
                return new RegExp("^"+item);
            })
            // we can also use let a =req.query.category.split(',)
            categorycondition={
                category:{$in:a}
            }
        }
        
        // below is the query which will work when we
        // select the attibutes from the filters
        let attrsQueryCondition=[]; 
        if(req.query.attrs)
        {
                attrsQueryCondition=req.query.attrs.split(',').reduce((acc,item)=>{
                    if(item)
                    {
                        let a=item.split('-');
                        let values=[...a];
                        values.shift(); // to remove the attribute name
                        // console.log(values)
                        let a1={
                            attrs:{$elemMatch:{key:a[0],value:{$in:values}}}
                        }
                        acc.push(a1);
                            return acc;
                    }
                    else
                    return acc;
                },[])
        } 

        const searchQuery = req.params.searchQuery || ""
    let searchQueryCondition = {} 
    if(searchQuery) { 
        searchQueryCondition = { $text: { $search: searchQuery } }
    }
    
    // console.log(searchQueryCondition)
        // pagination 
        // by default getting recordsPerpage no of products for the first page
        // if page no is not given
        const pageNum = Number(req.query.pageNum) || 1;
        // console.log('the req . query is ',req.query.pageNum);
        // console.log('the request page no is ',pageNum);
        // sort by name, price etc.
        // will get the values from the frontend like name_-1 name_1 price_1 price_-1 rating_1
        // then will create thes sort object fron this string and will use it as to sort the products
        let sort = {}
        const sortOption = req.query.sort || ""
        if(sortOption) {
            let sortOpt = sortOption.split("_")
            sort = { [sortOpt[0]]: Number(sortOpt[1]) }
        }
        


        query={
            $and:[pricecondition,ratingcondition,categorycondition,...attrsQueryCondition,searchQueryCondition]
         }

        const totalProducts = await Product.countDocuments(query);

        // if(!req.query.pageNum)
        // {
        //     recordsPerPage=totalProducts;
        // }

        const products = await Product.find(query)
          .skip(recordsPerPage * (pageNum - 1))
          .sort(sort)
          .limit(recordsPerPage); 
        res.json({
          products,
          pageNum,
          paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
        });
            

    }catch(err)
    {
        next(err);
    }
} 


exports.getproductbyid=async(req,res,next)=>{
        // console.log(2);
    try{ 
        const product=await Product.findById(req.params.id).populate('reviews');
        res.json(product);
    }catch(err){
            next(err)
    }

}

exports.getBestsellers = async (req, res, next) => {
    // doubt-- 105
    // console.log(3)
    try {
        const products = await Product.aggregate([
            { $sort: { category: 1, sales: -1 } },
            { $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } } },
            { $replaceWith: "$doc_with_max_sales" }, 
            { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } },
            { $limit: 3 }
        ])
        res.json(products)
    } catch(err) {
        next(err)
    }
}

exports.adminGetProducts=async(req,res,next)=>{
    try{
        
        const products=await Product.find({}).sort({category:1}).select('name price category')
        res.json(products)
    }catch(err)
        {
            next(err)
        }
}

exports.adminDeleteProduct=async(req,res,next)=>{
    try{

        const product=await Product.findByIdAndDelete(req.params.id);
        await product.remove();
        res.send('product deleted'); 
    }catch(err)
    { 
        next(err);

    }
}

exports.adminCreateProduct=async(req,res,next)=>{
    
    try{
            const product=new Product();
            const {name,description,price,category,attributesTable,count}=req.body;
            product.name=name;
            product.description=description;
            product.price=price;
            product.count=count;
            product.category=category;
            if(attributesTable.length>0)
            {
                attributesTable.map((item)=>{
                    product.attrs.push(item);
            })
            }
            await product.save();
            res.json({message:'new product has been created',product_id:product._id});
    }catch(err)
    {
        next(err);
    }
}

exports.adminUpdateProduct=async(req,res,next)=>{

    try{
        // firset way to update the values but for this we have to make patch request
        // const product=await Product.findByIdAndUpdate(req.params.id,req.body);


        // another way to update the details but lengthy
        const product = await Product.findById(req.params.id).orFail() 
        const { name, description, count, price, category, attributeTable } = req.body
        product.name =name || product.name
        product.description =description || product.description 
        product.count =count || product.count
        product.price =price || product.price
        product.category = category || product.category
        if(attributeTable &&  attributeTable.length > 0 ) {
            product.attrs = []
            attributeTable.map((item) => {
                product.attrs.push(item)
            })
        } else {
            product.attrs = []
        }
        await product.save() 

        res.json({
           message: "product updated" 
        })
    }catch(err)
    {
        next(err);
    }

}

exports.adminUpload=async(req,res,next)=>{
    if(req.query.cloudinary==='true')
    {
        try{ 
            let product=await Product.findById(req.query.productId).orFail(); 
            product.images.push({path:req.body.url});
            await product.save();
        }catch(err){
                next(err);
        }
        return 
    }
    try{
            // here will are checking that req.file should contain file 
            // and also that file should only be in image format and should not be empty  
                 
            if(!req.files || !!req.files.images===false)
            { 
                return    res.status(400).send('no image have been uploaded');
            }
            const validateRes=imageValidate(req.files.images);
            if(validateRes.error)
            { 
                    return    res.status(400).send(validateRes.error);
            }


            const path=require("path");
            const { v4: uuidv4 } = require("uuid")
            let imageTable=[]
            const uploadDir=path.resolve(__dirname,"../../frontend","public","images","products");
            //const tempPath=path.join(__dirname,"../../frontend/public/images/products");
            
            if(Array.isArray(req.files.images)){
                imageTable=req.files.images
            }
            else
            imageTable.push(req.files.images);
             
 
            const product=await Product.findById(req.query.productId); 
            for(let image of imageTable) {
                var filename=uuidv4() + path.extname(image.name);
                var uploadPath = uploadDir + "/" + filename
                // console.log(uploadPath)
                product.images.push({path:'/images/products/'+filename});
                image.mv(uploadPath, function(err) {
                    if(err) {
                        return res.status(500).send(err)
                    }
                })
            }
          await  product.save();
        return res.send("files uploaded")
    }catch(err)
    {
        next(err);
    }
}


exports.adminDeleteProductImage=async(req,res,next)=>{
    const imagePath = decodeURIComponent(req.params.imagepath); 
    if(req.query.cloudinary==='true')
    {
        try{
            await Product.findOneAndUpdate(
                { _id: req.params.productid },
                { $pull: { images: { path: imagePath } } }
              ).orFail();
              res.end();
        }catch(err){
            next(err);
        }
        return ;
    }
    try { 
        // console.log(req.params);
        const path = require("path");
        const finalPath = path.resolve("../frontend/public") + imagePath;
    
        const fs = require("fs"); 
        fs.unlink(finalPath, (err) => {
          if (err) {
          return   res.status(500).send(err);
          }
        });
        await Product.findOneAndUpdate(
          { _id: req.params.productid },
          { $pull: { images: { path: imagePath } } }
        ).orFail();
        return res.end();
      } catch (err) {
        next(err);
      }
}