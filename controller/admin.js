//Internal modules
const Todo = require("../model/todo").Todo;
const { v4: uuidv4 } = require("uuid");
let addTodo = (req, res, next) => {
  //If user send an empty form or a sabuter try to run css by url 'we redirect the app root and prevent to run another codes'
  if (!req.body.todo) return res.redirect("/");
  //Create an object of Todo
  let todo = new Todo(uuidv4(), req.body.todo);
  //Save the Created object
  todo.saveTodo((err) => {
    if (err) {
      //There is an error during saving the object
      console.log(err);
      res.redirect("/");
    } else {
      //Everything is 200 and return to root page
      res.redirect("/");
    }
  });
};
//Get all todos and then send towards UI to show
function showTodos(callback) {
  let todo = new Todo();
  Todo.getAllTodo((getCallBack) => {
    callback(getCallBack);
  });
}
//Remove a todo by its ID and then redirect to main page
let removeTodo = (req, res, next) => {
  Todo.removeTodoById(req.params.id, (callback) => {
    res.redirect("/");
  });
};

//Change status of todo
var changeStatus = (req, res, next) => {
  Todo.changeStatusById(req.params.id);
  res.redirect("/");
};
module.exports = { addTodo, showTodos, removeTodo, changeStatus };
