const mongoose = require('mongoose');

const URI = "mongodb+srv://coinverse4.z4ucfoj.mongodb.net/";

try {
   mongoose.connect(URI);
    console.log('Conectado a BDD');
} catch (error) {
    console.log(error);
};

module.exports = {
   conn: mongoose
}