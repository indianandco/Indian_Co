const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cors = require('cors');
const { initializePassport } = require('./config/passport.config');
require('dotenv').config();

const { PORT, USER, PW, DB_URL } = process.env;
const productsRoutes = require ("./Routes/products")
const usersRoutes = require("./Routes/users")
const ticketsRoutes = require("./Routes/tickets")
const cartsRoutes = require("./Routes/carts")
const adminDashboard = require('./Routes/adminDashboard');

const server = express();

const mongoose = require('./db');

server.use(cors({
  origin: "*",  
  methods: 'GET, POST, OPTIONS, PUT, DELETE',
  allowedHeaders: 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(express.json());
server.use(morgan('dev'));

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
server.use("/tickets", ticketsRoutes);
server.use("/carts", cartsRoutes);
server.use('/admindashboard', adminDashboard);

server.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`)});