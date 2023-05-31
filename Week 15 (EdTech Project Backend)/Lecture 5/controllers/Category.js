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
            success: false,
            message: "Category created successfully",
            data: categoryDetails,
        });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}







// getAllCategory handler function
exports.showAllCategory = async (req,res)=>{
    try{
        // DB call for find()
        const allCategory = await Category.find({},{name: true, description: true});
                
        // return response
        return res.status(200).json({
            success: false,
            message: "All Category returned successfully",
            data: allCategory,
        });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}





// CategoryPageDetails handler function