

const Category=require('../models/CategoryModel')


exports.getcategories=async(req,res,next)=>{ 
    try{

        const categories=await Category.find().sort({name:1});
        res.send(categories);

    }catch(err){
        console.log('there is some error while getting the products');
        next(err) 
    
    }

} 

exports.newcategory=async(req,res,next)=>{
    try{ 

        const category=req.body.category;
        if(!category)
        {
            res.status(400).send('Category input is required');
        }
        else{
            const categoryExists=await Category.findOne({name:category});
            if(categoryExists)
            {
                res.status(400).send("category already exists");
            }
            else
            {
                const categoryCreated=await Category.create({name:category});
                res.status(201).json({message:"category created",category:categoryCreated})
            }
        }

    }catch(err)
    {
        next(err);
    }
}
exports.deleteCategory=async(req,res,next)=>{
        try{    
            if(req.params.category!=='Choose category')
            {
                const categoryExists=await Category.findOne({
                    name:decodeURIComponent(req.params.category)
                })
                if(categoryExists)
                {
                       await categoryExists.remove();
                       res.json({message:"category deleted"})
                }
                else
                { 
                    throw new Error('this category do not exists');
                }
            }
        }catch(err){
            next(err);
        }
}

exports.saveAttr=async(req,res,next)=>{

    try{
        console.log(req.body)
        const {key,value,categoryChoosen}=req.body ;
        if(!key || !value|| !categoryChoosen)
        { 
            res.json({message:'all the fields are required to create a new attribute'});
        }
        else{

            const category=categoryChoosen.split('/')[0]; 
            const categoryExists=await Category.findOne({name:category}); 
            if(!categoryExists)
            {
                throw new Error("category do not exist");
            }
            else
            {
                if(categoryExists.attrs.length>0)
                {
                    // so if we have some attributes with value for the category
                    // then we have to search for out attributes and push key if attribute is there or create new attribute with key given
                    
                    var KeyDoesNotExitsInDatabase=true;
                    categoryExists.attrs.map((item,idx)=>{
                        if(item.key===key)
                        {
                            KeyDoesNotExitsInDatabase=false;
                            var copyAttributes=[...categoryExists.attrs[idx].value];
                            copyAttributes.push(value);
                            var newAttributes=[...new Set(copyAttributes)];
                            categoryExists.attrs[idx].value=newAttributes;
                        }
                    })
                    if(KeyDoesNotExitsInDatabase)
                    {
                    categoryExists.attrs.push({key:key,value:[value]});
                    }
                
                }
                else
                {
                    // in this case we know that attrs is empty that means we have to create the new attribut and also the value
                    categoryExists.attrs.push({key:key,value:[value]});
                }
            } 
           await categoryExists.save();
           const updatedCategory=await Category.find({name:category});
           res.send({message:'category Updated',category:updatedCategory})
        }
    }catch(err){
        next(err);
    }
}