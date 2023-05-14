const Tag = require("../models/TagsModel");




// Create Tag handler
exports.createTag = async (req,res)=>{
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
        const tagDetails = await Tag.create({
            name: name,
            description: description,
        });
        console.log("Tag details : ", tagDetails);

        // return response
        return res.status(200).json({
            success: false,
            message: "Tag created successfully",
            data: tagDetails,
        });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}







// getAllTags handler function
exports.showAllTags = async (req,res)=>{
    try{
        // DB call for find()
        const allTags = await Tag.find({},{name: true, description: true});
                
        // return response
        return res.status(200).json({
            success: false,
            message: "All Tags returned successfully",
            tagDetails,
        });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}




