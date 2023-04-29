const todo = require('../models/TodoSchema');



// define route handler
exports.createTodo = async (req,res)=>{
    try{
        // extract title and description from request body
        const {title, description} = req.body;

        // create a new Todo object and insert in DB
        const response = await todo.create({title,description});

        // send a json response with a success flag
        res.status(200).json({
            success: true,
            data: response,
            message: "Entry created successfully"
        })

    }
    catch(err){
        console.error(err);

        res.status(500).json({
            success:  false,
            message : "Internal error",
            error : err.message,
        })
    }
}




