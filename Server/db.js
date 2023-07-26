const mongoose = require('mongoose');

const URI = "mongodb+srv://coinverse4.z4ucfoj.mongodb.net/";

try {
   mongoose.connect('mongodb+srv://Juan:1234@coinverse4.z4ucfoj.mongodb.net/');
    console.log('Conectado a BDD');
} catch (error) {
    console.log(error);
};
