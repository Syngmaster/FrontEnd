(function (){
  'use strict';

  var async     = require("async")
      , express   = require("express")
      , request   = require("request")
      , helpers   = require("../../helpers")
      , endpoints = require("../endpoints")
      , app       = express()

  // List items in cart for current logged in user.
  app.get("/cart", function (req, res, next) {

    let currentUser = helpers.getCurrentUser(req);
    console.log("Customer ID: " + currentUser.uuid);

    let options = {
        uri: endpoints.cartsUrl + "/cart",
        method: "GET",
        json: true,
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
      if (response.statusCode !== 200) {
        helpers.respondStatus(res, response.statusCode);
        return
      }
      helpers.respondSuccessBody(res, JSON.stringify(body));
    });

  });

  // Delete item from cart
  app.delete("/cart/:itemId", function (req, res, next) {

    let currentUser = helpers.getCurrentUser(req);
    console.log("Customer ID: " + currentUser.uuid);

    var options = {
      uri: endpoints.cartsUrl + "/cart/" + req.params.itemId.toString(),
      method: 'DELETE',
      json: true,
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
      console.log('Item deleted with status: ' + response.statusCode);
      helpers.respondStatus(res, response.statusCode);
    });
  });


  // Add new item to cart
  app.post("/cart", function (req, res, next) {
    let currentUser = helpers.getCurrentUser(req);
    if (currentUser.token === undefined) {
      helpers.respondStatusBody(res, 401, ("User hasn't logged in"));
      return
    }

    let newItem = {
      itemUUID: req.body.itemId,
      quantity: req.body.qty
    };
    addNewItemToCart(currentUser, newItem, res);

  });

  // add item to cart
  // 1. - fetch item details
  // 2. - save item to cart
  
  async function addNewItemToCart(currentUser, newItem, res) {
    let itemDetails = await fetchItemDetails(currentUser, newItem.itemUUID);
    let result = await saveItemToCart(itemDetails, currentUser, newItem.quantity);
    helpers.respondStatus(res, res.statusCode);
  }
  
  function fetchItemDetails(currentUser, itemUUIDs) {

    let options = {
      uri: endpoints.catalogueUrl + "/item/" + itemUUIDs,
      method: "GET",
      json: true,
      headers: {
        'Authorization' : 'Bearer ' + currentUser.token,
        'Content-Type' : 'application/json',
        'UserId' : currentUser.uuid
      }

    };

    return new Promise((resolve, reject) => {
      request(options, function (error, response, body) {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  }

  function saveItemToCart(itemDetails, currentUser, quantity) {

    let itemData = {
      item: itemDetails,
      quantity: quantity
    };

    let options = {
      uri: endpoints.cartsUrl + "/cart",
      method: "POST",
      json: true,
      headers: {
        'Authorization' : 'Bearer ' + currentUser.token,
        'Content-Type' : 'application/json',
        'UserId' : currentUser.uuid
      },
      body: itemData

    };

    return new Promise((resolve, reject) => {
      request(options, function (error, response, body) {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });

  }

  module.exports = app;
}());
