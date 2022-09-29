# product-service

## Overview

Service to provide the single source of truth for:
Product information

# Local Development

### Setup
npm install
### To Run
node src/index.js
or
npm run start
then open a browser and go to localhost:8080/products/12345

Example Calls
curl http://localhost:8080/products
    returns "Hello GET"

curl -X POST -H "Content-Type: application/json" \
 -d '{"stock_number":"12345","name":"RS Pro Batteries","Description":"RS Batteries","Price":"£1.99"}' \
 http://localhost:8080/products
    returns "Hello POST"

curl -X PUT -H "Content-Type: application/json" \
 -d '{"stock_number":"12345","name":"RS Pro Batteries","Description":"RS Batteries","Price":"£2.99"}' \
 http://localhost:8080/products
    returns "Hello PUT"
