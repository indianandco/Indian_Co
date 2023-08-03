const postUsersHandler = async (req, res) => {
    try {

        res.status(201).send({ status: "success", message: "User registered" });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Error en 'postUsersHandler' ${error}`});
    };
};

module.exports = {
    postUsersHandler
};