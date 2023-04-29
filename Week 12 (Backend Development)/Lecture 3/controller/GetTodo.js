// import Schema
const Todo = require('../models/TodoSchema');


// define route handler
exports.getTodo = async (req,res)=>{
    try{
        // fetch all todo from database
        const allTodos = await Todo.find({});

        // response 
        res.status(200).json({
            succcess: true,
            data : allTodos,
            message: "Entire Todo Detaiis fetched",
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message : "Internal error",
            error : err.message,
        });
    }
}




exports.getTodoById = async(req,res)=>{
    try{
        // extract Todo items basis on Id
        const id = req.params.id;
        const getTodo = await Todo.findById({_id: id});

        // Data forgiven Id not found
        if(!getTodo){
            return res.status(404).json({
                success: false,
                message: "No Data Found with Given Id",
            })
        }
        // data for given id Found
        res.status(200).json({
            success:true,
            data: getTodo,
            message: `Todo ${id} data successfully fetched`,
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message:  "Internal error",
            error: err.message,
        })
    }
}