//Internal Modules
const fs = require("fs");

//Internal Modules
const path = require("path");
const rootDir = require("../utils/path").rootDir;

class Todo {
  constructor(id, description, compeleted = false) {
    this.id = id;
    this.description = description;
    this.compeleted = compeleted;
  }

  saveTodo(callback) {
    //In the first we should get the last created todo list file
    Todo.getAllTodo((getCallback) => {
      //check wether there is any file already or no
      if (Array.isArray(getCallback)) {
        //If there was a file already we add new todo to it
        getCallback.push(this);
        fs.writeFile(
          path.join(rootDir, "data", "todolist.json"),
          JSON.stringify(getCallback),
          (err) => {
            //If there is an error we send the error
            if (err) callback(err);
            //If there is no error we send 200 status code
            else callback(200);
          }
        );
      } else {
        //If there isn't any file we will create a new one
        fs.writeFile(
          path.join(rootDir, "data", "todolist.json"),
          JSON.stringify([this]),
          (err) => {
            if (err) callback(err);
            else callback([]);
          }
        );
      }
    });
  }
  //Remove a todo by its ID
  static removeTodoById(id, callback) {
    //Define two array todosList is an array include all of todos then we compare and put all of todos in filteredTodosList except that ID
    var filteredTodosList;
    var todosList;
    this.getAllTodo((getCallback) => {
      todosList = getCallback;
    });
    //Seprate a todo with that ID from all todos
    filteredTodosList = todosList.filter((element) => {
      return element.id != id;
    });
    //Rewrite todos list into file
    fs.writeFile(
      path.join(rootDir, "data", "todolist.json"),
      JSON.stringify(filteredTodosList),
      (err) => {
        if (err) return callback(err);
      }
    );
    //Return Filtered array
    callback(filteredTodosList);
  }
  //Get all todo s from json file
  static getAllTodo(callback) {
    try {
      //If there is a file we returned it as an array
      var todoList = fs.readFileSync(
        path.join(rootDir, "data", "todolist.json")
      );
      //return
      callback(JSON.parse(todoList));
    } catch (error) {
      //If theres is no file return eror
      callback(error);
    }
  }
  //Change status of todo by its ID
  static changeStatusById(id) {
    var todosList;
    this.getAllTodo((callback) => {
      todosList = callback;
      todosList.forEach((element) => {
        if (element.id == id) element.compeleted = true;
      });
      fs.writeFile(
        path.join(rootDir, "data", "todolist.json"),
        JSON.stringify(todosList),
        (err) => {
          if (err) throw err;
        }
      );
    });
  }
}
module.exports = { Todo };
