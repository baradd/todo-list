//External Modules
const express = require("express");
const bodyParser = require("body-parser");

//Internal Modules
const path = require("path");
const rootDir = require("./utils/path").rootDir;
const setStatics = require("./utils/statics").setStatics;
const homerouter = require("./routes/home").router;
const adminRouter = require("./routes/admin").router;
const errorController = require("./controller/error");
//server
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

//Define EJS as template engine
app.set("view engine", "ejs");
app.set("views", "views");
//Define public sources by static
setStatics(app);

app.use(homerouter);
app.use(adminRouter);
//Error 404
app.use(errorController.get404);
app.listen(3000, () => console.log("Server is running"));
