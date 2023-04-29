const todo = require('../models/TodoSchema');



// define route handler
exports.updateTodo = async (req,res)=>{
    try{
        // 
        const {id} = req.params;
        const {title, description, updatedAt} = req.body;

        const updateTodo = await todo.findByIdAndUpdate(
            {_id : id},
            {title, description, updatedAt : Date.now()}
        ); 

        
        res.status(200).json({
            success: true,
            data: updateTodo,
            message : `Todo ${id} successfully updated`,

        })

    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success: true,
            message: "Internal error",
            error : err.message,
        })
    }
}