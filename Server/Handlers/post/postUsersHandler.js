const { log } = require("console");

const postUsersHandler = async (req, res) => {
    try {
        console.log("hola mundo");
        res.status(201).send({ status: "success", message: "User registered" });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Error en 'postUsersHandler' ${error}`});
    };
};

module.exports = {
    postUsersHandler
};