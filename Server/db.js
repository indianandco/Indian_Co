const mongoose = require('mongoose');

try {
   mongoose.connect("mongodb+srv://admin:Patoka1503@indianandco.w5ajsr2.mongodb.net/");
    console.log('Conectado a BDD');
} catch (error) {
    console.log(error);
};
