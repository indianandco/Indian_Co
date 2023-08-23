require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { API_KEY, API_SECRET, C_NAME } = process.env;

dotenv.config()
cloudinary.config({
    cloud_name: C_NAME,
    api_key:API_KEY,
    api_secret: API_SECRET,
});


module.exports = {
    cloudinary

}