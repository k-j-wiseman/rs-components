const products = new Map();

function get(productId) {
    var product = products.get(productId);
    if (product === undefined) {
        throw notFoundError(productId);
    }
    return product;
}

function insert(product) {
    var productId = product["stock_number"];
    if (productId === undefined) {
        throw validationError('Missing stock_number property');
    }

    if (products.has(productId)) {
        throw alreadyExistsError(productId);
    }

    products.set(productId, product);
    return productId;
}

function update(productId, product) {
    if (productId !== product["stock_number"]) {
        throw validationError('The stock number [' + product["stock_number"] + '] must match the product Id [' + productId + ']');
    }

    if (!products.has(productId)) {
        // I am assuming that given the existence of a dedicated POST route
        // when the product is missing this should be treated as an error rather than an insert
        throw notFoundError(productId);
    }

    products.set(productId, product);
}

function validationError(message) {
    return new ProductError('VALIDATION', message);
}

function alreadyExistsError(productId) {
    return new ProductError('ALREADY_EXISTS', 'Product [' + productId + '] already exists');
}

function notFoundError(productId) {
    return new ProductError('NOT_FOUND', 'Product [' + productId + '] not found', productId);
}

class ProductError extends Error {
    constructor(type, message) {
        super(message);
        this.name = "ProductError";
        this.type = type;
    }
}

module.exports = { get, insert, update, ProductError };