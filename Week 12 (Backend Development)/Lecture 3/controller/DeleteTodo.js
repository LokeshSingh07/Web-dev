const todo = require('../models/TodoSchema');


exports.deleteTodo = async (req, res)=>{
    try{
        // extract id 
        const {id} = req.params;
        const deleteTodo = await todo.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            data : deleteTodo,
            message : `Todo ${id} successfully deleted`,
        })
    }
    catch(err){
        console.error(err);
        res.status.json({
            success :true,
            message : "Internal error",
            error: err.message,
        })
    }
}