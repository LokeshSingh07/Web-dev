const express = require('express');
const router = express.Router();



// import controller
const {createTodo} = require('../controller/CreateTodo');
const {getTodo,getTodoById} = require("../controller/GetTodo");
const {updateTodo} = require('../controller/UpdateTodo');
const {deleteTodo} = require("../controller/DeleteTodo");




// defie API route
router.post("/createTodo", createTodo);
router.get("/getTodo", getTodo);
router.get("/getTodo/:id", getTodoById);
router.put('/updateTodo/:id', updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);



// export 
module.exports = router;