const Category = require("../models/CategoryModel");




// Create Category handler
exports.createCategory = async (req,res)=>{
    try{
        // fetch data
        const {name, description} = req.body;

        // validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // create entry in DB
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log("Category details : ", categoryDetails);

        // return response
        return res.status(200).json({
            success: true,
            message: "Category created successfully",
            data: categoryDetails,
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}







// getAllCategory handler function
exports.showAllCategories = async (req,res)=>{
    try{
        // DB call for find()
        const allCategory = await Category.find({},{name: true, description: true});
                
        // return response
        return res.status(200).json({
            success: true,
            message: "All Category returned successfully",
            allCategory,
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}



// categoryPageDetails
exports.categoryPageDetails = async (req,res)=>{
    try{
        // get categoryId
        const categoryId = req.body;

        // get courses for specified categoryId
        const selectedCategory = await Category.findById({_id: categoryId})
                                                        .populate("courses")
                                                        .exec();
        
        // validation
        if(!selectedCategory){
            return res.status(400).json({
                success: false,
                message: "Data Not Found",
            });
        }
        
        // get courses for diiferent categories
        const differentCategories = await Category.find({
                                                        _id: {$ne: categoryId}
                                                    })
                                                    .populate("courses")
                                                    .exec();


        // get top 10 selling courses
        // HW --> Write it your own

        
        // return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
            }
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

















