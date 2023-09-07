const Validator = function(validator) {
    this.a = validator.a
};

Validator.validate = (sales_price, product, result) => {
    if (sales_price < product.cost_price  
        || sales_price >= (1.1 * product.sales_price)
        || sales_price <= (0.9 * product.sales_price)) 
        return result(false);
    else return result(true);    
};

module.exports = Validator;