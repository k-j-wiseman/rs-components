const express = require('express');
const app = express();
const productDao = require("./productDao")
const port = 8080;

// This responds to a GET request
app.get('/products/:productId', (req, res) => {
    var productId = req.params["productId"]
    console.log("Got a GET request for " + productId);
    try {
        var product = productDao.get(productId);
        res.send(JSON.stringify(product));
    }
    catch(error) {
        errorHandler(res, error);
    }
})

// This responds to a POST request
app.post('/products', function (req, res) {
    console.log("Got a POST request");

    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            var product = JSON.parse(data);
            var productId = productDao.insert(product);
            res.send('Product [' + productId + '] has been added');
        }
        catch (error) {
            errorHandler(res, error);
        }
    })
})

// This responds to a PUT request
app.put('/products/:productId', function (req, res) {
    var productId = req.params["productId"]
    console.log("Got a PUT request for " + productId);

    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            var product = JSON.parse(data);
            productDao.update(productId, product);
            res.send('Product [' + productId + '] has been updated');
        }
        catch (error) {
            errorHandler(res, error);
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

function errorHandler(res, error) {
    if (error instanceof SyntaxError) {
        errorResponse(res, 400, 'JSON payload could not be deserialised');
    }
    else if (error instanceof productDao.ProductError) {
        switch (error.type) {
            case 'NOT_FOUND':
                errorResponse(res, 404, error.message);
                break;
            case 'VALIDATION':
                errorResponse(res, 400, error.message);
                break;
            case 'ALREADY_EXISTS':
                errorResponse(res, 409, error.message);
                break;
            default:
                errorResponse(res, 500, 'Internal Server Error');
        }
    }
    else {
        // handle unknown state/error
        errorResponse(res, 500, 'Internal Server Error');
    }
}

function errorResponse(res, code, message) {
    console.log('Returning ' + code + ' ' + message);
    res.writeHead(code, {'Access-Control-Allow-Origin': '*'});
    res.end(message + '\n');
}