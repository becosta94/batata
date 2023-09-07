const Product = require("../models/product.model");

const ProoductsValidator = function(prooductsValidator){};

ProoductsValidator.validate = (code, sales_price, Product) => {
    if (price < Product.cost_price  
        || price >= (1.1 * Product.sales_price)
        || price <= (0.9 * Product.sales_price)) 
        return false;
}