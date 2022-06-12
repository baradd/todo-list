//External Modules
const express = require("express");

//Internal Modules
const path = require("path");
const rootDir = require("./path").rootDir;

//Define statics and public folders to use
function setStatics(app) {
  app.use(express.static(path.join(rootDir, "public")));
  app.use(
    express.static(path.join(rootDir, "node_modules", "bootstrap", "dist"))
  );
  app.use(express.static(path.join(rootDir, "node_modules", "font-awesome")));
}

module.exports = { setStatics };
