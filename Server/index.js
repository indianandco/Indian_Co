const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
//Import Passport:
const passport = require('passport');
const { initializePassport } = require('./config/passport.config');

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

//Configuracion express-session:
server.use(session({
  store: MongoStore.create({
      mongoUrl: 'mongodb+srv://Juan:1234@coinverse4.z4ucfoj.mongodb.net/', //Guardar en .env
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
server.use("/review", reviewRoutes);

server.listen(port, () => {
console.log(`Server is running on port ${port}`)});