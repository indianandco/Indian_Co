const dotenv = require("dotenv")
const cloudinary = require('cloudinary').v2;

dotenv.config()
cloudinary.config({
    cloud_name: "dbvfrzl5n",
    api_key:"437193794491997",
    api_secret: "myY2QXOlkguPYInKSP3leEFgYJk",
});


module.exports = {
    cloudinary

}