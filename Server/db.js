const mongoose = require('mongoose');
require('dotenv').config();
const { USER, PW, DB_URL } = process.env;


try {
   mongoose.connect(`mongodb+srv://${USER}:${PW}@${DB_URL}`);
    console.log('Conectado a BDD');
} catch (error) {
    console.log(error);
};

module.exports = mongoose;