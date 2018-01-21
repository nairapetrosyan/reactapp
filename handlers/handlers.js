const mongoose = require('mongoose');
const todoModel = require('../models/todos');

function getTodos(req, res){
    console.log('aaaaaaaaaa')
    const errors = Object.assign({}, req.session.errors);
    req.session.errors = null;
    res.sendFile('./public/index.html');
};

function getApiTodos(req, res){
    const errors={};
    todoModel.find({}).then(todos=>{
        res.send({errors, todos});
    }).catch(errors=>
        res.send({errors: [{msg: "Something went wrong"}], todos : []}))
};


function addApiTodo(req, res){

    req.checkBody('addtodo').notEmpty().withMessage("Todo is required");
    const errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        todoModel.find({}).then(todos=> {
            console.log(todos)
            res.send({errors, todos});
        })
    }
    else {
        const todo=new todoModel({todo : req.body.addtodo})
        todo.save().then((err)=>todoModel.find({}).then(todos=>{
            console.log(todos)
            res.send({errors, todos});
        }).catch(errors=>
            res.send({errors: [{msg: "Something went wrong"}], todos : []})))

    }
};

function editApiTodo(req, res) {
    req.checkBody('addtodo').notEmpty().withMessage("Edit is required");
    const errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        todoModel.find({}).then(todos=> {
            console.log(todos)
            res.send({errors, todos});
        })
          }
    else {
        todoModel.findByIdAndUpdate({_id:req.params._id }, { $set: { todo: req.body.addtodo }}).then(err=>
            todoModel.find({}).then(todos=>{
                res.send({errors, todos});
            }).catch(errors=>
                res.send({errors: [{msg: "Something went wrong"}], todos : []}))
        );
    }
};

function deleteTodo(req, res) {
    todoModel.remove({_id: req.params._id}).then(err=>
        todoModel.find({}).then(todos=>{
            res.send({todos})
                ;
        }).catch(errors=>
            res.send({errors: [{msg: "Something went wrong"}], todos : []})));
};

module.exports = {
    getTodos,
    getApiTodos,
    addApiTodo,
    editApiTodo,
    deleteTodo
};