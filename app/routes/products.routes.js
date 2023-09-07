module.exports = app => {
  const products = require("../controllers/products.controller.js");

  var router = require("express").Router();

  router.get("/", products.findAll);

  router.get("/:code", products.findOne);

  router.put("/:code/:sales_price", products.validate);

  app.use('/api/products', router);
};