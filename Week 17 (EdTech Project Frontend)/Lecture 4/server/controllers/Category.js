const Category = require("../models/CategoryModel");

function getRandomInt(max){
    return Math.floor(Math.random() * max)
}




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
            data: allCategory,
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
exports.categoryPageDetails = async (req, res)=>{
    try{
        // get categoryId
        const {categoryId} = req.body;

        // get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: {status: "Published"},
                populate: "ratingAndReviews",
            })
            .exec();
                                                        
        
        // validation
        if(!selectedCategory){
            console.log("Category Not Found");
            return res.status(404).json({
                success: false,
                message: "Category Not Found",
            });
        }


        if(selectedCategory.courses.length === 0){
            console.log("No courses found for the selected category", selectedCategory);
            return res.status(404).json({
                success: false,
                message: "No Course found for the selected category",
            });
        }


        
        // get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: {$ne : categoryId}
        });

        const differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        )
            .populate({
                path: "courses",
                match: {status: "Published"}
            })
            .exec();
        // console.log("Different Category: ", differentCategory);



        // get top-selling courses along all categories
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: {status: "Published"},
                populate:{
                    path: "instructor",
                }
            })
            .exec();
        
        const allCourses = allCategories.flatMap((category)=> category.courses);
        const mostSellingCourses = allCourses
            .sort((a, b)=> b.sold - a.sold)
            .slice(0, 10);


        
        // return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
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

















