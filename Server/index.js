const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const server = express();
const port = 3001;

const productsRoutes = require ("./Routes/products")

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(express.json());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use("/products", productsRoutes)

server.listen(port, () => {
console.log(`Server is running on port ${port}`)});