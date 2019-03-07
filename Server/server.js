/* global global */
var cluster = require("cluster"),
  express = require("express"),
  mongoose = require("mongoose"),
  //Grid = require("gridfs-stream"), //need to search more
  fs = require("fs"),
  moment = require("moment"),
  bodyParser = require("body-parser"),
  multipart = require("connect-multiparty"),
  app = express(),
  config = require("./config");

global.app = app;
global.moment = moment;
global.config = config;
global.fs = fs;
global.db = mongoose.connect(
  config.db_host + config.db_name,
  config.option,
  err => {
    if (err) console.log("database", err);
    console.log("Database connected");
  }
);

global.isMaster = false;
global.mongoose = mongoose;

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(multipart());
//init function

function initApp() {
  var numCPUs = require("os").cpus().length;
  if (cluster.isMaster) {
    // Fork workers.

    for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", function(worker, code, signal) {
      console.log(
        "initApp1: Worker " +
          worker.process.pid +
          " died (" +
          code +
          "). restarting..."
      );
      cluster.fork();
    });
    global.isMaster = true;
  } else {
    app.listen(config.api_port);
    console.log("[glockr.io] initialized on port " + config.api_port);
  }
}
initApp();
var apiRequest = require("./constant/apiRequest");
var companyCtl = require("./controller/Company");

// POST or PUT
var putOrPostFunction = (req, res, redirectFunc) => {
  redirectFunc(req, res);
};
// GET Hello Request
app.get(config.base_url + apiRequest.get.helloRequest.url, (req, res) => {
  res.send("Hello recieved");
});

//POST Or PUT functions
// User login -> api/user/login
app.post(config.base_url + apiRequest.auth.login.url, (req, res) => {
  putOrPostFunction(req, res, userCtrl.login);
});

//Add the Company
app.post(config.base_url + apiRequest.post.createCompany.url, (req, res) => {
  putOrPostFunction(req, res, companyCtl.addCompany);
});
app.get(config.base_url + apiRequest.post.createCompany.url, (req, res) => {
  putOrPostFunction(req, res, companyCtl.getCompany);
});
