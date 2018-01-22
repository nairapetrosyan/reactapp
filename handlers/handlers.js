const mongoose = require('mongoose');
const todoModel = require('../models/todos');

function getTodos(req, res){
    res.sendFile('./build/index.html');
};

function getApiTodos(req, res){
    const errors={};
    todoModel.find({}).then(todos=>{
        res.send({errors, todos});
    }).catch(errors=>
        res.send({errors: [{msg: "Something went wrong"}], todos : []}))
};


function addApiTodo(req, res){

    req.checkBody('todo').notEmpty().withMessage("Todo is required");
    const errors = req.validationErrors();
    if(errors){
        todoModel.find({}).then(todos=> {
            res.send({errors, todos});
        })
    }
    else {
        const todo=new todoModel({todo : req.body.todo})
        todo.save().then(todo=>{
            res.send(todo);
        }).catch(errors=>
            res.send({todos : []}))

    }
};

function editApiTodo(req, res) {
    req.checkBody('todo').notEmpty().withMessage("Edit is required");
    const errors = req.validationErrors();
    if(errors){
        todoModel.find({}).then(todos=> {
            res.send({errors, todos});
        })
          }
    else {
            todoModel.findByIdAndUpdate(req.params._id, { $set: { todo: req.body.todo }}, { new : true}).then(todo=>
            {
                res.send(todo)
            }).catch(errors=>{
                res.send({ todos : []});
            })


        }
};

function deleteTodo(req, res) {
    todoModel.remove({_id: req.params._id}).
        then(()=>{
            res.send({_id: req.params._id});
        }).catch(errors=>
            res.send({errors: [{msg: "Something went wrong"}], todos : []}));
};

module.exports = {
    getTodos,
    getApiTodos,
    addApiTodo,
    editApiTodo,
    deleteTodo
};