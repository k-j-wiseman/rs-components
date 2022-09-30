const productDao = require("./productDao")

test('getting a non-existence product should throw an exception', () => {
    expect(() => productDao.get('1')).toThrow(productDao.ProductError);
})

test('get an existing product should return the product', () => {
    var expected = '{"stock_number":"12345","name":"Pro Batteries","Description":"Batteries","Price":"£1.99"}';
    var productId = productDao.insert(JSON.parse(expected));
    expect(JSON.stringify(productDao.get(productId))).toEqual(expected);
})

test('inserting a product should return the stock_number as productId', () => {
    var productJson = '{"stock_number":"111","name":"Pro Batteries","Description":"Batteries","Price":"£1.99"}';
    var product = JSON.parse(productJson);
    var productId = productDao.insert(product)
    expect(productId).toBe(product["stock_number"]);
})

test('inserting a product with no stock_number should throw an exception', () => {
    var productJson = '{"name":"Pro Batteries","Description":"Batteries","Price":"£1.99"}';
    expect(() => productDao.insert(JSON.parse(productJson))).toThrow(productDao.ProductError);
})

test('inserting a product with no stock_number should throw an exception', () => {
    var productJson = '{"stock_number":"12349","name":"Pro Batteries","Description":"Batteries","Price":"£1.99"}';
    var product = JSON.parse(productJson);
    productDao.insert(product)
    expect(() => productDao.insert(product)).toThrow(productDao.ProductError);
})

test('updating an existing product should update the product', () => {
    var productJson = '{"stock_number":"333","name":"Pro Batteries","Description":"Batteries","Price":"£1.99"}';
    var product = JSON.parse(productJson);
    var productId = productDao.insert(product)

    productJson = '{"stock_number":"333","name":"Pro Batteries","Description":"Batteries","Price":"£2.99"}';
    product = JSON.parse(productJson);
    productDao.update(productId, product);

    expect(productDao.get(productId)).toEqual(product);
})

test('updating a product with stock_number different to productId should throw an exception', () => {
    var productJson = '{"stock_number":"444","name":"Pro Batteries","Description":"Batteries","Price":"£1.99"}';
    expect(() => productDao.update('111', JSON.parse(productJson))).toThrow(productDao.ProductError);
})

test('updating a non-existent product should throw an exception', () => {
    var productJson = '{"stock_number":"555","name":"Pro Batteries","Description":"Batteries","Price":"£1.99"}';
    expect(() => productDao.update('555', JSON.parse(productJson))).toThrow(productDao.ProductError);
})