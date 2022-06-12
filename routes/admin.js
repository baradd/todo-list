//External Modules
const express = require("express");
const adminController = require("../controller/admin");

const router = express.Router();
//direct the POST request to this url to save on database
router.post("/admin/add-todo", adminController.addTodo);

router.get("/admin/compeleted/:id", adminController.changeStatus);
router.get("/admin/removetodo/:id", adminController.removeTodo);

module.exports = { router };
