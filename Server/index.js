const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const server = express();
const port = 3001;

const productsRoutes = require ("./Routes/products")
const usersRoutes = require("./Routes/users")
const ticketsRoutes = require("./Routes/tickets")
const cartsRoutes = require("./Routes/carts")
const reviewRoutes = require("./Routes/review")

const bdConnection = require('./db')

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

server.use("/products", productsRoutes);
server.use("/users", usersRoutes);
server.use("/tickets", ticketsRoutes);
server.use("/carts", cartsRoutes);
server.use("/review", reviewRoutes);

server.listen(port, () => {
console.log(`Server is running on port ${port}`)});