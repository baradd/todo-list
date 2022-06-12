//External Modules
const express = require("express");

//Internal Module
const adminController = require("./admin");
const showTodos = require("./admin").showTodos;
//Send the template of main page and also send datas to fill main page in UI side
let renderHomeTemplate = (req, res, next) => {
  //Get a list of all todos
  var todoList,
    compeletedTodos = 0;
  showTodos((callback) => {
    todoList = callback;
  });
  //Counting to find out how many of todos were compeleted
  todoList.forEach((element) => {
    if (element.compeleted) compeletedTodos++;
  });
  //Send homepage template and options
  var todoList = res.render("index.ejs", {
    titleText: "Todo List",
    todosList: todoList,
    compeletedTodos: compeletedTodos,
    unCompeletedTodos: todoList.length - compeletedTodos,
  });
};

module.exports = { renderHomeTemplate };
