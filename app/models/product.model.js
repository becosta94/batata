const sql = require("./db.js");

// constructor
const Product = function(product) {
  this.code = product.code;
  this.cost_price = product.cost_price;
  this.sales_price = product.sales_price;
  this.name = product.name;
};


Product.findById = (code, result) => {
  sql.query(`SELECT * FROM products WHERE code = ${code}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Product.getAll = (result) => {
  let query = "SELECT * FROM products";


  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};


Product.updateById = (code, product, result) => {
  sql.query(
    "UPDATE products SET sales_price = ? WHERE code = ?",
    [product.title, code],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found product with the code
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated product: ", { code: code, ...product });
      result(null, { code: code, ...product });
    }
  );
};


module.exports = Product;
