(function (){
  'use strict';

  var express   = require("express")
    , request   = require("request")
    , endpoints = require("../endpoints")
    , helpers   = require("../../helpers")
    , app       = express();

  app.get("/catalogue/images*", function (req, res, next) {
    var url = endpoints.catalogueUrl + req.url.toString();
    console.log("images url "+url);
    request.get(url)
        .on('error', function(e) { next(e); })
        .pipe(res);
  });

  app.get("/item", function (req, res, next) {
    var x = endpoints.catalogueUrl+"/item" ;//+ req.url.toString();
    console.log("getProducts "+x);
    helpers.simpleHttpRequest(x
     , res, next);
  });

  app.get("/tags", function(req, res, next) {
    helpers.simpleHttpRequest(endpoints.tagsUrl, res, next);
  });

  app.post("/item", function (req, res, next) {

    var options = {
      uri: endpoints.catalogueUrl + "/item",
      method: 'POST',
      json: true,
      body: req.body
    };

    console.log("Adding new product: " + JSON.stringify(req.body));
    request(options, function(error, response, body) {
      if (error) {
        return next(error);
      }
      helpers.respondSuccessBody(res, JSON.stringify(body));
    }.bind({
      res: res
    }));

  });

  module.exports = app;
}());
