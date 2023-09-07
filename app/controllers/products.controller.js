const Product = require("../models/product.model");
const Validator = require("../services/validator")

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const name = req.query.name;
  
    Product.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });      

      res.send(data);
    });
  };
  

// Find a single Tutorial with a id
exports.findOne = (req, res) => {
    Product.findById(req.params.code, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with code ${req.params.code}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Product with code " + req.params.code
          });
        }
      } else res.send(data);
    });
  };


// Update a Tutorial identified by the id in the request
exports.validate = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    Product.findById(req.params.code, (err, data) => {
      Validator.validate(req.params.sales_price, data, (valid) => {
        if (!valid){
          res.status(400).send({
            message: "Sales price invalidated"
          }); 
        }else res.send(data);
      })
    })
  
    // Product.updateById(
    //   req.params.code,
    //   new Product(req.body),
    //   (err, data) => {
    //     if (err) {
    //       if (err.kind === "not_found") {
    //         res.status(404).send({
    //           message: `Not found Product with code ${req.params.id}.`
    //         });
    //       } else {
    //         res.status(500).send({
    //           message: "Error updating Product with code " + req.params.id
    //         });
    //       }
    //     } else res.send(data);
    //   }
    // );
  };