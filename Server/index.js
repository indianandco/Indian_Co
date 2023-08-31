const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
//Import Passport:
const passport = require('passport');
const { initializePassport } = require('./config/passport.config');
require('dotenv').config();
const flash = require("express-flash")
const { PORT, USER, PW, DB_URL } = process.env;

const server = express();

const productsRoutes = require ("./Routes/products")
const usersRoutes = require("./Routes/users")
const ticketsRoutes = require("./Routes/tickets")
const cartsRoutes = require("./Routes/carts")
const adminDashboard = require('./Routes/adminDashboard');

const mongoose = require('./db');

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(express.json());
server.use(morgan('dev'));
server.use(flash())
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//Configuracion express-session:
server.use(session({
  store: MongoStore.create({
      mongoUrl: `mongodb+srv://${USER}:${PW}@${DB_URL}`,
      mongoOptions: { useNewUrlParser: true },
      ttl: 3600
     }),
  secret: 'secretCoder',  
  resave: true,
  saveUninitialized: true
}));

//Configuracion passport:
initializePassport();
server.use(passport.initialize());
server.use(passport.session());

server.use("/products", productsRoutes);
server.use("/users", usersRoutes);
// server.use("/tickets", ticketsRoutes);
server.use("/carts", cartsRoutes);
server.use('/admindashboard', adminDashboard);

server.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`)});