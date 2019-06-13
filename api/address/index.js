'use strict';
var express   = require("express")
    , request   = require("request")
    , endpoints = require("../endpoints")
    , helpers   = require("../../helpers")
    , app       = express();


app.post("/address", function (req, res, next) {

    let currentUser = helpers.getCurrentUser(req);
    console.log(currentUser);

    let options = {
        uri: endpoints.addressUrl + "/address" ,
        method: "POST",
        json: true,
        body: req.body,
        headers: {
            'Authorization' : 'Bearer ' + currentUser.token,
            'Content-Type' : 'application/json',
            'UserId' : currentUser.uuid
        }
    };

    request(options, function (error, response, body) {
        if (error) {
            return next(error);
        }

        helpers.respondSuccessBody(res, JSON.stringify(body));
    });

});


app.get("/address", function (req, res, next) {
    let currentUser = helpers.getCurrentUser(req);

    let options = {
        uri: endpoints.addressUrl + "/address",
        method: "GET",
        json: true,
        headers: {
            'Authorization' : 'Bearer ' + currentUser.token,
            'Content-Type' : 'application/json',
            'UserId' : currentUser.uuid
        }
    };

    request(options, function (error, response, body) {
        if (error) return next(error);
        if (response.statusCode !== 200) {
            res.status(response.statusCode).send(body);
            return;
        }
        helpers.respondStatusBody(res, response.statusCode, JSON.stringify(body));
    });

});


app.delete("/address/:uuid", function (req, res, next) {
    let currentUser = helpers.getCurrentUser(req);

    let options = {
        uri: endpoints.addressUrl + "/address/" + req.params.uuid.toString(),
        method: "DELETE",
        json: true,
        headers: {
            'Authorization' : 'Bearer ' + currentUser.token,
            'Content-Type' : 'application/json',
            'UserId' : currentUser.uuid
        }

    };

    request(options, function (error, response, body) {
        if (error) return next(error);
        helpers.respondStatusBody(res, response.statusCode, JSON.stringify(body));
    });

});











module.exports = app;
